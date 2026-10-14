import { router } from 'expo-router';
import { View, Pressable, Animated } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useEffect, useRef, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../store/useAuthStore';

export default function SplashScreen() {
  const { user, isLoading, checkAuth } = useAuthStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const [cardsAnim] = useState([new Animated.Value(0), new Animated.Value(0)]);
  const btnScaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isLoading && user) {
      router.replace('/(tabs)');
    }
  }, [isLoading, user]);

  useEffect(() => {
    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0, duration: 1500, useNativeDriver: true }),
      ])
    ).start();

    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 40,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(btnScaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      })
    ]).start();

    // Staggered cards
    cardsAnim.forEach((anim, index) => {
      Animated.sequence([
        Animated.delay(300 + index * 150),
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
    <View className="flex-1 items-center justify-center bg-white px-8 py-12">
      {/* Background Gradient Effect via Views */}
      <View className="absolute inset-0 bg-white opacity-50" />
      
      {/* Animated Brand Icon */}
      <Animated.View 
        className="items-center justify-center mb-8"
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }}
      >
        <View className="relative mb-6">
          {/* Pulsing glow */}
          <Animated.View 
            className="absolute inset-0 rounded-3xl bg-blue"
            style={{
              opacity: pulseAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 0.6],
              }),
              transform: [{
                scale: pulseAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.2],
                })
              }]
            }}
          />
          <View className="h-24 w-24 rounded-3xl border border-white bg-white/60 items-center justify-center shadow-lg">
            <View className="h-16 w-16 rounded-2xl bg-blue items-center justify-center shadow-md">
              <MaterialCommunityIcons name="chat-processing" size={32} color="white" />
            </View>
          </View>
        </View>
        
        <ThemedText className="text-center text-dark-blue tracking-wide text-4xl font-extrabold">
          TeamConnect
        </ThemedText>
        
        <ThemedText className="mt-3 text-center text-blue font-medium max-w-[280px]">
          Next-generation secure communication and real-time collaboration.
        </ThemedText>
      </Animated.View>

      {/* Feature cards */}
      <View className="w-full gap-y-3 mb-12">
        <Animated.View 
          className="rounded-2xl border border-white bg-white p-4 flex-row items-center shadow-sm"
          style={{
            opacity: cardsAnim[0],
            transform: [{
              translateX: cardsAnim[0].interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0],
              })
            }]
          }}
        >
          <View className="h-10 w-10 rounded-full bg-white items-center justify-center mr-4">
            <MaterialCommunityIcons name="lightning-bolt" size={20} color="#0EA5E9" />
          </View>
          <View className="flex-1">
            <ThemedText className="text-sm font-bold text-dark-blue">Realtime Channels</ThemedText>
            <ThemedText className="text-xs text-blue mt-0.5 font-medium">High-speed synchronization.</ThemedText>
          </View>
        </Animated.View>

        <Animated.View 
          className="rounded-2xl border border-white bg-white p-4 flex-row items-center shadow-sm"
          style={{
            opacity: cardsAnim[1],
            transform: [{
              translateX: cardsAnim[1].interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0],
              })
            }]
          }}
        >
          <View className="h-10 w-10 rounded-full bg-white items-center justify-center mr-4">
            <MaterialCommunityIcons name="shield-check" size={20} color="#0EA5E9" />
          </View>
          <View className="flex-1">
            <ThemedText className="text-sm font-bold text-dark-blue">Enterprise Security</ThemedText>
            <ThemedText className="text-xs text-blue mt-0.5 font-medium">End-to-end encrypted messaging.</ThemedText>
          </View>
        </Animated.View>
      </View>

      {/* Continue CTA */}
      <Animated.View 
        className="w-full"
        style={{
          opacity: fadeAnim,
          transform: [{ scale: btnScaleAnim }]
        }}
      >
        <Pressable 
          onPress={() => router.replace('/login')}
          android_ripple={{ color: '#FFFFFF4D', radius: 100 }}
          className="w-full rounded-2xl bg-blue py-4 items-center justify-center shadow-lg active:opacity-90 overflow-hidden"
        >
          <View className="flex-row items-center gap-2">
            <ThemedText className="text-white font-bold text-base">Enter Workspace</ThemedText>
            <MaterialCommunityIcons name="arrow-right" size={20} color="white" />
          </View>
        </Pressable>
      </Animated.View>
      
      <Animated.View style={{ opacity: fadeAnim }}>
        <ThemedText className="text-xs text-blue font-medium mt-6 text-center">
          By continuing, you agree to your organization's terms.
        </ThemedText>
      </Animated.View>
    </View>
  );
}
