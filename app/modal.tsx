import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ModalScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Servicio</Text>
        <Text style={styles.title}>Todo está operativo</Text>
        <Text style={styles.text}>La red de shuttles funciona con normalidad, sin retrasos ni incidencias graves en este momento.</Text>

        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Cerrar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(17, 24, 39, 0.35)',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 26,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
  },
  eyebrow: {
    color: '#ff6b3d',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 8,
    color: '#121a2b',
    fontSize: 28,
    fontWeight: '800',
  },
  text: {
    marginTop: 10,
    color: '#4b5565',
    fontSize: 15,
    lineHeight: 22,
  },
  button: {
    marginTop: 22,
    backgroundColor: '#121a2b',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '800',
  },
});