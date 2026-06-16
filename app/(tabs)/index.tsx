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
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌿 LankaTrails</Text>
        <Text style={styles.headerSubtitle}>Discover Sri Lanka</Text>
      </View>

      {/* Welcome Card */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeText}>Welcome to Paradise 🌴</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>9+</Text>
            <Text style={styles.statLabel}>Attractions</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Categories</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>🇱🇰</Text>
            <Text style={styles.statLabel}>Sri Lanka</Text>
          </View>
        </View>
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Explore by Category</Text>
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
        </TouchableOpacity>
      </View>

      {/* Featured Attractions */}
      <Text style={styles.sectionTitle}>🔥 Popular Attractions</Text>
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
            <View style={styles.featuredContent}>
              <Text style={styles.featuredName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.featuredLocation}>📍 {item.location}</Text>
              <Text style={styles.featuredRating}>⭐ {item.rating}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Buttons */}
      <TouchableOpacity
        style={styles.exploreBtn}
        onPress={() => router.push("/attractions" as any)}
      >
        <Text style={styles.exploreBtnText}>Explore All Attractions →</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.favBtn}
        onPress={() => router.push("/favorites")}
      >
        <Text style={styles.favBtnText}>💚 Saved Places</Text>
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
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.gray,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.lightGray,
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
    fontSize: 36,
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
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.primary,
    elevation: 2,
  },
  favBtnText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },

  featuredList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  featuredCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginRight: 12,
    width: 180,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    overflow: "hidden",
  },
  featuredImage: {
    width: "100%",
    height: 120,
    backgroundColor: Colors.lightGray,
  },
  featuredContent: {
    padding: 10,
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
    marginBottom: 2,
  },
  featuredRating: {
    fontSize: 11,
    color: Colors.secondary,
    fontWeight: "bold",
  },
});
