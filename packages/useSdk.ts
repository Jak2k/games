// @ts-expect-error
import { useState, useEffect, useCallback } from "react";

export type GameState<CustomData> = {
  score: number;
  highScore: number;
  customData: Partial<CustomData>;
};

export default function useSdk<CustomData>(
  recoverGame: (gameState: GameState<CustomData>) => void
): { updateGameState: (gameState: GameState<CustomData>) => void } {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [sdkInitialized, setSdkInitialized] = useState(false);

  const handleMessage = useCallback((event: MessageEvent) => {
    if (event.data?.type === "recoverGame") {
      recoverGame({
        score: event.data.score || 0,
        highScore: event.data.highScore || 0,
        customData: event.data.customData || {},
      });
      setSdkInitialized(true);

      event.source?.postMessage(
        { type: "recoverGame" },
        { targetOrigin: event.origin }
      );
    }
  }, []);

  const updateGameState = useCallback(
    (gameState: GameState<CustomData>) => {
      if (!sdkInitialized) return;

      window.parent.postMessage(
        {
          type: "updateGameState",
          score: gameState.score,
          highScore: gameState.highScore,
          customData: gameState.customData,
        },
        "*"
      );
    },
    [sdkInitialized, window.parent]
  );

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    setSdkLoaded(true);

    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  useEffect(() => {
    if (!sdkLoaded) return;
    window.parent.postMessage({ type: "iframeLoaded" }, "*");
  }, [sdkLoaded]);

  return { updateGameState };
}
