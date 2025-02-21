'use server';

import Prisma from '@/app/models/prismadb';
import {
    Helper,
    HelperResponse
} from '@/types/types';

export async function getHelperId(id: bigint | 0): Promise<HelperResponse> {
    try {
        const helper = await Prisma.helpers.findUnique({
            where: {
                id
            },
            select: {
                cpfs: {
                    select: {
                        name: true,
                        cpf: true,
                        birthdate: true
                    }
                },
                phones: {
                    select: {
                        phone: true,
                        email: true
                    }
                },
                addresses: {
                    select: {
                        number_residence: true,
                        type_residence: true,
                        building: true,
                        block: true,
                        livingapartmentroom: true,
                        reference_point: true,
                        zipcodes: {
                            select: {
                                zipcode: true,
                                street: true,
                                district: true,
                                city: true
                            }
                        }
                    }
                }
            }
        });

        if (!helper) {
            return {
                info: 'Ajudante não encontrado!'
            };
        };

        const data: Helper = {
            ...helper,
            cpfs: {
                ...helper.cpfs,
                birthdate: helper.cpfs?.birthdate ? helper.cpfs.birthdate.toISOString().split('T')[0] : ''
            }
        };

        return {
            data
        };

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
            error: 'Error Com o Banco de Dados!' + errorMessage
        };
    };
};