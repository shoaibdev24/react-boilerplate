export const userActions = {
    logout: (state) => {
        state.user = {};
        state.auth = {};
        state.loading = false;
        state.error = null;
    }
};