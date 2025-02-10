export function daysSince(date: string | Date): number {
    const createdAt = new Date(date);
    const now = new Date();
    
    const timeDifference = now.getTime() - createdAt.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    
    return daysDifference;
};