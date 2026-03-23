import { z } from 'zod';

export const coinSchema = z.object({
  id: z.string(),
  code: z.string(),
  dirtyCode: z.string(),
  name: z.string(),
  slug: z.string(),
  priceInUSD: z.number().nullable(),
  availableSupply: z.number(),
  totalSupply: z.number(),
  marketCapRank: z.number(),
  // some api returns string for volume24hInUSD
  volume24hInUSD: z.union([z.number(), z.string()]).transform((v) =>
    typeof v === 'string' ? parseFloat(v) : v
  ).nullable(),
  marketCapInUSD: z.number(),
  percentChange1h: z.number().nullable(),
  percentChange24h: z.number().nullable(),
  percentChange7d: z.number().nullable(),
  showDisclaimer: z.boolean(),
});

export const listMetaSchema = z.object({
  success: z.boolean(),
  totalCoinCount: z.number(),
});

export const listResponseCoinSchema = z.object({
  meta: listMetaSchema,
  data: z.array(coinSchema),
});

export const coinDetailResponseSchema = z.object({
  meta: z.object({ success: z.boolean() }),
  data: coinSchema,
});

export type Coin = z.infer<typeof coinSchema>;
export type ListMeta = z.infer<typeof listMetaSchema>;
export type ListResponseCoin = z.infer<typeof listResponseCoinSchema>;
export type CoinDetailResponse = z.infer<typeof coinDetailResponseSchema>;
