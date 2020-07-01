import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {getTasksByDate} from '../../tasks/model/selectors';
import {getLogsByFilter} from '../model/selectors';
import {memorizeLogsFilter} from '../model/memorize';

const mapStateToProps = (state, props) => {
  const filter = memorizeLogsFilter(state);
  return {
    items: getLogsByFilter(state, props),
    tasks: [
      {id: undefined, title: 'All Tasks'},
      ...getTasksByDate(state, moment().format('YYYY-MM-DD')),
    ],
    setFilters: (startTime, endTime, taskId) =>
      filter(startTime, endTime, taskId),
  };
};

const withLogs = (WrappedComponent, props) => {
  const Logs = class Agenda extends Component {
    render() {
      return <WrappedComponent {...props} {...this.props} />;
    }
  };

  return connect(mapStateToProps, null)(Logs);
};

export default withLogs;
