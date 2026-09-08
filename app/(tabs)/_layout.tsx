import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return <Tabs screenOptions={({ route }) => ({ headerShown: false, tabBarActiveTintColor: '#53664D', tabBarInactiveTintColor: '#8B8B84', tabBarStyle: { height: 68, paddingTop: 7, borderTopColor: '#E6E4DE', backgroundColor: '#FCFCFA' }, tabBarLabelStyle: { fontWeight: '700', fontSize: 11 }, tabBarIcon: ({ color, focused }) => {
    const icons: Record<string, keyof typeof Ionicons.glyphMap> = { index: focused ? 'home' : 'home-outline', routes: focused ? 'navigate' : 'navigate-outline', pass: focused ? 'card' : 'card-outline' };
    return <Ionicons name={icons[route.name]} size={22} color={color} />;
  } })}>
    <Tabs.Screen name="index" options={{ title: 'Inicio' }} />
    <Tabs.Screen name="routes" options={{ title: 'Rutas' }} />
    <Tabs.Screen name="pass" options={{ title: 'Mi pase' }} />
  </Tabs>;
}
