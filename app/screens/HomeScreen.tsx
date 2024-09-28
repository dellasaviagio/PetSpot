import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const petsData = [
  { id: '1', name: 'Rex', birthdate: new Date(2020, 1, 15), type: 'Dog', breed: 'Labrador', image: require('../../assets/rex.jpg') },
  { id: '2', name: 'Mia', birthdate: new Date(2019, 6, 25), type: 'Cat', breed: 'Vira-Lata', image: require('../../assets/mia.jpg') },
  { id: '3', name: 'Bob', birthdate: new Date(2018, 8, 10), type: 'Dog', breed: 'Beagle', image: require('../../assets/bob.jpg') },
  { id: '4', name: 'Bilbo', birthdate: new Date(2021, 3, 5), type: 'Dog', breed: 'Golden', image: require('../../assets/bilbo.jpg') },
];

const getPetAge = (birthdate: Date) => {
  const now = new Date();
  let age = now.getFullYear() - birthdate.getFullYear();
  const monthDiff = now.getMonth() - birthdate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthdate.getDate())) {
    age--;
  }
  return age;
};

const HomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position] = useState(new Animated.ValueXY());
  const [isImageReady, setIsImageReady] = useState(false);

  const currentPet = petsData[currentIndex];

  // Pré-carrega a imagem do pet atual e do próximo
  useEffect(() => {
    const currentPetImage = Image.resolveAssetSource(currentPet.image).uri;
    Image.prefetch(currentPetImage)
      .then(() => setIsImageReady(true))
      .catch(() => console.warn('Error loading image'));

    // Pré-carrega a próxima imagem para uma transição mais suave
    const nextIndex = (currentIndex + 1) % petsData.length;
    const nextPetImage = Image.resolveAssetSource(petsData[nextIndex].image).uri;
    Image.prefetch(nextPetImage);
  }, [currentIndex]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 30;
    },
    onPanResponderMove: (evt, gestureState) => {
      position.setValue({ x: gestureState.dx, y: 0 });
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 100) {
        handleSwipe(true);
      } else if (gestureState.dx < -100) {
        handleSwipe(false);
      } else {
        resetPosition();
      }
    },
  });

  const handleSwipe = (toRight: boolean) => {
    Animated.timing(position, {
      toValue: { x: toRight ? 500 : -500, y: 0 },
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setIsImageReady(false); // Marca como não pronto antes de carregar o próximo pet
      setCurrentIndex((prevIndex) => {
        if (toRight) {
          return prevIndex < petsData.length - 1 ? prevIndex + 1 : 0;
        } else {
          return prevIndex > 0 ? prevIndex - 1 : petsData.length - 1;
        }
      });
      position.setValue({ x: 0, y: 0 });
    });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {isImageReady ? (
        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.petCard, { transform: position.getTranslateTransform() }]}
        >
          <Image source={currentPet.image} style={styles.petImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
            style={styles.gradient}
          />
          <Text style={styles.petName}>
            {currentPet.name}, {getPetAge(currentPet.birthdate)} anos
          </Text>
          <Text style={styles.petBreed}>{currentPet.breed}</Text>
        </Animated.View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  petCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 20,
    position: 'absolute',
    width: '99%',
    height: '99%',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  petImage: {
    width: '98%',
    height: '98%',
    borderRadius: 16,
    marginBottom: 10,
  },

  petInfoCard: {
    backgroundColor: '#f0f', // Fundo semi-translúcido preto
    borderRadius: 100,
    padding: 110,
    position: 'absolute',
    width: '100%',
    height: '100%', // Menor altura para destacar apenas o texto
    bottom: 1, // Coloca o card no fundo
    left: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },

  petName: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    bottom: 65,
    left: 40,
  },
  petBreed: {
    fontSize: 18,
    color: '#fff',
    position: 'absolute',
    bottom: 38,
    left: 43,
  },

  gradient: { // Adicione este estilo
    position: 'absolute',
    top: 0,
    left: 20,
    right: 27,
    bottom: 20,
    borderRadius: 16,
    marginBottom: 10,
  },

});

export default HomeScreen;
