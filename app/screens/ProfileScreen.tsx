import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { useAppStore } from "../../store"
import { AnimatedView } from "../../components/AnimatedView"
import { ProgressBar } from "../../components/ProgressBar"
import { ChevronRight } from "lucide-react-native"

export default function ProfileScreen() {
  const { tips, challenges, userProgress, getFavoriteTips, getCompletedChallenges } = useAppStore()

  const favoriteTips = getFavoriteTips()
  const completedChallenges = getCompletedChallenges()

  const tipsProgress = (userProgress.viewedTips.length / tips.length) * 100
  const challengesProgress = (userProgress.completedChallenges.length / challenges.length) * 100

  const renderStatCard = (title: string, value: number, total: number, progressPercentage: number) => (
    <View style={styles.statCard}>
      <Text style={styles.statTitle}>{title}</Text>
      <View style={styles.statValueContainer}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTotal}>/{total}</Text>
      </View>
      <ProgressBar progress={progressPercentage} />
    </View>
  )

  const renderFavoriteTip = (tip: (typeof tips)[0]) => (
    <TouchableOpacity key={tip.id} style={styles.itemCard}>
      <View>
        <Text style={styles.itemTitle}>{tip.title}</Text>
        <Text style={styles.itemSubtitle}>{tip.language}</Text>
      </View>
      <ChevronRight size={20} color="#94a3b8" />
    </TouchableOpacity>
  )

  const renderCompletedChallenge = (challenge: (typeof challenges)[0]) => (
    <TouchableOpacity key={challenge.id} style={styles.itemCard}>
      <View>
        <Text style={styles.itemTitle}>{challenge.title}</Text>
        <View style={styles.challengeMeta}>
          <View
            style={[
              styles.difficultyTag,
              challenge.difficulty === "easy" && styles.easyTag,
              challenge.difficulty === "medium" && styles.mediumTag,
              challenge.difficulty === "hard" && styles.hardTag,
            ]}
          >
            <Text style={styles.difficultyText}>
              {challenge.difficulty === "easy" ? "Fácil" : challenge.difficulty === "medium" ? "Médio" : "Difícil"}
            </Text>
          </View>
          <Text style={styles.itemSubtitle}>{challenge.language}</Text>
        </View>
      </View>
      <ChevronRight size={20} color="#94a3b8" />
    </TouchableOpacity>
  )

  return (
    <ScrollView style={styles.container}>
      <AnimatedView>
        <View style={styles.header}>
          <Text style={styles.title}>Seu Progresso</Text>
        </View>

        <View style={styles.statsContainer}>
          {renderStatCard("Dicas Visualizadas", userProgress.viewedTips.length, tips.length, tipsProgress)}
          {renderStatCard(
            "Desafios Concluídos",
            userProgress.completedChallenges.length,
            challenges.length,
            challengesProgress,
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dicas Favoritas</Text>
          {favoriteTips.length > 0 ? (
            favoriteTips.map(renderFavoriteTip)
          ) : (
            <Text style={styles.emptyText}>Você ainda não tem dicas favoritas.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Desafios Concluídos</Text>
          {completedChallenges.length > 0 ? (
            completedChallenges.map(renderCompletedChallenge)
          ) : (
            <Text style={styles.emptyText}>Você ainda não concluiu nenhum desafio.</Text>
          )}
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
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
  },
  statsContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statTitle: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
  },
  statValueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
  },
  statTotal: {
    fontSize: 16,
    color: "#94a3b8",
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 12,
  },
  itemCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#64748b",
  },
  challengeMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  difficultyTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
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
  emptyText: {
    fontSize: 14,
    color: "#94a3b8",
    fontStyle: "italic",
    textAlign: "center",
    padding: 16,
  },
})

