import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App/App';
import { Provider } from 'react-redux';
import { store } from '../App/store';


describe('<App/>', () => {
   it('should be rendered', () => {
      const component = renderer.create(
         <Provider store={store}>
            <App/>
         </Provider>
      );
      expect(component.toJSON()).toMatchSnapshot();
   });
});