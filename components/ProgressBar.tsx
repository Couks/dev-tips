import { View, StyleSheet } from "react-native"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"

interface ProgressBarProps {
  progress: number // 0 to 100
  color?: string
  height?: number
}

export function ProgressBar({ progress, color = "#6366f1", height = 8 }: ProgressBarProps) {
  const animatedWidth = useAnimatedStyle(() => {
    return {
      width: withTiming(`${Math.min(100, Math.max(0, progress))}%`, { duration: 1000 }),
    }
  })

  return (
    <View style={[styles.container, { height }]}>
      <Animated.View style={[styles.progress, { backgroundColor: color }, animatedWidth]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e2e8f0",
    borderRadius: 4,
    overflow: "hidden",
    width: "100%",
  },
  progress: {
    height: "100%",
    borderRadius: 4,
  },
})

