import { createSelector } from 'reselect';

const getPoints = state => state.points;
const pointsSelector = createSelector(
  getPoints,
  points => Object.values(points),
);


export default pointsSelector;
