import { router } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { View, Animated, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/utils/api';
import { TextInput } from 'react-native-paper';
import { ThemedText } from '@/components/themed-text';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const formAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
      Animated.sequence([
        Animated.delay(300),
        Animated.spring(formAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ])
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (!userId || !password) {
      Alert.alert('Error', 'Please enter both ID and password');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/auth/login', { loginId: userId, password });
      await setAuth(res.data.user, res.data.token);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Login Failed', error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 py-10 justify-center">
      <Animated.View
        className="rounded-3xl border border-white bg-white p-6 shadow-xl"
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }}
      >
        {/* Title */}
        <View className="mb-6 items-center">
          <View className="h-16 w-16 rounded-full bg-white items-center justify-center mb-4">
            <MaterialCommunityIcons name="shield-lock-outline" size={32} color="#0284C7" />
          </View>
          <ThemedText className="text-dark-blue text-2xl font-extrabold tracking-wide">
            Security Gateway
          </ThemedText>
          <ThemedText className="mt-2 text-center text-sm text-blue font-medium">
            Verify your TeamConnect credentials.
          </ThemedText>
        </View>

        {/* Inputs */}
        <Animated.View style={{ opacity: formAnim }}>
          <TextInput
            label="Employee ID or Email"
            value={userId}
            onChangeText={setUserId}
            mode="outlined"
            style={{ backgroundColor: '#FFFFFF' }}
            outlineColor="#BAE6FD"
            activeOutlineColor="#0284C7"
            textColor="#0C4A6E"
            placeholderTextColor="#94A3B8"
            theme={{ colors: { primary: '#0284C7', placeholder: '#94A3B8' }, roundness: 12 }}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={{ marginTop: 16, backgroundColor: '#FFFFFF' }}
            outlineColor="#BAE6FD"
            activeOutlineColor="#0284C7"
            textColor="#0C4A6E"
            placeholderTextColor="#94A3B8"
            theme={{ colors: { primary: '#0284C7', placeholder: '#94A3B8' }, roundness: 12 }}
          />

          {/* Forgot Password */}
          <Pressable className="mt-4 self-end active:opacity-60">
            <ThemedText className="text-blue font-bold text-sm">
              Forgot password?
            </ThemedText>
          </Pressable>

          {/* Continue Button */}
          <View className="mt-6 overflow-hidden rounded-xl">
            <Pressable
              android_ripple={{ color: '#FFFFFF4D', radius: 100 }}
              onPress={handleLogin}
              disabled={loading}
              className="bg-blue py-3.5 items-center justify-center active:opacity-90 flex-row"
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <ThemedText className="text-white font-bold text-base">
                  Authenticate & Continue
                </ThemedText>
              )}
            </Pressable>
          </View>

          {/* OTP note */}
          <View className="mt-8 rounded-2xl border border-white bg-white/50 p-4 flex-row items-start">
            <MaterialCommunityIcons name="information" size={20} color="#0EA5E9" className="mr-3 mt-0.5" />
            <View className="flex-1 ml-3">
              <ThemedText className="text-sm font-bold text-dark-blue">Multi-Factor Authentication</ThemedText>
              <ThemedText className="text-xs text-blue mt-1 font-medium leading-5">
                A secure passcode will be requested if SSO is not enforced.
              </ThemedText>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}