import { Suspense } from "react";
import ResearchArchive from "./ResearchArchive";
import { type ResearchReport } from "../../lib/data";

export default function ResearchArchiveWrapper({ reports }: { reports: ResearchReport[] }) {
  return (
    <Suspense fallback={null}>
      <ResearchArchive reports={reports} />
    </Suspense>
  );
}
