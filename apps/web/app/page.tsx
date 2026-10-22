export default function Home() {
  return (
    <main className="min-h-dvh px-4 py-6 sm:px-8 sm:py-8">
      <h1 className="font-wordmark text-[32px] leading-none font-bold tracking-[-0.03em]">
        <span className="sr-only">jobbbs</span>
        {/* Wordmark per docs/05 §9: the three b's rise 0 / +1 / +2 px like a signal meter. */}
        <span aria-hidden="true">
          jo<span className="inline-block">b</span>
          <span className="inline-block -translate-y-px">b</span>
          <span className="inline-block -translate-y-0.5">b</span>s
        </span>
      </h1>
    </main>
  );
}
