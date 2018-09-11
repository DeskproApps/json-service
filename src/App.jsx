import React from 'react';
import PropTypes from 'prop-types';
import PageHome from './components/PageHome';
import { Router, Route, Switch } from 'react-router'
import { Loader } from '@deskpro/apps-components';
import { createMemoryHistory as createHistory } from "history";

const history = createHistory({
  initialEntries: ["loading"],
  initialIndex: 0
});

/**
 * Renders the HTML app.
 */
export default class App extends React.PureComponent {

  static propTypes = {
    dpapp: PropTypes.object.isRequired,
  };

  /**
   * Invoked immediately after a component is mounted
   */
  componentDidMount() {
    const { storage, context } = this.props.dpapp;

    Promise.all([
      storage.getAppStorage("settings"),
      context.get('ticket').get(),
      context.getMe()
    ]).then(values => {

      const [settings, tab, me] = values;
      const state = {
        ...settings,
        context: { tab: tab.data, me }
      };

      history.push("home", state);
      history.go(1);
    });
  }

  renderHome = (props) => {
    const { dpapp } = this.props;
    return <PageHome {...props} dpapp={dpapp} />
  };

  /**
   * @returns {XML}
   */
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="home" render={this.renderHome} />
          <Route path={"loading"} render={() => <Loader />} />
        </Switch>
      </Router>
    );
  }

}
