import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function StudentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <View style={s.screen}>
    <View style={s.avatar}><Ionicons name="person-outline" size={47} color="#53664D" /></View>
    <Text style={s.name}>Sofía Martínez</Text>
    <Text style={s.program}>Ingeniería de Sistemas</Text>
    <View style={s.card}>
      <Row icon="id-card-outline" label="Código de estudiante" value={id ?? 'ST-202688'} />
      <Row icon="mail-outline" label="Correo institucional" value="sofia.martinez@campus.edu" />
      <Row icon="shield-checkmark-outline" label="Estado del pase" value="Activo" />
    </View>
  </View>;
}
function Row({ icon, label, value }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string }) { return <View style={s.row}><Ionicons name={icon} size={21} color="#596D53" /><View><Text style={s.label}>{label}</Text><Text style={s.value}>{value}</Text></View></View>; }
const s = StyleSheet.create({ screen: { flex: 1, padding: 24, alignItems: 'center', backgroundColor: '#F7F7F4' }, avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#E6E9E2', alignItems: 'center', justifyContent: 'center', marginTop: 24 }, name: { color: '#292A27', fontSize: 24, fontWeight: '700', marginTop: 15 }, program: { color: '#777870', marginTop: 4 }, card: { width: '100%', backgroundColor: '#FCFCFA', borderRadius: 17, padding: 4, marginTop: 30, borderWidth: 1, borderColor: '#E7E5DF' }, row: { padding: 16, flexDirection: 'row', gap: 13, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ECEAE5' }, label: { color: '#898A83', fontSize: 11 }, value: { color: '#353632', fontSize: 14, fontWeight: '700', marginTop: 3 } });
