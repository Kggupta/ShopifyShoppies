import { NOMINATE_REDUCER } from "./reducers";

const Nomination = (state = JSON.parse(window.localStorage.getItem('nominations') as string) || [], action: any) => 
    action.type === NOMINATE_REDUCER ? action.payload : state;

export default Nomination;