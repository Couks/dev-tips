import type React from "react"
import type { ViewProps } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

interface AnimatedViewProps extends ViewProps {
  children: React.ReactNode
  duration?: number
}

export function AnimatedView({ children, duration = 300, ...props }: AnimatedViewProps) {
  return (
    <Animated.View entering={FadeIn.duration(duration)} {...props}>
      {children}
    </Animated.View>
  )
}

