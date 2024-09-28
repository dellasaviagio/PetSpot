// app/screens/SettingsScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const SettingsScreen = () => {
  const settingsOptions = [
    { id: '1', name: 'Conta' },
    { id: '2', name: 'Notificações' },
    { id: '3', name: 'Privacidade' },
    { id: '4', name: 'Tema' },
    { id: '5', name: 'Feedback' },
    { id: '6', name: 'Idiomas' },
    { id: '7', name: 'Sobre o App' },
    { id: '8', name: 'Suporte' },          // Nova opção
    { id: '9', name: 'Sair' },          // Nova opção
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <ScrollView style={styles.scrollView}>
        {settingsOptions.map(option => (
          <TouchableOpacity key={option.id} style={styles.option}>
            <Text style={styles.optionText}>{option.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc', // Cor de fundo mais suave
    padding: 20,
  },
  title: {
    fontSize: 28, // Tamanho do título reduzido
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Centraliza o título
    color: '#333', // Cor do texto do título
  },
  scrollView: {
    marginVertical: 10,
  },
  option: {
    padding: 15,
    backgroundColor: '#ffffff', // Fundo branco para as opções
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000', // Adiciona sombra
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1, // Sombra em Android
  },
  optionText: {
    fontSize: 20, // Tamanho do texto das opções
    color: '#555', // Cor do texto das opções
  },
});

export default SettingsScreen;
