"use client"

import { useState } from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native"
import { useAppStore } from "../../store"
import { CodeBlock } from "../../components/CodeBlock"
import { CheckCircle, Circle } from "lucide-react-native"

export default function ChallengesScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [expandedChallenge, setExpandedChallenge] = useState<string | null>(null)
  const [userSolution, setUserSolution] = useState<string>("")

  const { challenges, userProgress, markChallengeAsCompleted } = useAppStore()

  const filteredChallenges = challenges.filter((challenge) => {
    if (selectedLanguage && challenge.language !== selectedLanguage) return false
    if (selectedDifficulty && challenge.difficulty !== selectedDifficulty) return false
    return true
  })

  const handleChallengePress = (challengeId: string) => {
    setExpandedChallenge(expandedChallenge === challengeId ? null : challengeId)
    setUserSolution("")
  }

  const handleSubmitSolution = (challengeId: string) => {
    const challenge = challenges.find((c) => c.id === challengeId)
    if (!challenge) return

    // In a real app, you would evaluate the solution more thoroughly
    // This is a simplified check
    if (userSolution.trim().length > 0) {
      markChallengeAsCompleted(challengeId)
      Alert.alert("Desafio Concluído!", "Parabéns! Você completou este desafio.", [{ text: "OK" }])
    } else {
      Alert.alert("Solução Incompleta", "Por favor, implemente uma solução antes de enviar.", [{ text: "OK" }])
    }
  }

  const renderDifficultyButton = (difficulty: string, label: string) => (
    <TouchableOpacity
      key={difficulty}
      style={[styles.filterButton, selectedDifficulty === difficulty && styles.filterButtonActive]}
      onPress={() => setSelectedDifficulty(selectedDifficulty === difficulty ? null : difficulty)}
    >
      <Text style={[styles.filterButtonText, selectedDifficulty === difficulty && styles.filterButtonTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  )

  const renderLanguageButton = (language: string) => (
    <TouchableOpacity
      key={language}
      style={[styles.filterButton, selectedLanguage === language && styles.filterButtonActive]}
      onPress={() => setSelectedLanguage(selectedLanguage === language ? null : language)}
    >
      <Text style={[styles.filterButtonText, selectedLanguage === language && styles.filterButtonTextActive]}>
        {language.charAt(0).toUpperCase() + language.slice(1)}
      </Text>
    </TouchableOpacity>
  )

  const renderChallengeItem = ({ item }: { item: (typeof challenges)[0] }) => {
    const isCompleted = userProgress.completedChallenges.includes(item.id)
    const isExpanded = expandedChallenge === item.id

    return (
      <View style={[styles.challengeCard, isCompleted && styles.completedChallengeCard]}>
        <TouchableOpacity style={styles.challengeHeader} onPress={() => handleChallengePress(item.id)}>
          <View style={styles.challengeTitleContainer}>
            {isCompleted ? <CheckCircle size={20} color="#6366f1" /> : <Circle size={20} color="#94a3b8" />}
            <Text style={styles.challengeTitle}>{item.title}</Text>
          </View>

          <View style={styles.challengeMeta}>
            <View
              style={[
                styles.difficultyTag,
                item.difficulty === "easy" && styles.easyTag,
                item.difficulty === "medium" && styles.mediumTag,
                item.difficulty === "hard" && styles.hardTag,
              ]}
            >
              <Text style={styles.difficultyText}>
                {item.difficulty === "easy" ? "Fácil" : item.difficulty === "medium" ? "Médio" : "Difícil"}
              </Text>
            </View>
            <View style={styles.languageTag}>
              <Text style={styles.languageText}>{item.language}</Text>
            </View>
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.challengeContent}>
            <Text style={styles.description}>{item.description}</Text>

            <Text style={styles.sectionTitle}>Código Inicial:</Text>
            <CodeBlock code={item.code} language={item.language} />

            <Text style={styles.sectionTitle}>Sua Solução:</Text>
            <TextInput
              style={styles.solutionInput}
              multiline
              numberOfLines={6}
              value={userSolution}
              onChangeText={setUserSolution}
              placeholder="Digite sua solução aqui..."
              placeholderTextColor="#94a3b8"
            />

            <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmitSolution(item.id)}>
              <Text style={styles.submitButtonText}>Enviar Solução</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScrollView}>
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Dificuldade:</Text>
            <View style={styles.filterButtons}>
              {renderDifficultyButton("easy", "Fácil")}
              {renderDifficultyButton("medium", "Médio")}
              {renderDifficultyButton("hard", "Difícil")}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Linguagem:</Text>
            <View style={styles.filterButtons}>
              {renderLanguageButton("javascript")}
              {renderLanguageButton("python")}
            </View>
          </View>
        </ScrollView>
      </View>

      <FlatList
        data={filteredChallenges}
        renderItem={renderChallengeItem}
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
  filtersContainer: {
    backgroundColor: "white",
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  filtersScrollView: {
    paddingHorizontal: 16,
  },
  filterSection: {
    marginRight: 16,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748b",
    marginBottom: 4,
  },
  filterButtons: {
    flexDirection: "row",
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: "#f1f5f9",
  },
  filterButtonActive: {
    backgroundColor: "#6366f1",
  },
  filterButtonText: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
  },
  filterButtonTextActive: {
    color: "white",
  },
  listContainer: {
    padding: 16,
  },
  challengeCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },
  completedChallengeCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#6366f1",
  },
  challengeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  challengeTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f172a",
    marginLeft: 8,
  },
  challengeMeta: {
    flexDirection: "row",
  },
  difficultyTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  easyTag: {
    backgroundColor: "#dcfce7",
  },
  mediumTag: {
    backgroundColor: "#fef9c3",
  },
  hardTag: {
    backgroundColor: "#fee2e2",
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: "500",
  },
  languageTag: {
    backgroundColor: "#e2e8f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  languageText: {
    fontSize: 12,
    color: "#475569",
  },
  challengeContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  description: {
    fontSize: 14,
    color: "#334155",
    marginBottom: 16,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 8,
    marginTop: 16,
  },
  solutionInput: {
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#0f172a",
    fontFamily: "monospace",
    minHeight: 120,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  submitButton: {
    backgroundColor: "#6366f1",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
})

