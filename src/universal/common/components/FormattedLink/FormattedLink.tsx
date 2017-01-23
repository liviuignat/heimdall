import * as React from 'react';

interface IFormattedLinkProps {
  id: string;
  children: any;
}

export const FormattedLink = (props: IFormattedLinkProps, context) => {
  const {intl: {formatMessage}} = context;
  const {id, children} = props;
  const formattedHref = formatMessage({id});

  return <a {...props} href={formattedHref}>{children}</a>;
};

(FormattedLink as any).contextTypes = {
  intl: React.PropTypes.object.isRequired,
};

export default FormattedLink;
