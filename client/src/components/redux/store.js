import Cookies from "js-cookie";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { listCustomersReducer, registerReducer, signinReducer, userDetailsReducer } from "./reducers/userReducers";
import thunk from "redux-thunk";
import { adDeleteReducer, adDetailsReducer, adsListReducer, createAdReducer } from "./reducers/adReducers";

const data = Cookies.get("userInfo");
const userInfo = data ? JSON.parse(data) : null;

const initialState = {
  userSignin: { userInfo },
  userRegister: { userInfo },
};

const reducer = combineReducers({
  userSignin: signinReducer,
  userRegister: registerReducer,
  adCreate: createAdReducer,
  adsList: adsListReducer,
  adDetails:adDetailsReducer,
  userDetails:userDetailsReducer,
  adDelete:adDeleteReducer,
  customersList:listCustomersReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
