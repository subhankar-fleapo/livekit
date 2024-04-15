"use client";

import "@livekit/components-styles";
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  ControlBar,
  useTracks,
  useParticipants,
  ParticipantLoop,
  ParticipantName,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [token, setToken] = useState("");
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(`http://localhost:8080/livekit/create-token`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ participantName: name }),
        });
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []); // eslint-disable-line

  if (token === "") {
    return <div>Getting token from backend. Please wait...</div>;
  }

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
      style={{ height: "100dvh" }}
    >
      <MyVideoConference />
      <ParticipantList />
      <RoomAudioRenderer />
      <ControlBar />
    </LiveKitRoom>
  );
}

function MyVideoConference() {
  const tracks = useTracks([Track.Source.Camera]);
  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}

function ParticipantList() {
  const participants = useParticipants();
  return (
    <ParticipantLoop participants={participants}>
      <ParticipantName />
    </ParticipantLoop>
  );
}
