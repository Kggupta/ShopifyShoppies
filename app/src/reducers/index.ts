import { combineReducers, compose, createStore } from "redux";
import state from "./state";
import movies from './movies';
import nomination from "./nomination";
import snackbar from "./snackbar";
import trigger from "./trigger";


const rootReducer = combineReducers({
    movieList: movies,
    trigger: trigger,
    Nomination: nomination,
    changeState: state,
    showBanner: snackbar
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer /* preloadedState, */,
  composeEnhancers()
);

export default store;

export type RootState = ReturnType<typeof rootReducer>
