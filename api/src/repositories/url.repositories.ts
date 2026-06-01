import type { PostgresDb } from "@fastify/postgres";

export class UrlRepository {
  constructor(private readonly db: PostgresDb) {}

  async findByCode(code: string) {
    const result = await this.db.query(
      `
        SELECT *
        FROM urls
        WHERE code = $1
        LIMIT 1
      `,
      [code],
    );

    return result.rows[0] ?? null;
  }

  async findByLongUrl(longUrl: string) {
    const result = await this.db.query(
      `
        SELECT *
        FROM urls
        WHERE long_url = $1
        LIMIT 1
      `,
      [longUrl],
    );

    return result.rows[0] ?? null;
  }

  async create(data: { id: string; code: string; longUrl: string }) {
    const result = await this.db.query(
      `
        INSERT INTO urls (
          id,
          code,
          long_url
        )
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [data.id, data.code, data.longUrl],
    );

    return result.rows[0];
  }
}
