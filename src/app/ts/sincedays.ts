export function daysSince(date) {
    const createdAt = new Date(date);
    const now = new Date();
    
    const timeDifference = now - createdAt;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    
    return daysDifference;
};