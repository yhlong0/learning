import { applyMiddleware, createStore } from "redux";
//import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import sagas from "./sagas";

// Redux store initial state (Note: Redux reducers might have their own default state defined)
//const initialState = {};

// compose redux store enhancers: middleware, dev tools, etc
//const rootEnhancer = applyMiddleware(thunk);

const sagaMiddleware = createSagaMiddleware();
const rootEnhancer = applyMiddleware(sagaMiddleware);

// initialize Redux Store
const initializeStore = createStore(rootReducer, rootEnhancer);
sagaMiddleware.run(sagas);

const getStore = function() {
	return initializeStore;
};

export default getStore;
