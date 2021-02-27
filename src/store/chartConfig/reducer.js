import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  area: 'World',
  startYear: null,
  endYear: null,
};

const chartConfigReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_CHOSEN_AREA:
      return {
        ...state,
        area: action.payload,
      };

    case actionTypes.SET_CHOSEN_YEAR_RANGE:
      return {
        ...state,
        startYear: action.payload[0],
        endYear: action.payload[1],
      };

    default:
      return state;
  }
};

export default chartConfigReducer;
