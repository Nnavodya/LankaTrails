import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/colors";

export default function AboutScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About LankaTrails</Text>
      </View>

      {/* Logo Section */}
      <View style={styles.logoSection}>
        <Text style={styles.logo}>🌿</Text>
        <Text style={styles.appName}>LankaTrails</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>

      {/* About Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>About the App</Text>
        <Text style={styles.cardText}>
          LankaTrails is a local tour and travel guide app designed to help
          tourists explore the beauty of Sri Lanka. Discover historical
          fortresses, lush nature reserves, and luxury hotels across the island.
        </Text>
      </View>

      {/* Features Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Features</Text>
        <Text style={styles.feature}>🏛️ Browse Historical Sites</Text>
        <Text style={styles.feature}>🌿 Explore Nature Reserves</Text>
        <Text style={styles.feature}>🏨 Discover Luxury Hotels</Text>
        <Text style={styles.feature}>❤️ Save Your Favorites</Text>
        <Text style={styles.feature}>🗺️ GPS Navigation</Text>
        <Text style={styles.feature}>📍 Distance Calculator</Text>
        <Text style={styles.feature}>🔍 Search Attractions</Text>
      </View>

      {/* Developer Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Developer</Text>
        <Text style={styles.cardText}>University of Kelaniya</Text>
        <Text style={styles.cardText}>
          SENG 31323 - Mobile Computing Technology
        </Text>
        <Text style={styles.cardText}>
          Bachelor of Science in Software Engineering
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 LankaTrails</Text>
        <Text style={styles.footerSubText}>Discover Sri Lanka 🇱🇰</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA", 
  },
  header: {
    backgroundColor: Colors.tabBar,
    paddingTop: 50,
    paddingBottom: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backBtn: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 12,
  },
  backText: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
  },
  logoSection: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 20,
  },
  logo: {
    fontSize: 72,
    marginBottom: 10,
  },
  appName: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.dark,
    letterSpacing: 1,
  },
  version: {
    fontSize: 14,
    color: Colors.gray,
  },
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginBottom: 18,
    padding: 20,
    borderRadius: 18,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 22,
    marginBottom: 4,
  },
  feature: {
    fontSize: 15,
    color: Colors.dark,
    marginVertical: 4,
    paddingVertical: 2,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  footerText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.dark,
  },
  footerSubText: {
    fontSize: 13,
    color: Colors.gray,
    marginTop: 6,
  },
});
