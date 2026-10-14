import { useState } from 'react';
import { View, TextInput, Pressable, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import api from '../utils/api';

export default function CreateMeetingScreen() {
  const router = useRouter();
  const { participants } = useLocalSearchParams(); 
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // For simplicity using text inputs for dates in a real app use a DatePicker
  const [startTime, setStartTime] = useState(new Date().toISOString());
  const [endTime, setEndTime] = useState(new Date(Date.now() + 3600000).toISOString()); 
  const [meetingUrl, setMeetingUrl] = useState('https://meet.google.com/new');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) return Alert.alert('Error', 'Title is required');
    
    try {
      setLoading(true);
      const participantsArray = participants ? (participants as string).split(',') : [];
      
      await api.post('/meetings', {
        title: title.trim(),
        description: description.trim(),
        startTime,
        endTime,
        meetingUrl,
        participants: participantsArray
      });

      Alert.alert('Success', 'Meeting scheduled successfully!');
      router.replace('/meetings');
    } catch (err: any) {
      console.error(err);
      Alert.alert('Error', err.response?.data?.message || 'Failed to schedule meeting');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white pt-6 px-5" contentContainerStyle={{ paddingBottom: 40 }}>
      <View className="flex-row items-center justify-between mb-8">
        <Pressable onPress={() => router.back()} className="h-10 w-10 bg-white rounded-full items-center justify-center">
          <MaterialCommunityIcons name="arrow-left" size={24} color="#0284C7" />
        </Pressable>
        <ThemedText className="text-xl font-bold text-dark-blue">Schedule Meeting</ThemedText>
        <View className="w-10" />
      </View>

      <View className="gap-y-4">
        <View>
          <ThemedText className="text-sm font-bold text-dark-blue mb-2">Meeting Title</ThemedText>
          <TextInput 
            placeholder="e.g. Weekly Sync"
            placeholderTextColor="#7DD3FC"
            value={title}
            onChangeText={setTitle}
            className="bg-white border border-white rounded-xl px-4 py-3 text-dark-blue font-medium"
          />
        </View>

        <View>
          <ThemedText className="text-sm font-bold text-dark-blue mb-2">Description</ThemedText>
          <TextInput 
            placeholder="Agenda..."
            placeholderTextColor="#7DD3FC"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            className="bg-white border border-white rounded-xl px-4 py-3 text-dark-blue font-medium text-left align-top"
          />
        </View>

        <View>
          <ThemedText className="text-sm font-bold text-dark-blue mb-2">Start Time (ISO)</ThemedText>
          <TextInput 
            value={startTime}
            onChangeText={setStartTime}
            className="bg-white border border-white rounded-xl px-4 py-3 text-dark-blue font-medium"
          />
        </View>

        <View>
          <ThemedText className="text-sm font-bold text-dark-blue mb-2">End Time (ISO)</ThemedText>
          <TextInput 
            value={endTime}
            onChangeText={setEndTime}
            className="bg-white border border-white rounded-xl px-4 py-3 text-dark-blue font-medium"
          />
        </View>

        <View>
          <ThemedText className="text-sm font-bold text-dark-blue mb-2">Meeting Link</ThemedText>
          <TextInput 
            value={meetingUrl}
            onChangeText={setMeetingUrl}
            className="bg-white border border-white rounded-xl px-4 py-3 text-dark-blue font-medium"
          />
        </View>

        <View className="bg-white border border-white rounded-xl p-4 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <MaterialCommunityIcons name="account-group" size={20} color="#0284C7" />
            <ThemedText className="font-bold text-dark-blue">Participants</ThemedText>
          </View>
          <ThemedText className="font-bold text-blue">{participants ? (participants as string).split(',').length : 0}</ThemedText>
        </View>

        <Pressable 
          onPress={handleCreate}
          disabled={loading}
          className={`mt-4 rounded-full py-4 items-center shadow-sm ${loading ? 'bg-blue' : 'bg-blue active:bg-blue'}`}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <ThemedText className="text-white font-bold text-lg">Schedule</ThemedText>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
}
