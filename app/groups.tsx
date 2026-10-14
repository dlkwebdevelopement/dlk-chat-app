import { ScrollView, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function GroupsScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="items-center justify-center py-20 px-6">
        <MaterialCommunityIcons name="account-group" size={64} color="#0284C7" />
        <ThemedText className="text-dark-blue font-bold text-2xl mt-4">Groups</ThemedText>
        <ThemedText className="text-blue mt-2">Coming soon...</ThemedText>
      </View>
    </ScrollView>
  );
}
