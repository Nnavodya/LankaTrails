import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Footer from "../components/Footer";
import { Colors } from "../constants/colors";
export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌿 LankaTrails</Text>
        <Text style={styles.headerSubtitle}>Discover Sri Lanka</Text>
      </View>

      {/* Welcome Card */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeText}>Welcome to Paradise 🌴</Text>
        <Text style={styles.welcomeDesc}>
          Explore the most beautiful destinations in Sri Lanka — from ancient
          fortresses to lush rainforests.
        </Text>
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Explore by Category</Text>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[styles.categoryCard, { backgroundColor: "#8B4513" }]}
        >
          <Text style={styles.categoryIcon}>🏛️</Text>
          <Text style={styles.categoryText}>Historical</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryCard, { backgroundColor: "#2E8B57" }]}
        >
          <Text style={styles.categoryIcon}>🌿</Text>
          <Text style={styles.categoryText}>Nature</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryCard, { backgroundColor: "#1B4F72" }]}
        >
          <Text style={styles.categoryIcon}>🏨</Text>
          <Text style={styles.categoryText}>Hotels</Text>
        </TouchableOpacity>
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.exploreBtn}
        onPress={() => router.push("/attractions")}
      >
        <Text style={styles.exploreBtnText}>Explore All Attractions →</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.favBtn}
        onPress={() => router.push("/favorites")}
      >
        <Text style={styles.favBtnText}>❤️ My Favorites</Text>
      </TouchableOpacity>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.tabBar,
    padding: 40,
    paddingTop: 60,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.white,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#A8D5B5",
    marginTop: 4,
  },
  welcomeCard: {
    backgroundColor: Colors.white,
    margin: 16,
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.dark,
    marginBottom: 8,
  },
  welcomeDesc: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.dark,
    marginLeft: 16,
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  categoryCard: {
    flex: 1,
    margin: 4,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },
  categoryIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  categoryText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 12,
  },
  exploreBtn: {
    backgroundColor: Colors.primary,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },
  exploreBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  favBtn: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginBottom: 32,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.danger,
    elevation: 2,
  },
  favBtnText: {
    color: Colors.danger,
    fontSize: 16,
    fontWeight: "bold",
  },
});
