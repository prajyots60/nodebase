import { NodeStatus } from "@/components/react-flow/node-status-indicator";
import { Realtime } from "inngest";
import { useRealtime } from "inngest/react";
import { useEffect, useState } from "react";

interface UseNodeStatusOptions {
  nodeId: string;
  channel: string;
  topic: string;
  refreshToken: () => Promise<any>;
}

export function useNodeStatus({
  nodeId,
  channel,
  topic,
  refreshToken,
}: UseNodeStatusOptions) {
  const [status, setStatus] = useState<NodeStatus>("initial");

  const { messages } = useRealtime({
    token: refreshToken,
    channel,
    topics: [topic],
    enabled: true,
  });

  useEffect(() => {
    const allMessages = messages.all;
    if (!allMessages?.length) {
      return;
    }

    // Find the latest message for this node
    const latestMessage = allMessages
      .filter(
        (msg: any) =>
          msg.kind === "data" &&
          msg.channel === channel &&
          msg.topic === topic &&
          msg.data.nodeId === nodeId,
      )
      .sort((a: any, b: any) => {
        if (a.kind === "data" && b.kind === "data") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        return 0;
      })[0] as any;

    if (latestMessage && latestMessage.kind === "data") {
      setStatus(latestMessage.data.status as NodeStatus);
    }
  }, [messages.all, nodeId, channel, topic]);

  return status;
}
