const defaultDescription: string = [
  'Digital property and facility management from anywhere. Collaborate in real-time, access data anytime.',
  'For real estate professionals, owners, landlords, property managers and facility managers.',
].join(' ');

export function getAppMetadata(language = '', messages = []) {
  const description = messages['App.meta.description'] || defaultDescription;
  const ogDescription = messages['App.meta.og.description'] || 'Property Management simplified.';
  const keywords = 'property, management';

  return {
    title: 'EverReal',
    meta: [
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'description', content: description},
      {name: 'robots', content: 'index,follow'},
      {name: 'Content-Type', content: 'text/html; charset=utf-8'},
      {name: 'Copyright', content: 'info@everreal.co'},
      {name: 'audience', content: 'all'},
      {charset: 'utf-8'},
      {property: 'keywords', content: keywords},
      {property: 'og:site_name', content: 'EverReal'},
      {property: 'og:locale', content: language},
      {property: 'og:title', content: 'EverReal'},
      {property: 'og:description', content: ogDescription},
      {property: 'og:image', content: 'https://s3.eu-central-1.amazonaws.com/s3-production/assets/images/logo/everreal_logo_writing300x300.png'},
      {property: 'og:image:width', content: '300'},
      {property: 'og:image:height', content: '300'},
    ],
  };
}
