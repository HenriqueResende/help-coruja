import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Cadastrar from "./Cadastrar";
import Logar from "./Logar";
import PesquisarAula from "./PesquisarAula";
import CadastrarTutor from "./CadastrarTutor";
import TutoriasCadastradas from "./TutoriasCadastradas";
import CadastrarTutoria from "./CadastrarTutoria";
import { HomeScreen } from "./Home";

const Pilha = createNativeStackNavigator();

function Login(props) {
  return (
    <View style={styles.fundo}>
      <Text style={styles.texto}>Help Coruja</Text>
      <Image source={require("../images/Coruja.png")} style={styles.imagem} />
      <View style={styles.botão}>
        <Button
          color="#9F9A4D"
          title="Login"
          onPress={() => props.navigation.navigate("Logar")}
        />
      </View>
      <View style={styles.botão}>
        <Button
          color="#9F9A4D"
          title="Cadastre-se"
          onPress={() => props.navigation.navigate("Cadastrar")}
        />
      </View>
    </View>
  );
}

export default function TelaLogin() {

  return (
    <NavigationContainer independent={true}>
      <Pilha.Navigator>
        <Pilha.Screen
          name="Login" component={Login} options={{ headerShown: false }}
        />
        <Pilha.Screen
          name="Logar" component={Logar} options={{ headerShown: false }}
        />
        <Pilha.Screen
          name="Cadastrar" component={Cadastrar} options={{ headerShown: false }}
        />
        <Pilha.Screen
          name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}
        />
        <Pilha.Screen 
          name="PesquisarAula" component={PesquisarAula} />
        <Pilha.Screen 
          name="CadastrarTutor" component={CadastrarTutor} />
        <Pilha.Screen
          name="TutoriasCadastradas" component={TutoriasCadastradas}
        />
        <Pilha.Screen 
          name="CadastrarTutoria" component={CadastrarTutoria} />
      </Pilha.Navigator>
    </NavigationContainer>
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
    color: "#9F9A4D",
  },
  imagem: {
    width: 200,
    height: 200,
    marginBottom: "3%",
  },
});
