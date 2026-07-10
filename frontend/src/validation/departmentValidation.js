import * as yup from "yup";

const departmentValidation = yup.object({

    department_name: yup.string().required("* Department name should not be blank!").max(100, "* Maximum 100 characters allowed."),
    department_code: yup.string().required("* Department code should not be blank!").max(20, "* Maximum 20 characters allowed."),
    description: yup.string().nullable(),
    status: yup.string().required("* Status is required."),

});

export default departmentValidation;