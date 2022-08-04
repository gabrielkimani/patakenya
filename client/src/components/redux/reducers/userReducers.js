import {
	UPDATE_PROFILE_FAIL,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
    USER_SIGNIN_SUCCESS,
	USER_SIGNIN_REQUEST,
	USER_SIGNIN_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_SIGNOUT,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	UPDATE_PROFILE_RESET,
	SIGNIN_RESET,
	LIST_CUSTOMERS_REQUEST,
	LIST_CUSTOMERS_SUCCESS,
	LIST_CUSTOMERS_FAIL,
} from '../constants/userConstants.js';



function signinReducer(state = {}, action) {
	switch (action.type) {
		case USER_SIGNIN_REQUEST:
			return { loading: true };
		case USER_SIGNIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_SIGNIN_FAIL:
			return { loading: false, error: action.payload };
		case USER_SIGNOUT:
			return {};
		case SIGNIN_RESET:
			return {};
		default:
			return state;
	}
}

function registerReducer(state = {}, action) {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

function userDetailsReducer(state = { }, action) {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return { loadingUser: true };
		case USER_DETAILS_SUCCESS:
			return { loadingUser: false, user: action.payload };
		case USER_REGISTER_FAIL:
			return { loadingUser: false, errorUser: action.payload };
		default:
			return state;
	}
}

const updateProfileReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_PROFILE_REQUEST:
			return { loading: true };
		case UPDATE_PROFILE_SUCCESS:
			return { loading: false, success: true };
		case UPDATE_PROFILE_FAIL:
			return { loading: false, error: action.payload };
		case UPDATE_PROFILE_RESET:
			return {};
		default:
			return state;
	}
};

function listCustomersReducer(state = { customers: [] ,loading:true	}, action) {
	switch (action.type) {
		case LIST_CUSTOMERS_REQUEST:
			return { loading: true,customers: [] };
		case LIST_CUSTOMERS_SUCCESS:
			return { loading: false,customers: action.payload };
		case LIST_CUSTOMERS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

export {
	signinReducer,
	registerReducer,
	userDetailsReducer,
	updateProfileReducer,
	listCustomersReducer
};
