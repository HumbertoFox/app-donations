export type FormStateUp =
    | {
        errors?: {
            cpf?: string[];
            name?: string[];
            email?: string[];
            phone?: string[];
            password?: string[];
        }
        message?: string;
    } | undefined;


export type FormStateIn =
    | {
        errors?: {
            email?: string[];
            password?: string[];
        }
        message?: string;
    } | undefined;

export type FormErrors = {
    [key: string]: string;
};