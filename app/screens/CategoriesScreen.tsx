"use client"

import { useState } from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import { useAppStore } from "../../store"
import { CodeBlock } from "../../components/CodeBlock"
import { BookmarkIcon, BookmarkFilledIcon } from "../../components/Icons"

const LANGUAGES = ["javascript", "python", "java", "csharp", "ruby"]

export default function CategoriesScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const { tips, userProgress, addToFavorites, removeFromFavorites, markTipAsViewed } = useAppStore()

  const filteredTips = selectedLanguage ? tips.filter((tip) => tip.language === selectedLanguage) : tips

  const handleTipPress = (tipId: string) => {
    markTipAsViewed(tipId)
  }

  const toggleFavorite = (tipId: string) => {
    if (userProgress.favoriteTips.includes(tipId)) {
      removeFromFavorites(tipId)
    } else {
      addToFavorites(tipId)
    }
  }

  const renderLanguageButton = (language: string) => (
    <TouchableOpacity
      key={language}
      style={[styles.languageButton, selectedLanguage === language && styles.languageButtonActive]}
      onPress={() => setSelectedLanguage(language === selectedLanguage ? null : language)}
    >
      <Text style={[styles.languageButtonText, selectedLanguage === language && styles.languageButtonTextActive]}>
        {language.charAt(0).toUpperCase() + language.slice(1)}
      </Text>
    </TouchableOpacity>
  )

  const renderTipItem = ({ item }: { item: (typeof tips)[0] }) => {
    const isFavorite = userProgress.favoriteTips.includes(item.id)
    const isViewed = userProgress.viewedTips.includes(item.id)

    return (
      <TouchableOpacity
        style={[styles.tipCard, isViewed && styles.viewedTipCard]}
        onPress={() => handleTipPress(item.id)}
      >
        <View style={styles.tipHeader}>
          <Text style={styles.tipTitle}>{item.title}</Text>
          <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.favoriteButton}>
            {isFavorite ? <BookmarkFilledIcon /> : <BookmarkIcon />}
          </TouchableOpacity>
        </View>

        <Text style={styles.tipContent}>{item.content}</Text>

        <CodeBlock code={item.code} language={item.language} maxHeight={100} showExpand />

        <View style={styles.tipFooter}>
          <View style={styles.languageTag}>
            <Text style={styles.languageTagText}>{item.language}</Text>
          </View>
          {isViewed && <Text style={styles.viewedText}>Visualizado</Text>}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.languageFilters}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
          {LANGUAGES.map(renderLanguageButton)}
        </ScrollView>
      </View>

      <FlatList
        data={filteredTips}
        renderItem={renderTipItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

import { ScrollView } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  languageFilters: {
    paddingVertical: 12,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  filtersContainer: {
    paddingHorizontal: 16,
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#f1f5f9",
  },
  languageButtonActive: {
    backgroundColor: "#6366f1",
  },
  languageButtonText: {
    color: "#64748b",
    fontWeight: "500",
  },
  languageButtonTextActive: {
    color: "white",
  },
  listContainer: {
    padding: 16,
  },
  tipCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  viewedTipCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#6366f1",
  },
  tipHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f172a",
    flex: 1,
  },
  favoriteButton: {
    padding: 4,
  },
  tipContent: {
    fontSize: 14,
    color: "#334155",
    marginBottom: 12,
    lineHeight: 20,
  },
  tipFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  languageTag: {
    backgroundColor: "#e2e8f0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  languageTagText: {
    color: "#475569",
    fontSize: 12,
  },
  viewedText: {
    fontSize: 12,
    color: "#64748b",
    fontStyle: "italic",
  },
})

