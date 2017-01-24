import * as React from 'react';
import { shallow } from 'enzyme';
import {createMemoryHistory} from 'history';
import {Route, Router, useRouterHistory} from 'react-router';
import LanguageLink from './../LanguageLink';

const ServerComponentWithRouter = ({currentLocation}) => {
  const history = createMemoryHistory(currentLocation);
  const component: any = () => <LanguageLink language="de-DE" title="Deutsch">German</LanguageLink>;
  return (
    <Router history={history}>
      <Route path='/:language/a/b/register' component={component} />
    </Router>
  );
};

const ClientComponentWithRouter = ({currentLocation, baseName = '/'}) => {
  const history = useRouterHistory(createMemoryHistory)({
    entries: currentLocation,
    basename: baseName,
  });
  const component: any = () => <LanguageLink language="de-DE" title="Deutsch">German</LanguageLink>;
  return (
    <Router history={history}>
      <Route path='/a/b/register' component={component} />
    </Router>
  );
};

describe('GIVEN LanguageLink component', () => {
  describe('WHEN it is rendered without router context', () => {
    it('SHOULD contain the expected html and href always pointing to login', () => {
      const wrapper = shallow(<LanguageLink language="de-DE" title="German">German</LanguageLink>);
      expect(wrapper.html()).toEqual('<a href="/de-DE/login" title="German">German</a>');
    });
  });

  describe('WHEN it is rendered with router context on the server', () => {
    beforeEach(() => {
      (global as any).__SERVER__ = true;
      (global as any).__CLIENT__ = !(global as any).__SERVER__;
    });

    it('SHOULD contain the expected html and href to be prefixed with "de-DE"', () => {
      const wrapper = shallow(<ServerComponentWithRouter currentLocation="/en-US/a/b/register" />);
      expect(wrapper.html()).toEqual('<a href="/de-DE/a/b/register" title="Deutsch">German</a>');
    });
  });

  describe('WHEN it is rendered with router context on the client', () => {
    beforeEach(() => {
      (global as any).__SERVER__ = false;
      (global as any).__CLIENT__ = !(global as any).__CLIENT__;
    });

    it('SHOULD contain the expected html and href to be prefixed with "de-DE"', () => {
      const wrapper = shallow(<ClientComponentWithRouter baseName="/en-US" currentLocation="/en-US/a/b/register" />);
      expect(wrapper.html()).toEqual('<a href="/de-DE/a/b/register" title="Deutsch">German</a>');
    });
  });
});
