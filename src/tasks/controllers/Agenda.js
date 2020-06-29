import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {startTask, updateTask} from '../model/commands';
import {addTimeLog} from '../../logs/model/commands';
import {getTasksByDate, getCurrentTask} from '../model/selectors';
import {getTaskTimeSpentByDate} from '../../logs/model/selectors';

const mapStateToProps = (state) => ({
  items: getTasksByDate(state, moment().format('YYYY-MM-DD')),
  currentItem: getCurrentTask(state),
  timeTotals: getTaskTimeSpentByDate(state, moment().format('YYYY-MM-DD')),
});

const mapDispatchToProps = {
  startTask,
  updateTask,
  addTimeLog,
};

// This function takes a component...
function withAgenda(WrappedComponent, props) {
  const Agenda = class Agenda extends Component {
    setTaskCompletion = (id, state = true) => {
      return new Promise((resolve) => {
        this.props.updateTask(id, {complete: state});
        resolve();
      });
    };
    startATask = (id) => {
      return new Promise((resolve) => {
        this.props.startTask(id);
        this.props.addTimeLog(id, moment().format());
        resolve();
      });
    };
    render() {
      return (
        <>
          <WrappedComponent {...this.props} {...props} />
        </>
      );
    }
  };
  return connect(mapStateToProps, mapDispatchToProps)(Agenda);
}

export default withAgenda;
