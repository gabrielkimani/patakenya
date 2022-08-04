import axios from "../../utils/axios.js";

const {
  CREATE_AD_REQUEST,
  CREATE_AD_SUCCESS,
  CREATE_AD_FAIL,
  ADS_LIST_REQUEST,
  ADS_LIST_SUCCESS,
  ADS_LIST_FAIL,
  AD_DETAILS_REQUEST,
  AD_DETAILS_SUCCESS,
  AD_DETAILS_FAIL,
  VIEW_CONTACT_REQUEST,
  VIEW_CONTACT_SUCCESS,
  VIEW_CONTACT_FAIL,
  VIEW_WHATSAPP_REQUEST,
  VIEW_WHATSAPP_SUCCESS,
  VIEW_WHATSAPP_FAIL,
  AD_DELETE_REQUEST,
  AD_DELETE_SUCCESS,
  AD_DELETE_FAIL,
} = require("../constants/adConstants");

const createAd = (ad) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_AD_REQUEST, payload: ad });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.post("/api/ads/new-ad", ad, {
      headers: {
        Authorization: " Bearer " + userInfo.token,
      },
    });
    dispatch({ type: CREATE_AD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_AD_FAIL, payload: error.message });
  }
};

const listAds =
  ({
    adName = "",
    category = "",
    order = "",
    min = 0,
    max = 0,
    rating = 0,
    location = "",
    condition = "",
  }) =>
  async (dispatch) => {
    dispatch({
      type: ADS_LIST_REQUEST,
    });
    try {
      const { data } = await axios.get(
        `/api/ads/all-ads?adName=${adName}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}&location=${location}&condition=${condition}`
      );
      dispatch({ type: ADS_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADS_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//get a single ad
const detailsAd = (id) => async (dispatch) => {
  dispatch({ type: AD_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(`/api/ads/ad/${id}`);
    dispatch({ type: AD_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: AD_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const viewContact = (adId) => async (dispatch, getState) => {
  try {
    dispatch({ type: VIEW_CONTACT_REQUEST, payload: adId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.post(`/api/ads/view-contact/${adId}`, adId, {
      headers: { Authorization: "Bearer " + userInfo.token },
    });
    dispatch({ type: VIEW_CONTACT_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({ type: VIEW_CONTACT_FAIL, payload: message });
  }
};

//whatsapp view
const viewWhatsApp = (adId) => async (dispatch, getState) => {
  try {
    dispatch({ type: VIEW_WHATSAPP_REQUEST, payload: adId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.post(`/api/ads/view-whatsapp/${adId}`, adId, {
      headers: { Authorization: "Bearer " + userInfo.token },
    });
    dispatch({ type: VIEW_WHATSAPP_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({ type: VIEW_WHATSAPP_FAIL, payload: message });
  }
};

//delete ad
const deleteAd = id => async (dispatch, getState) => {
	try {
		const {
			userSignin: { userInfo },
		} = getState();
		dispatch({ type: AD_DELETE_REQUEST, payload: id });
		const { data } = await axios.delete('/api/ads/' + id, {
			headers: {
				Authorization: 'Bearer ' + userInfo.token,
			},
		});
		dispatch({
			type: AD_DELETE_SUCCESS,
			payload: data,
			success: true,
			loading: false,
		});
	} catch (error) {
		dispatch({
			type: AD_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export { createAd, listAds, detailsAd, viewContact,viewWhatsApp,deleteAd };
