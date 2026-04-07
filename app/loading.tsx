import LoadingState from "@/components/shared/loading-state";

export default function Loading() {
  return (
    <main className="min-h-screen px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto w-full max-w-7xl">
        <LoadingState
          title="Loading SiteOrbit"
          description="Preparing your workspace and syncing your product shell."
        />
      </div>
    </main>
  );
}