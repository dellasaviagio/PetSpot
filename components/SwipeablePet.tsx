// SwipeablePet.tsx
import React, { useRef, useState } from 'react';
import { Animated, PanResponder, View, Text, StyleSheet, Image } from 'react-native';

const pets = [
  { id: 1, name: 'Buddy', image: 'https://example.com/dog1.jpg' },
  { id: 2, name: 'Lucy', image: 'https://example.com/dog2.jpg' },
  { id: 3, name: 'Max', image: 'https://example.com/dog3.jpg' },
];

const SwipeablePet = () => {
  const position = useRef(new Animated.ValueXY()).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  // PanResponder para detectar gestos
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > 120) {
          // Swipe para direita (aprovação do pet)
          Animated.spring(position, {
            toValue: { x: 500, y: gesture.dy },
            useNativeDriver: true,
          }).start(() => handleSwipe('right'));
        } else if (gesture.dx < -120) {
          // Swipe para esquerda (rejeição do pet)
          Animated.spring(position, {
            toValue: { x: -500, y: gesture.dy },
            useNativeDriver: true,
          }).start(() => handleSwipe('left'));
        } else {
          // Volta ao centro se o swipe não for forte o suficiente
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const handleSwipe = (direction: 'left' | 'right') => {
    const nextIndex = currentIndex + 1;

    // Reseta a posição e muda para o próximo pet
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex(nextIndex >= pets.length ? 0 : nextIndex);
  };

  return (
    <View style={styles.container}>
      {pets.map((pet, index) => {
        if (index < currentIndex) {
          // Pets que já foram swipados
          return null;
        }

        // Mostra o pet atual
        const isCurrentPet = index === currentIndex;

        const panHandlers = isCurrentPet ? panResponder.panHandlers : {};
        const animatedStyle = isCurrentPet
          ? { transform: [...position.getTranslateTransform()] }
          : {};

        return (
          <Animated.View
            key={pet.id}
            style={[styles.card, animatedStyle]}
            {...panHandlers}
          >
            <Image source={{ uri: pet.image }} style={styles.image} />
            <Text style={styles.name}>{pet.name}</Text>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    position: 'absolute',
    width: 300,
    height: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  name: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SwipeablePet;
