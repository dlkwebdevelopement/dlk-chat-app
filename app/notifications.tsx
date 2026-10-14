import { FlatList, View, Animated, Pressable, ActivityIndicator, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useEffect, useRef, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../utils/api';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const badgeConfig: Record<string, { bg: string; text: string; dot: string; icon: string }> = {
  meeting: { bg: 'bg-white border-white', text: 'text-dark-blue', dot: 'bg-blue', icon: 'calendar-clock' },
  chat: { bg: 'bg-violet-100 border-violet-200', text: 'text-violet-700', dot: 'bg-violet-500', icon: 'message' },
  call: { bg: 'bg-emerald-100 border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', icon: 'phone' },
  system: { bg: 'bg-orange-100 border-orange-200', text: 'text-orange-700', dot: 'bg-orange-500', icon: 'cogs' },
  admin: { bg: 'bg-red-100 border-red-200', text: 'text-red-700', dot: 'bg-red-500', icon: 'shield' },
  default: { bg: 'bg-gray-100 border-gray-200', text: 'text-gray-700', dot: 'bg-gray-500', icon: 'bell' },
};

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [listAnimation, setListAnimation] = useState<Animated.Value[]>([]);

  useEffect(() => {
    fetchNotifications();

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
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.get('/notifications');
      const data = response.data.notifications || [];
      setNotifications(data);
      
      const anims = data.map(() => new Animated.Value(0));
      setListAnimation(anims);

      anims.forEach((anim: Animated.Value, index: number) => {
        Animated.sequence([
          Animated.delay(index * 100),
          Animated.spring(anim, {
            toValue: 1,
            tension: 50,
            friction: 8,
            useNativeDriver: true,
          }),
        ]).start();
      });
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      Alert.alert('Error', 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleRead = async (id: string, isRead: boolean) => {
    if (isRead) return;
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications((prev: any) =>
        prev.map((n: any) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-white via-white to-white px-5 pt-6">
      <Animated.View 
        className="mb-6 rounded-3xl border border-white bg-white p-6 shadow-lg"
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }}
      >
        <View className="flex-row items-center gap-3 mb-2">
          <View className="h-10 w-10 rounded-full bg-white items-center justify-center">
            <MaterialCommunityIcons name="bell-outline" size={20} color="#0284C7" />
          </View>
          <ThemedText className="text-dark-blue font-bold text-2xl">Notifications</ThemedText>
        </View>
        <ThemedText className="mt-2 text-sm text-blue font-medium leading-5">
          Realtime updates, meeting alerts, and secure call reminders for your enterprise workstream.
        </ThemedText>
      </Animated.View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0EA5E9" />
        </View>
      ) : (
        <AnimatedFlatList
          data={notifications}
          keyExtractor={(item: any) => item._id}
          contentContainerStyle={{ paddingBottom: 28 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="items-center py-10">
              <ThemedText className="text-blue">You have no notifications.</ThemedText>
            </View>
          }
          renderItem={({ item, index }: { item: any, index: number }) => {
            const anim = listAnimation[index] || new Animated.Value(1);
            const config = badgeConfig[item.type] || badgeConfig.default;
            const timeAgo = new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return (
              <Animated.View 
                className="mb-4 overflow-hidden rounded-2xl"
                style={{
                  opacity: anim,
                  transform: [
                    { 
                      translateY: anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0]
                      }) 
                    },
                    {
                      scale: anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.95, 1]
                      })
                    }
                  ]
                }}
              >
                <Pressable 
                  android_ripple={{ color: '#0284C71A', radius: 200 }}
                  onPress={() => handleRead(item._id, item.isRead)}
                  className={`border border-white p-5 shadow-md active:bg-white ${item.isRead ? 'bg-white opacity-80' : 'bg-white'}`}
                >
                  <View className="flex-row items-start gap-4">
                    <View className={`h-12 w-12 rounded-full items-center justify-center border ${config.bg}`}>
                      <MaterialCommunityIcons name={config.icon as any} size={22} color={config.text.replace('text-', '')} />
                    </View>
                    
                    <View className="flex-1">
                      <View className="flex-row items-center justify-between gap-3 mb-1">
                        <ThemedText className={`font-bold text-base flex-1 ${item.isRead ? 'text-dark-blue' : 'text-dark-blue'}`}>{item.title}</ThemedText>
                        <ThemedText className="text-xs text-blue">{timeAgo}</ThemedText>
                      </View>
                      
                      <ThemedText className={`text-sm font-medium leading-5 mb-3 ${item.isRead ? 'text-blue' : 'text-blue'}`}>{item.message}</ThemedText>
                      
                      <View className="flex-row items-center">
                        <View className={`rounded-full border px-3 py-1 flex-row items-center gap-1.5 ${config.bg}`}>
                          <View className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
                          <ThemedText className={`text-xs font-bold ${config.text}`}>{item.type.toUpperCase()}</ThemedText>
                        </View>
                      </View>
                    </View>
                  </View>
                </Pressable>
              </Animated.View>
            );
          }}
        />
      )}
    </View>
  );
}
