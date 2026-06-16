import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Footer from "../../components/Footer";
import { Colors } from "../../constants/colors";
import { attractions } from "../../data/attractions";

const featuredAttractions = attractions.slice(0, 4);

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Header */}
      <View style={styles.hero}>
        <View style={styles.heroOverlay}>
          <Text style={styles.heroEmoji}>🌿</Text>
          <Text style={styles.heroTitle}>LankaTrails</Text>
          <Text style={styles.heroSubtitle}>
            Discover the Pearl of the Indian Ocean
          </Text>
          <TouchableOpacity
            style={styles.heroBtn}
            onPress={() => router.push("/attractions" as any)}
          >
            <Text style={styles.heroBtnText}>Start Exploring →</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>🏛️</Text>
          <Text style={styles.statNumber}>9+</Text>
          <Text style={styles.statLabel}>Attractions</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>📍</Text>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Categories</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>🇱🇰</Text>
          <Text style={styles.statNumber}>1</Text>
          <Text style={styles.statLabel}>Sri Lanka</Text>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Browse Categories</Text>
      </View>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[styles.categoryCard, { backgroundColor: "#8B4513" }]}
          onPress={() =>
            router.push({
              pathname: "/attractions",
              params: { category: "Historical" },
            } as any)
          }
        >
          <Text style={styles.categoryIcon}>🏛️</Text>
          <Text style={styles.categoryText}>Historical</Text>
          <Text style={styles.categoryCount}>3 Places</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryCard, { backgroundColor: "#2E8B57" }]}
          onPress={() =>
            router.push({
              pathname: "/attractions",
              params: { category: "Nature" },
            } as any)
          }
        >
          <Text style={styles.categoryIcon}>🌿</Text>
          <Text style={styles.categoryText}>Nature</Text>
          <Text style={styles.categoryCount}>3 Places</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryCard, { backgroundColor: "#1B4F72" }]}
          onPress={() =>
            router.push({
              pathname: "/attractions",
              params: { category: "Hotels" },
            } as any)
          }
        >
          <Text style={styles.categoryIcon}>🏨</Text>
          <Text style={styles.categoryText}>Hotels</Text>
          <Text style={styles.categoryCount}>3 Places</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Attractions */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>🔥 Popular Attractions</Text>
        <TouchableOpacity onPress={() => router.push("/attractions" as any)}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={featuredAttractions}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featuredList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.featuredCard}
            onPress={() =>
              router.push({ pathname: "/details", params: { id: item.id } })
            }
          >
            <Image
              source={
                typeof item.image === "string"
                  ? { uri: item.image }
                  : item.image
              }
              style={styles.featuredImage}
            />
            <View style={styles.featuredOverlay}>
              <Text style={styles.featuredRating}>⭐ {item.rating}</Text>
            </View>
            <View style={styles.featuredContent}>
              <Text style={styles.featuredName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.featuredLocation}>📍 {item.location}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push("/attractions" as any)}
        >
          <Text style={styles.actionIcon}>🗺️</Text>
          <Text style={styles.actionTitle}>Explore</Text>
          <Text style={styles.actionSubtitle}>All Attractions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push("/favorites" as any)}
        >
          <Text style={styles.actionIcon}>❤️</Text>
          <Text style={styles.actionTitle}>Saved</Text>
          <Text style={styles.actionSubtitle}>My Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push("/about" as any)}
        >
          <Text style={styles.actionIcon}>ℹ️</Text>
          <Text style={styles.actionTitle}>About</Text>
          <Text style={styles.actionSubtitle}>LankaTrails</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  hero: {
    height: 280,
    backgroundColor: Colors.tabBar,
    justifyContent: "center",
    alignItems: "center",
  },
  heroOverlay: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  heroEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: "#A8D5B5",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  heroBtn: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
  },
  heroBtnText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 15,
  },
  statsContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: -20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
  },
  statEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.gray,
    marginTop: 2,
    textAlign: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.dark,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
  },
  categoryContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 28,
    gap: 10,
  },
  categoryCard: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 6,
  },
  categoryText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 2,
  },
  categoryCount: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 10,
  },
  featuredList: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  featuredCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginRight: 14,
    width: 190,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    overflow: "hidden",
    marginBottom: 8,
  },
  featuredImage: {
    width: "100%",
    height: 130,
    backgroundColor: Colors.lightGray,
  },
  featuredOverlay: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  featuredRating: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: "bold",
  },
  featuredContent: {
    padding: 12,
  },
  featuredName: {
    fontSize: 13,
    fontWeight: "bold",
    color: Colors.dark,
    marginBottom: 4,
  },
  featuredLocation: {
    fontSize: 11,
    color: Colors.gray,
  },
  actionContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 24,
    gap: 10,
  },
  actionCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  actionIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: Colors.dark,
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 10,
    color: Colors.gray,
    textAlign: "center",
  },
});
