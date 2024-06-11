export const initialState = {
    loading: false,
    drawer: false,

    snackbar: "",
    severity: "success",

    role: null
};

export const actionTypes = {
    SET_DRAWER: "SET_DRAWER",
    SET_LOADING: "SET_LOADING",
    SET_ROLE: "SET_ROLE",
};

const reducer = (state, action) => {

    switch (action.type){
        case actionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.loading,
            };
        case actionTypes.SET_DRAWER:
            return {
                ...state,
                drawer: action.drawer,
            };
        case actionTypes.SET_ROLE:
            return {
                ...state,
                role: action.role
            };
        default:
            return state;

    }

};

export default reducer;