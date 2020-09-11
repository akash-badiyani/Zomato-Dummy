import searchService from "../../api/searchService";
import { searchConstants } from "../constants";

export const searchAction = {
  getRestaurants
};
// Get Restaurants List
function getRestaurants(query) {
  return dispatch => {
    dispatch(request(searchConstants.GET_RESTAURANT_REQUEST));
    return searchService
      .getRestaurants(query)
      .then(res => {
        dispatch(success(searchConstants.GET_RESTAURANT_SUCCESS, res));
      })
      .catch(error => {
        dispatch(failure(searchConstants.GET_RESTAURANT_FAILURE, error));
      });
  };
}

function request(action, data) {
  return { type: action, data };
}

function success(action, data) {
  return { type: action, data };
}

function failure(action, error) {
  return { type: action, error };
}
