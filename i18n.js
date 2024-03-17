import hoistNonReactStatics from 'hoist-non-react-statics';

const i18nConfig = {
  locales: ['en', 'sk', 'cs'],
  defaultLocale: 'en',
  pages: {
    '*': ['common', 'auth', 'aboutApp', 'landing', 'pricing'],
    '/': ['landing', 'vendors'],
    'rgx:^/app': ['guests', 'budget', 'vendors', 'wedding', 'timelines', 'common'],
    'rgx:^/app/vendors': ['vendors', 'landing', 'edit', 'common'],
    'rgx:^/vendors': ['vendors', 'landing'],
    'rgx:^/auth': ['auth', 'common'],
    'rgx:^/wedding': ['wedding', 'guests'],
    'rgx:^/main/pricing': ['pricing', 'landing'],
    'rgx:^/main/*': ['pricing', 'landing', 'aboutApp'],
    'rgx:^/app/vendors/edit': ['edit'],
    'rgx:^/app/statistics': ['stats'],
  },
  staticsHoc: hoistNonReactStatics,
};

export default i18nConfig;