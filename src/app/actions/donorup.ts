'use server';

import { cookies } from 'next/headers';
import { openSessionToken } from '@/app/models/opentoken';
import { FormStateDonorUp } from '@/types/types';
import { donorUpFormSchema } from '@/app/models/definitions';
import Prisma from '@/app/models/prismadb';

export async function donorUp(state: FormStateDonorUp, formData: FormData) {
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

    const user_id = BigInt(payload.sub);

    const validatedFields = donorUpFormSchema.safeParse({
        name: formData.get('name') as string,
        phone: formData.get('phone') as string,
        contact: formData.get('contact') as string,
        contact_other: formData.get('contact_other') as string,
        zipcode: formData.get('zipcode') as string,
        street: formData.get('street') as string,
        district: formData.get('district') as string,
        city: formData.get('city') as string,
        number_residence: formData.get('number_residence') as string,
        cnpj: formData.get('cnpj') as string,
        corporatename: formData.get('corporatename') as string,
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
        phone,
        contact,
        contact_other,
        zipcode,
        street,
        district,
        city,
        number_residence,
        cnpj,
        corporatename,
        type_residence,
        building,
        block,
        livingapartmentroom,
        reference_point
    } = validatedFields.data;

    const existingPhone = await Prisma.phones.findFirst({
        where: {
            phone
        }
    });

    if (!existingPhone) {
        const phoneId = await Prisma.phones.create({
            data: {
                phone,
                contact,
                contact_other
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

        let cnpjId;
        if (cnpj && corporatename) {
            cnpjId = await Prisma.cnpjs.upsert({
                where: {
                    cnpj,
                    corporatename
                },
                update: {},
                create: {
                    cnpj,
                    corporatename
                },
                select: {
                    id: true
                }
            });
        };

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

        await Prisma.donors.create({
            data: {
                name,
                phone_id: phoneId.id,
                cnpj_id: cnpjId?.id,
                address_id: addressId.id,
                user_id
            }
        });

        return {
            message: 'Doador Cadastrado com Sucesso!'
        };
    } else {
        const existingDonor = await Prisma.donors.findFirst({
            where: {
                phone_id: existingPhone.id
            }
        });

        if (!existingDonor) {
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

            let cnpjId;
            if (cnpj && corporatename) {
                cnpjId = await Prisma.cnpjs.upsert({
                    where: {
                        cnpj
                    },
                    update: {},
                    create: {
                        cnpj,
                        corporatename
                    },
                    select: {
                        id: true
                    }
                });
            };

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

            await Prisma.donors.create({
                data: {
                    name,
                    phone_id: existingPhone.id,
                    cnpj_id: cnpjId?.id,
                    address_id: addressId.id,
                    user_id
                }
            });

            return {
                message: 'Doador Cadastrado com Sucesso!'
            };
        };

        return {
            info: 'Doador já Cadastrado'
        };
    };
};