import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home, FolderOpen, Target, User } from "lucide-react-native"
import HomeScreen from "./screens/HomeScreen"
import CategoriesScreen from "./screens/CategoriesScreen"
import ChallengesScreen from "./screens/ChallengesScreen"
import ProfileScreen from "./screens/ProfileScreen"
import { View } from "react-native"

const Tab = createBottomTabNavigator()

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
        
          left: 16,
          right: 16,
          elevation: 8,
          backgroundColor: "#ffffff",
        
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.15,
          shadowRadius: 8,
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#aaa",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Home size={focused ? 28 : 24} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <FolderOpen size={focused ? 28 : 24} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Challenges"
        component={ChallengesScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Target size={focused ? 28 : 24} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <User size={focused ? 28 : 24} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}
