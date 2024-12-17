import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const refreshToken = (await cookies()).get("refreshToken");

  if (!refreshToken) {
    redirect("/auth/signin");
  }

  return <>{children}</>;
}
