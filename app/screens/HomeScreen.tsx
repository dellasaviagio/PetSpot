import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { View, Text, StyleSheet, PanResponder, Animated, Image, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Filters from '../features/Filters'; 

const petsData = [
  { id: '1', name: 'Rex', birthdate: new Date(2020, 1, 15), type: 'Dog', breed: 'Labrador', image: require('../../assets/rex.jpg') },
  { id: '2', name: 'Mia', birthdate: new Date(2019, 6, 25), type: 'Cat', breed: 'Vira-Lata', image: require('../../assets/mia.jpg') },
  { id: '3', name: 'Bob', birthdate: new Date(2018, 8, 10), type: 'Dog', breed: 'Beagle', image: require('../../assets/bob.jpg') },
  { id: '4', name: 'Bilbo', birthdate: new Date(2021, 3, 5), type: 'Dog', breed: 'Golden', image: require('../../assets/bilbo.jpg') },
];

const HomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position] = useState(new Animated.ValueXY());
  const [isImageReady, setIsImageReady] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const currentPet = petsData[currentIndex];

  useEffect(() => {
    const currentPetImage = Image.resolveAssetSource(currentPet.image).uri;
    Image.prefetch(currentPetImage)
      .then(() => setIsImageReady(true))
      .catch(() => console.warn('Error loading image'));

    const nextIndex = (currentIndex + 1) % petsData.length;
    const nextPetImage = Image.resolveAssetSource(petsData[nextIndex].image).uri;
    Image.prefetch(nextPetImage);
  }, [currentIndex]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > 30,
    onPanResponderMove: (evt, gestureState) => position.setValue({ x: gestureState.dx, y: 0 }),
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 100) handleSwipe(true);
      else if (gestureState.dx < -100) handleSwipe(false);
      else resetPosition();
    },
  });

  const handleSwipe = (toRight: boolean) => {
    Animated.timing(position, {
      toValue: { x: toRight ? 500 : -500, y: 0 },
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsImageReady(false);
      setCurrentIndex((prevIndex) => (toRight ? (prevIndex < petsData.length - 1 ? prevIndex + 1 : 0) : (prevIndex > 0 ? prevIndex - 1 : petsData.length - 1)));
      position.setValue({ x: 0, y: 0 });
    });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };

  const handleApplyFilters = (filters: Filters) => {
    console.log(filters); // Lógica para aplicar os filtros
  };

  return (

// container pai

    <View style={styles.container}>

      
      <Filters isVisible={filtersVisible} onClose={() => setFiltersVisible(false)} onApply={handleApplyFilters} />
        <View style={styles.filtersButtonContainer}>
          <Ionicons 
            name="options-outline" // Ou "funnel-outline" para ícone de funil
            size={40} // Tamanho do ícone
            color="#ff8d6b" // Cor do ícone, altere conforme necessário
            
            onPress={() => setFiltersVisible(true)} // Ação ao pressionar
          />
        </View>

      <View style={styles.petsContainer}>

      {isImageReady ? (
        <Animated.View {...panResponder.panHandlers} 
        style={[styles.petCard, { transform: position.getTranslateTransform() }]}>
          <Image source={currentPet.image} style={styles.petImage} />
          <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.7)']} 
          style={styles.gradient} />
          <Text style={styles.petName}>
            {currentPet.name}, {getPetAge(currentPet.birthdate)} anos
          </Text>
          <Text style={styles.petBreed}>{currentPet.breed}</Text>
        </Animated.View>
      ) : (
        <Text></Text>
      )}
      </View>

  
    </View>

// container pai fim
  );
};


const getPetAge = (birthdate: Date) => {
  const now = new Date();
  let age = now.getFullYear() - birthdate.getFullYear();
  const monthDiff = now.getMonth() - birthdate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthdate.getDate())) {
    age--;
  }
  return age;
};
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', 
    paddingTop: 50,
  },

  filtersButtonContainer: {
    position: 'absolute',
    top: 5, // Altere conforme necessário para a posição desejada
    left: '98%', // Centraliza horizontalmente
    transform: [{ translateX: -50 }], // Ajusta para centralizar o botão
    zIndex: 1, // Garante que o botão fique acima do card
  },

  petsContainer: {
    // Estilos para o container dos cards de pets
    flex: 1, // Ocupa o espaço restante da tela
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  },
  petCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    position: 'absolute',
    width: '90%',
    height: '90%',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  petImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    marginBottom: 0,
  },
  petName: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    bottom: 45,
    left: 15,
  },
  petBreed: {
    fontSize: 18,
    color: '#fff',
    position: 'absolute',
    bottom: 20,
    left: 15,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 16,
    marginBottom: 0,
  },

});


export default HomeScreen;
