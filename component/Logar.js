import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Button,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useToken } from "../context/tokenContext";

function Logar() {
  const [ra, setRA] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { defToken, defRa } = useToken();

  useEffect(() => {});

  const postLogin = async () => {
    //Api para o login, ela retorna o token para fazer as outras chamadas
    const response = await fetch(
      "https://help-coruja.azurewebsites.net/api/login/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ra: ra,
          senha: password,
        }),
      }
    );

    const data = await response.json();

    //token
    let token = data.token;

    defToken(token);
    defRa(ra);
    
    return data

  };
  const handleLogin = async () => {
 
    const data = await postLogin();
    if (data.status === 200) {
      Alert.alert("Logado com sucesso");
      navigation.navigate("HomeScreen");
    } else {
      const errorMessage = data.mensagem;
      Alert.alert("ERRO!", errorMessage);
    }
  };

  const handleCadastro = () => {
    // Navigate to the home screen
    navigation.navigate("Cadastrar");
  };

  return (
    <View style={styles.fundo}>
      <Text style={styles.title}>Login</Text>
      <Image source={require("../images/Coruja.png")} style={styles.imagem} />
      <TextInput
        style={styles.input}
        placeholder="RA"
        value={ra}
        onChangeText={setRA}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.botão}>
        <Button color="#9F9A4D" title="Logar" onPress={() => handleLogin()} />
      </View>
      <View style={styles.botão}>
        <Button
          color="#9F9A4D"
          title="Ainda Não Cadastrado?"
          onPress={() => handleCadastro()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFBC7",
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 36,
    fontWeight: "bold",
    marginTop: "3%",
    marginBottom: "3%",
  },
  input: {
    width: "80%",
    height: 48,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: "white",
    marginBottom: 16,
    fontSize: 18,
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
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default Logar;
