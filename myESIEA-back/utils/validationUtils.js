function validateInput(input) {
    if (input === undefined) {
        return false;
    }

    const regex = new RegExp("^[a-zA-ZÀ-ÿ- ]+$");

    if (!regex.test(input)) {
        return false;
    }

    return true;
}

function validateDate(date) {
    if (date === undefined) {
        return false;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || new Date(date) > new Date()) {
        return false;
    }

    return true;
}

function validateClasseName(name) {
    if (name === undefined) {
        return false;
    }

    const nameRegex = new RegExp("^[a-zA-Z0-9- ]+$");

    if (!nameRegex.test(name)) {
        return false;
    }

    return true;
}

function validateGrade(grade) {
    if (grade === undefined) {
        return false;
    }

    if (isNaN(grade) || grade < 0 || grade > 20) {
        return false;
    }

    return true;
}

module.exports = { validateInput, validateDate, validateClasseName, validateGrade };