import type { ErrorCode } from "../errors/codes.js";
import type { ErrorResponse } from "../schemas/response.schemas.js";

export function ok<T>(data: T, message?: string) {
  return {
    success: true as const,
    data,
    meta: message ? { message } : undefined,
  };
}

export function fail(
  code: ErrorCode,
  message: string,
  details?: unknown,
): ErrorResponse {
  return {
    success: false as const,
    error: {
      code,
      message,
      details,
    },
  };
}
