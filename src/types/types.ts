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

export type Vehicle = {
    renavam?: string;
    plate?: string;
    km?: string;
    model?: string;
    automaker?: string;
};

export type VehicleResponse = {
    data?: Vehicle;
    info?: string;
    error?: string;
};

export type VehicleFormComponentProps = {
    vehicle: Vehicle | null;
    valueButton: string;
};

export type Driver = {
    cnhs?: {
        cnh?: string;
        cpfs?: {
            name?: string;
            cpf?: string;
            birthdate?: string;
        };
    };
    phones?: {
        phone?: string;
        email?: string | null;
    };
    addresses?: {
        number_residence?: string;
        type_residence?: string;
        building?: string | null;
        block?: string | null;
        livingapartmentroom?: string | null;
        reference_point?: string;
        zipcodes?: {
            zipcode?: string;
            street?: string;
            district?: string;
            city?: string;
        };
    };
};

export type DriverResponse = {
    data?: Driver;
    info?: string;
    error?: string;
};

export type DriverFormComponentProps = {
    driver: Driver | null;
    valueButton: string;
};

export type Helper = {
    cpfs?: {
        name?: string;
        cpf?: string;
        birthdate?: string;
    };
    phones?: {
        phone?: string;
        email?: string | null;
    };
    addresses?: {
        number_residence?: string;
        type_residence?: string;
        building?: string | null;
        block?: string | null;
        livingapartmentroom?: string | null;
        reference_point?: string;
        zipcodes?: {
            zipcode?: string;
            street?: string;
            district?: string;
            city?: string;
        };
    };
};

export type HelperResponse = {
    data?: Helper;
    info?: string;
    error?: string;
};

export type HelperFormComponentProps = {
    helper: Helper | null;
    valueButton: string;
};

export type Donor = {
    id?: string;
    name?: string;
    phones?: {
        phone?: string;
        contact: string | null;
        contact_other: string | null;
    };
    addresses?: {
        zipcodes?: {
            zipcode?: string;
            street?: string;
            district?: string;
            city?: string;
        };
        number_residence?: string;
        type_residence?: string;
        building?: string | null;
        block?: string | null;
        livingapartmentroom?: string | null;
        reference_point?: string;
    };
    cnpjs?: {
        cnpj?: string;
        corporatename?: string;
    } | null;
};

export type DonorResponse = {
    data?: Donor;
    info?: string;
    error?: string;
};

export type DonorFormComponentProps = {
    donor: Donor | null;
    valueButton: string;
};