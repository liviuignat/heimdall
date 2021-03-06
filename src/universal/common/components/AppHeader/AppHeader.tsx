import * as React from 'react';
import {AppLogo} from 'universal/common/components';

export default class AppHeader extends React.Component<any, any> {
  public render() {
    const css = require('./AppHeader.scss');

    return (
      <div className={css.AppHeader}>
        <div className={css.LogoContainer}>
          <a href="https://www.everreal.co"><AppLogo /></a>
        </div>

        <ul className={css.MenuList} />
      </div>
    );
  }
}
