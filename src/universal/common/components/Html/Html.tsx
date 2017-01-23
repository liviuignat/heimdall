import * as React from 'react';
import * as Helmet from 'react-helmet';
import * as ReactDOM from 'react-dom/server';
const {Component, PropTypes} = React;

interface IHtmlPropTypes {
  assets?: any;
  component?: React.ReactElement<any>;
  language?: string;
  store?: any;
}

export default class Html extends Component<IHtmlPropTypes, any> {
  public static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    language: PropTypes.string.isRequired,
    store: PropTypes.object,
  };

  public render() {
    const {assets, component, store, language} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();
    const data = `window.__data=${JSON.stringify(store.getState())};`;
    const init = `${data}`;
    const css = require('./../AppContainer/AppContainer.scss');

    return (
      <html lang={language}>
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel="shortcut icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Helvetica+Neue:400,300,300italic,400italic,700,700italic,500,500italic" rel="stylesheet" type="text/css" />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" rel="stylesheet" type="text/css" />
          {Object.keys(assets.styles).map((style, key) => (
            <link
              href={assets.styles[style]}
              key={key}
              media="screen, projection"
              rel="stylesheet"
              type="text/css"
              charSet="UTF-8"
            />
          ))}
          {Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{__html: css._style}} /> : null}

          <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en,Intl.~locale.de"/>
        </head>
        <body>
          <div className={css.MainWrapper} id="content" dangerouslySetInnerHTML={{__html: content}} />

          <script src={`/assets/translations/locale/${language}/index.js?t=${Date.now()}`} charSet="UTF-8"/>
          <script dangerouslySetInnerHTML={{__html: init}} charSet="UTF-8" />
          <script src={assets.javascript.main} charSet="UTF-8" />
        </body>
      </html>
    );
  }
}
