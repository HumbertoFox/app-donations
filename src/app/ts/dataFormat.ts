export function formatDate(date) {
    const createdAt = new Date(date);

    if (isNaN(createdAt)) {
        throw new Error('Invalid date');
    };

    const day = String(createdAt.getDate()).padStart(2, '0');
    const month = String(createdAt.getMonth() + 1).padStart(2, '0');
    const year = createdAt.getFullYear();

    return `${day}/${month}/${year}`;
};

export function formatDateToLocal(date) {
    const createdAt = new Date(date);

    if (isNaN(createdAt)) {
        throw new Error('Invalid date');
    };

    createdAt.setHours(createdAt.getHours() + createdAt.getTimezoneOffset() / 60);

    const day = String(createdAt.getDate()).padStart(2, '0');
    const month = String(createdAt.getMonth() + 1).padStart(2, '0');
    const year = createdAt.getFullYear();

    return `${day}/${month}/${year}`;
};