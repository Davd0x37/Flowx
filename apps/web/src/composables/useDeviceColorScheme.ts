import { ref } from 'vue';

export default () => {
  const deviceColorScheme = matchMedia('(prefers-color-scheme: dark)');

  const isDark = ref(deviceColorScheme.matches);
  const abort = new AbortController();

  // Handler for listening on device color scheme change
  const mediaQueryHandler = (ev: MediaQueryListEvent) => {
    isDark.value = ev.matches;
  };

  deviceColorScheme.addEventListener('change', mediaQueryHandler, { signal: abort.signal });

  const unsubscribeMedia = () => abort.abort();

  return {
    isDark,
    unsubscribeMedia,
  };
};
