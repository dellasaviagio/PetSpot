// app/screens/EventsScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Event } from '../entities/Event';
import { ToastAndroid, Platform } from 'react-native';

const EventsScreen = () => {
  const eventsData: Event[] = [
    {
      id: '1',
      title: 'Campanha de Adoção',
      description: 'Venha adotar seu novo amigo!',
      date: new Date('2024-10-15T10:00:00'),
      location: 'Praça Central, Cidade',
      imageUrl: require('../../assets/event1.jpg'), // Certifique-se que a imagem existe
    },
    {
      id: '2',
      title: 'Vacinação em Massa',
      description: 'Vacinação gratuita para todos os pets!',
      date: new Date('2024-11-01T09:00:00'),
      location: 'Clínica Veterinária da Cidade',
      imageUrl: require('../../assets/event2.jpg'), // Certifique-se que a imagem existe
    },
    {
      id: '3',
      title: 'Passeio com Pets no Parque',
      description: 'Traga seu bichinho para socializar!',
      date: new Date('2024-09-30T09:00:00'),
      location: 'Parque do Sol, Cidade',
      imageUrl: require('../../assets/event3.jpg'), // Certifique-se que a imagem existe
    },
  ];

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleConfirmPresence = (eventTitle: string) => {
    const message = `Presença confirmada!`;
    
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT); // Exibe um Toast no Android
    } else {
      // Adicione uma solução alternativa para iOS (opcional)
      console.log(message);
    }
  };
  

  const renderEventItem = ({ item }: { item: Event }) => (
    <View style={styles.eventCard}>
      <Image source={item.imageUrl} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDate}>{formatDate(item.date)}</Text>
        <Text style={styles.eventLocation}>{item.location}</Text>
        {item.description && <Text style={styles.eventDescription}>{item.description}</Text>}
      </View>
      <TouchableOpacity 
        style={styles.confirmButton} 
        onPress={() => handleConfirmPresence(item.title)}
      >
        <Text style={styles.confirmButtonText}>Confirmar Presença</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Eventos da Comunidade</Text>
      <FlatList
        data={eventsData}
        renderItem={renderEventItem}
        keyExtractor={item => item.id}
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
  eventCard: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
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
  eventImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
  },
  eventLocation: {
    fontSize: 14,
    color: '#666',
  },
  eventDescription: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
  },
  eventDetails: {
    flex: 1,
    paddingHorizontal: 10,
  },
  confirmButton: {
    backgroundColor: '#4CAF50', // Cor do botão
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EventsScreen;
