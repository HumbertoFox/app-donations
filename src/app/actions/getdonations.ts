'use server';

import Prisma from '@/app/models/prismadb';

export async function getDonations() {
    const data = await Prisma.donations.findMany({
        include: {
            donors: {
                include: {
                    phones: true,
                    addresses: {
                        include: {
                            zipcodes: true
                        }
                    }
                }
            }
        }
    });

    return {
        data
    };
};