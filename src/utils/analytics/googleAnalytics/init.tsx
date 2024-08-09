import ReactGA4 from 'react-ga4';
export const InitializeGoogleAnalytics = () => {
  ReactGA4.initialize(`${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`);
};

interface TrackEventParams {
  category?: string;
  action: string;
  label: string;
  page: string;
  params?: Record<string, any>
}

export const TrackGoogleAnalyticsEvent = ({
  category = 'event',
  action,
  label,
  page,
  params = {}
}: TrackEventParams) => {
  const finalParams = {
    ...params,
    /* eslint-disable camelcase */
    event_category: category,
    event_label: label,
    page_title: page,
    /* eslint-enable camelcase */
  };

  if (process.env.NEXT_PUBLIC_BACKEND_URL?.includes('dev.api')) {
    console.log('TrackGoogleAnalyticsEvent called with:', { category, action, label, page, params: finalParams });
  }
  
  ReactGA4.gtag(
    category,
    action,
    finalParams
  );
};
