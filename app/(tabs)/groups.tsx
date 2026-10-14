import { FlatList, View, ActivityIndicator, Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import api from '../../utils/api';

export default function GroupsScreen() {
  const router = useRouter();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const response = await api.get('/groups');
      setGroups(response.data.groups || []);
    } catch (error) {
      console.error('Failed to fetch groups:', error);
      Alert.alert('Error', 'Failed to load groups');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg p-5">
      <View className="mb-6 rounded-xl border border-brand-border bg-brand-surface p-5 shadow-soft">
        <ThemedText type="title" className="text-brand-text font-bold">Group collaboration</ThemedText>
        <ThemedText className="mt-2 text-xs text-brand-muted leading-4">
          Department-level chat rooms with presence indicators and secure channel sharing.
        </ThemedText>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0EA5E9" />
        </View>
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item: any) => item._id}
          contentContainerStyle={{ gap: 16, paddingBottom: 28 }}
          ListEmptyComponent={
            <View className="items-center py-10">
              <ThemedText className="text-brand-muted">No groups found.</ThemedText>
            </View>
          }
          renderItem={({ item }: { item: any }) => {
            const memberCount = item.members?.length || 0;
            const onlineCount = item.members?.filter((m: any) => m.isOnline).length || 0;
            
            return (
              <View className="rounded-xl border border-brand-border bg-brand-surface p-5 shadow-soft">
                <View className="flex-row items-center justify-between">
                  <ThemedText type="subtitle" className="text-brand-text font-bold">{item.name}</ThemedText>
                  <View className="rounded bg-brand-primary/10 border border-brand-primary/20 px-2.5 py-1">
                    <ThemedText className="text-xs font-semibold text-brand-primary">{item.department || 'General'}</ThemedText>
                  </View>
                </View>
                <ThemedText className="mt-3 text-brand-text text-sm font-semibold">{memberCount} members</ThemedText>
                <View className="mt-4 flex-row flex-wrap items-center gap-2">
                  <View className="flex-row items-center gap-2 rounded-lg bg-brand-bg border border-brand-border px-3 py-1.5">
                    <View className="h-2.5 w-2.5 rounded-full bg-brand-secondary" />
                    <ThemedText className="text-xs font-medium text-brand-muted">{onlineCount} online</ThemedText>
                  </View>
                  <View className="rounded-lg bg-brand-bg border border-brand-border px-3 py-1.5">
                    <ThemedText className="text-xs font-medium text-brand-text">{item.isPrivate ? 'Private' : 'Public'} channel</ThemedText>
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
          onPress={() => router.push({ pathname: '/select-users', params: { type: 'group' } })}
          className="active:opacity-80"
        >
          <View className="w-14 h-14 rounded-full bg-brand-primary items-center justify-center shadow-soft">
            <MaterialCommunityIcons
              name="account-group"
              size={24}
              color="white"
            />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
