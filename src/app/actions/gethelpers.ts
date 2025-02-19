'use server';

import Prisma from '@/app/models/prismadb';

export async function getHelpers() {
    const data = await Prisma.helpers.findMany({
        include: {
            cpfs: true
        }
    });

    return {
        data
    };
};