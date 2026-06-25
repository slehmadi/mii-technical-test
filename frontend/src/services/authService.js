const authService = {
    login: async (credentials) => {
        console.log(
            "Login:",
            credentials
        );

        return Promise.resolve({
            id: 1,
            username: credentials.username
        });
    },

    register: async (userData) => {
        console.log(
            "Register:",
            userData
        );

        return Promise.resolve({
            success: true
        });
    }
};

export default authService;