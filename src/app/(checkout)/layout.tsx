// Checkout / payment-result screens render their own full-page layout, so this
// group layout is a thin pass-through (no onboarding marketing panel or steps).
export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen w-full bg-primary">{children}</div>;
}
