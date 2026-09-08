import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F7F7F4' } }}>
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="student/[id]" options={{ headerShown: true, title: 'Perfil de estudiante', headerTintColor: '#292A27', headerStyle: { backgroundColor: '#F7F7F4' }, headerShadowVisible: false }} />
    <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: true, title: 'Estado del servicio', headerTintColor: '#292A27', headerStyle: { backgroundColor: '#F7F7F4' }, headerShadowVisible: false }} />
  </Stack>;
}
