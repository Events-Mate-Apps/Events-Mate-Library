export const isEventsMate = (): boolean | null => {
    if (typeof window === 'undefined') return null; // Add this line
    const metaTag: HTMLMetaElement | null = document.querySelector('meta[property="og:site_name"]');
    if (!metaTag) return null;
    return metaTag.content === 'Events-Mate';
  };