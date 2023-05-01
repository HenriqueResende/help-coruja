import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PesquisarAula from "./PesquisarAula";

const Pilha = createNativeStackNavigator();

function Home(props) {
  return (
    <View style={styles.fundo}>
      <Text style={styles.texto}>Help Coruja</Text>
      <Image source={require("../images/Coruja.png")} style={styles.imagem} />
      <View style={{ marginBottom: 5 }}>
        <Button
          color="#9F9A4D"
          title="Pesquisar Aula"
          onPress={() => props.navigation.navigate("PesquisarAula")}
        />
      </View>
    </View>
  );
}

export default function TelaHome() {
  return (
    <NavigationContainer independent={true}>
      <Pilha.Navigator>
        <Pilha.Screen name="Home" component={Home} />
        <Pilha.Screen name="PesquisarAula" component={PesquisarAula} />
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
  imagem: {
    width: 200,
    height: 200,
    marginBottom: "3%",
  },
});
