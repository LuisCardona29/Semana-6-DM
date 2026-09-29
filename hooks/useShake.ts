import { useEffect, useRef, useState } from 'react';
import { Accelerometer } from 'expo-sensors';

type ShakeOptions = {
  threshold?: number;
  cooldownMs?: number;
};

export function useShake(
  onShake: () => void,
  options?: ShakeOptions,
): { isAvailable: boolean | null } {
  const { threshold = 1.8, cooldownMs = 1000 } = options ?? {};
  const callbackRef = useRef(onShake);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    callbackRef.current = onShake;
  }, [onShake]);

  useEffect(() => {
    let cancelled = false;
    let lastShakeAt = 0;
    let subscription: ReturnType<typeof Accelerometer.addListener> | null = null;

    async function subscribe() {
      try {
        const available = await Accelerometer.isAvailableAsync();
        if (cancelled) return;
        setIsAvailable(available);
        if (!available) return;

        Accelerometer.setUpdateInterval(100);
        subscription = Accelerometer.addListener(({ x, y, z }) => {
          const magnitude = Math.sqrt(x * x + y * y + z * z);
          const now = Date.now();
          if (magnitude >= threshold && now - lastShakeAt >= cooldownMs) {
            lastShakeAt = now;
            callbackRef.current();
          }
        });
      } catch {
        if (!cancelled) setIsAvailable(false);
      }
    }

    void subscribe();
    return () => {
      cancelled = true;
      subscription?.remove();
    };
  }, [cooldownMs, threshold]);

  return { isAvailable };
}