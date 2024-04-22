"use client";

import "@livekit/components-styles";
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  ControlBar,
  useTracks,
} from "@livekit/components-react";
import { Room, RoomEvent, Track } from "livekit-client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [room] = useState(new Room());

  if (!token) {
    return <div>Getting token from backend. Please wait...</div>;
  }

  const onConnection = () => {
    console.log("HIT");
    room.on(RoomEvent.DataReceived, (data: any) => {
      console.log("HIT", data);
      const decoder = new TextDecoder();
      const decodedData = decoder.decode(data);
      console.log(JSON.parse(decodedData));
    });
  };

  return (
    <LiveKitRoom
      room={room}
      onConnected={onConnection}
      video={true}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
      style={{ height: "100dvh" }}
    >
      <MyVideoConference />
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
