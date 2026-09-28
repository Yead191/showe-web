import WebNavbar from "@/components/shared/navbar/WebNavbar";
import WebsiteFooter from "./_components/WebsiteFooter";
import getProfile from "@/helpers/next-fetch/getProfile";

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getProfile();
  return (
    <>
      <WebNavbar user={user} />
      {children}
      <WebsiteFooter />
    </>
  );
}
