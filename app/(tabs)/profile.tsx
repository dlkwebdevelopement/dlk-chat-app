import { View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { useAuthStore } from '../../store/useAuthStore';

export default function ProfileScreen() {
  const { user } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 bg-brand-bg p-5">
      <View className="mb-6 rounded-xl border border-brand-border bg-brand-surface p-6 shadow-soft">
        <ThemedText type="title" className="text-brand-text font-extrabold">{user?.fullName || 'Loading...'}</ThemedText>
        <ThemedText className="mt-2 text-xs text-brand-muted leading-4">
          Enterprise user profile with secure identity tokens and communication preferences.
        </ThemedText>
      </View>

      <View className="gap-y-4">
        <View className="rounded-xl border border-brand-border bg-brand-surface p-5 shadow-soft">
          <ThemedText type="subtitle" className="text-brand-text font-bold mb-2">Profile Details</ThemedText>
          <ThemedText className="text-brand-text text-sm font-semibold mb-1">Role: <ThemedText className="text-brand-secondary capitalize">{user?.role || 'User'}</ThemedText></ThemedText>
          <ThemedText className="text-brand-text text-sm font-semibold mb-1">
            Department: <ThemedText className="text-brand-secondary">{user?.department || 'N/A'}</ThemedText>
          </ThemedText>
          <ThemedText className="text-brand-text text-sm font-semibold">
            Status: <ThemedText className="text-brand-secondary font-bold text-sm">🟢 Active now</ThemedText>
          </ThemedText>
        </View>

        <View className="rounded-xl border border-brand-border bg-brand-surface p-5 shadow-soft">
          <ThemedText type="subtitle" className="text-brand-text font-bold mb-2">Account Metadata</ThemedText>
          <ThemedText className="text-brand-text text-sm font-semibold mb-1">ID: {user?.employeeId || user?.customerId || 'N/A'}</ThemedText>
          <ThemedText className="text-brand-text text-sm font-semibold mb-1">Company: {user?.company || 'N/A'}</ThemedText>
          <ThemedText className="text-brand-text text-sm font-semibold">Email: {user?.email}</ThemedText>
        </View>

        <View className="rounded-xl border border-brand-border bg-brand-surface p-5 shadow-soft">
          <ThemedText type="subtitle" className="text-brand-text font-bold mb-2">Governance Settings</ThemedText>
          <ThemedText className="text-xs text-brand-muted leading-5">
            Manage session status, encryption keys, device registration, and notification preferences securely.
          </ThemedText>
        </View>
      </View>

      <View className="mt-8 mb-4">
        <Pressable
          android_ripple={{ color: '#EF44441A', radius: 200 }}
          className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm items-center active:bg-red-100"
          onPress={() => {
            const { logout } = useAuthStore.getState();
            logout();
            router.replace('/');
          }}
        >
          <ThemedText className="text-red-600 font-bold text-base">Sign Out</ThemedText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
