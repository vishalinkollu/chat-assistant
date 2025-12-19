import React, { useEffect, useRef } from 'react';
import { Animated, FlatList, View } from 'react-native';
import ChatBubble from './chatBubble';

function TypingDots() {
  const dots = [useRef(new Animated.Value(0.3)).current,
                useRef(new Animated.Value(0.3)).current,
                useRef(new Animated.Value(0.3)).current];

  useEffect(() => {
    Animated.loop(
      Animated.stagger(
        150,
        dots.map(dot =>
          Animated.sequence([
            Animated.timing(dot, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(dot, {
              toValue: 0.3,
              duration: 300,
              useNativeDriver: true,
            }),
          ])
        )
      )
    ).start();
  }, []);

  return (
    <View style={{ flexDirection: 'row', paddingLeft: 12, marginVertical: 8 }}>
      {dots.map((dot, i) => (
        <Animated.Text
          key={i}
          style={{ opacity: dot, fontSize: 24, marginRight: 4 }}
        >
          •
        </Animated.Text>
      ))}
    </View>
  );
}

export default function MessageList({ messages, isTyping }) {
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollToEnd({ animated: true });
  }, [messages, isTyping]);

  return (
    <FlatList
      ref={listRef}
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatBubble message={item} />}
      contentContainerStyle={{ padding: 14 }}
      ListFooterComponent={isTyping ? <TypingDots /> : null}
    />
  );
}
