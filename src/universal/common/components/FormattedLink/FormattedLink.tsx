import * as React from 'react';

interface IFormattedLinkProps {
  id?: string;
  href?: string;
  children?: any;
}

export const FormattedLink = (props: IFormattedLinkProps, context) => {
  const {intl: {formatMessage, locale}} = context;
  const {id, href, children} = props;
  let formattedHref = '';
  if (id) {
    formattedHref = formatMessage({id});
  } else if (href) {
    const urlParts = [locale, ...href.split('/')].filter(part => !!part);
    formattedHref = `/${urlParts.join('/')}`;
  }

  return <a {...props} href={formattedHref}>{children}</a>;
};

(FormattedLink as any).contextTypes = {
  intl: React.PropTypes.object.isRequired,
};

export default FormattedLink;
