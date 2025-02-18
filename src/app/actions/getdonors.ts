'use server';

import Prisma from '@/app/models/prismadb';

export async function getDonors() {
    const data = await Prisma.donors.findMany({
        include: {
            phones: true,
            addresses: {
                include: {
                    zipcodes: true
                }
            }
        }
    });

    return {
        data
    };
};