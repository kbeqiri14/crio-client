import { lazy, Suspense } from 'react';
import { Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { init as SentryInit, reactRouterV5Instrumentation } from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import { env, isOnProduction, SENTRY_DSN } from '@configs/environment';
import history from '@configs/history';
import { PresentationProvider } from '@shared/PresentationView/PresentationContext';
import { SendEmailProvider } from '@shared/SendEmailModal/Context';
import { GlobalSpinner, ThemeProvider } from '@ui-kit';
import { client } from './graphql/client';
import '@styles/main.less';

const AppRoutes = lazy(() => import('./routing'));

if (isOnProduction) {
  SentryInit({
    dsn: SENTRY_DSN,
    integrations: [
      new Integrations.BrowserTracing({
        routingInstrumentation: reactRouterV5Instrumentation(history),
      }),
    ],
    environment: env,
    tracesSampleRate: 1.0,
  });
}

function App() {
  return (
    <ThemeProvider>
      <ApolloProvider client={client}>
        <Router history={history}>
          <SendEmailProvider>
            <PresentationProvider>
              <Suspense fallback={<GlobalSpinner />}>
                <AppRoutes />
              </Suspense>
            </PresentationProvider>
          </SendEmailProvider>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
