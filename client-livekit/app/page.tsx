"use client";

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col gap-5 justify-center align-middle text-center">
      <div className="flex flex-col gap-5 w-[300px] m-auto">
        <a href={`/live-stream`}>
          <h1 className="text-red-500 font-bold">START/JOIN LIVE STREAM</h1>
        </a>
      </div>
    </div>
  );
}
