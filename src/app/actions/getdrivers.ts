'use server';

import Prisma from '@/app/models/prismadb';

export async function getDrivers() {
    const data = await Prisma.drivers.findMany({
        include: {
            cnhs: {
                include: {
                    cpfs: true
                }
            }
        }
    });

    return {
        data
    };
};