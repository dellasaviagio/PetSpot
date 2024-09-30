import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para ícones
import { Picker } from '@react-native-picker/picker'; // Para seleções
import Slider from '@react-native-community/slider'; // Slider separado

interface Filters {
  ageRange: [number, number];
  animalType: string[];
  gender: string;
  size: string;
}

interface FiltersProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (filters: Filters) => void;
}

const Filters: React.FC<FiltersProps> = ({ isVisible, onClose, onApply }) => {
  const [ageRange, setAgeRange] = React.useState<[number, number]>([0, 15]);
  const [animalType, setAnimalType] = React.useState<string[]>([]);
  const [gender, setGender] = React.useState<string>('');
  const [size, setSize] = React.useState<string>('');

  const handleApply = () => {
    onApply({ ageRange, animalType, gender, size });
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleApply} style={styles.applyButton}>
          <Ionicons name="checkmark" size={30} color="#ff8d6b" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.label}>Idade do Pet</Text>
        
        <Slider
          minimumTrackTintColor='#ff8d6b'
//        maximumTrackTintColor='black'  
          thumbTintColor='#ff8d6b'
          style={{ width: '100%' }}
          minimumValue={1}
          maximumValue={15}
          step={1}
          value={ageRange[1]}
          onValueChange={(value: number) => setAgeRange([0, value])}  // Tipagem explícita para 'value'
        />
        <Text style={styles.sliderValue}>Até {ageRange[1]} anos</Text>


        <Text style={styles.label}>Tipo de Animal</Text>
        <Picker
          selectedValue={animalType[0]}
          onValueChange={(itemValue) => setAnimalType([itemValue])}
          style={styles.picker}
        >
          <Picker.Item label="Cão" value="dog" />
          <Picker.Item label="Gato" value="cat" />
          <Picker.Item label="Outro" value="other" />
        </Picker>

        <Text style={styles.label}>Gênero</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Macho" value="male" />
          <Picker.Item label="Fêmea" value="female" />
        </Picker>

        <Text style={styles.label}>Porte</Text>
        <Picker
          selectedValue={size}
          onValueChange={(itemValue) => setSize(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Pequeno" value="small" />
          <Picker.Item label="Médio" value="medium" />
          <Picker.Item label="Grande" value="large" />
        </Picker>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  applyButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  contentContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  sliderValue: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginTop: 10,
  },
});

export default Filters;
