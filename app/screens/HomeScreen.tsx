"use client"

import { useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native"
import { useAppStore } from "../../store"
import { BookmarkIcon, BookmarkFilledIcon } from "../../components/Icons"
import { CodeBlock } from "../../components/CodeBlock"
import { AnimatedView } from "../../components/AnimatedView"

export default function HomeScreen() {
  const { dailyTip, userProgress, addToFavorites, removeFromFavorites, markTipAsViewed, isLoading } = useAppStore()

  useEffect(() => {
    if (dailyTip) {
      markTipAsViewed(dailyTip.id)
    }
  }, [dailyTip, markTipAsViewed])

  const isFavorite = dailyTip ? userProgress.favoriteTips.includes(dailyTip.id) : false

  const toggleFavorite = () => {
    if (!dailyTip) return

    if (isFavorite) {
      removeFromFavorites(dailyTip.id)
    } else {
      addToFavorites(dailyTip.id)
    }
  }

  if (isLoading || !dailyTip) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando dica do dia...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <AnimatedView>
        <View style={styles.header}>
          <Text style={styles.title}>Dica do Dia</Text>
          <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
            {isFavorite ? <BookmarkFilledIcon /> : <BookmarkIcon />}
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{dailyTip.title}</Text>
            <View style={styles.languageTag}>
              <Text style={styles.languageText}>{dailyTip.language}</Text>
            </View>
          </View>

          <Text style={styles.content}>{dailyTip.content}</Text>

          <CodeBlock code={dailyTip.code} language={dailyTip.language} />
        </View>
      </AnimatedView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#64748b",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
  },
  favoriteButton: {
    padding: 8,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    flex: 1,
  },
  languageTag: {
    backgroundColor: "#6366f1",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  languageText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  content: {
    fontSize: 16,
    color: "#334155",
    marginBottom: 16,
    lineHeight: 24,
  },
})

