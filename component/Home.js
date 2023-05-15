import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PesquisarAula from "./PesquisarAula";
import CadastrarTutor from "./CadastrarTutor";
import TutoriasCadastradas from "./TutoriasCadastradas";
import CadastrarTutoria from "./CadastrarTutoria";

const Pilha = createNativeStackNavigator();

export function HomeScreen(props) {
  const [isTutor, setIsTutor] = useState(true);

  return (
    <View style={styles.fundo}>
      <Text style={styles.texto}>Help Coruja</Text>
      <Image source={require("../images/Coruja.png")} style={styles.imagem} />
      <View style={styles.botão}>
        <Button
          color="#9F9A4D"
          title="Pesquisar Aula"
          onPress={() => props.navigation.navigate("PesquisarAula")}
        />
      </View>
      <View style={styles.botão}>
        <Button
          color="#9F9A4D"
          title="Cadastrar Tutor"
          onPress={() => props.navigation.navigate("CadastrarTutor")}
        />
      </View>
      {isTutor && (
        <View style={styles.botão}>
          <Button
            color="#9F9A4D"
            title="Suas Tutorias"
            onPress={() => props.navigation.navigate("TutoriasCadastradas")}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFBC7",
  },
  texto: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 36,
    fontWeight: "bold",
    marginTop: "3%",
    marginBottom: "3%",
  },
  botão: {
    width: 200,
    marginBottom: 5,
  },
  imagem: {
    width: 200,
    height: 200,
    marginBottom: "3%",
  },
});
