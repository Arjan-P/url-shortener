export const ERROR_CODES = [
  // Generic
  "NOT_FOUND",
  "BAD_REQUEST",
  "VALIDATION_ERROR",
  "INTERNAL_SERVER_ERROR",
] as const;

export type ErrorCode = (typeof ERROR_CODES)[number];
