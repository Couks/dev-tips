"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { tips, challenges } from "../data"

// Define types
export type Tip = {
  id: string
  title: string
  content: string
  code: string
  language: string
  date?: string
}

export type Challenge = {
  id: string
  title: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  language: string
  code: string
  solution: string
}

export type UserProgress = {
  viewedTips: string[]
  favoriteTips: string[]
  completedChallenges: string[]
}

// Create store
type StoreState = {
  tips: Tip[]
  challenges: Challenge[]
  userProgress: UserProgress
  dailyTip: Tip | null
  isLoading: boolean
  addToFavorites: (tipId: string) => void
  removeFromFavorites: (tipId: string) => void
  markTipAsViewed: (tipId: string) => void
  markChallengeAsCompleted: (challengeId: string) => void
  getTipsByLanguage: (language: string) => Tip[]
  getChallengesByLanguage: (language: string) => Challenge[]
  getFavoriteTips: () => Tip[]
  getCompletedChallenges: () => Challenge[]
}

const useStore = create<StoreState>((set, get) => ({
  tips: tips,
  challenges: challenges,
  userProgress: {
    viewedTips: [],
    favoriteTips: [],
    completedChallenges: [],
  },
  dailyTip: null,
  isLoading: true,

  addToFavorites: (tipId) => {
    set((state) => {
      const newProgress = {
        ...state.userProgress,
        favoriteTips: [...state.userProgress.favoriteTips, tipId],
      }
      AsyncStorage.setItem("userProgress", JSON.stringify(newProgress))
      return { userProgress: newProgress }
    })
  },

  removeFromFavorites: (tipId) => {
    set((state) => {
      const newProgress = {
        ...state.userProgress,
        favoriteTips: state.userProgress.favoriteTips.filter((id) => id !== tipId),
      }
      AsyncStorage.setItem("userProgress", JSON.stringify(newProgress))
      return { userProgress: newProgress }
    })
  },

  markTipAsViewed: (tipId) => {
    set((state) => {
      if (state.userProgress.viewedTips.includes(tipId)) return state

      const newProgress = {
        ...state.userProgress,
        viewedTips: [...state.userProgress.viewedTips, tipId],
      }
      AsyncStorage.setItem("userProgress", JSON.stringify(newProgress))
      return { userProgress: newProgress }
    })
  },

  markChallengeAsCompleted: (challengeId) => {
    set((state) => {
      if (state.userProgress.completedChallenges.includes(challengeId)) return state

      const newProgress = {
        ...state.userProgress,
        completedChallenges: [...state.userProgress.completedChallenges, challengeId],
      }
      AsyncStorage.setItem("userProgress", JSON.stringify(newProgress))
      return { userProgress: newProgress }
    })
  },

  getTipsByLanguage: (language) => {
    return get().tips.filter((tip) => tip.language === language)
  },

  getChallengesByLanguage: (language) => {
    return get().challenges.filter((challenge) => challenge.language === language)
  },

  getFavoriteTips: () => {
    const { tips, userProgress } = get()
    return tips.filter((tip) => userProgress.favoriteTips.includes(tip.id))
  },

  getCompletedChallenges: () => {
    const { challenges, userProgress } = get()
    return challenges.filter((challenge) => userProgress.completedChallenges.includes(challenge.id))
  },
}))

// Renomeie useStore para appStore para deixar claro que é a store Zustand direta
export const useAppStore = useStore

// Modifique o Provider para usar diretamente a store do Zustand
export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load user progress from AsyncStorage
        const storedProgress = await AsyncStorage.getItem("userProgress")
        if (storedProgress) {
          const progress = JSON.parse(storedProgress) as UserProgress
          useAppStore.setState({ userProgress: progress })
        }

        // Set daily tip
        const today = new Date().toISOString().split("T")[0]
        const tipIndex = Math.floor(Math.abs(new Date(today).getTime()) % tips.length)
        useAppStore.setState({ dailyTip: tips[tipIndex], isLoading: false })
      } catch (error) {
        console.error("Failed to load data:", error)
      } finally {
        setIsReady(true)
      }
    }

    loadData()
  }, [])

  if (!isReady) {
    return null // Ou uma tela de carregamento
  }

  return <>{children}</>
}

