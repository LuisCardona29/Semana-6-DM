import { CameraView } from 'expo-camera';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useCamera } from '@/hooks/useCamera';
import { useGeoLocation, type PermissionRequestState } from '@/hooks/useGeoLocation';
import { useShake } from '@/hooks/useShake';

function formatPermission(status: PermissionRequestState): string {
  switch (status) {
    case 'granted':
      return 'Concedido';
    case 'denied':
      return 'Rechazado';
    case 'blocked':
      return 'Bloqueado';
    default:
      return 'Pendiente';
  }
}

export default function PassScreen() {
  const [shakeCount, setShakeCount] = useState(0);
  const geoLocation = useGeoLocation();
  const camera = useCamera();
  const { isAvailable } = useShake(() => {
    setShakeCount((current) => current + 1);
  }, { threshold: 1.8, cooldownMs: 1000 });

  const isBlocked = geoLocation.status === 'blocked' || camera.status === 'blocked';
  const statusMessage = geoLocation.error ?? camera.error ?? 'Los permisos están listos para usar la app.';

  const handleRequestPermissions = async (): Promise<void> => {
    await geoLocation.requestPermission();
    await camera.requestPermission();
  };

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Mi pase digital</Text>
        <Text style={styles.title}>RutaGo Pro</Text>

        <View style={styles.codeBox}>
          <Text style={styles.code}>RGO-8421</Text>
        </View>

        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Vigencia</Text>
            <Text style={styles.value}>30 días</Text>
          </View>
          <View>
            <Text style={styles.label}>Saldo</Text>
            <Text style={styles.value}>$18.50</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Último uso</Text>
          <Text style={styles.infoValue}>Hoy, 08:20</Text>
        </View>
      </View>

      <View style={styles.permissionsCard}>
        <Text style={styles.sectionTitle}>Permisos del dispositivo</Text>

        <View style={styles.permissionRow}>
          <Text style={styles.permissionLabel}>Ubicación</Text>
          <Text style={styles.permissionValue}>{formatPermission(geoLocation.status)}</Text>
        </View>

        <View style={styles.permissionRow}>
          <Text style={styles.permissionLabel}>Cámara</Text>
          <Text style={styles.permissionValue}>{formatPermission(camera.status)}</Text>
        </View>

        <Text style={styles.statusText}>{statusMessage}</Text>

        {camera.status === 'granted' ? (
          <View style={styles.cameraContainer}>
            <CameraView style={styles.cameraPreview} facing="back" />
          </View>
        ) : null}

        <Pressable style={styles.primaryButton} onPress={() => { void handleRequestPermissions(); }}>
          <Text style={styles.primaryButtonText}>Solicitar permisos</Text>
        </Pressable>

        {isBlocked ? (
          <Pressable
            style={styles.secondaryButton}
            onPress={() => {
              if (geoLocation.status === 'blocked') {
                void geoLocation.openSettings();
                return;
              }
              void camera.openSettings();
            }}
          >
            <Text style={styles.secondaryButtonText}>Abrir Ajustes</Text>
          </Pressable>
        ) : null}
      </View>

      <View style={styles.permissionsCard}>
        <Text style={styles.sectionTitle}>Sensor de movimiento</Text>
        <Text style={styles.statusText}>
          {isAvailable === true
            ? 'Acelerómetro disponible'
            : isAvailable === false
              ? 'Acelerómetro no disponible'
              : 'Comprobando sensor...'}
        </Text>
        <Text style={styles.shakeText}>Sacudidas registradas: {shakeCount}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    backgroundColor: '#f5f7fb',
    padding: 20,
    gap: 18,
  },
  card: {
    backgroundColor: '#121a2b',
    borderRadius: 26,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
  },
  eyebrow: {
    color: '#d7dff2',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 8,
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
  },
  codeBox: {
    marginTop: 22,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  code: {
    color: '#121a2b',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
  },
  row: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: '#d7dff2',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  value: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 6,
  },
  infoRow: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#2c3347',
    paddingTop: 16,
  },
  infoLabel: {
    color: '#d7dff2',
    fontSize: 12,
    fontWeight: '700',
  },
  infoValue: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  permissionsCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  sectionTitle: {
    color: '#121a2b',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 12,
  },
  permissionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  permissionLabel: {
    color: '#4b5565',
    fontSize: 14,
    fontWeight: '700',
  },
  permissionValue: {
    color: '#121a2b',
    fontSize: 14,
    fontWeight: '800',
  },
  statusText: {
    marginTop: 10,
    color: '#4b5565',
    fontSize: 14,
    lineHeight: 20,
  },
  cameraContainer: {
    overflow: 'hidden',
    borderRadius: 18,
    height: 220,
    marginTop: 18,
    backgroundColor: '#0f172a',
  },
  cameraPreview: {
    flex: 1,
  },
  primaryButton: {
    marginTop: 18,
    backgroundColor: '#ff6b3d',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
  secondaryButton: {
    marginTop: 12,
    backgroundColor: '#121a2b',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
  shakeText: {
    marginTop: 8,
    color: '#121a2b',
    fontSize: 16,
    fontWeight: '700',
  },
});