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
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useToken } from "../context/tokenContext";

export default function CadastrarTutor() {
  const [curso, setCurso] = useState("");
  const [semestre, setSemestre] = useState("");
  const [cursoOptions, setCursoOptions] = useState([]);
  const [contato, setContato] = useState("");
  const navigation = useNavigation();
  const { token, ra } = useToken()

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
    getCurso();
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
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          ra: ra,
          codigoCurso: curso,
          semestre: semestre,
          contato: contato,
        }),
      }
    );

    const data = await response.json();

    return data;
  };

  const handleCadastro = async () => {
    const data = await postTutor();
    if (data.status === 200) {
      Alert.alert("Cadastrado com sucesso, Agora você pode criar Tutorias.");
      navigation.navigate("HomeScreen");
    } else {
      const errorMessage = data.mensagem;
      Alert.alert("ERRO!", errorMessage);
    }
  };

  const getCurso = async () => {
    try {
      const response = await fetch(
        "https://help-coruja.azurewebsites.net/api/curso/getCurso", {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Authorization': 'Bearer ' + token
          },
        }
      );

      const data = await response.json();

      setCursoOptions(JSON.parse(data.json));

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
              key={curso}
              prompt="Curso"
              selectedValue={curso}
              onValueChange={setCurso}
            >
              <Picker.Item label="Curso" value={""} />
              {cursoOptions.map((element) => {
                return (
                  <Picker.Item key={element.Codigo} label={element.Nome} value={element.Codigo} />
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
