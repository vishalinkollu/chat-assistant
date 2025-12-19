import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../features/chat/chatThunks';

function DataRow({ label, value }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
        gap:'20px'
      }}
    >
      <Text style={{ color: '#475569', fontSize: 13 }}>{label}</Text>
      <Text style={{ color: '#0F172A', fontSize: 13, fontWeight: '600' }}>
        {value}
      </Text>
    </View>
  );
}

export default function ChatBubble({ message }) {
  const isUser = message.role === 'user';
  const dispatch = useDispatch();

  const handleSuggestionPress = (text) => {
    dispatch(sendMessage(text));
  };

  const isObject =
    typeof message.content === 'object' && message.content !== null;

  return (
    <View
      style={{
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        backgroundColor: isUser ? '#2563EB' : '#F8FAFC',
        padding: 14,
        borderRadius: 18,
        marginVertical: 6,
        maxWidth: '80%',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      {isObject && message.content.answer && (
        <>
          <Text
            style={{
              color: isUser ? '#FFFFFF' : '#0F172A',
              fontSize: 15,
              lineHeight: 20,
            }}
          >
            {message.content.answer}
          </Text>

          <Text
            style={{
              marginTop: 6,
              fontSize: 12,
              color: '#64748B',
            }}
          >
          </Text>
        </>
      )}

      {isObject && !message.content.answer && !message.content.suggestions && (
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '700',
              marginBottom: 8,
              color: '#0F172A',
              gap:'10px'
            }}
          >
            Processed Data
          </Text>

          {Object.entries(message.content).map(([key, value]) => (
            <DataRow
              key={key}
              label={key.replace(/([A-Z])/g, ' $1')}
              value={String(value)}
            />
          ))}
        </View>
      )}

      {typeof message.content === 'string' &&
        !message.content.startsWith('http') && (
          <Text
            style={{
              color: isUser ? '#FFFFFF' : '#0F172A',
              fontSize: 15,
            }}
          >
            {message.content}
          </Text>
        )}

      {typeof message.content === 'string' &&
        message.content.startsWith('http') && (
          <Image
            source={{ uri: message.content }}
            style={{ width: 220, height: 220, borderRadius: 14 }}
          />
        )}

      {message.content?.suggestions && (
        <View style={{ marginTop: 12 }}>
          {message.content.suggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSuggestionPress(suggestion)}
              style={{
                marginTop: 6,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 12,
                backgroundColor: '#E0E7FF',
              }}
            >
              <Text
                style={{
                  color: '#2563EB',
                  fontSize: 13,
                  fontWeight: '500',
                }}
              >
                {suggestion}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
