import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { TextInputMask } from 'react-native-masked-text';
import moment from 'moment';

export default function PesquisarAula() {
  const [materia, setMateria] = useState("");
  const [semestre, setSemestre] = useState("");
  const [date, setDate] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [materiaOptions, setMateriaOptions] = useState([]);

  useEffect(() => {
    getMaterias();
  }, []);

  const semestreOptions = [
    { label: "Semestre", value: '' },
    { label: "1º Semestre", value: 1 },
    { label: "2º Semestre", value: 2 },
    { label: "3º Semestre", value: 3 },
    { label: "4º Semestre", value: 4 },
    { label: "5º Semestre", value: 5 },
    { label: "6º Semestre", value: 6 },
    { label: "7º Semestre", value: 7 },
    { label: "8º Semestre", value: 8 },
    { label: "9º Semestre", value: 9 },
    { label: "10º Semestre", value: 10 },
  ];

  const handleSearch = () => {
    getAulas();
  };

  const getMaterias = async () => {
    try {
      const response = await fetch(
        "https://help-coruja.azurewebsites.net/api/materia/getMateria"
      );

      const data = await response.json();

      setMateriaOptions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAulas = async () => {
    try {
      let dateConv = moment(date, 'DD/MM/YYYY HH:mm').add(-(new Date().getTimezoneOffset()), 'minutes').toDate()

      let dateHasValue = dateConv != undefined && !isNaN(dateConv.getTime())
      let formattedDate = null

      if (dateHasValue)
        formattedDate = dateConv.toISOString();

      const response = await fetch(
        `https://help-coruja.azurewebsites.net/api/aula/getAula?materia=${materia}&semestre=${semestre}` + (dateHasValue ? `&data=${formattedDate}` : '')
      );

      const data = await response.json();

      setSelectedOptions(data);

    } catch (error) {
      console.log(error);
    }
  };

  const separador = () => {
    return (
      <View
        style={{ height: 1, width: "100%", backgroundColor: "#000000" }}
      ></View>
    );
  };

  const cabecalho = () => {
    return (
      <View
        style={{
          backgroundColor: "#9F9A4D",
          width: "100%",
          padding: 5,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "white",
            fontSize: 16,
          }}
        >
          Aulas Disponíveis
        </Text>
      </View>
    );
  };

  const rodape = () => {
    return (
      <View
        style={{ height: 10, backgroundColor: "White", width: "100%" }}
      ></View>
    );
  };

  const renderiza = ({ item }) => {
    const startDate = new Date(item.DataInicio);
    const endDate = new Date(item.DataFim);
    const formattedStartDate = startDate.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const formattedEndDate = endDate.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <View style={styles.cards}>
        <Text style={styles.textoRender}>
          <Text style={{ fontWeight: 'bold' }}>Tutor: </Text>{item.NomeTutor} {item.Semestre}º Semestre
        </Text>

        <Text style={styles.textoRender}>
          <Text style={{ fontWeight: 'bold' }}>Tutoria de </Text>{item.Materia}
        </Text>

        <Text style={styles.textoRender}>
          <Text style={{ fontWeight: 'bold' }}>Horário:</Text> de {formattedStartDate} até {formattedEndDate}
        </Text>

        <Text style={styles.textoRender}>
          <Text style={{ fontWeight: 'bold' }}>Contatos: </Text>{item.Contato}
        </Text>

        <Text style={{ justifyContent: "flex-end" }}></Text>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.fundo}>
        <View style={styles.container}>
          <View style={styles.pickerContainer}>
            <Picker
              key={materia}
              prompt="Matéria"
              selectedValue={materia}
              onValueChange={setMateria}
            >

              <Picker.Item label="Matéria" value={''} />
              {materiaOptions.map((element) => {
                return (
                  <Picker.Item key={element} label={element} value={element} />
                );
              })}
            </Picker>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.pickerContainer}>
            <Picker
              key={semestre}
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
        </View>
        <View style={styles.container}>
          <View style={styles.buttonDataContainer}>
            <TextInputMask
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY HH:mm'
              }}
              value={date}
              onChangeText={value => {
                setDate(value)
              }}
              min={new Date(1753,1,1)}
              max={new Date(9999,12,31)}
              placeholder="DD/MM/YYYY HH:mm"
            />
          </View>
        </View>

        <View style={[styles.buttonListContainer, { marginTop: 30 }]}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSearch}>
              <Text style={styles.buttonText}>Aplicar Filtro</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.list}>
            {selectedOptions.length > 0 && (
              <FlatList
                style={{ maxWidth: '80%' }}
                data={selectedOptions}
                renderItem={renderiza}
                keyExtractor={(item) => item.Codigo}
                ItemSeparatorComponent={separador}
                ListHeaderComponent={cabecalho}
                ListFooterComponent={rodape}
              />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  fundo: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFBC7",
  },
  buttonContainer: {
    alignItems: "center",
    margin: "1%",
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
  },
  buttonListContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#9F9A4D",
    borderRadius: 5,
    paddingHorizontal: 20,
    padding: 10,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  buttonDataContainer: {
    flex: 1,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
  },
  buttonData: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    paddingHorizontal: 20,
    padding: 10,
  },
  buttonDataText: {
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  list: {
    width: "110%",
    marginLeft: "5%",
    marginRight: "5%",
    margin: "3%",
    backgroundColor: "#d4d2ae",
  },
  textoRender: {
    textAlign: "center",
    marginBottom: 5,
    fontSize: 16,
  }
});
