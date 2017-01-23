import * as React from 'react';

interface IFormattedLinkProps {
  children: any;
}

export default (props: IFormattedLinkProps) => {
  const css = require('./ErrorMessage.scss');
  const {children} = props;

  return <span {...props} className={css.ErrorMessage}>{children}</span>;
};
