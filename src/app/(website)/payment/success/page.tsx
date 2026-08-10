import PaymentSuccess from "@/features/web-pages/payment/PaymentSuccess";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Payment Successful",
  description: "Your payment was completed successfully on SHOWE.",
  path: "/payment/success",
  noIndex: true,
});

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;

  return <PaymentSuccess type={type} />;
}
