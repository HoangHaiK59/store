import { Constants } from "../constants";
import firebase from '../../firebase';

const getProductsReq = () => ({type: Constants.GET_PRODUCT_REQ});

const getProductsSuccess = (products) => ({type: Constants.GET_PRODUCT_SUCCESS, products});

const getProductsFail = (error) => ({type: Constants.GET_PRODUCT_FAIL, error});

const getProducts = () => {
    return dispatch => {
        dispatch(getProductsReq());

        firebase.firestore().collection('products').get().then(
            result => {
                if(result.docs.length > 0) {
                    let products= [];
                    result.forEach(doc => products.push(doc.data()))
                    dispatch(getProductsSuccess(products))
                }else {
                    dispatch(getProductsFail(result.empty))
                }
            }
        ).catch(error => dispatch(getProductsFail(error)))
    }

}

export const storeActions = {
    getProducts
}