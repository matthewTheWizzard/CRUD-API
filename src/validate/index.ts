export const isString = (value: any): value is string => {
    return typeof value === 'string';
}

export const isArrayOfStrings = (value: any): value is string[] => {
    return Array.isArray(value) && value.every(isString);
}

export const isNumber = (value: any): value is number => {
    return typeof value === 'number';
}

export const isRequired = (value: any): boolean => {
    return value !== undefined && value !== null;
}