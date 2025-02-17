'use server';

import { FormStateDriverUp } from '@/types/types';
import { driverUpFormSchema } from '@/app/models/definitions';
import { getCheckedCpf } from '@/app/ts/cpfValidation';
import { openSessionToken } from '@/app/models/opentoken';
import { cookies } from 'next/headers';
import Prisma from '@/app/models/prismadb';

export async function driverUp(state: FormStateDriverUp, formData: FormData) {
    const sessionAuthToken = (await cookies()).get('sessionAuthToken')?.value;

    if (!sessionAuthToken) {
        return {
            info: 'Token de sessão não encontrado'
        };
    };

    const payload = await openSessionToken(sessionAuthToken);

    if (!payload || !payload.sub) {
        return {
            info: 'ID de usuário não encontrado no token'
        };
    };

    const user_id = Number(payload.sub);

    const validatedFields = driverUpFormSchema.safeParse({
        name: formData.get('name') as string,
        cpf: formData.get('cpf') as string,
        cnh: formData.get('cnh') as string,
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
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        };
    };

    const {
        name,
        cpf,
        cnh,
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
        reference_point
    } = validatedFields.data;

    const checkedCpf = getCheckedCpf(cpf);

    if (!checkedCpf) {
        return {
            info: 'Números do CPF inválido!'
        };
    };

    const cpfId = await Prisma.cpfs.upsert({
        where: {
            cpf
        },
        update: {},
        create: {
            cpf,
            name,
            birthdate: `${birthdate}T00:00:00.000Z`
        },
        select: {
            id: true
        }
    });

    let existingCnh = await Prisma.cnhs.findFirst({
        where: {
            cnh,
            cpf_id: cpfId.id
        }
    });

    if (!existingCnh) {
        existingCnh = await Prisma.cnhs.create({
            data: {
                cnh,
                cpf_id: cpfId.id
            }
        });

        const PhoneId = await Prisma.phones.upsert({
            where: {
                phone,
                email
            },
            update: {},
            create: {
                phone,
                email
            },
            select: {
                id: true
            }
        });

        const zipCodeId = await Prisma.zipcodes.upsert({
            where: {
                zipcode
            },
            update: {},
            create: {
                zipcode,
                city,
                district,
                street
            },
            select: {
                id: true
            }
        });

        let addressId = await Prisma.addresses.findFirst({
            where: {
                zipcode_id: zipCodeId.id,
                type_residence,
                number_residence,
                building,
                block,
                livingapartmentroom,
                reference_point
            },
            select: {
                id: true
            }
        });

        if (!addressId) {
            addressId = await Prisma.addresses.create({
                data: {
                    zipcode_id: zipCodeId.id,
                    type_residence,
                    number_residence,
                    building,
                    block,
                    livingapartmentroom,
                    reference_point
                },
                select: {
                    id: true
                }
            });
        };

        await Prisma.drivers.create({
            data: {
                cnh_id: existingCnh.id,
                phone_id: PhoneId.id,
                address_id: addressId.id,
                user_id
            }
        });
        return {
            message: 'Motorista Cadastrado com Sucesso!'
        };
    } else {
        return {
            info: 'CNH já Cadastrada!'
        };
    };
};