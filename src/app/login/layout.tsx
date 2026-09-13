import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Members sign in",
  description: "Sign in to The Lifestyle Fresh membership page.",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
