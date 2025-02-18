export function daysSince(date: string | Date | null): number {
    if (date === null) {
        throw new Error('Invalid date: null value');
    };

    const createdAt = new Date(date);
    const now = new Date();
    
    const timeDifference = now.getTime() - createdAt.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    
    return daysDifference;
};