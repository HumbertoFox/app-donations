export type FormStateSignUp =
    | {
        errors?: {
            name?: string[];
            cpf?: string[];
            birthdate?: string[];
            phone?: string[];
            email?: string[];
            zipcode?: string[];
            street?: string[];
            district?: string[];
            city?: string[];
            number_residence?: string[];
            type_residence?: string[];
            building?: string[];
            block?: string[];
            livingapartmentroom?: string[];
            reference_point?: string[];
            password?: string[];
        }
        message?: string;
    } | undefined;

export type FormStateSignIn =
    | {
        errors?: {
            email?: string[];
            password?: string[];
        }
        message?: string;
    } | undefined;

export type FormStateDriverUp =
    | {
        errors?: {
            name?: string[];
            cpf?: string[];
            cnh?: string[];
            birthdate?: string[];
            phone?: string[];
            email?: string[];
            zipcode?: string[];
            street?: string[];
            district?: string[];
            city?: string[];
            number_residence?: string[];
            type_residence?: string[];
            building?: string[];
            block?: string[];
            livingapartmentroom?: string[];
            reference_point?: string[];
        }
        message?: string;
    } | undefined;

export type FormStateHelperUp =
    | {
        errors?: {
            name?: string[];
            cpf?: string[];
            birthdate?: string[];
            phone?: string[];
            email?: string[];
            zipcode?: string[];
            street?: string[];
            district?: string[];
            city?: string[];
            number_residence?: string[];
            type_residence?: string[];
            building?: string[];
            block?: string[];
            livingapartmentroom?: string[];
            reference_point?: string[];
        }
        message?: string;
    } | undefined;

export type FormStateVehicleUp =
    | {
        errors?: {
            model?: string[];
            automaker?: string[];
            renavam?: string[];
            plate?: string[];
            km?: string[];
        }
        message?: string;
    } | undefined;

export type FormStateDonorUp =
    | {
        errors?: {
            name?: string[];
            phone?: string[];
            contact?: string[];
            contact_other?: string[];
            zipcode?: string[];
            street?: string[];
            district?: string[];
            city?: string[];
            number_residence?: string[];
            cnpj?: string[];
            corporatename?: string[];
            type_residence?: string[];
            building?: string[];
            block?: string[];
            livingapartmentroom?: string[];
            reference_point?: string[];
        }
        message?: string;
    } | undefined;

export type FormErrors = {
    [key: string]: string;
};