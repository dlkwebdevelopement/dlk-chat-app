import {
  ScrollView,
  View,
  Image,
  Pressable,
  Animated,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/useAuthStore';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();

  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  // Header animation with playful bounce
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 40,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 40,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Bounce animation for icons
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const headerOpacity = fadeAnim;
  const headerTransform = slideAnim;
  const cardScale = scaleAnim;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F0F9FF' }}>
      <ScrollView
        className="flex-1"
        style={{ backgroundColor: '#F0F9FF' }}
        contentContainerStyle={{ paddingBottom: 40 }}
        scrollIndicatorInsets={{ right: 1 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* Playful Header */}
        <Animated.View
          style={[
            {
              backgroundColor: '#E0F2FE',
              paddingBottom: 20,
              opacity: headerOpacity,
              transform: [{ translateY: headerTransform }],
            },
          ]}
        >
          <View className="flex-row items-center justify-between px-6 pt-6 pb-4">
            <View>
              <ThemedText className="text-slate-900 text-3xl font-black tracking-tight">
                TeamConnect
              </ThemedText>
              <ThemedText className="text-cyan-700 text-xs font-bold mt-2 tracking-widest uppercase">
                Your workspace awaits
              </ThemedText>
            </View>

            {/* Playful Profile Button */}
            <Pressable
              onPress={() => router.push('/profile')}
              className="active:opacity-70"
            >
              <Animated.View
                style={{
                  transform: [{ scale: cardScale }],
                }}
              >
                <View className="relative">
                  <View
                    style={{
                      backgroundColor: '#BAE6FD',
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      padding: 2,
                    }}
                  >
                    <Image
                      source={{
                        uri: user?.profilePhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.fullName || 'User'}`,
                      }}
                      className="w-full h-full rounded-2xl"
                    />
                  </View>
                  <View className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-white shadow-md" />
                </View>
              </Animated.View>
            </Pressable>
          </View>

          {/* Decorative Elements */}
          <View
            style={{
              position: 'absolute',
              right: -30,
              top: -10,
              width: 120,
              height: 120,
              backgroundColor: '#06B6D4',
              borderRadius: 60,
              opacity: 0.1,
            }}
          />
        </Animated.View>

        <View style={{ paddingHorizontal: 20, paddingTop: 24, gap: 18 }}>
          {/* Welcome Card - Playful Style */}
          <Pressable
            onPress={() => { }}
            android_ripple={{ color: '#06B6D41A', radius: 24 }}
          >
            <Animated.View
              className="rounded-3xl overflow-hidden"
              style={[
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              <View style={{ backgroundColor: '#BAE6FD', padding: 24, borderRadius: 24 }}>
                {/* Background decoration */}
                <View
                  style={{
                    position: 'absolute',
                    right: -40,
                    top: -40,
                    width: 150,
                    height: 150,
                    backgroundColor: '#E0F2FE',
                    borderRadius: 75,
                    opacity: 0.6,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    left: -30,
                    bottom: -30,
                    width: 100,
                    height: 100,
                    backgroundColor: '#06B6D4',
                    borderRadius: 50,
                    opacity: 0.1,
                  }}
                />

                <View className="relative z-10">
                  <View className="flex-row items-center gap-2 mb-3">
                    <Animated.View
                      style={{
                        transform: [
                          {
                            translateY: bounceAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, -8],
                            }),
                          },
                        ],
                      }}
                    >
                      <MaterialCommunityIcons name="hand-wave" size={28} color="#0284C7" />
                    </Animated.View>
                    <ThemedText className="text-cyan-700 text-xs font-black uppercase tracking-widest">
                      Welcome back!
                    </ThemedText>
                  </View>
                  <ThemedText className="text-slate-900 font-black text-3xl leading-tight">
                    Hey, {user?.fullName?.split(' ')[0] || 'there'}!
                  </ThemedText>
                  <ThemedText className="mt-3 text-cyan-900 text-sm leading-5 font-semibold">
                    Your workspace is secure and ready to go. Let's make today productive!
                  </ThemedText>
                </View>
              </View>
            </Animated.View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  elevation: {
    elevation: 8,
    shadowColor: '#0284C7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
});