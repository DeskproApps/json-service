import React from 'react';
import PropTypes from 'prop-types';
import Handlebars from 'handlebars';

import { Loader, Content } from '@deskpro/apps-components';

/**
 * Renders the defined template.
 */
class PageHome extends React.Component
{
  static propTypes =
  {
    location: PropTypes.object.isRequired,

    history: PropTypes.object.isRequired,

    dpapp: PropTypes.object.isRequired,
  };


  state = { loaded: false, html: '' };

  /**
   * Invoked immediately before a component is mounted
   */
  componentDidMount()
  {
    const { serviceURL, authorization, template, context } = this.props.location.state;
    const { dpapp } = this.props;

    function html(resp)
    {
      const templateContext = { ...context, resp: resp.body };
      const compiledTemplate = Handlebars.compile(template);
      return compiledTemplate(templateContext);
    }

    if (serviceURL) {

      const serviceTemp = Handlebars.compile(serviceURL);
      const fetchUrl = serviceTemp({...context});

      const headers = {};

      if (authorization) {
        headers['x-proxy-header-authorization'] = authorization;
      }

      const fetchParams = {
        method: 'GET',
        headers
      };
      dpapp.restApi.fetchProxy(fetchUrl, fetchParams)
        .then(html)
        .then(template => {
          this.setState({ html: template, loaded: true })
        })
        .catch(error => {
          if (error instanceof Error) {
            dpapp.ui.showErrorNotification(error)
          } else {
            dpapp.ui.showNotification(error, 'error')
          }
          console.error(error);
        })
    }
  }

  componentDidUpdate()
  {
    const { dpapp } = this.props;
    const { title } = this.props.location.state;
    if (title) {
      dpapp.ui.changeTitle(title);
    }
  }

  /**
   * @returns {XML}
   */
  render()
  {
    if (this.state.loaded) {
      return <Content><div dangerouslySetInnerHTML={{ __html: this.state.html }} /></Content>
    }
    return <div className="dp-text-center"><Loader /></div>;
  }
}

export default PageHome;
