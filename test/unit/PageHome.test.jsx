import React from 'react';
import renderer from 'react-test-renderer';
import { createAppFromProps, EVENT_WEBAPI_REQUEST_FETCH } from '@deskpro/apps-sdk';
import AppEventEmitter from '@deskpro/apps-sdk/lib/Core/AppEventEmitter';

import { createMemoryHistory as createHistory } from "history";


import PageHome from '../../src/components/PageHome';

it('PageHome renders correctly in the normal state', (done) => {


  const outgoingDispatcher = new AppEventEmitter();
  outgoingDispatcher.on("webapi.request.fetch", (resolve, reject, params) => resolve(
      {
        body: {
          "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        }
      }
    )
  );
  const dpapp = createAppFromProps({
    contextProps : {
      type:       'ticket',
      entityId:   '1',
      locationId: 'ticket-sidebar',
      tabId:      'tab-id',
      tabUrl:     'http://127.0.0.1'
    },
    instanceProps : {
      appId:          '1',
      instanceId:     '1',
      appTitle:       'Json Service',
      appPackageName: 'app-boilerplate-react'
    },
    outgoingDispatcher
  });
  const history = createHistory({ initialEntries: ["home"], initialIndex: 0});

  const state = {
    title:     "The title displayed in the toolbar",
    template:   "<h1>{{ resp.title }}</h1>\n" +
    "<p>Agent: {{ tab.agent.first_name }}</p>\n" +
    "<p>UserId: {{ resp.userId }}</p>",
    serviceURL: "https://jsonplaceholder.typicode.com/todos/1",
    context : {
      tab: {
        agent: {
          first_name: test
        }
      },
      me : {
        id: 100
      }
    }
  };
  const tree = renderer.create(<PageHome
      dpapp=      {dpapp}
      history=    {history}
      location=   {{ state }}
    />
  );

  setTimeout(function() {
    expect(tree.toJSON()).toMatchSnapshot();
    done()
  }, 500);



});
