import BuilderPageClient from "@/components/builder/builder-page-client";
import { Button } from "@/components/ui/button";

export default function BuilderPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
            Visual builder
          </p>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5]">
            Compose your digital canvas.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#bbcac6]">
            Arrange page sections, refine copy, preview layouts, and move from draft to publish with a focused studio workflow.
          </p>
        </div>

        <Button
          variant="outline"
          className="h-12 rounded-md border-white/8 bg-transparent px-5 text-[#dee2f5]"
        >
          Builder Guide
        </Button>
      </section>

      <BuilderPageClient />
    </div>
  );
}