import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';

export default function CallsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      <ScrollView className="flex-1 bg-brand-bg" contentContainerStyle={{ padding: 20, gap: 20 }}>
      <View className="rounded-xl border border-brand-border bg-brand-surface p-6 shadow-soft">
        <ThemedText type="title" className="text-brand-text font-bold">Calls</ThemedText>
        <ThemedText className="mt-2 text-xs text-brand-muted leading-4">
          Enterprise voice and video call controls with secure connection indicators and history logs.
        </ThemedText>
      </View>

      <View className="rounded-xl border border-brand-border bg-brand-surface p-10 shadow-soft items-center justify-center">
        <ThemedText className="text-brand-muted font-medium mb-2">No active calls</ThemedText>
        <ThemedText className="text-xs text-brand-secondary text-center">
          You have no active or scheduled calls at the moment.
        </ThemedText>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
