export const validateName = (value) => {
    if (!value.trim()) return "Name is required.";

    if (!/^[A-Za-z\s]+$/.test(value))
        return "Only alphabets and spaces are allowed.";

    if (value.trim().length < 3)
        return "Name must be at least 3 characters.";

    return "";
};

export const validatePhone = (value) => {
    if (!value.trim()) return "Phone number is required.";

    if (!/^[6-9]\d{9}$/.test(value))
        return "Enter a valid 10-digit phone number.";

    return "";
};

export const validateUsername = (value) => {
    if (!value.trim()) {
        return "username is required";
    }

    if (value.length < 6) {
        return "username should be atleast 6 characters"
    }

    const regex = /^[a-zA-Z][a-zA-Z0-9_]{2,14}$/;

    if (!regex.test(value)) return "username should start with a letter and can be alphanumeric"
}

export const validateEmail = (value) => {
    if (!value.trim()) return "Email is required.";

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(value))
        return "Enter a valid email.";

    return "";
};

export const validatePassword = (value) => {
    if (!value)
        return "Password is required.";

    if (value.length < 8)
        return "Password must be at least 8 characters.";

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,32}$/;
    if (!regex.test(value)) {
        return "Password should contain one uppercase, lowercase, number, special characters and of 8 characters"
    }

    return "";
};

export const validateTextField = (value) => {
    const regex = /^[a-zA-Z0-9\s.,!?'"+()-]*$/;

    if (!regex.test(value)) {
        return "Invalid Characters"
    }
    return "";
}

export const validateLinkedIn = (value) => {
    if (!value.trim()) return "";
    const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/i;

    return regex.test(value)
        ? ""
        : "Enter a valid LinkedIn profile URL.";
};

export const validateGithub = (value) => {
    if (!value.trim()) return "";
    const regex = /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/i;

    return regex.test(value)
        ? ""
        : "Enter a valid GitHub profile URL.";
};

export const validateTwitter = (value) => {
    if (!value.trim()) return "";
    const regex = /^(https?:\/\/)?(www\.)?twitter\.com\/.*$/i;

    return regex.test(value)
        ? ""
        : "Enter a valid Twitter Profile URL";
}

export const validateTitle = (value, fieldName = "Title") => {

    if (!value.trim())
        return `${fieldName} is required.`;

    if (value.trim().length < 2)
        return `${fieldName} must be at least 2 characters.`;

    if (value.trim().length > 100)
        return `${fieldName} cannot exceed 100 characters.`;

    const regex = /^[A-Za-z0-9\s.,:()&+'?#./-]+$/;

    if (!regex.test(value))
        return `${fieldName} contains invalid characters.`;

    return "";
};

export const validateDescription = (value) => {
    if (!value.trim()) return "Course description is required.";

    if (value.trim().length < 10)
        return "Course title must be at least 10 characters.";

    if (value.trim().length > 500)
        return "Course title cannot exceed 500 characters.";

    return "";
}

export const validateCategory = (value) => {
    if (!value.trim()) return "Course category is required.";

    if (value.trim().length < 5)
        return "Course category must be at least 5 characters.";

    if (value.trim().length > 100)
        return "Course title cannot exceed 100 characters.";

    return "";
}

export const validatePrice = (value) => {
    if (!value.trim()) return "Course price is required.";
    return "";
}