import React, { useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInputMask } from "react-native-masked-text";
import moment from "moment";
import { useToken } from "../context/tokenContext";

export default function CadastrarTutoria() {
  const [materia, setMateria] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [materiaOptions, setMateriaOptions] = useState([]);
  const { token, ra, semestre } = useToken()



  useEffect(() => {
    getMaterias();
  }, []);

  const getMaterias = async () => {
    try {
      const response = await fetch('https://help-coruja.azurewebsites.net/api/materia/getMateria', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });

      const data = await response.json();

      setMateriaOptions(JSON.parse(data.json));

    } catch (error) {
      console.log(error);
    }
  };

  const postTutoria = async () => {
    //Api para o login, ela retorna o token para fazer as outras chamadas
    const response = await fetch(
      "https://help-coruja.azurewebsites.net/api/aula/setAula",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          ra: ra,
          materia: materia,
          dataInicio: dataInicio,
          dataFim: dataFim,
        }),
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(`${response.status} - ${errorData.message}`);
    }
  };

  const handleCadastro = async () => {
    try {
      const response = await postTutoria();
      Alert.alert("Cadastrado com sucesso");
      navigation.navigate("TutoriasCadastradas");
    } catch (error) {
      Alert.alert("ERRO!", error.message);
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

        </View>
        <View style={styles.container}>
          <View style={styles.textoRender}><Text>Data e Hora do Inicio da Tutoria</Text></View>
 
          <View style={styles.buttonDataContainer}>
            <TextInputMask
              type={"datetime"}
              options={{
                format: "DD/MM/YYYY HH:mm",
              }}
              value={dataInicio}
              onChangeText={(value) => {
                setDataInicio(value);
              }}
              min={new Date(1753, 1, 1)}
              max={new Date(9999, 12, 31)}
              placeholder="DD/MM/YYYY HH:mm"
            />
          </View>
        </View>
        <View style={styles.container}>
        <View style={styles.textoRender}><Text>Data e Hora do Fim da Tutoria</Text></View>
          <View style={styles.buttonDataContainer}>
            <TextInputMask
              type={"datetime"}
              options={{
                format: "DD/MM/YYYY HH:mm",
              }}
              value={dataFim}
              onChangeText={(value) => {
                setDataFim(value);
              }}
              min={new Date(1753, 1, 1)}
              max={new Date(9999, 12, 31)}
              placeholder="DD/MM/YYYY HH:mm"
            />
          </View>
        </View>

        <View style={[styles.buttonListContainer, { marginTop: 30 }]}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
              <Text style={styles.buttonText}>Criar Tutoria</Text>
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
});
