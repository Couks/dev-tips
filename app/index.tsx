import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home, FolderOpen, Target, User } from "lucide-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import HomeScreen from "./screens/HomeScreen"
import CategoriesScreen from "./screens/CategoriesScreen"
import ChallengesScreen from "./screens/ChallengesScreen"
import ProfileScreen from "./screens/ProfileScreen"

const Tab = createBottomTabNavigator()

export default function TabLayout() {
  const insets = useSafeAreaInsets()
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#6366f1",
        tabBarInactiveTintColor: "#fff",
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'fixed',
          backgroundColor: '#333',
          borderTopWidth: 0,
          elevation: 16,
          height: 60,
          bottom: 10,
          left: 0,
          right: 0,
          marginHorizontal: 20,
          borderRadius: 100,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Home size={22} color={color} />,
          title: "Dica do Dia",
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color }) => <FolderOpen size={22} color={color} />,
          title: "Categorias",
        }}
      />
      <Tab.Screen
        name="Challenges"
        component={ChallengesScreen}
        options={{
          tabBarIcon: ({ color }) => <Target size={22} color={color} />,
          title: "Desafios",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <User size={22} color={color} />,
          title: "Perfil",
        }}
      />
    </Tab.Navigator>
  )
}
