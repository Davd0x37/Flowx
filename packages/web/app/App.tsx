import '@/assets/base.css';
import { router } from './routes';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router-dom';
import { ErrorPage } from '@/components/errors/ErrorPage/ErrorPage';
import { Toaster } from '@/components/ui/toaster';
import { StorageThemeKey } from '@/config/constants';
import { I18nextProvider, i18n } from '@/providers/I18nProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClientInstance = new QueryClient();

const App = () => {
  return (
    <Suspense fallback="loading...">
      {/* Error handling provider */}
      <ErrorBoundary FallbackComponent={ErrorPage}>
        {/* Translation provider */}
        <I18nextProvider i18n={i18n}>
          {/* Theme changing provider */}
          <ThemeProvider defaultTheme="dark" storageKey={StorageThemeKey}>
            {/* React query provider */}
            <QueryClientProvider client={queryClientInstance}>
              {/* Notifications component - we can leave it here as it will be used in all layouts */}
              <Toaster />

              {/* Main router outlet for app */}
              <RouterProvider router={router} />

              {/* Dev tools for react query */}
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </ThemeProvider>
        </I18nextProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export default App;