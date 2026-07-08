import * as yup from "yup";

export const patientSchema = yup.object().shape({

    // Patient Information
    first_name: yup.string().trim().required("* First name should not be blank!"),
    middle_name: yup.string().nullable(),
    last_name: yup.string().trim().required("* Last name should not be blank!"),
    gender: yup.string().required("* Gender should not be blank!"),
    dob: yup.string().required("* Date of birth should not be blank!"),
    blood_group: yup.string().required("* Blood group should not be blank!"),
    marital_status: yup.string().required("* Marital status should not be blank!"),
    email: yup.string().email("* Email should be in valid format!").required("* Email should not be blank!"),
    phone: yup.string().required("* Phone number should not be blank!")
        .test(
            "phone-validation", "* Enter a valid phone number!", (value) => {
                if (!value) return false;
                const digits = value.replace(/[^\d+]/g, "");
                return /^\+?[1-9]\d{6,14}$/.test(digits);
            }
        ),

    // Contact Information
    // contact: yup.object({
    //     name: yup.string().required("* Contact name should not be blank!"),
    //     relation: yup.string().required("* Relation should not be blank!"),
    //     phone: yup.string().required("* Phone number should not be blank!")
    //         .test(
    //             "phone-validation", "* Enter a valid phone number!", (value) => {
    //                 if (!value) return false;
    //                 const digits = value.replace(/[^\d+]/g, "");
    //                 return /^\+?[1-9]\d{6,14}$/.test(digits);
    //             }
    //         ),
    //     email: yup.string().email("* Contact Email should be in valid format!"),
    //     is_emergency_contact: yup.boolean(),
    // }),

    // // Address Information
    // address: yup.object({
    //     address_line_1: yup.string().required("* Address Line 1 should not be blank!"),
    //     address_line_2: yup.string().nullable(),
    //     city: yup.string().required("* City should not be blank!"),
    //     state: yup.string().required("* State should not be blank!"),
    //     country: yup.string().required("* Country should not be blank!"),
    //     address_type: yup.string().required("* Address type should not be blank!"),
    //     postal_code: yup.string().trim().required("* Postal code should not be blank!")
    //         .matches(
    //             /^[A-Za-z0-9][A-Za-z0-9\s-]{2,11}$/,
    //             "* Enter a valid postal code!"
    //         ),
    // }),

});