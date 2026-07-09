// FORMAT DATA INTO `DD MM YYYY`
export const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        // month: "long",
        year: "numeric",
    });
};

// CALCULATE AGE BY DATE OF BIRTH
export const calculateAge = (dob) => {
    if (!dob) return "--";

    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if ( month < 0 || (month === 0 && today.getDate() < birthDate.getDate()) ) {
        age--;
    }

    return `${age} Years`;
};