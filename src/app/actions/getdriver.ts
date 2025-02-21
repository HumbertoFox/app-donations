'use server';

import Prisma from '@/app/models/prismadb';
import {
    Driver,
    DriverResponse
} from '@/types/types';

export async function getDriverId(id: bigint | 0): Promise<DriverResponse> {
    try {
        const driver = await Prisma.drivers.findUnique({
            where: {
                id
            },
            select: {
                cnhs: {
                    select: {
                        cnh: true,
                        cpfs: {
                            select: {
                                name: true,
                                cpf: true,
                                birthdate: true
                            }
                        }
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

        if (!driver) {
            return {
                info: 'Motorista não encontrado!'
            };
        };

        const data: Driver = {
            ...driver,
            cnhs: {
                ...driver.cnhs,
                cpfs: {
                    ...driver.cnhs?.cpfs,
                    birthdate: driver.cnhs?.cpfs?.birthdate ? driver.cnhs.cpfs.birthdate.toISOString().split('T')[0] : ''
                }
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