import { lazy, Suspense } from 'react';
import { ApolloProvider } from '@apollo/client';
import { init as SentryInit, reactRouterV5Instrumentation } from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { Router } from 'react-router-dom';
import { PresentationProvider } from '@shared/PresentationView';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import { env, isOnProduction, SENTRY_DSN } from '@configs/environment';
import history from '@configs/history';
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
    <ApolloProvider client={client}>
      <Router history={history}>
        <PresentationProvider>
          <Suspense fallback={<GlobalSpinner />}>
            <AppRoutes />
          </Suspense>
        </PresentationProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
