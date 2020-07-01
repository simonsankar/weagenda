import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-native-testing-library';
import configureStore from 'redux-mock-store';
import {ApplicationProvider, IconRegistry, Layout} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../themes/main.json';
import {mockTasks} from '../../../tasks/__tests__/fixtures';
import {mockLogs} from '../../__tests__/fixtures';
import withLogs from '../withLogs';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));

const mockStore = configureStore();
let store = mockStore({
  tasks: mockTasks,
  logs: mockLogs,
});

describe('Logs HOC', () => {
  beforeEach(() => {
    store.clearActions();
  });
  const navigation = {
    isFocused: jest.fn(),
  };
  it('Should render the wrapped component with props', () => {
    const Logs = (props) => <Layout testID={'LogsLayout'} {...props} />;
    const WrappedComponent = withLogs(Logs);
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
    const myComponent = getByTestId('LogsLayout');
    expect(myComponent).toBeTruthy();
    expect(myComponent.parent.props.navigation).toBeTruthy();
    expect(myComponent.parent.props.items).toBeArrayOfSize(7);
    expect(myComponent.parent.props.tasks).toBeArrayOfSize(5);
    expect(myComponent.parent.props.setFilters).toBeTruthy();
    unmount();
  });
});
