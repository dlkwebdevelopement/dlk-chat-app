import { StatusBar } from 'expo-status-bar';
import { Platform, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';

export default function ModalScreen() {
  return (
    <ScrollView className="flex-1 bg-brand-bg p-6">
      <View className="rounded-2xl border border-brand-border bg-brand-surface p-6 shadow-soft my-4">
        <ThemedText type="subtitle" className="text-brand-primary mb-2">
          Security & Compliance Advisory
        </ThemedText>
        <ThemedText className="text-xs text-brand-muted mb-6">
          Issued by: IT Security Operations Center (SOC)
        </ThemedText>

        <View className="gap-y-4 mb-8">
          <View className="rounded-lg border border-brand-border bg-brand-bg p-4">
            <ThemedText className="text-sm font-semibold text-brand-text mb-1">Encrypted Sessions</ThemedText>
            <ThemedText className="text-xs text-brand-muted leading-5">
              All communications, audio, and video packets are encrypted using enterprise TLS 1.3. Do not attempt to route traffic through unverified proxies.
            </ThemedText>
          </View>

          <View className="rounded-lg border border-brand-border bg-brand-bg p-4">
            <ThemedText className="text-sm font-semibold text-brand-text mb-1">Compliance Logging</ThemedText>
            <ThemedText className="text-xs text-brand-muted leading-5">
              In accordance with corporate bylaws, group conversations and shared files in public channels are archived for compliance verification.
            </ThemedText>
          </View>

          <View className="rounded-lg border border-brand-border bg-brand-bg p-4">
            <ThemedText className="text-sm font-semibold text-brand-text mb-1">Access Control</ThemedText>
            <ThemedText className="text-xs text-brand-muted leading-5">
              Your device is registered under Employee ID DLK26@EMP001. Session validation occurs periodically every 24 hours.
            </ThemedText>
          </View>
        </View>

        <Button
          mode="contained"
          buttonColor="#047857"
          textColor="#FFFFFF"
          onPress={() => router.back()}
          className="rounded-xl py-1"
          labelStyle={{ fontWeight: 'bold' }}
        >
          Acknowledge & Close
        </Button>
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
    </ScrollView>
  );
}
