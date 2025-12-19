import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import MessageList from '../components/MessageList';
import ChatInput from '../components/chatInput';

export default function ChatScreen() {
  const { messages, isTyping } = useSelector(state => state.chat);

  return (
    <LinearGradient
    colors={['#FFF7ED', '#FFEDD5']}
    start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <MessageList messages={messages} isTyping={isTyping} />
        <ChatInput />
      </View>
    </LinearGradient>
  );
}
