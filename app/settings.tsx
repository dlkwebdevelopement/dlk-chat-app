import { ScrollView, Switch, View, Animated, Pressable } from 'react-native';
import { ThemedText as Text } from '@/components/themed-text';
import { useEffect, useRef, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [cardsAnim] = useState([new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]);

  // Local state for switches
  const [smartAlerts, setSmartAlerts] = useState(true);
  const [ssoEnabled, setSsoEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 40,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    cardsAnim.forEach((anim, index) => {
      Animated.sequence([
        Animated.delay(100 + index * 100),
        Animated.spring(anim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);

  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-white via-white to-white px-5 pt-6">
      <Animated.View 
        className="rounded-3xl border border-white bg-white p-6 shadow-lg mb-8"
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }}
      >
        <View className="flex-row items-center gap-3 mb-2">
          <View className="h-10 w-10 rounded-full bg-white items-center justify-center">
            <MaterialCommunityIcons name="cog-outline" size={20} color="#0284C7" />
          </View>
          <Text className="text-2xl font-extrabold text-dark-blue">Settings</Text>
        </View>
        <Text className="mt-2 text-sm text-blue font-medium leading-5">
          Fine-tune your TeamConnect experience for security, notifications, and collaboration.
        </Text>
      </Animated.View>

      <View className="gap-y-4 pb-12">
        <Animated.View 
          className="overflow-hidden rounded-2xl"
          style={{
            opacity: cardsAnim[0],
            transform: [{ 
              scale: cardsAnim[0].interpolate({
                inputRange: [0, 1],
                outputRange: [0.95, 1]
              }) 
            }]
          }}
        >
          <Pressable 
            android_ripple={{ color: '#0284C71A', radius: 200 }}
            className="border border-white bg-white p-5 shadow-sm active:bg-white"
            onPress={() => setSmartAlerts(!smartAlerts)}
          >
            <View className="flex-row items-center gap-2 mb-4">
              <MaterialCommunityIcons name="bell-ring-outline" size={18} color="#0EA5E9" />
              <Text className="text-xs font-bold uppercase tracking-widest text-blue">Notifications</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <View className="flex-1 pr-4">
                <Text className="text-base font-semibold text-dark-blue">Smart alert summaries</Text>
                <Text className="text-xs text-blue mt-1 font-medium">Use AI to summarize missed messages.</Text>
              </View>
              <Switch 
                value={smartAlerts} 
                onValueChange={setSmartAlerts}
                thumbColor={smartAlerts ? "#0284C7" : "#CBD5E1"} 
                trackColor={{ false: '#F1F5F9', true: '#BAE6FD' }} 
              />
            </View>
          </Pressable>
        </Animated.View>

        <Animated.View 
          className="overflow-hidden rounded-2xl"
          style={{
            opacity: cardsAnim[1],
            transform: [{ 
              scale: cardsAnim[1].interpolate({
                inputRange: [0, 1],
                outputRange: [0.95, 1]
              }) 
            }]
          }}
        >
          <Pressable 
            android_ripple={{ color: '#0284C71A', radius: 200 }}
            className="border border-white bg-white p-5 shadow-sm active:bg-white"
            onPress={() => setSsoEnabled(!ssoEnabled)}
          >
            <View className="flex-row items-center gap-2 mb-4">
              <MaterialCommunityIcons name="shield-check-outline" size={18} color="#0EA5E9" />
              <Text className="text-xs font-bold uppercase tracking-widest text-blue">Security</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <View className="flex-1 pr-4">
                <Text className="text-base font-semibold text-dark-blue">Enterprise SSO</Text>
                <Text className="text-xs text-blue mt-1 font-medium">Require single sign-on for access.</Text>
              </View>
              <Switch 
                value={ssoEnabled} 
                onValueChange={setSsoEnabled}
                thumbColor={ssoEnabled ? "#0284C7" : "#CBD5E1"} 
                trackColor={{ false: '#F1F5F9', true: '#BAE6FD' }} 
              />
            </View>
          </Pressable>
        </Animated.View>

        <Animated.View 
          className="overflow-hidden rounded-2xl"
          style={{
            opacity: cardsAnim[2],
            transform: [{ 
              scale: cardsAnim[2].interpolate({
                inputRange: [0, 1],
                outputRange: [0.95, 1]
              }) 
            }]
          }}
        >
          <Pressable 
            android_ripple={{ color: '#0284C71A', radius: 200 }}
            className="border border-white bg-white p-5 shadow-sm active:bg-white"
            onPress={() => setDarkMode(!darkMode)}
          >
            <View className="flex-row items-center gap-2 mb-4">
              <MaterialCommunityIcons name="palette-outline" size={18} color="#0EA5E9" />
              <Text className="text-xs font-bold uppercase tracking-widest text-blue">Appearance</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <View className="flex-1 pr-4">
                <Text className="text-base font-semibold text-dark-blue">Dark mode optimized</Text>
                <Text className="text-xs text-blue mt-1 font-medium">Automatically switch to dark theme.</Text>
              </View>
              <Switch 
                value={darkMode} 
                onValueChange={setDarkMode}
                thumbColor={darkMode ? "#0284C7" : "#CBD5E1"} 
                trackColor={{ false: '#F1F5F9', true: '#BAE6FD' }} 
              />
            </View>
          </Pressable>
        </Animated.View>
      </View>
    </ScrollView>
  );
}
