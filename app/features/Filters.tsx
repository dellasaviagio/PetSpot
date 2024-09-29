import React from 'react';
import { Modal, View, Button, StyleSheet } from 'react-native';

interface Filters {
  ageRange: [number, number]; // Exemplo de faixa etária
  animalType: string[];       // Exemplo para tipo de animal
  gender: string;             // Exemplo para gênero
  size: string;               // Exemplo para porte
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
    <Modal visible={isVisible} animationType="slide" style={{ height: '60%' }}>
      <View style={styles.filtersButtonContainer}>




        {/* Seus componentes de filtro aqui */}




        
        <Button title="Apply Filters" onPress={handleApply} />
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    filtersButtonContainer: {
      flex: 1,
      justifyContent: 'flex-start', // Alterado para começar do topo
      alignItems: 'center',
      padding: 20, // Adicione padding para dar espaço
        
    },
  });
  

export default Filters;
