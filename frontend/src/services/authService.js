import authAPI from "../api/authAPI";

const authService = {
    login: async (credentials) => {
        const response = await authAPI.post(
            '/auth/login',
            credentials
        );

        localStorage.setItem(
            "token",
            response.data.access_token
        );

        const profileResponse = await authAPI.get(
            '/auth/profile',
            {
                headers: {
                    Authorization:
                        `Bearer ${response.data.access_token}`
                }
            }
        );

        return profileResponse.data
    },

    register: async (userData) => {
        const response = await authAPI.post(
            '/auth/register',
            userData
        );

        return response.data
    }
};

export default authService;