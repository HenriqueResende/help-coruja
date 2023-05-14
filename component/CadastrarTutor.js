import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function CadastrarTutor() {
  const [materia, setMateria] = useState("");
  const [semestre, setSemestre] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [materiaOptions, setMateriaOptions] = useState([]);
  const [contato, setContato] = useState("");

  const semestreOptions = [
    { label: "Semestre", value: "" },
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

  useEffect(() => {
    getMaterias();
  }, []);

  const postTutor = async () => {
    //Api para o login, ela retorna o token para fazer as outras chamadas
    const response = await fetch(
      "https://help-coruja.azurewebsites.net/api/tutor/setTutor",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigoCurso: "materia",
          semestre: "semestre",
          contato: "contato",
        }),
      }
    );

    const data = await response.json();

    //token
    let token = data.token;

    console.log(token);

    return response;
  };

  const handleCadastro = async () => {
    const response = await postTutor();

    if (response.status === 200) {
      Alert.alert("Cadastrado com sucesso");
      navigation.navigate("HomeScreen");
    } else {
      Alert.alert("ERRO! Algo deu errado :(");
    }
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
              <Picker.Item label="Matéria" value={""} />
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
          <TextInput
            style={styles.textInput}
            placeholder="Contato"
            value={contato}
            onChangeText={setContato}
          />
        </View>

        <View style={[styles.buttonListContainer, { marginTop: 30 }]}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
              <Text style={styles.buttonText}>Cadastrar Tutor</Text>
            </TouchableOpacity>
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
    backgroundColor: "transparent",
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
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    padding: 10,
    marginHorizontal: 10,
    flex: 1,
    backgroundColor: "white",
  },
});
