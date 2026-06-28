"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function SuccessActions({
  receipt,
}: {
  receipt: { plan: string; billing: string; amount: string; trx: string; date: string };
}) {
  const router = useRouter();

  function downloadReceipt() {
    const lines = [
      "ASTERIO — PAYMENT RECEIPT",
      "(demo / test mode — no real charge)",
      "",
      `Transaction ID:  ${receipt.trx}`,
      `Date:            ${receipt.date}`,
      `Plan:            ${receipt.plan}`,
      `Billing:         ${receipt.billing}`,
      `Amount paid:     AED ${receipt.amount}`,
      "",
      "Thank you for joining Asterio.",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `asterio-receipt-${receipt.trx}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex w-full flex-col gap-xl">
      <Button variant="primary" fullWidth onClick={() => router.push("/dashboard")}>
        Go to dashboard
      </Button>
      <Button variant="secondary" fullWidth onClick={downloadReceipt}>
        Download receipt
      </Button>
    </div>
  );
}
