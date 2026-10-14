import { useState, useEffect, useRef } from 'react';
import { View, FlatList, TextInput, Pressable, ActivityIndicator, Image, Animated } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import api from '../utils/api';
import { useAuthStore } from '../store/useAuthStore';

export default function SelectUsersScreen() {
  const { type } = useLocalSearchParams(); // 'chat', 'group', 'meeting'
  const { user: currentUser } = useAuthStore();
  
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchUsers();
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 50, friction: 8, useNativeDriver: true }),
    ]).start();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users/directory');
      // filter out the current user
      const filtered = (res.data.users || []).filter((u: any) => u._id !== currentUser?._id);
      setUsers(filtered);
    } catch (err) {
      console.error('Error fetching directory:', err);
    } finally {
      setLoading(false);
    }
  };

  const isMultiSelect = type === 'group' || type === 'meeting';

  const toggleSelect = (id: string) => {
    if (!isMultiSelect) {
      // Single select: immediately act
      if (type === 'chat') {
        router.push({ pathname: '/chat-details', params: { id, name: users.find(u => u._id === id)?.fullName, isGroup: 'false' } });
      }
      return;
    }
    
    // Multi select
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (selectedIds.length === 0) return;
    const selectedUsersParam = selectedIds.join(',');
    if (type === 'group') {
      router.push({ pathname: '/create-group', params: { members: selectedUsersParam } });
    } else if (type === 'meeting') {
      router.push({ pathname: '/create-meeting', params: { participants: selectedUsersParam } });
    }
  };

  const filteredUsers = users.filter(u => 
    u.fullName.toLowerCase().includes(search.toLowerCase()) || 
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Animated.View 
      className="flex-1 bg-white pt-6 px-4"
      style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
    >
      <View className="flex-row items-center justify-between mb-6">
        <Pressable onPress={() => router.back()} className="h-10 w-10 bg-white rounded-full items-center justify-center">
          <MaterialCommunityIcons name="arrow-left" size={24} color="#0284C7" />
        </Pressable>
        <ThemedText className="text-xl font-bold text-dark-blue">
          {type === 'chat' ? 'New Chat' : type === 'group' ? 'Add Group Members' : 'Add Participants'}
        </ThemedText>
        <View className="w-10" />
      </View>

      <View className="flex-row items-center bg-white rounded-2xl px-4 py-3 mb-4">
        <MaterialCommunityIcons name="magnify" size={20} color="#0EA5E9" />
        <TextInput 
          placeholder="Search by name or role..."
          placeholderTextColor="#7DD3FC"
          value={search}
          onChangeText={setSearch}
          className="flex-1 ml-2 text-dark-blue font-medium"
        />
      </View>

      {isMultiSelect && selectedIds.length > 0 && (
        <View className="mb-4 flex-row justify-between items-center bg-white p-4 rounded-xl border border-white">
          <ThemedText className="text-dark-blue font-bold">{selectedIds.length} Selected</ThemedText>
          <Pressable onPress={handleNext} className="bg-blue px-4 py-2 rounded-full shadow-sm active:bg-blue">
            <ThemedText className="text-white font-bold text-sm">Next</ThemedText>
          </Pressable>
        </View>
      )}

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0EA5E9" />
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="items-center py-10">
              <ThemedText className="text-blue">No users found.</ThemedText>
            </View>
          }
          renderItem={({ item }) => {
            const isSelected = selectedIds.includes(item._id);
            return (
              <Pressable 
                onPress={() => toggleSelect(item._id)}
                android_ripple={{ color: '#0EA5E91A' }}
                className={`flex-row items-center p-3 mb-2 rounded-xl border ${isSelected ? 'border-blue bg-white' : 'border-white bg-white'}`}
              >
                <Image 
                  source={{ uri: item.profilePhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.fullName}` }}
                  className="w-12 h-12 rounded-full border border-white"
                />
                <View className="flex-1 ml-3">
                  <ThemedText className="font-bold text-dark-blue">{item.fullName}</ThemedText>
                  <ThemedText className="text-xs text-blue capitalize">{item.role}</ThemedText>
                </View>
                {isMultiSelect && (
                  <View className={`w-6 h-6 rounded-full border items-center justify-center ${isSelected ? 'bg-blue border-blue' : 'border-white'}`}>
                    {isSelected && <MaterialCommunityIcons name="check" size={16} color="white" />}
                  </View>
                )}
              </Pressable>
            );
          }}
        />
      )}
    </Animated.View>
  );
}
