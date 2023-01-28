import { MOVIES_REDUCER } from "./reducers";

const movieList = (state = [], action: any) => action.type === MOVIES_REDUCER ? action.payload : state;

export default movieList;