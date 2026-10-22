export default function Home() {
  return (
    <main className="min-h-dvh px-4 py-6 sm:px-8 sm:py-8">
      {/* Wordmark per docs/05 §9: the three b's rise 0 / +1 / +2 px like a signal meter. */}
      <h1 className="text-[32px] leading-none font-bold tracking-[-0.03em]">
        jo<span className="inline-block">b</span>
        <span className="inline-block -translate-y-px">b</span>
        <span className="inline-block -translate-y-0.5">b</span>s
      </h1>
    </main>
  );
}
