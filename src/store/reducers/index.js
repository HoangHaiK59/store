import { Constants } from '../constants';
const initialState = {
    error: null,
    isLanding: true,
    isAuth: false,
    user: null
};
export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.CHANGE_VIEW:
            return { ...state, isLanding: action.isLanding };
        case Constants.AUTH:
            return { ...state, isAuth: action.isAuth };
        default:
            return state
    }
}
