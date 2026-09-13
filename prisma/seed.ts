import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { CATALOG } from "../src/lib/catalog";
import { JOURNAL_POSTS } from "../src/lib/journal-posts";

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL || "hello@thelifestylefresh.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "changeme-on-railway";

  const passwordHash = await hash(password, 12);

  await prisma.houseConfig.upsert({
    where: { id: "house" },
    update: {},
    create: { id: "house", memberCap: Number(process.env.MEMBER_CAP ?? 40) },
  });

  await prisma.user.upsert({
    where: { email },
    update: { role: "ADMIN", passwordHash, name: "Editor" },
    create: { email, passwordHash, name: "Editor", role: "ADMIN" },
  });

  // Local convenience: a regular member account so you can sign in at /login
  // without running a Stripe checkout. Only seeded outside production.
  if (process.env.NODE_ENV !== "production") {
    const memberEmail = (process.env.MEMBER_EMAIL || "member@thelifestylefresh.com").toLowerCase();
    const memberPassword = process.env.MEMBER_PASSWORD || "member-changeme";
    const memberHash = await hash(memberPassword, 12);
    await prisma.user.upsert({
      where: { email: memberEmail },
      update: {
        passwordHash: memberHash,
        name: "A Member",
        role: "MEMBER",
        addressLine1: "1 Library Way",
        city: "Portland",
        state: "OR",
        postalCode: "97201",
      },
      create: {
        email: memberEmail,
        passwordHash: memberHash,
        name: "A Member",
        role: "MEMBER",
        addressLine1: "1 Library Way",
        city: "Portland",
        state: "OR",
        postalCode: "97201",
      },
    });
  }

  await prisma.invite.upsert({
    where: { code: "FRESH-FOUNDING" },
    update: {},
    create: {
      code: "FRESH-FOUNDING",
      note: "Founding desk invite",
      maxUses: 25,
    },
  });

  for (const [index, item] of CATALOG.entries()) {
    await prisma.catalogItem.upsert({
      where: { slug: item.slug },
      update: {
        name: item.name,
        category: item.category,
        description: item.description,
        monthly: item.monthly,
        featured: item.featured,
        sortOrder: index,
      },
      create: {
        slug: item.slug,
        name: item.name,
        category: item.category,
        description: item.description,
        monthly: item.monthly,
        featured: item.featured,
        sortOrder: index,
      },
    });
  }

  for (const post of JOURNAL_POSTS) {
    const publishedAt = new Date(`${post.publishedAt}T12:00:00.000Z`);
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        coverTone: post.coverTone,
        published: true,
        publishedAt,
      },
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        coverTone: post.coverTone,
        published: true,
        publishedAt,
      },
    });
  }

  const edition = await prisma.edition.upsert({
    where: { month_year: { month: 9, year: 2026 } },
    update: {
      title: "September — first seal",
      letter:
        "Welcome to the desk. This month the envelope leans warm: a beauty ritual, a lemon-bright recipe, pink and blue hearts, a map fragment, and a letter you can keep under a book.",
      published: true,
    },
    create: {
      month: 9,
      year: 2026,
      title: "September — first seal",
      letter:
        "Welcome to the desk. This month the envelope leans warm: a beauty ritual, a lemon-bright recipe, pink and blue hearts, a map fragment, and a letter you can keep under a book.",
      published: true,
    },
  });

  const editionItems = [
    { category: "Letter", name: "September letter", description: "From the desk, folded once." },
    { category: "Beauty", name: "Five-step evening card", description: "A dressing-table ritual." },
    { category: "Recipe", name: "Lemon salmon for two", description: "Weeknight, citrus, one pan." },
    { category: "Encouragement", name: "A note for the first week", description: "Keep it in a wallet." },
    { category: "Crochet", name: "Pink & blue hearts", description: "A pair, handmade." },
    { category: "Postcards", name: "Two postcards to send", description: "One map, one still life." },
    { category: "Art", name: "Mini print — envelope study", description: "For the pinboard." },
    { category: "Fun", name: "Scratch-off line", description: "A sentence under the silver." },
    { category: "Stickers", name: "Dymo + wax-seal stickers", description: "Use them." },
    { category: "Inspiration", name: "Gratitude prompt card", description: "Three lines, no app." },
  ];

  const existing = await prisma.editionItem.count({ where: { editionId: edition.id } });
  if (existing === 0) {
    await prisma.editionItem.createMany({
      data: editionItems.map((item, sortOrder) => ({
        ...item,
        editionId: edition.id,
        sortOrder,
      })),
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
