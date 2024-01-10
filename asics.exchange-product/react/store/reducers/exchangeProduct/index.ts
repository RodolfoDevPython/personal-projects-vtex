import { actions } from "../types";

const INITAL_STATE = {
    step: 1,
    user: null,
    exchangeProduct: null
}

export default function reducer(state = INITAL_STATE, action: actions) {

    console.log("Exchange Product Reducer")
    console.log({
        action,
        type: action.type
    })

    switch (action.type) {

        case 'UPDATED_STEP':

            const { value } = action.payload;

            return { ...state, ...value };

        default:

            return state;
    }

}