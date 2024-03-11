export const MAPKIT_TOKEN = process.env.NEXT_PUBLIC_MAPKIT_TOKEN ?? '';

let promise: Promise<void> | null = null;

export function loadMapKit(): Promise<void> {
  if (promise) return promise;
  promise = new Promise((resolve) => {
    const script = document.createElement('script');
    script.addEventListener(
      'load',
      () => {
        mapkit.init({
          authorizationCallback: (done) => done(MAPKIT_TOKEN),
        });

        resolve();
      },
      { once: true }
    );
    script.src = 'https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  });
  return promise;
}
