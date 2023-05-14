
export const Constants = {
    SESSION_VALID_MIN : 1000 * 60 * 0.5,
    USER_INFO_KEY : 'user-info',
    GROUPS_KEY : 'groups',
    JWT_TOKEN_KEY : 'jwtToken',
    LAST_ACCESSED_AT_KEY : 'last-accessed-at'
}

export const isValidSession = function(localStorage) {
    const lastAccessedAt = localStorage.getItem(Constants.LAST_ACCESSED_AT_KEY);
    const userInfo = localStorage.getItem(Constants.USER_INFO_KEY);
    if (lastAccessedAt && userInfo) {
        return (new Date().getTime - lastAccessedAt) > Constants.SESSION_VALID_MIN;
    }
    localStorage.removeItem(Constants.LAST_ACCESSED_AT_KEY);
    localStorage.removeItem(Constants.USER_INFO_KEY);
    localStorage.removeItem(Constants.JWT_TOKEN_KEY);
    return false;
};

