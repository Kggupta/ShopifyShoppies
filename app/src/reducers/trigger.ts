import { TRIGGER_REDUCER } from "./reducers";

const trigger = (state = false, action: any) => action.type === TRIGGER_REDUCER ? !state : state;

export default trigger;