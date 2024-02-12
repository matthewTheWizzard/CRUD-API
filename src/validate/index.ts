export const isString = (value: unknown): value is string => {
    return typeof value === 'string';
}

export const isArrayOfStrings = (value: unknown): value is string[] => {
    const array = typeof value === 'string' ? JSON.parse(value.replace(/'/g, '"')) : value;
    return Array.isArray(array) && array.every((item) => isString(item));
}

export const isNumber = (value: unknown): value is number => {
    return typeof +Number(value) === 'number' && !Number.isNaN(Number(value));
}

export const isRequired = (value: unknown): boolean => {
    return value !== undefined && value !== null && typeof value === 'string' ? value.trim() !== '' : true;
}