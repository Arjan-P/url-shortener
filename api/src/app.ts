import Fastify, { type FastifyInstance } from "fastify";
import { prismaPlugin } from "./plugins/prisma-plugin.js";
import { zodPlugin } from "./plugins/zod.js";
import { loggerConfig } from "./config/logger.js";
import { routes } from "./routes/routes.js";

export async function buildServer(): Promise<FastifyInstance> {
  const app = Fastify({ logger: loggerConfig });

  // register plugins
  await app.register(prismaPlugin);
  await app.register(zodPlugin);

  // register routes
  await app.register(routes);

  return app;
}
