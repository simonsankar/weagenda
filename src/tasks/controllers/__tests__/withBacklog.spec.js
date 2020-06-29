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
import withBacklog from '../withBacklog';
import Backlog from '../../views/components/Backlog';
import {mockLogs} from '../../../logs/__tests__/fixtures';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));

const mockStore = configureStore();
let store = mockStore({
  tasks: mockTasks,
  logs: mockLogs,
});

describe('Backlog Controller', () => {
  beforeEach(() => {
    store.clearActions();
  });

  const navigation = {
    isFocused: jest.fn(),
  };

  it('Should render the wrapped component with props', () => {
    const WrappedComponent = withBacklog(Backlog);
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
            <WrappedComponent navigation={navigation} />
          </ApplicationProvider>
        </Provider>
      </>,
    );
    const myComponent = getByTestId('BacklogLayout');
    expect(myComponent).toBeTruthy();
    expect(myComponent.parent.props.navigation).toBeTruthy();
    expect(myComponent.parent.props.items).toBeArrayOfSize(4);
    expect(myComponent.parent.props.timeTotals).toBeArrayOfSize(3);
    expect(myComponent.parent.props.addToAgenda).toBeTruthy();
    expect(myComponent.parent.props.setTaskCompletion).toBeTruthy();
    unmount();
  });

  it('should provide a method for marking a task complete', () => {
    const WrappedComponent = withBacklog(Backlog);
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
            <WrappedComponent navigation={navigation} />
          </ApplicationProvider>
        </Provider>
      </>,
    );
    const myComponent = getByTestId('BacklogLayout');
    expect(myComponent.parent.props.setTaskCompletion).toBeTruthy();

    myComponent.parent.props.setTaskCompletion(
      '36212c03-040b-4139-867f-bd76485f4084',
      true,
    );
    expect(store.getActions()).toEqual([
      {
        type: 'UPDATE_TASK',
        payload: {complete: true},
        meta: {id: '36212c03-040b-4139-867f-bd76485f4084'},
      },
    ]);
    unmount();
  });

  it('should provide a method for adding a task to the Agenda', () => {
    const WrappedComponent = withBacklog(Backlog);
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
            <WrappedComponent navigation={navigation} />
          </ApplicationProvider>
        </Provider>
      </>,
    );
    const myComponent = getByTestId('BacklogLayout');

    const task = myComponent.parent.props.items[3]; // 7a5fe6af-27f5-486b-a32d-4d3d0437d0c3
    const today = moment().format('YYYY-MM-DD');
    const futureDate = moment().add(2, 'days').format('YYYY-MM-DD');

    myComponent.parent.props.addToAgenda(task, today);
    expect(store.getActions()[0].type).toEqual('UPDATE_TASK');
    expect(store.getActions()[0].payload).toEqual({
      agendas: [futureDate, today],
    });
    unmount();
  });
});
