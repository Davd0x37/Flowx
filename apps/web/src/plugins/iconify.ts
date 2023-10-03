import { addCollection } from '@iconify/vue';

/**
 * Generating icons:
 * https://api.iconify.design/mdi.js?icons=safe&pretty=1&callback=Iconify.addCollection
 * https://api.iconify.design/mdi.json?icons=safe&pretty=1
 */

addCollection({
  prefix: 'mdi',
  lastModified: 1678433397,
  aliases: {},
  width: 24,
  height: 24,
  icons: {
    safe: {
      body: '<path fill="currentColor" d="M4 4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2v1h2v-1h11v1h2v-1a2 2 0 0 0 2-2v-1h1v-2h-1V9h1V7h-1V6a2 2 0 0 0-2-2H4m0 2h15v11H4V6m9.5 1.5a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4M5 9v5h2V9H5m8.5.5a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2Z"/>',
    },
    'alert-circle': {
      body: '<path fill="currentColor" d="M13 13h-2V7h2m0 10h-2v-2h2M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"/>',
    },
    'chevron-down': {
      body: '<path fill="currentColor" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z"/>',
    },
    'chevron-up': {
      body: '<path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6l1.41 1.41Z"/>',
    },
  },
});

export default () => {};
