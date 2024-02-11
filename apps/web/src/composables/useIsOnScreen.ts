import { Ref, ref, watchEffect } from 'vue';

import { internalGuard } from '@flowx/shared';

export default (elementRef: Ref<HTMLElement>, defaultState = false) => {
  const wnd = internalGuard('IntersectionObserver');

  const isOnScreen = ref(defaultState);

  watchEffect(() => {
    if (!elementRef?.value) {
      return;
    }

    const observer = new wnd.IntersectionObserver((entries) => {
      const [entry] = entries;
      isOnScreen.value = entry.intersectionRatio > 0;
    });

    observer.observe(elementRef.value);

    return () => {
      observer.disconnect();
    };
  });

  return isOnScreen;
};
