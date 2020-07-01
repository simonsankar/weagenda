import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {addTask, removeTask, updateTask} from '../model/commands';
import {Component} from 'react';

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = {
  addTask,
  removeTask,
  updateTask,
};
const withDetail = (WrappedComponent, props) => {
  const Detail = class extends Component {
    getTask = (id) => {
      return id !== undefined && id !== ''
        ? this.props.tasks.getById[id]
        : {
            title: '',
            description: '',
            dueDate: moment().toDate(),
            completed: true,
            agendas: [],
          };
    };

    onSave = (
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
            estimatedUnit === 'minutes'
              ? estimatedTime * 60
              : estimatedTime * 60 * 60,
          created: moment(),
        };
        this.props.addTask(task);
        resolve();
      });
    };

    onUpdate = (
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
      this.props.updateTask(task.id, updatedTask);
      navigation.goBack();
      console.log('update task');
    };

    onRemove = (taskId) => {
      return new Promise((resolve) => {
        this.props.removeTask(taskId);
        resolve();
      });
    };
    render() {
      return (
        <WrappedComponent
          {...props}
          {...this.props}
          getTask={this.getTask}
          onSave={this.onSave}
          onUpdate={this.onUpdate}
          onRemove={this.onRemove}
        />
      );
    }
  };

  return connect(mapStateToProps, mapDispatchToProps)(Detail);
};

export default withDetail;
