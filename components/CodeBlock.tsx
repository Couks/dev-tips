"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"

interface CodeBlockProps {
  code: string
  language: string
  maxHeight?: number
  showExpand?: boolean
}

export function CodeBlock({ code, language, maxHeight, showExpand = false }: CodeBlockProps) {
  const [expanded, setExpanded] = useState(false)

  const codeStyle = {
    ...styles.code,
    ...(maxHeight && !expanded ? { maxHeight } : {}),
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.language}>{language}</Text>
      </View>
      <ScrollView style={codeStyle} horizontal showsHorizontalScrollIndicator={false}>
        <Text style={styles.codeText}>{code}</Text>
      </ScrollView>
      {showExpand && maxHeight && (
        <TouchableOpacity style={styles.expandButton} onPress={() => setExpanded(!expanded)}>
          <Text style={styles.expandButtonText}>{expanded ? "Mostrar menos" : "Mostrar mais"}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e293b",
    borderRadius: 8,
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#0f172a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  language: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "500",
  },
  code: {
    padding: 12,
  },
  codeText: {
    color: "#e2e8f0",
    fontFamily: "monospace",
    fontSize: 14,
  },
  expandButton: {
    backgroundColor: "#0f172a",
    paddingVertical: 6,
    alignItems: "center",
  },
  expandButtonText: {
    color: "#6366f1",
    fontSize: 12,
    fontWeight: "500",
  },
})

