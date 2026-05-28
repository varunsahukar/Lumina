import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const DEMO_USER_EMAIL = "demo.investor@luminavest.local";

export async function getActiveUserId({ allowDemo = true } = {}) {
  const session = await auth();
  const sessionUserId = (session?.user as { id?: string } | undefined)?.id;

  if (sessionUserId) {
    return sessionUserId;
  }

  return allowDemo ? getDemoUserId() : null;
}

export async function getDemoUserId() {
  const user = await prisma.user.upsert({
    where: { email: DEMO_USER_EMAIL },
    update: {
      name: "Lumina Demo Investor",
      role: "INVESTOR",
      kycStatus: "VERIFIED",
    },
    create: {
      email: DEMO_USER_EMAIL,
      name: "Lumina Demo Investor",
      role: "INVESTOR",
      kycStatus: "VERIFIED",
    },
  });

  return user.id;
}
