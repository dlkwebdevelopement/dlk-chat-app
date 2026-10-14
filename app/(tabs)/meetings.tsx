import { FlatList, View, ActivityIndicator, Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import api from '../../utils/api';

export default function MeetingsScreen() {
  const router = useRouter();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/meetings');
      setMeetings(response.data.meetings || []);
    } catch (error) {
      console.error('Failed to fetch meetings:', error);
      Alert.alert('Error', 'Failed to load meetings');
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (startTime: string, endTime: string) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    if (now > end) return 'Completed';
    if (now >= start && now <= end) return 'Live';
    return 'Scheduled';
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg p-5">
      <View className="mb-6 rounded-xl border border-brand-border bg-brand-surface p-5 shadow-soft">
        <ThemedText type="title" className="text-brand-text font-bold">Meetings</ThemedText>
        <ThemedText className="mt-2 text-xs text-brand-muted leading-4">
          Enterprise meeting controls with participant grid, call indicators, and media status.
        </ThemedText>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0EA5E9" />
        </View>
      ) : (
        <FlatList
          data={meetings}
          keyExtractor={(item: any) => item._id}
          contentContainerStyle={{ gap: 16, paddingBottom: 32 }}
          ListEmptyComponent={
            <View className="items-center py-10">
              <ThemedText className="text-brand-muted">No meetings scheduled.</ThemedText>
            </View>
          }
          renderItem={({ item }: { item: any }) => {
            const status = getStatus(item.startTime, item.endTime);
            const formattedTime = new Date(item.startTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
            
            return (
              <View className="rounded-xl border border-brand-border bg-brand-surface p-5 shadow-soft">
                <View className="flex-row items-center justify-between gap-4">
                  <ThemedText type="subtitle" className="text-brand-text font-bold flex-1">{item.title}</ThemedText>
                  <View className={`rounded border px-2.5 py-1 ${status === 'Live' ? 'bg-brand-danger/10 border-brand-danger/20' : status === 'Scheduled' ? 'bg-brand-primary/10 border-brand-primary/20' : 'bg-gray-100 border-gray-200'}`}>
                    <ThemedText className={`text-xs font-bold ${status === 'Live' ? 'text-brand-danger' : status === 'Scheduled' ? 'text-brand-primary' : 'text-gray-600'}`}>{status}</ThemedText>
                  </View>
                </View>
                <ThemedText className="mt-3 text-xs text-brand-muted">{formattedTime}</ThemedText>
                {item.host && (
                  <ThemedText className="mt-1 text-xs text-brand-text">Host: {item.host.fullName}</ThemedText>
                )}
                <View className="mt-4 flex-row flex-wrap gap-3">
                  <View className="rounded bg-brand-bg border border-brand-border px-3 py-1.5">
                    <ThemedText className="text-xs font-semibold text-brand-primary">Mic</ThemedText>
                  </View>
                  <View className="rounded bg-brand-bg border border-brand-border px-3 py-1.5">
                    <ThemedText className="text-xs font-semibold text-brand-info">Camera</ThemedText>
                  </View>
                  <View className="rounded bg-brand-bg border border-brand-border px-3 py-1.5">
                    <ThemedText className="text-xs font-semibold text-brand-muted">Share</ThemedText>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}

      {/* Floating Action Button */}
      <View className="absolute bottom-6 right-6">
        <Pressable
          android_ripple={{ color: '#FFFFFF4D', radius: 28 }}
          onPress={() => router.push({ pathname: '/select-users', params: { type: 'meeting' } })}
          className="active:opacity-80"
        >
          <View className="w-14 h-14 rounded-full bg-brand-primary items-center justify-center shadow-soft">
            <MaterialCommunityIcons
              name="calendar-plus"
              size={24}
              color="white"
            />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
