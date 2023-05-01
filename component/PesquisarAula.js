import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Picker,
  FlatList,
} from "react-native";

export default function PesquisarAula() {
  const [materia, setMateria] = useState("");
  const [semestre, setSemestre] = useState("");
  const [data, setData] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [materiaOptions, setMateriaOptions] = useState([]);

  React.useEffect(() => {
    getMaterias();
  }, []);

  const semestreOptions = [
    { label: "Semestre", value: null },
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

  const dataOptions = [
    { label: "Horário", value: null },
    { label: "Option 1", value: "Option 1" },
    { label: "Option 2", value: "Option 2" },
    { label: "Option 3", value: "Option 3" },
  ];

  const handleSearch = () => {
    const selected = [];
    getAulas();
    getNome();
    getHorario();
    getContato();
  };

  const getMaterias = async () => {
    try {
      const response = await fetch(
        "https://help-coruja.azurewebsites.net/api/materia/getMateria"
      );

      const data = await response.json();
      setMateriaOptions(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAulas = async () => {
    try {
      const response = await fetch(
        `https://help-coruja.azurewebsites.net/api/aula/getAula?materia=${materia}&semestre=${semestre}`
      );

      const data = await response.json();

      console.log(data);
      setSelectedOptions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getNome = async () => {
    try {
      const response = await fetch(
        `https://help-coruja.azurewebsites.net/api/aula/getAula?nome=${NomeTutor}`
      );

      const data = await response.json();

      console.log(data);
      setSelectedOptions(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getHorario = async () => {
    try {
      const response = await fetch(
        `https://help-coruja.azurewebsites.net/api/aula/getAula?horario=${DataInicio}}`
      );

      const data = await response.json();

      console.log(data);
      setSelectedOptions(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getContato = async () => {
    try {
      const response = await fetch(
        `https://help-coruja.azurewebsites.net/api/aula/getAula?contato=${Contato}}`
      );

      const data = await response.json();

      console.log(data);
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
    return (
      <View>
        <Text style={styles.textoRender}>
          {" "}
          Tutor: {item.NomeTutor} {item.Semestre}º Semestre{" "}
        </Text>
        <Text style={styles.textoRender}> Tutoria de {item.Materia}</Text>
        <Text style={styles.textoRender}> Horário: {item.DataInicio} </Text>
        <Text style={styles.textoRender}> Contatos: {item.Contato} </Text>
        <Text style={{ justifyContent: "flex-end" }}></Text>
      </View>
    );
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
            <Picker.Item label="Matéria" value={null} />
            {materiaOptions.map((element) => {
              return (
                <Picker.Item key={element} label={element} value={element} />
              );
            })}
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
      <View style={styles.buttonListContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Text style={styles.buttonText}>Aplicar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          {selectedOptions.length > 0 && (
            <FlatList
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
  },
  list: {
    width: 500,
    marginLeft: "5%",
    marginRight: "5%",
    margin: "3%",
    backgroundColor: "#d4d2ae",
  },
  textoRender: {
    textAlign: "center",
    marginBottom: 5,
    fontSize: 16,
  },
});
