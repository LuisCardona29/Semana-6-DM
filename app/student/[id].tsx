import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Student = {
  id: string;
  name: string;
  route: string;
  pickup: string;
  nextStop: string;
  eta: string;
  status: string;
  accent: string;
  avatar: string;
  phone: string;
};

const studentList: Student[] = [
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
    phone: '+34 600 123 456',
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
    phone: '+34 611 444 222',
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
    phone: '+34 625 663 900',
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
    phone: '+34 678 551 937',
  },
];

export default function StudentDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const student = studentList.find((item) => item.id === params.id) ?? studentList[0];

  return (
    <View style={styles.screen}>
      <View style={styles.headerRow}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.headerText}>Perfil</Text>
      </View>

      <View style={[styles.avatar, { backgroundColor: `${student.accent}22` }]}>
        <Text style={[styles.avatarText, { color: student.accent }]}>{student.avatar}</Text>
      </View>

      <Text style={styles.name}>{student.name}</Text>
      <Text style={styles.route}>{student.route}</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Estado</Text>
          <Text style={[styles.valuePill, { backgroundColor: `${student.accent}22`, color: student.accent }]}>{student.status}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Recogida</Text>
          <Text style={styles.value}>{student.pickup}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Siguiente parada</Text>
          <Text style={styles.value}>{student.nextStop}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>ETA</Text>
          <Text style={styles.value}>{student.eta}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Contacto</Text>
          <Text style={styles.value}>{student.phone}</Text>
        </View>
      </View>

      <Pressable style={styles.button} onPress={() => router.push('/modal' as never)}>
        <Text style={styles.buttonText}>Ver estado del servicio</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 18,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  backText: {
    color: '#121a2b',
    fontSize: 24,
    fontWeight: '700',
  },
  headerText: {
    color: '#121a2b',
    fontSize: 18,
    fontWeight: '800',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '800',
  },
  name: {
    marginTop: 18,
    color: '#121a2b',
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
  },
  route: {
    marginTop: 6,
    color: '#4b5565',
    textAlign: 'center',
    fontWeight: '700',
  },
  card: {
    marginTop: 24,
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 18,
    gap: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '700',
  },
  value: {
    color: '#121a2b',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
    flexShrink: 1,
  },
  valuePill: {
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
    overflow: 'hidden',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#ff6b3d',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
});