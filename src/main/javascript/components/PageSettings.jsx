import React from 'react';
import PropTypes from 'prop-types';
import tabOverride from 'taboverride';
import { sdkConnect, LinkButton } from '@deskpro/apps-sdk-react';
import { Container, Heading } from '@deskpro/react-components';
import { Form, Input, Textarea, Button } from '@deskpro/react-components/lib/bindings/redux-form';

/**
 * Renders the app's settings page.
 */
class PageSettings extends React.PureComponent {
  static propTypes = {
    /**
     * Instance of sdk route.
     * @see https://deskpro.gitbooks.io/deskpro-apps/api/props/route.html
     */
    route: PropTypes.object.isRequired,

    /**
     * Instance of sdk storage.
     * @see https://deskpro.gitbooks.io/deskpro-apps/api/props/storage.html
     */
    storage: PropTypes.object.isRequired
  };

  /**
   * Invoked immediately after a component is mounted
   */
  componentDidMount() {
    const textareas = document.getElementsByTagName('textarea');
    tabOverride.tabSize(2).autoIndent(true).set(textareas);
  }

  /**
   * Invoked immediately before a component is unmounted
   */
  componentWillUnmount() {
    const textareas = document.getElementsByTagName('textarea');
    tabOverride.set(textareas, false);
  }

  /**
   * Called when the form is submitted
   */
  handleSubmit = () => {
    this.props.route.to('home');
  };

  /**
   * @returns {XML}
   */
  render() {
    const { storage } = this.props;

    return (
      <Container>
        <Heading size={2}>Settings</Heading>
        <Form
          name="settings"
          keepDirtyOnReinitialize
          destroyOnUnmount={false}
          initialValues={storage.app.settings}
          onSubmit={storage.onSubmitApp(this.handleSubmit)}
        >
          <Input
            label="Service URL"
            id="serviceURL"
            name="serviceURL"
          />
          <Input
            label="Authorization"
            id="authorization"
            name="authorization"
          />
          <Textarea
            label="Template"
            id="template"
            name="template"
          />
          <Button>
            Save
          </Button>
          <LinkButton to="home">
            Cancel
          </LinkButton>
        </Form>
      </Container>
    );
  }
}

export default sdkConnect(PageSettings);
