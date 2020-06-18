import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {updateTask} from '../model/commands';
import {getIncompleteTasks} from '../model/selectors';
import {getIncompletedTaskTimeSpentByDate} from '../../logs/model/selectors';

const BacklogHOC = (WrappedComponent, props) => {
  const globalState = useSelector((state) => state);
  const dispatch = useDispatch();
  const componentState = {
    items: getIncompleteTasks(globalState),
    timeTotals: getIncompletedTaskTimeSpentByDate(
      globalState,
      moment().format('YYYY-MM-DD'),
    ),
  };

  const addToAgenda = (task, date) => {
    return new Promise((resolve) => {
      dispatch(updateTask(task.id, {agendas: task.agendas.concat([date])}));
      resolve();
    });
  };
  const setTaskCompletion = (id, state = true) => {
    return new Promise((resolve) => {
      dispatch(updateTask(id, {complete: state}));
      resolve();
    });
  };

  return (
    <WrappedComponent
      {...props}
      {...componentState}
      addToAgenda={addToAgenda}
      setTaskCompletion={setTaskCompletion}
    />
  );
};

export default BacklogHOC;
