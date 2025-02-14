'use server';

import { FormStateSignUp } from '@/types/types';
import { signUpFormSchema } from '@/app/models/definitions';
import * as bcrypt from 'bcryptjs';
import { getCheckedCpf } from '@/app/ts/cpfValidation';
import Prisma from '@/app/models/prismadb';

export async function signUp(state: FormStateSignUp, formData: FormData) {
    const validatedFields = signUpFormSchema.safeParse({
        name: formData.get('name') as string,
        cpf: formData.get('cpf') as string,
        birthdate: formData.get('birthdate') as string,
        phone: formData.get('phone') as string,
        email: formData.get('email') as string,
        zipcode: formData.get('zipcode') as string,
        street: formData.get('street') as string,
        district: formData.get('district') as string,
        city: formData.get('city') as string,
        number_residence: formData.get('number_residence') as string,
        type_residence: formData.get('type_residence') as string,
        building: formData.get('building') as string,
        block: formData.get('block') as string,
        livingapartmentroom: formData.get('livingapartmentroom') as string,
        reference_point: formData.get('reference_point') as string,
        password: formData.get('password') as string
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        };
    };

    const {
        name,
        cpf,
        birthdate,
        phone,
        email,
        zipcode,
        street,
        district,
        city,
        number_residence,
        type_residence,
        building,
        block,
        livingapartmentroom,
        reference_point,
        password
    } = validatedFields.data

    const checkedCpf = getCheckedCpf(cpf);

    if (!checkedCpf) {
        return {
            info: 'Números do CPF inválido!'
        };
    };

    const hashedPassword = await bcrypt.hash(password, 12);

    let existingCpf = await Prisma.cpfs.findFirst({
        where: {
            cpf
        }
    });

    if (!existingCpf) {
        existingCpf = await Prisma.cpfs.create({
            data: {
                cpf,
                name,
                birthdate
            }
        });
    } else {
        return {
            info: 'Dados já Cadastrados',
        };
    };

    const existingPhone = Prisma.phones.upsert({
        where: {
            phone
        },
        update: {},
        create: {
            phone,
            email
        }
    });

    const existingZipcode = await Prisma.zipcodes.upsert({
        where: {
            zipcode
        },
        update: {},
        create: {
            zipcode,
            city,
            district,
            street
        }
    });

    let existingAddress = await Prisma.addresses.findFirst({
        where: {
            zipcode_id: existingZipcode.id,
            type_residence,
            number_residence,
            building,
            block,
            livingapartmentroom,
            reference_point
        }
    });

    if (!existingAddress) {
        existingAddress = await Prisma.addresses.create({
            data: {
                zipcode_id: existingZipcode.id,
                type_residence,
                number_residence,
                building,
                block,
                livingapartmentroom,
                reference_point
            }
        });
    }

    await Prisma.users.create({
        data: {
            cpf_id: existingCpf.id,
            name,
            phone_id: (await existingPhone).id,
            email,
            address_id: existingAddress.id,
            password: hashedPassword,
        },
    });

    return {
        message: 'Dados Cadastrados com Sucesso!',
    };

};