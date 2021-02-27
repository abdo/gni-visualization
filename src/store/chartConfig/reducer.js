import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  area: 'World',
};

const chartConfigReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_CHOSEN_AREA:
      return {
        ...state,
        area: action.payload,
      };
    default:
      return state;
  }
};

export default chartConfigReducer;
