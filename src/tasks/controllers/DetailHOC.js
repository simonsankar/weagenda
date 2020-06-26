import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {addTask, removeTask, updateTask} from '../model/commands';

import {addTimeLog} from '../../logs/model/commands';
import {
  getTasksByDate,
  getCurrentTask,
  tasksSelector,
} from '../model/selectors';
import {getTaskTimeSpentByDate} from '../../logs/model/selectors';

const AgendaHOC = (WrappedComponent, props) => {
  const {tasks} = useSelector((state) => state);
  const dispatch = useDispatch();

  const getTask = (id) => {
    return id !== undefined && id !== ''
      ? tasks.getById[id]
      : {
          title: '',
          description: '',
          dueDate: moment().toDate(),
          completed: true,
          agendas: [],
        };
  };

  const onSave = (
    title,
    description,
    dueDate,
    addToAgenda = false,
    estimatedTime = 15,
    estimatedUnit = 'minutes',
  ) => {
    return new Promise((resolve) => {
      const task = {
        title: title,
        description: description,
        dueDate: dueDate,
        agendas: addToAgenda ? [moment().format('YYYY-MM-DD')] : [],
        estimatedTime:
          estimatedUnit == 'minutes'
            ? estimatedTime * 60
            : estimatedTime * 60 * 60,
        created: moment(),
      };
      dispatch(addTask(task));
      resolve();
    });
  };

  const onUpdate = (
    navigation,
    task,
    title,
    description,
    dueDate,
    estimatedTime,
    currentAgenda,
  ) => {
    const updatedTask = {
      title,
      description,
      dueDate,
      estimatedTime,
      currentAgenda,
    };
    //TODO execute command to update task
    dispatch(updateTask(task.id, updatedTask));
    navigation.goBack();
    console.log('update task');
  };

  const onRemove = (taskId) => {
    return new Promise((resolve) => {
      dispatch(removeTask(taskId));
      resolve();
    });
  };

  return (
    <WrappedComponent
      {...props}
      getTask={getTask}
      onSave={onSave}
      onUpdate={onUpdate}
      onRemove={onRemove}
    />
  );
};

export default AgendaHOC;
