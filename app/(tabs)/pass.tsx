import { StyleSheet, Text, View } from 'react-native';

export default function PassScreen() {
  return (
    <View style={styles.screen}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    padding: 20,
    justifyContent: 'center',
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
});