import * as React from 'react';

interface ILanguageLinkProps {
  language: string;
  title?: string;
  children?: any;
}

interface ILanguageLinkContext {
  router: any;
}

const LanguageLink = ({children, language, title = ''}: ILanguageLinkProps, {router}: ILanguageLinkContext) => {
  const baseRoute = getCurrentRoute(router) || '/login';

  // Ensure that the href is formatted correctly
  const baseRouteParts = baseRoute.split('/').filter(part => !!part);
  const href = ['', language, ...baseRouteParts].join('/');

  return <a href={href} title={title}>{children}</a>;
};
(LanguageLink as any).contextTypes = {
  router: React.PropTypes.object,
};

function getCurrentRoute(router): string {
  let defaultRoute = '';

  if (router && router.params && router.getCurrentLocation) {
    const {pathname} = router.getCurrentLocation();
    const {language} = router.params;

    // On the server the basepath === "", so we have to trim the language parameter from the current location
    if (__SERVER__) {
      defaultRoute = pathname.replace(`/${language}`, '');
    }

    // On the client the basepath === "/${language}", so we can read the pathname directly
    if (__CLIENT__ ) {
      defaultRoute = pathname;
    }
  }

  return defaultRoute;
}

export default LanguageLink;
