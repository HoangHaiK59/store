import { Constants } from '../constants';
const initialState = {
    isSuccess: false,
    products: [],
    error: null
};
export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.ADD_PRODUCT_REQ:
            return { ...state, isSuccess: false };
        case Constants.ADD_PRODUCT_SUCCESS:
            return { ...state, isSuccess: true };
        case Constants.ADD_PRODUCT_FAIL:
            return { ...state, error: action.error };
        case Constants.GET_PRODUCT_REQ:
            return { ...state, isSuccess: false };
        case Constants.GET_PRODUCT_SUCCESS:
            return { ...state, isSuccess: true, products: action.products };
        case Constants.GET_PRODUCT_FAIL:
            return { ...state, error: action.error };
        default:
            return state
    }
}
