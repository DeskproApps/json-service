import React from 'react';
import PropTypes from 'prop-types';
import Handlebars from 'handlebars';
import { sdkConnect } from '@deskpro/apps-sdk-react';
import { Container, Loader } from '@deskpro/react-components';

/**
 * Fetches the remote resource and renders the defined template.
 */
class PageHome extends React.PureComponent {
  static propTypes = {
    /**
     * Instance of sdk-core
     */
    dpapp: PropTypes.object.isRequired,

    /**
     * Instance of sdk storage.
     * @see https://deskpro.gitbooks.io/deskpro-apps/api/props/storage.html
     */
    storage: PropTypes.object.isRequired,

    /**
     * Instance of sdk ui.
     * @see https://deskpro.gitbooks.io/deskpro-apps/api/props/ui.html
     */
    ui: PropTypes.object.isRequired,

    /**
     * Populated with the details of the currently opened ticket.
     * @see https://deskpro.gitbooks.io/deskpro-apps/api/props/tabdata.html
     */
    tabData: PropTypes.object.isRequired
  };

  /**
   * Constructor
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      html: '',
      loaded: false
    };
  }

  /**
   * Invoked immediately after a component is mounted
   */
  componentDidMount() {
    const { dpapp, storage, route, ui, tabData } = this.props;

    if (storage.app.settings && storage.app.settings.serviceURL) {
      const serviceTemp = Handlebars.compile(storage.app.settings.serviceURL);
      const serviceURL = serviceTemp(tabData);
      const fetchParams = {
        method: 'GET',
        headers: {}
      };

      dpapp.restApi.fetchCORS(serviceURL, fetchParams)
        .then((resp) => {
          const context = Object.assign({}, resp.body, { resp: resp.body, tab: tabData });
          const htmlTemp = Handlebars.compile(storage.app.settings.template);
          return this.setState({ loaded: true, html: htmlTemp(context) });
        })
        .catch(ui.error);
    } else {
      this.setState({ loaded: true }); // eslint-disable-line
      route.to('settings');
    }
  }

  /**
   * @returns {XML}
   */
  render() {
    const { html, loaded } = this.state;

    return (
      <Container>
        {loaded ? (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <div className="dp-text-center">
            <Loader />
          </div>
        )}
      </Container>
    );
  }
}

export default sdkConnect(PageHome);
