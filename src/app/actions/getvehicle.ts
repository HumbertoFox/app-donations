'use server';

import Prisma from '@/app/models/prismadb';
import {
    Vehicle,
    VehicleResponse
} from '@/types/types';

export async function getVehicleId(id: bigint | 0): Promise<VehicleResponse> {
    try {
        const vehicle = await Prisma.vehicles.findUnique({
            where: {
                id
            },
            select: {
                renavam: true,
                plate: true,
                km: true,
                model: true,
                automaker: true
            }
        });

        if (!vehicle) {
            return {
                info: 'Veículo não encontrado!'
            };
        };

        const data: Vehicle = vehicle;

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