import { prisma } from "./db";

const SHARE_PREFIX = "LF-SHARE";
const FRAGMENT_LEN = 6;
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I, O, 0, 1 — readable when printed

function fragment(): string {
  let out = "";
  const bytes = new Uint8Array(FRAGMENT_LEN);
  crypto.getRandomValues(bytes);
  for (let i = 0; i < FRAGMENT_LEN; i++) {
    out += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return out;
}

export function makeShareCode(): string {
  return `${SHARE_PREFIX}-${fragment()}`;
}

/**
 * Mint `count` one-time-use share codes, attributed to an edition.
 * Retries on the (very unlikely) code collision. Codes are not locked
 * to any email — a member can hand any of them to any friend.
 */
export async function generateShareCodes(count: number, editionId: string): Promise<string[]> {
  const total = Math.max(0, Math.floor(count));
  const created: string[] = [];
  let attempts = 0;
  const maxAttempts = total * 3 + 10;

  while (created.length < total && attempts < maxAttempts) {
    attempts++;
    const batch = Math.min(total - created.length, 200);
    const codes = new Set<string>();
    while (codes.size < batch) codes.add(makeShareCode());

    // De-dupe against codes we've already created this run + the DB.
    const existing = await prisma.invite.findMany({
      where: { code: { in: [...codes] } },
      select: { code: true },
    });
    const taken = new Set<string>([...created, ...existing.map((i) => i.code)]);
    const fresh = [...codes].filter((c) => !taken.has(c));

    if (fresh.length) {
      await prisma.invite.createMany({
        data: fresh.map((code) => ({
          code,
          maxUses: 1,
          issuedByEditionId: editionId,
        })),
      });
      created.push(...fresh);
    }
  }

  return created;
}
