import {
  CREATE_AD_FAIL,
  CREATE_AD_REQUEST,
  CREATE_AD_SUCCESS,
  ADS_LIST_REQUEST,
  ADS_LIST_SUCCESS,
  ADS_LIST_FAIL,
  AD_DETAILS_REQUEST,
  AD_DETAILS_SUCCESS,
  AD_DETAILS_FAIL,
  AD_DELETE_REQUEST,
  AD_DELETE_SUCCESS,
  AD_DELETE_FAIL
} from "../constants/adConstants";

const createAdReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_AD_REQUEST:
      return { loading: true };
    case CREATE_AD_SUCCESS:
      return { loading: false, ad: action.payload, success: true };
    case CREATE_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};



function adsListReducer(state = { ads: [] ,loading:true	}, action) {
	switch (action.type) {
		case ADS_LIST_REQUEST:
			return { loading: true, ads: [] };
		case ADS_LIST_SUCCESS:
			return { loading: false, ads: action.payload };
		case ADS_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

function adDetailsReducer(state = { ad: {} }, action) {
	switch (action.type) {
		case AD_DETAILS_REQUEST:
			return { loading: true, ad: {} };
		case AD_DETAILS_SUCCESS:
			return { loading: false, ad: action.payload };
		case AD_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

function adDeleteReducer(state = { ad: {} }, action) {
	switch (action.type) {
		case AD_DELETE_REQUEST:
			return { loading: true };
		case AD_DELETE_SUCCESS:
			return { loading: false, product: action.payload, success: true };
		case AD_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

export { createAdReducer ,adsListReducer,adDetailsReducer,adDeleteReducer};
