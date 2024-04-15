"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  return (
    <div className="h-screen w-full flex flex-col gap-5 justify-center align-middle text-center">
      <div className="flex flex-col gap-5 w-[300px] m-auto">
        <input
          placeholder="Enter your name"
          className="bg-gray-300"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <a href={`/live-stream?name=${name}`}>
          <h1 className="text-red-600 font-bold">START LIVE STREAM</h1>
        </a>
      </div>
    </div>
  );
}
