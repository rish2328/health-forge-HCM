import * as yup from "yup";

const loginValidation = yup.object({

    email: yup
        .string()
        .required("* Email should not be blank!")
        .email("* Email should be in valid format!"),

    password: yup
        .string()
        .required("* Password should not be blank!")
        .min(6, "* Password must be at least 6 characters"),

    remember: yup.boolean()

});

export default loginValidation;