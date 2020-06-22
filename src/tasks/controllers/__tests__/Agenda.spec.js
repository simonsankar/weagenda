import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-native-testing-library';
import configureStore from 'redux-mock-store';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../theme.json';
import {mockTasks} from '../../__tests__/fixtures';
import AgendaHOC from '../AgendaHOC';
import Agenda from '../../views/components/Agenda';
import {mockLogs} from '../../../logs/__tests__/fixtures';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));

const mockStore = configureStore();
let store = mockStore({
  tasks: mockTasks,
  logs: mockLogs,
});

describe('Agenda Controller', () => {
  beforeEach(() => {
    store.clearActions();
  });
  const navigation = {
    isFocused: jest.fn(),
  };
  it('Should render the wrapped component with props', () => {
    const WrappedComponent = (props) => AgendaHOC(Agenda, props);
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
    const myComponent = getByTestId('AgendaLayout');
    expect(myComponent).toBeTruthy();
    expect(myComponent.parent.props.navigation).toBeTruthy();
    expect(myComponent.parent.props.items).toBeArrayOfSize(4);
    expect(myComponent.parent.props.currentItem).toEqual({}); // Update test when bug Fix is merged
    expect(myComponent.parent.props.timeTotals).toBeArrayOfSize(4);
    expect(myComponent.parent.props.startTask).toBeTruthy();
    expect(myComponent.parent.props.setTaskCompletion).toBeTruthy();
    unmount();
  });

  it('should provide a method for marking a task complete', () => {
    const WrappedComponent = (props) => AgendaHOC(Agenda, props);
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
    const myComponent = getByTestId('AgendaLayout');
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

  it('should provide a method for starting a task', () => {
    const WrappedComponent = (props) => AgendaHOC(Agenda, props);
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
    const myComponent = getByTestId('AgendaLayout');
    myComponent.parent.props.startTask('36212c03-040b-4139-867f-bd76485f4084');
    expect(store.getActions()[0].type).toEqual('START_TASK');
    unmount();
  });
});
