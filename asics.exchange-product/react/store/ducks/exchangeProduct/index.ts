import { actions, UpdateParams } from "./types";

const INITAL_STATE = {
    step: 1,
    user: null,
    exchangeProduct: null,
    items: [],
    selectItemOrder: null,
    creationDate: null,
    orderId: null
}

export default function reducer(state = INITAL_STATE, action: actions) {

    console.log("Exchange Product Reducer")
    console.log(action)

    switch (action.type) {

        case 'UPDATED_STEP':

            const { value } = action.payload;

            return { ...state, ...value };

        default:

            return state;
    }

}

export const Creators = {
    update: (value: UpdateParams) => ({
        type: 'UPDATED_STEP',
        payload: {
            value,
        },
    }),
}