import {
  FlatList,
  View,
  Image,
  Pressable,
  TextInput,
  Animated,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { useState, useRef, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useChatStore } from '@/store/useChatStore';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/utils/api';
import { router } from 'expo-router';

const AnimatedView = Animated.createAnimatedComponent(View);

const StatusIndicator = ({ status }: { status: string }) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return '#10B981';
      case 'typing':
        return '#0284C7';
      default:
        return '#D1D5DB';
    }
  };

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 3,
        borderColor: 'white',
        backgroundColor: getStatusColor(),
        opacity: status === 'typing' ? pulseAnim : 1,
        transform: [
          {
            scale: status === 'typing'
              ? pulseAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1.2],
              })
              : 1,
          },
        ],
      }}
    />
  );
};

export default function ChatsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { conversations, setConversations } = useChatStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [isChatModalVisible, setChatModalVisible] = useState(false);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    fetchConversations();

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

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await api.get('/chat/conversations');
      setConversations(response.data.conversations || []);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
      Alert.alert('Error', 'Failed to load conversations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isChatModalVisible && selectedChat) {
      fetchMessages();
    }
  }, [isChatModalVisible, selectedChat]);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await api.get(`/chat/messages/${selectedChat.id}`);
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;
    try {
      const isGroup = selectedChat.isGroup;
      const payload = {
        text: messageText,
        ...(isGroup ? { groupId: selectedChat.id } : { receiverId: selectedChat.id })
      };
      const response = await api.post('/chat/send', payload);
      setMessages(prev => [...prev, response.data.message]);
      setMessageText('');
      fetchConversations(); // Optional: update latest message preview
    } catch (error) {
      console.error('Failed to send message:', error);
      Alert.alert('Error', 'Failed to send message.');
    }
  };

  const filteredChats = conversations.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F0F9FF' }}>
      {/* Header with Search */}
      <AnimatedView
        style={{
          backgroundColor: '#E0F2FE',
          paddingHorizontal: 20,
          paddingVertical: 16,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <ThemedText className="text-slate-900 font-black text-2xl mb-4">
          Chats
        </ThemedText>

        {/* Search Bar */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 16,
            paddingHorizontal: 14,
            paddingVertical: 12,
            borderWidth: 2,
            borderColor: searchQuery ? '#0284C7' : '#BAE6FD',
          }}
        >
          <MaterialCommunityIcons name="magnify" size={20} color="#0284C7" />
          <TextInput
            placeholder="Search conversations..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              flex: 1,
              marginLeft: 8,
              fontSize: 14,
              color: '#0F172A',
              fontWeight: '600',
            }}
          />
          {searchQuery.length > 0 && (
            <Pressable
              onPress={() => setSearchQuery('')}
              className="active:opacity-60"
            >
              <MaterialCommunityIcons
                name="close-circle"
                size={20}
                color="#0284C7"
              />
            </Pressable>
          )}
        </View>
      </AnimatedView>

      {/* Chats List */}
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0284C7" />
        </View>
      ) : (
        <FlatList
          data={filteredChats}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 100 }}
          scrollIndicatorInsets={{ right: 1 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setSelectedChat(item);
                setChatModalVisible(true);
              }}
              android_ripple={{ color: '#0284C71A', radius: 20 }}
            >
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 16,
                  padding: 12,
                  marginBottom: 10,
                  borderWidth: 2,
                  borderColor: '#BAE6FD',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                {/* Avatar with Status */}
                <View className="relative mr-3">
                  <Image
                    source={{ uri: item.avatar }}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      backgroundColor: '#E0F2FE',
                    }}
                  />
                  <StatusIndicator status={item.status} />
                </View>

                {/* Chat Info */}
                <View style={{ flex: 1 }}>
                  {/* Name and Time */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 6,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 6,
                        flex: 1,
                      }}
                    >
                      <ThemedText
                        style={{
                          color: '#0F172A',
                          fontWeight: '700',
                          fontSize: 15,
                          flex: 1,
                        }}
                        numberOfLines={1}
                      >
                        {item.name}
                      </ThemedText>
                      {item.isGroup && (
                        <View
                          style={{
                            backgroundColor: '#BAE6FD',
                            borderRadius: 6,
                            padding: 4,
                          }}
                        >
                          <MaterialCommunityIcons
                            name="account-multiple"
                            size={12}
                            color="#0284C7"
                          />
                        </View>
                      )}
                    </View>
                    <ThemedText
                      style={{
                        color: '#06B6D4',
                        fontSize: 11,
                        fontWeight: '600',
                        marginLeft: 8,
                      }}
                    >
                      {new Date(item.time).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </ThemedText>
                  </View>

                  {/* Message Preview and Badge */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <ThemedText
                      style={{
                        color: '#64748B',
                        fontSize: 13,
                        fontWeight: '500',
                        flex: 1,
                      }}
                      numberOfLines={1}
                    >
                      {item.message}
                    </ThemedText>

                    {/* Unread Badge */}
                    {item.unread > 0 && (
                      <View
                        style={{
                          marginLeft: 8,
                          backgroundColor: '#0284C7',
                          borderRadius: 12,
                          width: 24,
                          height: 24,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <ThemedText
                          style={{
                            color: 'white',
                            fontSize: 11,
                            fontWeight: '700',
                          }}
                        >
                          {item.unread > 9 ? '9+' : item.unread}
                        </ThemedText>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </Pressable>
          )}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 60 }}>
              <View
                style={{
                  backgroundColor: '#BAE6FD',
                  borderRadius: 16,
                  padding: 20,
                  alignItems: 'center',
                  marginBottom: 16,
                }}
              >
                <MaterialCommunityIcons
                  name="chat-outline"
                  size={44}
                  color="#0284C7"
                />
              </View>
              <ThemedText
                style={{
                  color: '#0284C7',
                  textAlign: 'center',
                  fontSize: 15,
                  fontWeight: '600',
                }}
              >
                No conversations yet
              </ThemedText>
              <ThemedText
                style={{
                  color: '#64748B',
                  textAlign: 'center',
                  fontSize: 13,
                  fontWeight: '500',
                  marginTop: 6,
                }}
              >
                Start a new chat to begin messaging
              </ThemedText>
            </View>
          }
        />
      )}

      {/* Floating Action Button */}
      <View style={{ position: 'absolute', bottom: 24, right: 20 }}>
        <Pressable
          android_ripple={{ color: '#FFFFFF4D', radius: 32 }}
          onPress={() => router.push({ pathname: '/select-users', params: { type: 'chat' } })}
          className="active:opacity-80"
        >
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: '#0284C7',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#0284C7',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <MaterialCommunityIcons
              name="pencil-plus"
              size={28}
              color="white"
            />
          </View>
        </Pressable>
      </View>

      {/* Chat Details Modal */}
      <Modal
        visible={isChatModalVisible}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setChatModalVisible(false)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F0F9FF' }}>
          {selectedChat && (
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
              {/* Header */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                  paddingTop: Platform.OS === 'android' ? 40 : 16,
                  backgroundColor: 'white',
                  borderBottomWidth: 1,
                  borderBottomColor: '#E2E8F0',
                  elevation: 2,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 4,
                }}
              >
                <Pressable
                  onPress={() => setChatModalVisible(false)}
                  style={{ marginRight: 16 }}
                  hitSlop={10}
                >
                  <MaterialCommunityIcons name="arrow-left" size={24} color="#0F172A" />
                </Pressable>
                <Image
                  source={{ uri: selectedChat.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedChat.name}` }}
                  style={{ width: 44, height: 44, borderRadius: 14, marginRight: 12, backgroundColor: '#E0F2FE' }}
                />
                <Pressable 
                  style={{ flex: 1 }}
                  onPress={() => {
                    setChatModalVisible(false);
                    router.push({
                      pathname: '/chat-info-modal',
                      params: {
                        id: selectedChat.id,
                        name: selectedChat.name,
                        avatar: selectedChat.avatar,
                        isGroup: selectedChat.isGroup ? 'true' : 'false'
                      }
                    });
                  }}
                >
                  <ThemedText style={{ fontSize: 16, fontWeight: '700', color: '#0F172A' }}>
                    {selectedChat.name}
                  </ThemedText>
                  <ThemedText style={{ fontSize: 13, color: selectedChat.status === 'online' ? '#10B981' : '#64748B', fontWeight: '500' }}>
                    {selectedChat.status === 'online' ? 'Online' : 'Offline'}
                  </ThemedText>
                </Pressable>
                <Pressable style={{ marginRight: 20 }}>
                  <MaterialCommunityIcons name="phone" size={24} color="#0284C7" />
                </Pressable>
                <Pressable>
                  <MaterialCommunityIcons name="video" size={24} color="#0284C7" />
                </Pressable>
              </View>

              {/* Chat Messages */}
              <ScrollView 
                ref={scrollViewRef}
                style={{ flex: 1, padding: 16, backgroundColor: '#F0F9FF' }}
                keyboardShouldPersistTaps="handled"
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
              >
                {messages.length === 0 ? (
                  <View style={{ alignSelf: 'center', marginTop: 20 }}>
                    <ThemedText style={{ color: '#94A3B8' }}>No messages yet.</ThemedText>
                  </View>
                ) : (
                  messages.map((msg: any) => {
                    const currentUserId = user?.id || user?._id;
                    const senderId = typeof msg.sender === 'object' && msg.sender !== null ? (msg.sender._id || msg.sender.id) : msg.sender;
                    const isMine = Boolean(currentUserId && senderId && String(currentUserId) === String(senderId));
                    return (
                      <View 
                        key={msg._id} 
                        style={{ 
                          alignSelf: isMine ? 'flex-end' : 'flex-start', 
                          backgroundColor: isMine ? '#0284C7' : 'white', 
                          padding: 12, 
                          borderRadius: 16, 
                          borderBottomRightRadius: isMine ? 4 : 16,
                          borderBottomLeftRadius: isMine ? 16 : 4,
                          maxWidth: '80%', 
                          marginBottom: 16, 
                          borderWidth: 1, 
                          borderColor: isMine ? '#0284C7' : '#E2E8F0' 
                        }}
                      >
                        <ThemedText style={{ color: isMine ? 'white' : '#0F172A', fontSize: 15, lineHeight: 22 }}>
                          {msg.text}
                        </ThemedText>
                        <ThemedText style={{ color: isMine ? '#E0F2FE' : '#94A3B8', fontSize: 11, marginTop: 4, alignSelf: 'flex-end', fontWeight: '500' }}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </ThemedText>
                      </View>
                    );
                  })
                )}
              </ScrollView>

              {/* Input Area */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 12,
                  paddingBottom: Platform.OS === 'ios' ? 24 : 12,
                  backgroundColor: 'white',
                  borderTopWidth: 1,
                  borderTopColor: '#E2E8F0',
                }}
              >
                <Pressable style={{ padding: 8 }}>
                  <MaterialCommunityIcons name="paperclip" size={24} color="#64748B" />
                </Pressable>
                <TextInput
                  placeholder="Type a message..."
                  placeholderTextColor="#94A3B8"
                  value={messageText}
                  onChangeText={setMessageText}
                  style={{
                    flex: 1,
                    backgroundColor: '#F1F5F9',
                    borderRadius: 20,
                    paddingHorizontal: 16,
                    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
                    marginHorizontal: 8,
                    fontSize: 15,
                    color: '#0F172A',
                    maxHeight: 100,
                  }}
                  multiline
                />
                <Pressable
                  onPress={handleSendMessage}
                  style={{
                    backgroundColor: messageText.trim() ? '#0284C7' : '#F1F5F9',
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MaterialCommunityIcons name="send" size={20} color={messageText.trim() ? 'white' : '#94A3B8'} />
                </Pressable>
              </View>
            </KeyboardAvoidingView>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  elevation: {
    elevation: 8,
    shadowColor: '#0284C7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
});