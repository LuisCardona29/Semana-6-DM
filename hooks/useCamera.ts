import { useCameraPermissions, type PermissionResponse } from 'expo-camera';
import { useCallback, useState } from 'react';
import { Linking } from 'react-native';

export type CameraPermissionState = 'undetermined' | 'granted' | 'denied' | 'blocked';

export type UseCameraResult = {
  permission: PermissionResponse | null;
  status: CameraPermissionState;
  error: string | null;
  loading: boolean;
  requestPermission: () => Promise<PermissionResponse | null>;
  openSettings: () => Promise<void>;
};

export function useCamera(): UseCameraResult {
  const [permission, requestPermissionAction] = useCameraPermissions();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const status: CameraPermissionState = permission
    ? permission.granted
      ? 'granted'
      : permission.canAskAgain
        ? 'denied'
        : 'blocked'
    : 'undetermined';

  const requestPermission = useCallback(async (): Promise<PermissionResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const nextPermission = await requestPermissionAction();

      if (!nextPermission.granted) {
        if (nextPermission.canAskAgain) {
          setError('La cámara fue rechazada. Puedes volver a pedir el permiso cuando quieras.');
        } else {
          setError('La cámara está bloqueada. Abre Ajustes para activarla.');
        }
      }

      return nextPermission;
    } catch (reason: unknown) {
      const message = reason instanceof Error ? reason.message : 'No se pudo solicitar el permiso de cámara.';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [requestPermissionAction]);

  const openSettings = useCallback(async (): Promise<void> => {
    await Linking.openSettings();
  }, []);

  return {
    permission,
    status,
    error,
    loading,
    requestPermission,
    openSettings,
  };
}
