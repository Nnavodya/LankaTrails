import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/colors";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image: require("../assets/images/sigiriya.jpg"),
    tag: "Explore Sri Lanka",
    title: "Discover Ancient",
    highlight: "Wonders",
    subtitle:
      "Journey through centuries of history and marvel at Sri Lanka's most iconic ancient fortresses and temples.",
  },
  {
    id: "2",
    image: require("../assets/images/yala.jpg"),
    tag: "Nature & Wildlife",
    title: "Experience Wild",
    highlight: "Nature",
    subtitle:
      "Explore breathtaking national parks and rainforests teeming with exotic wildlife and natural beauty.",
  },
  {
    id: "3",
    image: require("../assets/images/kandalama.jpg"),
    tag: "Luxury Stays",
    title: "Stay in Pure",
    highlight: "Luxury",
    subtitle:
      "Indulge in world-class hotels that blend seamlessly with Sri Lanka's stunning natural landscapes.",
  },
  {
    id: "4",
    image: require("../assets/images/galle-fort.jpg"),
    tag: "LankaTrails",
    title: "Your Perfect",
    highlight: "Travel Guide",
    subtitle:
      "Save favorites, navigate with GPS, and discover the Pearl of the Indian Ocean like never before.",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace("/(tabs)" as any);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSkip = () => {
    router.replace("/(tabs)" as any);
  };

  const slide = slides[currentIndex];

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={slide.image} style={styles.bgImage} />

      {/* Gradient Overlay */}
      <View style={styles.overlay} />

      {/* Top Bar */}
      <View style={styles.topBar}>
        {/* Tag */}
        <View style={styles.tagContainer}>
          <Text style={styles.tagDot}>🌿</Text>
          <Text style={styles.tagText}>{slide.tag}</Text>
        </View>

        {/* Skip */}
        {currentIndex < slides.length - 1 && (
          <TouchableOpacity onPress={handleSkip} style={styles.skipBtn}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.highlight}>{slide.highlight}</Text>
        <Text style={styles.subtitle}>{slide.subtitle}</Text>

        {/* Dots */}
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.dotActive]}
            />
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.btnRow}>
          {currentIndex > 0 && (
            <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
              <Text style={styles.backBtnText}>←</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.nextBtn, currentIndex === 0 && styles.nextBtnFull]}
            onPress={handleNext}
          >
            <Text style={styles.nextBtnText}>
              {currentIndex === slides.length - 1 ? "Get Started 🚀" : "Next →"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  bgImage: {
    position: "absolute",
    width: width,
    height: height,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 56,
    paddingHorizontal: 24,
  },
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  tagDot: {
    fontSize: 14,
  },
  tagText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: "600",
  },
  skipBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
  },
  skipText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: "600",
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 28,
    paddingBottom: 48,
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: Colors.white,
    lineHeight: 46,
  },
  highlight: {
    fontSize: 38,
    fontWeight: "bold",
    color: Colors.secondary,
    lineHeight: 46,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 24,
    marginBottom: 32,
  },
  dotsContainer: {
    flexDirection: "row",
    marginBottom: 28,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  dotActive: {
    width: 28,
    backgroundColor: Colors.secondary,
  },
  btnRow: {
    flexDirection: "row",
    gap: 12,
  },
  backBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  backBtnText: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: "bold",
  },
  nextBtn: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  nextBtnFull: {
    flex: 1,
  },
  nextBtnText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: "bold",
  },
});
