import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { ZodTypeProvider } from "@fastify/type-provider-zod";
import { nanoid } from "nanoid";
import { successResponse } from "../schemas/response.schemas.js";
import { ok } from "../lib/response.js";

export const routes: FastifyPluginAsync = async (fastify) => {
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
      const existing = await req.server.prisma.urls.findUnique({
        where: {
          long_url: req.body.url,
        },
      });

      if (existing) {
        return reply.code(201).send(
          ok({
            url: `${req.protocol}://${req.headers.host}/${existing.code}`,
          }),
        );
      }

      const shortCode = nanoid(7);
      const created = await req.server.prisma.urls.create({
        data: {
          id: crypto.randomUUID(),
          code: shortCode,
          long_url: req.body.url,
        },
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
      const record = await req.server.prisma.urls.findUnique({
        where: {
          code: req.params.code,
        },
      });

      if (!record) {
        return reply.code(404).send({
          message: "Not found",
        });
      }

      return reply.redirect(record.long_url);
    },
  );
};
