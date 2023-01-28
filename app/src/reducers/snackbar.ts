import { SNACKBAR_REDUCER } from "./reducers";

const showBanner = (state = false, action: any) => action.type === SNACKBAR_REDUCER ? action.payload : state;

export default showBanner;