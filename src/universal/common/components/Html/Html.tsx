import * as React from 'react';
import * as Helmet from 'react-helmet';
import * as ReactDOM from 'react-dom/server';

interface IHtmlPropTypes {
  language?: string;
  assets?: any;
  component?: React.ReactElement<any>;
  store?: any;
}

export default class Html extends React.Component<IHtmlPropTypes, any> {
  public static propTypes = {
    assets: React.PropTypes.object,
    component: React.PropTypes.node,
    store: React.PropTypes.object,
  };

  public render() {
    const {assets, component, store, language} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();
    const data = `window.__data=${JSON.stringify(store.getState())};`;
    const init = `${data}`;
    const css = require('./../AppContainer/AppContainer.scss');

    return (
      <html lang="en-us">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel="shortcut icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,300italic,400italic,700,700italic,500,500italic" rel="stylesheet" type="text/css" />

          {Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key} media="screen, projection"
                  rel="stylesheet" type="text/css" charSet="UTF-8" />,
          )}

          {Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{__html: css._style}} /> : null}
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: content}}/>

          <script dangerouslySetInnerHTML={{__html: init}} charSet="UTF-8"/>
          <script src={assets.javascript.main} charSet="UTF-8"/>
        </body>
      </html>
    );
  }
}
