import movie from "../types/movies";
import { MOVIES_REDUCER, NOMINATE_REDUCER, SNACKBAR_REDUCER, STATE_REDUCER, TRIGGER_REDUCER } from "../reducers/reducers";


export const setMovies = (payload: movie[]) => ({
  type: MOVIES_REDUCER,
  payload: payload,
});

export const setTrigger = () => ({
  type: TRIGGER_REDUCER,
});

export const setNomination = (payload: movie[]) => ({
  type: NOMINATE_REDUCER,
  payload: payload
});

export const setStateValue = () => ({
  type: STATE_REDUCER,
});

export const setSnackbar = (payload: boolean) => ({
  type: SNACKBAR_REDUCER,
  payload: payload
});
