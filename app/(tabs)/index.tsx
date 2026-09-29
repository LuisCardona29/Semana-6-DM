import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

type Shuttle = {
  id: string;
  name: string;
  route: string;
  pickup: string;
  nextStop: string;
  eta: string;
  status: 'En tránsito' | 'Listo' | 'A tiempo';
  accent: string;
  avatar: string;
};

const shuttleList: Shuttle[] = [
  {
    id: '1',
    name: 'Ana García',
    route: 'Línea Central',
    pickup: 'Terminal norte',
    nextStop: 'Plaza Mayor',
    eta: '7 min',
    status: 'En tránsito',
    accent: '#ff6b3d',
    avatar: 'AG',
  },
  {
    id: '2',
    name: 'Mateo Ruiz',
    route: 'Campus Sur',
    pickup: 'Parque del Sol',
    nextStop: 'Estación 2',
    eta: '12 min',
    status: 'Listo',
    accent: '#3b82f6',
    avatar: 'MR',
  },
  {
    id: '3',
    name: 'Sofía Vega',
    route: 'Línea Este',
    pickup: 'Mercado',
    nextStop: 'Biblioteca',
    eta: '9 min',
    status: 'A tiempo',
    accent: '#10b981',
    avatar: 'SV',
  },
  {
    id: '4',
    name: 'Lucas Pérez',
    route: 'Ronda del Valle',
    pickup: 'Calle Real',
    nextStop: 'Centro de salud',
    eta: '15 min',
    status: 'En tránsito',
    accent: '#8b5cf6',
    avatar: 'LP',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [clock, setClock] = useState('07:42');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setClock(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  const filteredShuttles = useMemo(() => {
    return shuttleList.filter((item) => {
      const target = `${item.name} ${item.route} ${item.nextStop}`.toLowerCase();
      return target.includes(search.toLowerCase());
    });
  }, [search]);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.eyebrow}>RutaGo</Text>
            <Text style={styles.title}>Próximos shuttles</Text>
          </View>
          <View style={styles.clockBox}>
            <Text style={styles.clock}>{clock}</Text>
          </View>
        </View>

        <View style={styles.searchBox}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Buscar personas, rutas o paradas"
            placeholderTextColor="#8b95a9"
            style={styles.input}
          />
        </View>

        <Pressable style={styles.alertCard} onPress={() => router.push('/modal' as never)}>
          <View>
            <Text style={styles.alertLabel}>Estado del servicio</Text>
            <Text style={styles.alertTitle}>Todo operativo</Text>
            <Text style={styles.alertText}>Sin incidencias en la red de transporte.</Text>
          </View>
          <Text style={styles.alertIcon}>→</Text>
        </Pressable>

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>En ruta</Text>
          <Text style={styles.sectionMeta}>{filteredShuttles.length} activos</Text>
        </View>

        {filteredShuttles.map((item) => (
          <Pressable
            key={item.id}
            style={styles.card}
            onPress={() => router.push({ pathname: '/student/[id]' as never, params: { id: item.id } } as never)}
          >
            <View style={[styles.avatar, { backgroundColor: `${item.accent}22` }]}>
              <Text style={[styles.avatarText, { color: item.accent }]}>{item.avatar}</Text>
            </View>

            <View style={styles.cardBody}>
              <View style={styles.cardHeader}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={[styles.status, { backgroundColor: `${item.accent}22`, color: item.accent }]}>{item.status}</Text>
              </View>

              <Text style={styles.route}>{item.route}</Text>
              <Text style={styles.meta}>Recogida: {item.pickup}</Text>
              <Text style={styles.meta}>Siguiente parada: {item.nextStop}</Text>

              <View style={styles.footerRow}>
                <Text style={styles.eta}>{item.eta}</Text>
                <Text style={styles.link}>Ver detalle</Text>
              </View>
            </View>
          </Pressable>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  eyebrow: {
    color: '#ff6b3d',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 6,
    color: '#121a2b',
    fontSize: 30,
    fontWeight: '800',
  },
  clockBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  clock: {
    color: '#121a2b',
    fontWeight: '800',
    fontSize: 15,
  },
  searchBox: {
    backgroundColor: '#ffffff',
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
  alertCard: {
    backgroundColor: '#141a2a',
    borderRadius: 22,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alertLabel: {
    color: '#d7dff2',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  alertTitle: {
    marginTop: 8,
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },
  alertText: {
    marginTop: 6,
    color: '#eaf0ff',
    fontSize: 13,
  },
  alertIcon: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#121a2b',
    fontSize: 22,
    fontWeight: '800',
  },
  sectionMeta: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '800',
  },
  cardBody: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  name: {
    color: '#121a2b',
    fontSize: 18,
    fontWeight: '800',
    flexShrink: 1,
  },
  status: {
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
    overflow: 'hidden',
  },
  route: {
    marginTop: 8,
    color: '#4b5565',
    fontSize: 13,
    fontWeight: '700',
  },
  meta: {
    marginTop: 4,
    color: '#6b7280',
    fontSize: 12,
  },
  footerRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eta: {
    color: '#ff6b3d',
    fontSize: 13,
    fontWeight: '800',
  },
  link: {
    color: '#ff6b3d',
    fontSize: 12,
    fontWeight: '800',
  },
});