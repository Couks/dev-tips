import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home, FolderOpen, Target, User } from "lucide-react-native"
import HomeScreen from "./screens/HomeScreen"
import CategoriesScreen from "./screens/CategoriesScreen"
import ChallengesScreen from "./screens/ChallengesScreen"
import ProfileScreen from "./screens/ProfileScreen"

const Tab = createBottomTabNavigator()

export default function TabLayout() {
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#6366f1",
        tabBarInactiveTintColor: "#6366f8",
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
  
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
