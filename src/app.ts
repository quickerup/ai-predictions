import Fastify from 'fastify';
import authPlugin from './plugins/auth';
import errorHandler from './plugins/errorHandler';
import accountRoutes from './modules/account/account.routes';
import predictorRoutes from './modules/predictor/predictor.routes';
import categoryRoutes from './modules/category/category.routes';
import predictionRoutes from './modules/prediction/prediction.routes';

export async function buildApp() {
  const server = Fastify({
    logger: {
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      transport:
        process.env.NODE_ENV !== 'production'
          ? {
              target: 'pino-pretty',
              options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
              },
            }
          : undefined,
    },
  });

  // 1. Register Plugins
  await server.register(errorHandler);
  await server.register(authPlugin);

  // 2. Register Routes
  await server.register(accountRoutes, { prefix: '/api/v1/accounts' });
  await server.register(predictorRoutes, { prefix: '/api/v1/predictors' });
  await server.register(categoryRoutes, { prefix: '/api/v1/categories' });
  await server.register(predictionRoutes, { prefix: '/api/v1/predictions' });

  return server;
}

export default buildApp;
