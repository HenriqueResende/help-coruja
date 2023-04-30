import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Picker, FlatList } from 'react-native';


export default function PesquisarAula() {
    const [materia, setMateria] = useState(null);
    const [semestre, setSemestre] = useState(null);
    const [data, setData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
  
    const materiaOptions = [
      { label: 'Metéria', value: null },
      { label: 'Option 1', value: 'Option 1' },
      { label: 'Option 2', value: 'Option 2' },
      { label: 'Option 3', value: 'Option 3' },
    ];
  
    const semestreOptions = [
      { label: 'Semestre', value: null },
      { label: 'Option 1', value: 'Option 1' },
      { label: 'Option 2', value: 'Option 2' },
      { label: 'Option 3', value: 'Option 3' },
    ];
  
    const dataOptions = [
      { label: 'Horário', value: null },
      { label: 'Option 1', value: 'Option 1' },
      { label: 'Option 2', value: 'Option 2' },
      { label: 'Option 3', value: 'Option 3' },
    ];
  
    const handleSearch = () => {
        const selected = [];
        if (materia) selected.push(materia);
        if (semestre) selected.push(semestre);
        if (data) selected.push(data);
        setSelectedOptions(selected);
        setMateria(null);
        setSemestre(null);
        setData(null);
      };
  
    return (
        <View style={styles.fundo}>
        <View style={styles.container}>
          <View style={styles.pickerContainer}>
            <Picker
              key={materia} // Change the key prop
              prompt="Matéria"
              selectedValue={materia}
              onValueChange={setMateria}
            >
              {materiaOptions.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
  
          <View style={styles.pickerContainer}>
            <Picker
              key={semestre} // Change the key prop
              prompt="Semestre"
              selectedValue={semestre}
              onValueChange={setSemestre}
            >
              {semestreOptions.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
  
          <View style={styles.pickerContainer}>
            <Picker
              key={data} // Change the key prop
              prompt="Horário"
              selectedValue={data}
              onValueChange={setData}
            >
              {dataOptions.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Text style={styles.buttonText}>Aplicar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          {selectedOptions.length > 0 && (
            <FlatList
              data={selectedOptions}
              renderItem={({ item }) => <Text style={styles.selectedOption}>{item}</Text>}
              keyExtractor={(item) => item}
            />
          )}
        </View>
      </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    fundo: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFBC7',
        
      },
      buttonContainer: {
        flex: 0,
        margin: '1%'
      },      
    pickerContainer: {
      flex: 1,
      marginHorizontal: 10,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: 'gray',
    },
    button: {
      backgroundColor: '#9F9A4D',
      borderRadius: 5,
      paddingHorizontal: 20,
      padding: 10,
    },
    list: {
        margin: '3%',
      }
})