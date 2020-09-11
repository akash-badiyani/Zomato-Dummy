import { searchConstants as constant } from "../constants";

const initialState = {
  activeTab: "selectProducts",
  isLoading: false
};

export default function search(state = initialState, action) {
  switch (action.type) {
    // Get Restaurant Request
    case constant.GET_RESTAURANT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case constant.GET_RESTAURANT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        resTaurantListData: action.data.data,
        error: null
      };
    case constant.GET_RESTAURANT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
