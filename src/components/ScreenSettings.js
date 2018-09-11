
import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable */
const defaultSettings = {
  title:     "The title displayed in the toolbar",
  template:   "<h1>{{ resp.title }}</h1>\n" +
  "<p>Agent: {{ tab.agent.first_name }}</p>\n" +
  "<p>UserId: {{ resp.userId }}</p>"
};
/* eslint-enable */


export class ScreenSettings extends React.Component {

  static propTypes = {
    finishInstall: PropTypes.func.isRequired,
    installType: PropTypes.string.isRequired,
    settings: PropTypes.array.isRequired,
    values: PropTypes.object.isRequired,
    settingsForm: PropTypes.func.isRequired,
    dpapp: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      uiState: "loading",
      values: null
    };
  }

  onSettings(settings) {
    const { finishInstall } = this.props;
    finishInstall({settings}).then(({ onStatus }) => onStatus())
  }

  componentDidMount()
  {
    const { installType, dpapp } = this.props;
    if (installType === "update") {
      dpapp.storage.getAppStorage(['settings']).then(({settings : values}) => {
        this.setState({ uiState: "ready", values })
      })
    } else {
      this.setState({ uiState: "ready", values: {...defaultSettings, ...this.props.values} })
    }
  }

  render() {
    const { settings, settingsForm: SettingsForm } = this.props;
    const { uiState, values } = this.state;

    if (uiState === "ready") {
      let formRef;
      return (
        <div className={'settings'}>
          <SettingsForm
            settings={settings}
            values={values}
            ref={ref => formRef = ref}
            onSubmit={this.onSettings.bind(this)}
          />
          <button className={'btn-action'} onClick={() => formRef.submit()}>Update Settings</button>
        </div>
      );
    }

    return null;
  }
}
