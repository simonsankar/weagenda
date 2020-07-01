import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-native-testing-library';
import configureStore from 'redux-mock-store';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../themes/main.json';
import moment from 'moment';
import {mockTasks} from '../../__tests__/fixtures';
import {mockLogs} from '../../../logs/__tests__/fixtures';
import withDetail from '../withDetail';
import Detail from '../../views/screens/Detail';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));

const mockStore = configureStore();
let store = mockStore({
  tasks: mockTasks,
  logs: mockLogs,
});

describe('Agenda Detail HOC', () => {
  beforeEach(() => {
    store.clearActions();
  });
  const navigation = {
    isFocused: jest.fn(),
    goBack: jest.fn(),
  };
  const route = {
    params: {id: '101'},
  };
  it('Should render the wrapped component with props', () => {
    const WrappedComponent = withDetail(Detail);
    const {getByTestId, unmount} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <Provider store={store}>
          <ApplicationProvider
            {...eva}
            theme={{
              ...eva.light,
              ...theme,
            }}>
            <WrappedComponent navigation={navigation} route={route} />
          </ApplicationProvider>
        </Provider>
      </>,
    );
    const myComponent = getByTestId('DetailLayout');
    expect(myComponent).toBeTruthy();
    expect(myComponent.parent.props.navigation).toBeTruthy();
    expect(myComponent.parent.props.tasks).toBeTruthy();
    expect(myComponent.parent.props.getTask).toBeTruthy();
    expect(myComponent.parent.props.onSave).toBeTruthy();
    expect(myComponent.parent.props.onUpdate).toBeTruthy();
    expect(myComponent.parent.props.onRemove).toBeTruthy();
    unmount();
  });

  it('should provide a method for saving a new task to agendas', () => {
    const WrappedComponent = withDetail(Detail);
    const {getByTestId, unmount} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <Provider store={store}>
          <ApplicationProvider
            {...eva}
            theme={{
              ...eva.light,
              ...theme,
            }}>
            <WrappedComponent navigation={navigation} route={route} />
          </ApplicationProvider>
        </Provider>
      </>,
    );
    const myComponent = getByTestId('DetailLayout');
    const today = new Date();
    const expectedTask = {
      title: 'test task',
      description: 'test task description',
      agendas: [moment().format('YYYY-MM-DD')],
      dueDate: today.toISOString(),
      created: '2020-07-01T17:25:30.279Z',
    };
    myComponent.parent.props.onSave(
      expectedTask.title,
      expectedTask.description,
      expectedTask.dueDate,
      true,
      2,
      'hours',
    );
    expect(store.getActions()[0].type).toEqual('ADD_TASK');
    unmount();
  });

  it('should provide a method for saving a new task to backlog', () => {
    const WrappedComponent = withDetail(Detail);
    const {getByTestId, unmount} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <Provider store={store}>
          <ApplicationProvider
            {...eva}
            theme={{
              ...eva.light,
              ...theme,
            }}>
            <WrappedComponent navigation={navigation} route={route} />
          </ApplicationProvider>
        </Provider>
      </>,
    );
    const myComponent = getByTestId('DetailLayout');
    const today = new Date();
    const expectedTask = {
      title: 'test task',
      description: 'test task description',
      agendas: [],
      dueDate: today.toISOString(),
      created: '2020-07-01T17:25:30.279Z',
    };
    myComponent.parent.props.onSave(
      expectedTask.title,
      expectedTask.description,
      expectedTask.dueDate,
      false,
      2,
      'hours',
    );
    expect(store.getActions()[0].type).toEqual('ADD_TASK');
    unmount();
  });

  it('should provide a method for updating a task', () => {
    const WrappedComponent = withDetail(Detail);
    const {getByTestId, unmount} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <Provider store={store}>
          <ApplicationProvider
            {...eva}
            theme={{
              ...eva.light,
              ...theme,
            }}>
            <WrappedComponent navigation={navigation} route={route} />
          </ApplicationProvider>
        </Provider>
      </>,
    );
    const myComponent = getByTestId('DetailLayout');
    const today = new Date();
    const task = {
      id: '101',
      title: 'test task',
      description: 'test task description',
      agendas: [],
      dueDate: today.toISOString(),
      created: '2020-07-01T17:25:30.279Z',
    };
    const form = {
      title: 'Updated Title',
      description: 'New description',
      dueDate: '2021-10-10',
      estimatedTime: '100',
    };
    myComponent.parent.props.onUpdate(
      navigation,
      task,
      form.title,
      form.description,
      form.dueDate,
      form.estimatedTime,
      true,
    );
    expect(store.getActions()).toEqual([
      {
        type: 'UPDATE_TASK',
        payload: {...form, currentAgenda: true},
        meta: {id: task.id},
      },
    ]);
    unmount();
  });
});
