import React, { useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import moment from "moment";
import { useToken } from "../context/tokenContext";
import { useNavigation } from "@react-navigation/native";
import { useAula } from "../context/aulaContext";

export default function CadastrarTutoria() {
  const [materia, setMateria] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const { token, ra } = useToken()
  const { getAulas } = useAula()

  const navigation = useNavigation();  

  useEffect(() => {
  }, []);

  const postTutoria = async () => {
    //Api para o login, ela retorna o token para fazer as outras chamadas

    let dateConvIni = moment(dataInicio, 'DD/MM/YYYY HH:mm').add(-(new Date().getTimezoneOffset()), 'minutes').toDate()

    let dateIniHasValue = dateConvIni != undefined && !isNaN(dateConvIni.getTime())
    let formattedIniDate = null

    if (dateIniHasValue)
      formattedIniDate = dateConvIni.toISOString();

    let dateConvFim = moment(dataFim, 'DD/MM/YYYY HH:mm').add(-(new Date().getTimezoneOffset()), 'minutes').toDate()

    let dateFimHasValue = dateConvFim != undefined && !isNaN(dateConvFim.getTime())
    let formattedFimDate = null

    if (dateFimHasValue)
      formattedFimDate = dateConvFim.toISOString();

    const response = await fetch(
      `https://help-coruja.azurewebsites.net/api/aula/setAula?ra=${ra}&materia=${materia}&dataInicio=${formattedIniDate}&dataFim=${formattedFimDate}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
      }
    );
    const data = await response.json();
    return data
  };

  const handleCadastro = async () => {
      const data = await postTutoria();

      if (data.status === 200) {
        Alert.alert("Tutoria Criada");

        getAulas(token, ra);

        navigation.navigate("TutoriasCadastradas");
      } else {
        const errorMessage = data.mensagem; 
        Alert.alert("ERRO!", errorMessage);
      }
  };

    const startDate = new Date(dataInicio);
    const endDate = new Date(dataFim);
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
    <ScrollView style={styles.fundoS}>
      <View style={styles.fundo}>
        <View style={styles.container}>
          <View style={styles.pickerContainer}>
            <TextInput
              style={styles.input}
              placeholder="Matéria"
              value={materia}
              onChangeText={setMateria}
            />
          </View>
        </View>
        <View style={styles.container}>

        </View>
        <View style={styles.textoRender}><Text>Data e Hora do Inicio da Tutoria</Text></View>
        <View style={styles.container}>
 
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
        <View style={styles.textoRender}><Text>Data e Hora do Fim da Tutoria</Text></View>
        <View style={styles.container}>
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
  fundoS: {
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
    marginTop: 5,
    fontSize: 16,
  },
});
