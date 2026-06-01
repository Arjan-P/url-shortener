import fp from "fastify-plugin";
import postgres from "postgres";
import { env } from "../config/env/env.js";

declare module "fastify" {
  interface FastifyInstance {
    db: ReturnType<typeof postgres>;
  }
}

export const dbPlugin = fp(async (app) => {
  const db = postgres(env.DATABASE_URL, {
    max: 10,
    idle_timeout: 20,
  });
  app.decorate("db", db);
  app.addHook("onClose", async () => db.end());
});
