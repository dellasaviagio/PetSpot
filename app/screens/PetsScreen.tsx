// app/screens/PetsScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Pet } from '../entities/Pet'; // Importando a interface Pet

const PetsScreen = () => {
  const petsData: Pet[] = [
    { id: '5', name: 'Charlie', birthdate: new Date('2015-01-05'), type: 'Dog', breed: 'Bulldog', image: require('../../assets/charlie.jpg'), ownerId: '1' },
    { id: '6', name: 'Luna', birthdate: new Date('2013-06-18'), type: 'Cat', breed: 'Siamese', image: require('../../assets/luna.jpg'), ownerId: '1' },
    // Adicione mais pets aqui...
  ];

  const renderPetItem = ({ item }: { item: Pet }) => ( // Especificando o tipo de item
    <View style={styles.petCard}>
      <Image source={item.image} style={styles.petImage} />
      <Text style={styles.petName}>{item.name}</Text>
      <Text style={styles.petBreed}>{item.breed}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus Pets</Text>
      <FlatList
        data={petsData}
        renderItem={renderPetItem}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  petCard: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  petImage: {
    padding: 65,
    width: '100%',
    height: 115,
    borderRadius: 10,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  petBreed: {
    fontSize: 14,
    color: '#666',
  },
});

export default PetsScreen;
