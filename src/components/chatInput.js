import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../features/chat/chatThunks';

export default function ChatInput() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const onSend = () => {
    if (!text.trim()) return;
    dispatch(sendMessage(text));
    setText('');
  };

  return (
    <View style={{ flexDirection: 'row', padding: 10 }}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Ask something…"
        style={{
          flex: 1,
          backgroundColor: '#ffff',
          borderRadius: 24,
          paddingHorizontal: 16,
          paddingVertical: 10,
          marginRight: 8,
          outline:'none'
        }}
        onSubmitEditing={onSend}
        />
      <TouchableOpacity
        onPress={onSend}
        style={{
          backgroundColor: '#007AFF',
          borderRadius: 24,
          padding: 12,
        }}
      >
        <Ionicons name="arrow-up" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
