import { STATE_REDUCER } from "./reducers";

const state = (state = false, action: any) => action.type === STATE_REDUCER ? !state : state;

export default state