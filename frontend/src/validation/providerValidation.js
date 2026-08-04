import * as yup from "yup";

const providerValidation = yup.object({
    title: yup.string().required("* Title should not be blank!"),
    first_name: yup.string().trim().required("* First name should not be blank!").max(100, "* First name cannot exceed 100 characters!"),
    middle_name: yup.string().trim().nullable(),
    last_name: yup.string().trim().required("* Last name should not be blank!").max(100, "* Last name cannot exceed 100 characters!"),
    gender: yup.string().required("* Gender should not be blank!"),
    dob: yup.date().nullable().typeError("* Date should be valid format!"),
    email: yup.string().trim().email("* Email should be in valid format!").required("* Email should not be blank!").max(150, "* Email cannot exceed 150 characters!"),
    phone: yup.string().trim().required("* Phone number should not be blank!").matches(/^\+?[0-9\s()-]{7,20}$/, "* Phone number should be in valid format!"),
    department_uuid: yup.string().required("* Department should not be blank!"),
    role_name: yup.string().required("* Role should not be blank!"),
    designation: yup.string().trim().required("* Designation should not be blank!").max(150, "* Designation cannot exceed 150 characters!"),
    employment_type: yup.string().required("* Employment type should not be blank!"),
    consultation_fee: yup.number().typeError("* Consultation fee must be a number!").min(0, "* Consultation fee cannot be negative!").required("* Consultation fee should not be blank!"),
    followup_fee: yup.number().typeError("* Follow-up fee must be a number!").min(0, "* Follow-up fee cannot be negative!").required("* Follow-up fee should not be blank!"),
    emergency_fee: yup.number().typeError("* Emergency fee must be a number!").min(0, "* Emergency fee cannot be negative!").required("* Emergency fee should not be blank!"),
    license_number: yup.string().trim().required("* License number should not be blank!").max(100, "* License number cannot exceed 100 characters!"),
    registration_number: yup.string().trim().required("* Registration number should not be blank!").max(100, "* Registration number cannot exceed 100 characters!"),
    remarks: yup.string().trim().max(1000, "* Remarks cannot exceed 1000 characters!").nullable().notRequired(),
});

export default providerValidation;