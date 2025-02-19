'use server';

import Prisma from '@/app/models/prismadb';

export async function getVehicles() {
    const data = await Prisma.vehicles.findMany();

    return {
        data
    };
};