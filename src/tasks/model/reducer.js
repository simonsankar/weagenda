import {ADD_TASK, REMOVE_TASK, UPDATE_TASK} from './commandTypes';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

const tasks = (state = {currentTask: null, getById: {}}, action) => {
  let getById = {};
  switch (action.type) {
    case ADD_TASK:
      //deep copy the getById
      Object.keys(state.getById).map(id => {
        getById = Object.assign({}, getById, {
          [id]: state.getById[id],
        });
      });
      //add the new task
      const generatedId = uuidv4();
      getById = Object.assign({}, getById, {
        [generatedId]: Object.assign({}, action.payload, {id: generatedId}),
      });
      //return the updated state
      return Object.assign({}, state, {getById: getById});
    case REMOVE_TASK:
      //deep copy the getById
      Object.keys(state.getById).map(id => {
        getById = Object.assign({}, getById, {
          [id]: state.getById[id],
        });
      });
      //add the new task
      getById = Object.assign({}, getById, {[uuidv4()]: action.payload});
      delete getById[action.payload];
      return Object.assign({}, state, {getById: getById});
    case UPDATE_TASK:
      Object.keys(state.getById).map(id => {
        if (id === action.meta.id) {
          getById = Object.assign({}, getById, {
            [id]: Object.assign({}, state.getById[id], action.payload),
          });
        } else {
          getById = Object.assign({}, getById, {
            [id]: state.getById[id],
          });
        }
      });
      return Object.assign({}, state, {getById: getById});
    default:
      return state;
  }
};

export default tasks;
