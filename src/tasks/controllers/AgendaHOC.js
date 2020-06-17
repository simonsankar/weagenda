import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Controller} from '../../controller';
import {getTasksByDate} from '../model/selectors';
import moment from 'moment';
import {startTask, updateTask} from '../model/commands';
import {addTimeLog} from '../../logs/model/commands';
import {getTaskTimeSpentByDate} from '../../logs/model/selectors';

const AgendaHOC = (WrappedComponent, props) => {
  const globalState = useSelector((state) => state);
  const dispatch = useDispatch();
  const componentState = {
    items: getTasksByDate(globalState, moment().format('YYYY-MM-DD')),
    currentItem: globalState.tasks.currentTask,
    timeTotals: getTaskTimeSpentByDate(
      globalState,
      moment().format('YYYY-MM-DD'),
    ),
  };

  const setTaskCompletion = (id, state = true) => {
    return new Promise((resolve) => {
      dispatch(updateTask(id, {complete: state}));
      resolve();
    });
  };
  const startATask = (id) => {
    return new Promise((resolve) => {
      dispatch(startTask(id));
      dispatch(addTimeLog(id, moment().format()));
      resolve();
    });
  };

  return (
    <WrappedComponent
      {...props}
      {...componentState}
      startTask={startATask}
      setTaskCompletion={setTaskCompletion}
    />
  );
};

export default AgendaHOC;
