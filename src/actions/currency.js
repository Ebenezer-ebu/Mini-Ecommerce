export const CURRENCY = "CURRENCY";
export const SET_CURRENCY = "SET_CURRENCY";

export function setCurrency(currency) {
    return {
        type: CURRENCY,
        currency
    }
}

export function selectedCurrency(currency) {
    return { 
        type: SET_CURRENCY,
        currency,
    }
}