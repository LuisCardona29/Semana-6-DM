import { useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';

import type { GeoCoords } from '@/contexts/GeoPhotosContext';

export function useGeoLocation(active = true) {
  const [permission, setPermission] = useState<Location.LocationPermissionResponse | null>(null);
  const [coords, setCoords] = useState<GeoCoords | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    Location.getForegroundPermissionsAsync()
      .then((response) => {
        if (!cancelled) setPermission(response);
      })
      .catch((reason: unknown) => {
        if (!cancelled) setError(reason instanceof Error ? reason.message : 'No se pudo consultar el permiso de ubicación.');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const requestPermission = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await Location.requestForegroundPermissionsAsync();
      setPermission(response);
      if (!response.granted) setError('Sin ubicación: puedes seguir usando la cámara.');
      return response;
    } catch (reason: unknown) {
      const message = reason instanceof Error ? reason.message : 'No se pudo solicitar la ubicación.';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!active || !permission?.granted) return;

    let cancelled = false;
    let subscription: Location.LocationSubscription | null = null;

    Location.watchPositionAsync(
      { accuracy: Location.Accuracy.Balanced, timeInterval: 3000, distanceInterval: 5 },
      (location) => {
        if (!cancelled) {
          setCoords({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            accuracy: location.coords.accuracy,
          });
          setError(null);
        }
      },
    )
      .then((nextSubscription) => {
        if (cancelled) {
          nextSubscription.remove();
        } else {
          subscription = nextSubscription;
        }
      })
      .catch((reason: unknown) => {
        if (!cancelled) setError(reason instanceof Error ? reason.message : 'No se pudo iniciar el GPS.');
      });

    return () => {
      cancelled = true;
      subscription?.remove();
      console.log('[useGeoLocation] GPS detenido: pantalla sin foco o desmontada.');
    };
  }, [active, permission?.granted]);

  return { permission, coords, error, loading, requestPermission };
}