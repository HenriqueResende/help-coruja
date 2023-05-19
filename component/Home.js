import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { useToken } from "../context/tokenContext";


export function HomeScreen(props) {
  const [isTutor, setIsTutor] = useState(true);
  const { token, ra } = useToken()

  useEffect(() => {
    getTutor();
  }, []);


  const getTutor = async () => {
    try {
      const response = await fetch(`https://help-coruja.azurewebsites.net/api/tutor/getTutor?ra=${ra}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });

      const data = await response.json();
      
      if(data.status != 200 || JSON.parse(data.json).RA == null){
        setIsTutor(false)
      }
      else{
        setIsTutor(true)
      }
    } catch (error) {
      setIsTutor(false)

      console.log(error);
    }

  };


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
      {!isTutor && (
        <View style={styles.botão}>
          <Button
            color="#9F9A4D"
            title="Cadastrar Tutor"
            onPress={() => props.navigation.navigate("CadastrarTutor")}
          />
        </View>
      )}
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
