import { View, Image, ScrollView, Pressable, Platform } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const demoMembers = [
  { id: '1', name: 'Arun Kumar', role: 'Admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arun' },
  { id: '2', name: 'Priya Sharma', role: 'Member', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' },
  { id: '3', name: 'You', role: 'Member', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You' },
];

export default function ChatInfoModal() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const chatName = (params.name as string) || 'Project Alpha';
  const chatAvatar = (params.avatar as string) || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alpha';
  const isGroup = params.name === 'Project Alpha' || params.name === 'Sales Team' || params.name === 'Design Team'; // Simple mock logic based on previous data

  return (
    <ScrollView className="flex-1 bg-white">
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      
      {/* Header Profile Section */}
      <View className="bg-white items-center pt-8 pb-6 border-b border-white">
        <View className="absolute top-4 left-4">
          <Pressable onPress={() => router.back()} className="p-2 bg-white rounded-full active:bg-white">
            <MaterialCommunityIcons name="close" size={24} color="#0284C7" />
          </Pressable>
        </View>

        <Image
          source={{ uri: chatAvatar }}
          className="w-24 h-24 rounded-full mb-4 border-4 border-white"
        />
        <ThemedText className="text-dark-blue font-bold text-2xl mb-1 text-center">
          {chatName}
        </ThemedText>
        <ThemedText className="text-blue text-sm text-center">
          {isGroup ? 'Group · 12 Members' : 'Online'}
        </ThemedText>

        <View className="flex-row gap-6 mt-6">
          <Pressable className="items-center active:opacity-70">
            <View className="w-12 h-12 rounded-full bg-white items-center justify-center mb-1">
              <MaterialCommunityIcons name="phone" size={24} color="#0284C7" />
            </View>
            <ThemedText className="text-dark-blue text-xs font-medium">Audio</ThemedText>
          </Pressable>
          
          <Pressable className="items-center active:opacity-70">
            <View className="w-12 h-12 rounded-full bg-white items-center justify-center mb-1">
              <MaterialCommunityIcons name="video" size={24} color="#0284C7" />
            </View>
            <ThemedText className="text-dark-blue text-xs font-medium">Video</ThemedText>
          </Pressable>

          <Pressable className="items-center active:opacity-70">
            <View className="w-12 h-12 rounded-full bg-white items-center justify-center mb-1">
              <MaterialCommunityIcons name="magnify" size={24} color="#0284C7" />
            </View>
            <ThemedText className="text-dark-blue text-xs font-medium">Search</ThemedText>
          </Pressable>
        </View>
      </View>

      {/* Settings Options */}
      <View className="bg-white mt-4 border-y border-white py-2">
        <Pressable className="flex-row items-center justify-between px-4 py-3 active:bg-white">
          <View className="flex-row items-center gap-3">
            <MaterialCommunityIcons name="bell-outline" size={24} color="#64748B" />
            <ThemedText className="text-dark-blue text-base">Mute notifications</ThemedText>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#CBD5E1" />
        </Pressable>
        
        <View className="h-[1px] bg-white ml-12" />

        <Pressable className="flex-row items-center justify-between px-4 py-3 active:bg-white">
          <View className="flex-row items-center gap-3">
            <MaterialCommunityIcons name="image-multiple-outline" size={24} color="#64748B" />
            <ThemedText className="text-dark-blue text-base">Media, links, and docs</ThemedText>
          </View>
          <View className="flex-row items-center gap-2">
            <ThemedText className="text-blue text-sm">42</ThemedText>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#CBD5E1" />
          </View>
        </Pressable>
      </View>

      {/* Members Section (If Group) */}
      {isGroup && (
        <View className="bg-white mt-4 border-y border-white pt-4 pb-2">
          <View className="px-4 mb-3 flex-row justify-between items-center">
            <ThemedText className="text-dark-blue font-bold text-base">Members</ThemedText>
            <Pressable>
              <MaterialCommunityIcons name="magnify" size={22} color="#64748B" />
            </Pressable>
          </View>
          
          <Pressable className="flex-row items-center px-4 py-3 active:bg-white">
            <View className="w-10 h-10 rounded-full bg-white items-center justify-center mr-3">
              <MaterialCommunityIcons name="account-plus" size={20} color="#0284C7" />
            </View>
            <ThemedText className="text-blue font-medium text-base">Add Members</ThemedText>
          </Pressable>

          {demoMembers.map((member, index) => (
            <View key={member.id} className="flex-row items-center px-4 py-2.5">
              <Image source={{ uri: member.avatar }} className="w-10 h-10 rounded-full mr-3" />
              <View className="flex-1">
                <ThemedText className="text-dark-blue font-medium text-base">{member.name}</ThemedText>
                <ThemedText className="text-blue text-xs">{member.role}</ThemedText>
              </View>
              {member.role === 'Admin' && (
                <View className="bg-white px-2 py-1 rounded">
                  <ThemedText className="text-dark-blue text-xs font-bold">Admin</ThemedText>
                </View>
              )}
            </View>
          ))}
          
          <Pressable className="px-4 py-3 mt-1 active:bg-white">
            <ThemedText className="text-blue font-medium text-center text-sm">View All 12 Members</ThemedText>
          </Pressable>
        </View>
      )}

      {/* Danger Zone */}
      <View className="bg-white mt-4 border-y border-white py-2 mb-8">
        <Pressable className="flex-row items-center gap-3 px-4 py-3 active:bg-red-50">
          <MaterialCommunityIcons name="cancel" size={24} color="#EF4444" />
          <ThemedText className="text-red-500 text-base font-medium">Block {isGroup ? 'Group' : 'User'}</ThemedText>
        </Pressable>
        <View className="h-[1px] bg-white ml-12" />
        <Pressable className="flex-row items-center gap-3 px-4 py-3 active:bg-red-50">
          <MaterialCommunityIcons name="alert-circle-outline" size={24} color="#EF4444" />
          <ThemedText className="text-red-500 text-base font-medium">Report {isGroup ? 'Group' : 'User'}</ThemedText>
        </Pressable>
      </View>
    </ScrollView>
  );
}
