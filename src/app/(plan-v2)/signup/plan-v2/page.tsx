import { Suspense } from "react";
import { PlanContent } from "@/components/plan/plan-content";

export default function PlanV2Page() {
  return (
    <Suspense>
      <PlanContent />
    </Suspense>
  );
}
