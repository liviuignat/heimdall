import * as React from 'react';
import {Link} from 'react-router';
import {AppLogo} from 'universal/common/components';

export default class AppHeader extends React.Component<any, any> {
  state = {
    isScrolled: false
  };

  componentDidMount() {
    if (window && window.addEventListener) {
      window.addEventListener('scroll', this.handleScroll.bind(this));
    }
  }

  componentWillUnmount() {
    if (window && window.removeEventListener) {
      window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
  }

  handleScroll(ev) {
    const {scrollTop} = ev.srcElement.body;
    const isScrolled = !!scrollTop;
    this.setState({isScrolled});
  }

  render() {
    const css = require('./AppHeader.scss');
    const {isScrolled} = this.state;

    return (
      <div data-is-scrolled={isScrolled} className={css.AppHeader}>
        <div className={css.LogoContainer}>
          <a href="/"><AppLogo /></a>
        </div>

        <ul className={css.MenuList}>
        </ul>
      </div>
    );
  }
}