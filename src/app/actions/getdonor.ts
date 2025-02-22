'use server';

import Prisma from '@/app/models/prismadb';
import {
    Donor,
    DonorResponse
} from '@/types/types';

export async function getDonorId(id: bigint | 0): Promise<DonorResponse> {
    const donor = await Prisma.donors.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            phones: {
                select: {
                    phone: true,
                    contact: true,
                    contact_other: true
                }
            },
            addresses: {
                select: {
                    zipcodes: {
                        select: {
                            zipcode: true,
                            city: true,
                            district: true,
                            street: true
                        }
                    },
                    type_residence: true,
                    number_residence: true,
                    building: true,
                    block: true,
                    livingapartmentroom: true,
                    reference_point: true
                }
            },
            cnpjs: {
                select: {
                    cnpj: true,
                    corporatename: true
                }
            }
        }
    });

    if (!donor) {
        return {
            info: 'Doador não encontrado!'
        };
    };

    const data: Donor = {
        ...donor,
        id: donor.id.toString(),
    };

    return {
        data
    };
};