"use client";

import { useRBBT } from "rbbt-client/next";
import { useEffect } from "react";

export default function DashboardPage() {
  const { createDisposableQueue, convertByteArrayToJSON } = useRBBT();

  useEffect(() => {
    const q = createDisposableQueue("ai", "hi");
    if (q) {
      q.subscribe({ noAck: true }, (msg) => {
        const obj = convertByteArrayToJSON(msg.body as Uint8Array);
        console.log(obj);
      });
    }
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Dashboard</h1>
      <p className="text-lg">This is where you can manage your content.</p>
    </div>
  );
}
