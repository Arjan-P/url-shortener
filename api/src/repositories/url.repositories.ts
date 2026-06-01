import type postgres from "postgres";

export class UrlRepository {
  constructor(private readonly db: postgres.Sql) {}

  async findByCode(code: string) {
    const rows = await this.db`
      SELECT *
      FROM urls
      WHERE code = ${code}
      LIMIT 1
    `;

    return rows[0] ?? null;
  }

  async findByLongUrl(longUrl: string) {
    const rows = await this.db`
      SELECT *
      FROM urls
      WHERE long_url = ${longUrl}
      LIMIT 1
    `;

    return rows[0] ?? null;
  }

  async create(data: { id: string; code: string; longUrl: string }) {
    const rows = await this.db`
      INSERT INTO urls (
        id,
        code,
        long_url
      )
      VALUES (
        ${data.id},
        ${data.code},
        ${data.longUrl}
      )
      RETURNING *
    `;

    return rows[0];
  }
}
