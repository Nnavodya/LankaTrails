import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/colors";
import { attractions } from "../data/attractions";

const CATEGORIES = ["All", "Historical", "Nature", "Hotels"];

export default function AttractionsScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const saved = await AsyncStorage.getItem("favorites");
      if (saved) setFavorites(JSON.parse(saved));
    } catch (e) {
      console.log(e);
    }
  };

  const filteredAttractions =
    selectedCategory === "All"
      ? attractions
      : attractions.filter((a) => a.category === selectedCategory);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Explore Sri Lanka</Text>
      </View>

      {/* Filter Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterBar}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filterBtn,
              selectedCategory === cat && styles.filterBtnActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === cat && styles.filterTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Attractions List */}
      <FlatList
        data={filteredAttractions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({ pathname: "/details", params: { id: item.id } })
            }
          >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardRating}>⭐ {item.rating}</Text>
              </View>
              <Text style={styles.cardLocation}>📍 {item.location}</Text>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>{item.category}</Text>
              </View>
              <Text style={styles.cardDesc} numberOfLines={2}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.tabBar,
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    marginRight: 12,
  },
  backText: {
    color: Colors.white,
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
  },
  filterBar: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    maxHeight: 60,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    marginHorizontal: 4,
  },
  filterBtnActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    color: Colors.dark,
    fontWeight: "600",
  },
  filterTextActive: {
    color: Colors.white,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 180,
    backgroundColor: Colors.lightGray,
  },
  cardContent: {
    padding: 14,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.dark,
    flex: 1,
  },
  cardRating: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: "bold",
  },
  cardLocation: {
    fontSize: 13,
    color: Colors.gray,
    marginBottom: 6,
  },
  categoryBadge: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  categoryBadgeText: {
    fontSize: 11,
    color: Colors.dark,
    fontWeight: "600",
  },
  cardDesc: {
    fontSize: 13,
    color: Colors.gray,
    lineHeight: 20,
  },
});
