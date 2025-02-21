'use server';

import { vehicleUpFormSchema } from '@/app/models/definitions';
import { FormStateVehicleUp } from '@/types/types';
import { cookies } from 'next/headers';
import { openSessionToken } from '@/app/models/opentoken';
import Prisma from '@/app/models/prismadb';

export async function vehicleUpdate(state: FormStateVehicleUp, formData: FormData) {
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
    
    const validatedFields = vehicleUpFormSchema.safeParse({
        model: formData.get('model') as string,
        automaker: formData.get('automaker') as string,
        renavam: formData.get('renavam') as string,
        plate: formData.get('plate') as string,
        km: formData.get('km') as string
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        };
    };

    const {
        model,
        automaker,
        renavam,
        plate,
    } = validatedFields.data;

    const modelUpcase = model.toUpperCase();
    const automakerUpcase = automaker.toUpperCase();
    const plateUpcase = plate.toUpperCase();

    const vehicleId = await Prisma.vehicles.findUnique({
        where: {
            renavam
        }
    });

    if (vehicleId?.renavam === renavam) {
        await Prisma.vehicles.update({
            where: {
                renavam
            },
            data: {
                model: modelUpcase,
                automaker: automakerUpcase,
                plate: plateUpcase,
                user_id
            }
        });

        return {
            message: 'Veículo Editado com Sucesso.'
        };
    };

    return {
        info: 'Dados Não Coincidem!'
    };
};