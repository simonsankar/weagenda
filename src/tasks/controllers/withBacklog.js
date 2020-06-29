import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {updateTask} from '../model/commands';
import {getIncompleteTasks} from '../model/selectors';
import {getIncompletedTaskTimeSpentByDate} from '../../logs/model/selectors';

const mapStateToProps = (state) => ({
  items: getIncompleteTasks(state),
  timeTotals: getIncompletedTaskTimeSpentByDate(
    state,
    moment().format('YYYY-MM-DD'),
  ),
});
const mapDispatchToProps = {
  updateTask,
};

const withBacklog = (WrappedComponent, props) => {
  const Backlog = class extends Component {
    addToAgenda = (task, date) => {
      return new Promise((resolve) => {
        this.props.updateTask(task.id, {agendas: task.agendas.concat([date])});
        resolve();
      });
    };

    setTaskCompletion = (id, state = true) => {
      return new Promise((resolve) => {
        this.props.updateTask(id, {complete: state});
        resolve();
      });
    };

    render() {
      return (
        <WrappedComponent
          {...props}
          {...this.props}
          addToAgenda={this.addToAgenda}
          setTaskCompletion={this.setTaskCompletion}
        />
      );
    }
  };
  return connect(mapStateToProps, mapDispatchToProps)(Backlog);
};

export default withBacklog;
