import { PrismaClient } from "@prisma/client";

// Seed file has has access to a prisma client instance, but it is a one off
// script. We want to avoid importing other files from our app in scripts.

// So export a prisma client that can be used everywhere, here.

export default new PrismaClient();
