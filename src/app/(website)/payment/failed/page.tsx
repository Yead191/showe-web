import PaymentFailed from "@/features/web-pages/payment/PaymentFailed";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Payment Failed",
  description: "Your payment could not be completed on SHOWE.",
  path: "/payment/failed",
  noIndex: true,
});

export default async function PaymentFailedPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;

  return <PaymentFailed type={type} />;
}
