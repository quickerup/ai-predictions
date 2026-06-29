import { buildApp } from './app';
import { env } from './config/env.schema';

async function start() {
  // Initialize the Fastify application
  const app = await buildApp();

  try {
    // Start listening on the port and host specified in the environment variables
    await app.listen({
      port: env.PORT,
      host: env.HOST,
    });

    // Handle graceful shutdown for standard termination signals
    const gracefulShutdown = async (signal: string) => {
      app.log.info(`Received ${signal}, shutting down gracefully...`);
      await app.close();
      process.exit(0);
    };

    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

// Execute the boot sequence
start();
