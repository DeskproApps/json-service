import React from 'react';
import { sdkConnect, LinkButton } from '@deskpro/apps-sdk-react';
import { Container, Section, Heading } from '@deskpro/react-components';

/**
 * Renders the app's help page.
 */
const PageHelp = () => (
  <Container>
    <Heading size={2}>Help</Heading>
    <Section>
      <p>
        This app allows admins to fetch and display values from a remote API using an HTML template.
      </p>
      <Heading size={3}>
        JSON Response
      </Heading>
      <p>
        The <i>service URL</i> must respond with a well formatted JSON string.
      </p>
      <pre>
        <code>
          {`{
  "id": 1,
  "title": "Lorem ipsum",
  "body": "Proin a congue."
}`}
        </code>
      </pre>

      <Heading size={3}>
        Template
      </Heading>
      <p>
        The JSON response is displayed using an admin created
        template. <a href="http://handlebarsjs.com/expressions.html" target="_blank">Handlebars expressions</a> may
        be used to render the JSON
        and <a href="https://deskpro.gitbooks.io/deskpro-apps/apps/tabdata.html" target="_blank">tab meta values</a>.
      </p>
      <pre>
        <code>
          {`<div class="entry">
  <h1>{{title}}</h1>
  <div class="body">
    {{body}}
  </div>
  <p>{{tab.agent.name}}</p>
</div>`}
        </code>
      </pre>
    </Section>
    <LinkButton to="home">
      Close
    </LinkButton>
  </Container>
);

export default sdkConnect(PageHelp);
