import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useToken } from "../context/tokenContext";
import { useAula } from "../context/aulaContext";

export default function TutoriasCadastradas() {
  const navigation = useNavigation();  
  const { token, ra } = useToken()   
  const { aulas, getAulas } = useAula()

  const handleCriarTutoria = () => {
    // Navigate to the home screen
    navigation.navigate("CadastrarTutoria");
  };

  useEffect(() => {
    getAulas(token, ra);
  }, []);

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
          Suas Tutotias Cadastradas
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
          <Text style={{ fontWeight: "bold" }}>Tutor: </Text>
          {item.NomeTutor} {item.Semestre}º Semestre
        </Text>

        <Text style={styles.textoRender}>
          <Text style={{ fontWeight: "bold" }}>Tutoria de </Text>
          {item.Materia}
        </Text>

        <Text style={styles.textoRender}>
          <Text style={{ fontWeight: "bold" }}>Horário:</Text> de{" "}
          {formattedStartDate} até {formattedEndDate}
        </Text>

        <Text style={styles.textoRender}>
          <Text style={{ fontWeight: "bold" }}>Contatos: </Text>
          {item.Contato}
        </Text>

        <Text style={{ justifyContent: "flex-end" }}></Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.fundoS}>
      <View style={styles.fundo}>
        <View style={[styles.buttonListContainer, { marginTop: 30 }]}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleCriarTutoria}
            >
              <Text style={styles.buttonText}>Criar Tutoria</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.list}>
            {aulas.length > 0 && (
              <FlatList
                style={{ maxWidth: "80%" }}
                data={aulas}
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
  botão: {
    width: 200,
    marginBottom: 5,
    color: "#9F9A4D",
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
