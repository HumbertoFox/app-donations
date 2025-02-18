export function formatDate(date: string | Date | null): string {
    if (date === null) {
        throw new Error('Invalid date: null value');
    };

    const createdAt = new Date(date);

    if (isNaN(createdAt.getTime())) {
        throw new Error('Invalid date');
    };

    const day = String(createdAt.getDate()).padStart(2, '0');
    const month = String(createdAt.getMonth() + 1).padStart(2, '0');
    const year = createdAt.getFullYear();

    return `${day}/${month}/${year}`;
};

export function formatDateToLocal(date: string | Date | null): string {
    if (date === null) {
        throw new Error('Invalid date: null value');
    };

    const createdAt = new Date(date);

    if (isNaN(createdAt.getTime())) {
        throw new Error('Invalid date');
    };

    createdAt.setHours(createdAt.getHours() + createdAt.getTimezoneOffset() / 60);

    const day = String(createdAt.getDate()).padStart(2, '0');
    const month = String(createdAt.getMonth() + 1).padStart(2, '0');
    const year = createdAt.getFullYear();

    return `${day}/${month}/${year}`;
};