"use client";

import "@livekit/components-styles";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const getCreatorToken = async () => {
    setLoading(true);
    try {
      const creatorId = "test-creator-id";
      const resp = await fetch(
        `http://localhost:4002/internal/livestream/creators/${creatorId}/create-access-token`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            creatorName: "test-creator",
            title: "Creator's Live stream",
            allowsTips: false,
            allowsComments: true,
            minimumCommentTipAmountInCents: 5000,
          }),
        }
      );
      const data = await resp.json();
      router.push(`/live-stream/creator?token=${data.accessToken}`);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const getFanToken = async () => {
    setLoading(true);
    try {
      const fanId = "test-fan-id";
      const resp = await fetch(
        `http://localhost:4002/internal/livestream/fans/${fanId}/create-access-token`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            creatorId: "test-creator-id",
            fanName: "test-fan",
          }),
        }
      );
      const data = await resp.json();
      router.push(`/live-stream/fan?token=${data.accessToken}`);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (type: "creator" | "fan") => {
    if (type === "creator") getCreatorToken();
    else if (type === "fan") getFanToken();
  };

  return (
    <div className="flex justify-center items-center text-center border h-screen">
      <div className="flex flex-col gap-5">
        {loading ? (
          <>... LOADING</>
        ) : (
          <>
            <div
              className="text-red-800 font-bold cursor-pointer"
              onClick={() => handleClick("creator")}
            >
              <h1>CREATOR</h1>
            </div>

            <div
              className="text-green-800 font-bold cursor-pointer"
              onClick={() => handleClick("fan")}
            >
              <h1>FAN</h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
