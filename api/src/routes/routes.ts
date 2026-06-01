import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { ZodTypeProvider } from "@fastify/type-provider-zod";
import { nanoid } from "nanoid";
import { successResponse } from "../schemas/response.schemas.js";
import { ok } from "../lib/response.js";
import { UrlRepository } from "../repositories/url.repositories.js";

export const routes: FastifyPluginAsync = async (fastify) => {
  const repo = new UrlRepository(fastify.db);
  const app = fastify.withTypeProvider<ZodTypeProvider>();
  app.post(
    "/shorten",
    {
      schema: {
        body: z.object({
          url: z.url(),
        }),
        response: {
          201: successResponse(
            z.object({
              url: z.url(),
            }),
          ),
        },
      },
    },
    async (req, reply) => {
      const existing = await repo.findByLongUrl(req.body.url);
      if (existing) {
        return reply.code(201).send(
          ok({
            url: `${req.protocol}://${req.headers.host}/${existing.code}`,
          }),
        );
      }

      const shortCode = nanoid(7);
      const created = await repo.create({
        id: crypto.randomUUID(),
        code: shortCode,
        longUrl: req.body.url,
      });

      return reply.code(201).send(
        ok({
          url: `${req.protocol}://${req.headers.host}/${created.code}`,
        }),
      );
    },
  );

  app.get(
    "/:code",
    {
      schema: {
        params: z.object({ code: z.string() }),
      },
    },
    async (req, reply) => {
      const existing = await repo.findByCode(req.params.code);

      if (!existing) {
        return reply.code(404).send({
          message: "Not found",
        });
      }

      return reply.redirect(existing.long_url);
    },
  );
};
