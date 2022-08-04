import axios from "../../utils/axios.js";
import Cookies from "js-cookie";

const {
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_SIGNOUT,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  LIST_CUSTOMERS_REQUEST,
  LIST_CUSTOMERS_SUCCESS,
  LIST_CUSTOMERS_FAIL,
} = require("../constants/userConstants");

const signIn = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post("/api/v1/auth/login", {
      email,
      password,
    });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookies.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const registerUser =
  (fullname, email, phoneNumber, businessName, locationUser, password) =>
  
  async (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: {
        fullname,
        email,
        phoneNumber,
        businessName,
        locationUser,
        password,
      },
    });
    try {
      const { data } = await axios.post("/api/v1/auth/register", {
        fullname,
        email,
        phoneNumber,
        businessName,
        locationUser,
        password,
      });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      Cookies.set("userInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_REGISTER_FAIL, payload: message });
    }
  };

const userSignout = () => (dispatch) => {
  Cookies.remove("userInfo");
  dispatch({ type: USER_SIGNOUT });
  document.location.reload();
};

const detailsUser = (userId) => async (dispatch, getState) => {
  console.log(userId);
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/v1/auth/user/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};

const updateProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(`/api/v1/auth/update`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookies.set("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: message });
  }
};


const listCustomers = () =>async (dispatch) =>{
  dispatch({type: LIST_CUSTOMERS_REQUEST});

  try {
    const {data} = await axios.get('/api/v1/auth/all-customers');
    dispatch({type:LIST_CUSTOMERS_SUCCESS,payload:data});
  } catch (error) {
    const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  dispatch({ type: LIST_CUSTOMERS_FAIL, payload: message });

  }
}

export { signIn, registerUser, userSignout, detailsUser, updateProfile,listCustomers};
