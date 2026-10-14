import { useState } from 'react';
import { View, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import api from '../utils/api';

export default function CreateGroupScreen() {
  const router = useRouter();
  const { members } = useLocalSearchParams(); // comma separated string of user IDs
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return Alert.alert('Error', 'Group name is required');
    
    try {
      setLoading(true);
      const membersArray = members ? (members as string).split(',') : [];
      
      await api.post('/groups', {
        name: name.trim(),
        description: description.trim(),
        members: membersArray
      });

      Alert.alert('Success', 'Group created successfully!');
      router.replace('/groups');
    } catch (err: any) {
      console.error(err);
      Alert.alert('Error', err.response?.data?.message || 'Failed to create group');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white pt-6 px-5">
      <View className="flex-row items-center justify-between mb-8">
        <Pressable onPress={() => router.back()} className="h-10 w-10 bg-white rounded-full items-center justify-center">
          <MaterialCommunityIcons name="arrow-left" size={24} color="#0284C7" />
        </Pressable>
        <ThemedText className="text-xl font-bold text-dark-blue">Create Group</ThemedText>
        <View className="w-10" />
      </View>

      <View className="gap-y-4">
        <View>
          <ThemedText className="text-sm font-bold text-dark-blue mb-2">Group Name</ThemedText>
          <TextInput 
            placeholder="e.g. Sales Team"
            placeholderTextColor="#7DD3FC"
            value={name}
            onChangeText={setName}
            className="bg-white border border-white rounded-xl px-4 py-3 text-dark-blue font-medium"
          />
        </View>

        <View>
          <ThemedText className="text-sm font-bold text-dark-blue mb-2">Description (Optional)</ThemedText>
          <TextInput 
            placeholder="What is this group for?"
            placeholderTextColor="#7DD3FC"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            className="bg-white border border-white rounded-xl px-4 py-3 text-dark-blue font-medium text-left align-top"
          />
        </View>

        <View className="bg-white border border-white rounded-xl p-4 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <MaterialCommunityIcons name="account-group" size={20} color="#0284C7" />
            <ThemedText className="font-bold text-dark-blue">Members Selected</ThemedText>
          </View>
          <ThemedText className="font-bold text-blue">{members ? (members as string).split(',').length : 0}</ThemedText>
        </View>

        <Pressable 
          onPress={handleCreate}
          disabled={loading}
          className={`mt-4 rounded-full py-4 items-center shadow-sm ${loading ? 'bg-blue' : 'bg-blue active:bg-blue'}`}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <ThemedText className="text-white font-bold text-lg">Create Group</ThemedText>
          )}
        </Pressable>
      </View>
    </View>
  );
}
