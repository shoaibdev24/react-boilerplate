export const assignExpLevel = (exp) => {

    if (exp === 0) {
        return 'Intern';
    } else if (exp === 1) {
        return 'Entry';
    } else if (exp <= 3) {
        return 'Mid';
    } else if (exp <= 6) {
        return 'Senior';
    } else if (exp <= 9) {
        return 'Managerial';
    } else
        return 'Director';
}


export const isValidUrl = (url) => {
    try {
        return Boolean(new URL(url));
    } catch (e) {
        return false;
    }
};