import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/colors";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    emoji: "🌿",
    title: "Welcome to LankaTrails",
    subtitle: "Discover the most beautiful destinations in Sri Lanka",
  },
  {
    id: "2",
    emoji: "🏛️",
    title: "Explore Attractions",
    subtitle: "Browse Historical sites, Nature reserves and Luxury Hotels",
  },
  {
    id: "3",
    emoji: "🗺️",
    title: "Navigate with GPS",
    subtitle: "Get directions and calculate distance to any attraction",
  },
  {
    id: "4",
    emoji: "❤️",
    title: "Save Your Favorites",
    subtitle: "Bookmark attractions and access them anytime",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleGetStarted = () => {
    router.replace("/(tabs)" as any);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    handleGetStarted();
  };

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      {currentIndex < slides.length - 1 && (
        <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Slide Content */}
      <View style={styles.slideContainer}>
        <Text style={styles.slideEmoji}>{slides[currentIndex].emoji}</Text>
        <Text style={styles.slideTitle}>{slides[currentIndex].title}</Text>
        <Text style={styles.slideSubtitle}>
          {slides[currentIndex].subtitle}
        </Text>
      </View>

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.dotActive]}
          />
        ))}
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
        <Text style={styles.nextBtnText}>
          {currentIndex === slides.length - 1 ? "Get Started 🚀" : "Next →"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.tabBar,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  skipBtn: {
    position: "absolute",
    top: 56,
    right: 24,
    padding: 8,
  },
  skipText: {
    color: "#A8D5B5",
    fontSize: 16,
    fontWeight: "600",
  },
  slideContainer: {
    alignItems: "center",
    marginBottom: 48,
    paddingHorizontal: 16,
  },
  slideEmoji: {
    fontSize: 100,
    marginBottom: 32,
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 36,
  },
  slideSubtitle: {
    fontSize: 16,
    color: "#A8D5B5",
    textAlign: "center",
    lineHeight: 24,
  },
  dotsContainer: {
    flexDirection: "row",
    marginBottom: 48,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.secondary,
  },
  nextBtn: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 30,
    elevation: 4,
    width: "100%",
    alignItems: "center",
  },
  nextBtnText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
