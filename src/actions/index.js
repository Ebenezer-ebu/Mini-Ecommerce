export const LOADING = "LOADING";
export const CARTEGORY = "CARTEGORY";
export const ERROR = "Error";

export function getProducts(data) {
  return {
    type: CARTEGORY,
    data,
  };
}

export function loadingData(bool) {
  return {
    type: LOADING,
    bool,
  };
}

export function errorData(err) {
    return {
        type: ERROR,
        err
    }
}

export function getInintialProducts() {
    return (dispatch) => {
      
  };
}
