export const DIPLOMA_KEYS = {
  list: (page: number = 1, limit: number = 6) =>
    ["diploma-list", page, limit] as const,
} as const;
