import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

type RouteInfo = {
  id: string;
  name: string;
  corridor: string;
  interval: string;
  status: string;
  active: boolean;
};

const routes: RouteInfo[] = [
  { id: 'r1', name: 'Línea Central', corridor: 'Norte ↔ Centro', interval: 'Cada 8 min', status: 'Operativa', active: true },
  { id: 'r2', name: 'Campus Sur', corridor: 'Parque ↔ Universidad', interval: 'Cada 12 min', status: 'Operativa', active: true },
  { id: 'r3', name: 'Línea Este', corridor: 'Mercado ↔ Biblioteca', interval: 'Cada 10 min', status: 'Mantenimiento', active: false },
  { id: 'r4', name: 'Ronda del Valle', corridor: 'Centro ↔ Salud', interval: 'Cada 15 min', status: 'Operativa', active: true },
];

export default function RoutesScreen() {
  const [query, setQuery] = useState('');

  const filteredRoutes = useMemo(() => {
    return routes.filter((route) => `${route.name} ${route.corridor}`.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>Consulta</Text>
        <Text style={styles.title}>Rutas disponibles</Text>

        <View style={styles.searchBox}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar corredor o línea"
            placeholderTextColor="#8b95a9"
            style={styles.input}
          />
        </View>

        {filteredRoutes.map((route) => (
          <View key={route.id} style={styles.card}>
            <View style={styles.topRow}>
              <Text style={styles.name}>{route.name}</Text>
              <Text style={[styles.status, route.active ? styles.statusActive : styles.statusIdle]}>{route.status}</Text>
            </View>

            <Text style={styles.corridor}>{route.corridor}</Text>
            <Text style={styles.interval}>{route.interval}</Text>

            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Ver detalles</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
    gap: 18,
  },
  eyebrow: {
    color: '#ff6b3d',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    color: '#121a2b',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 4,
  },
  searchBox: {
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  input: {
    color: '#111827',
    fontSize: 15,
    paddingVertical: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: '#121a2b',
    fontSize: 20,
    fontWeight: '800',
  },
  status: {
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
    overflow: 'hidden',
  },
  statusActive: {
    backgroundColor: '#dcfce7',
    color: '#15803d',
  },
  statusIdle: {
    backgroundColor: '#fff7ed',
    color: '#c2410c',
  },
  corridor: {
    marginTop: 8,
    color: '#4b5565',
    fontSize: 14,
    fontWeight: '700',
  },
  interval: {
    marginTop: 6,
    color: '#6b7280',
    fontSize: 13,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#ff6b3d',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '800',
  },
});