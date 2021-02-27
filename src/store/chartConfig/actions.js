import * as actionTypes from './actionTypes';

export const setChosenArea = ({ area }) => {
  return {
    type: actionTypes.SET_CHOSEN_AREA,
    payload: area,
  };
};

export const setChosenYearRange = ({ range }) => {
  return {
    type: actionTypes.SET_CHOSEN_YEAR_RANGE,
    payload: range,
  };
};
