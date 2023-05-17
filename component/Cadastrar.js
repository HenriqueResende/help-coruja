import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  Alert,
} from "react-native";

function Cadastrar({ navigation }) {
  const [ra, setRA] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {});
  const postCadastro = async () => {
    //Api para o login, ela retorna o token para fazer as outras chamadas
    const response = await fetch(
      "https://help-coruja.azurewebsites.net/api/login/cadastro",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: name,
          ra: ra,
          senha: password,
        }),
      }
    );

    const data = await response.json();

    return data;
  };

  const handleCadastrar = async () => {
    const data = await postCadastro();

    if (data.status === 200) {
      Alert.alert("Cadastrado com sucesso");
      navigation.navigate("Logar");
    } else {
      const errorMessage = data.mensagem;
      Alert.alert("ERRO!", errorMessage);
    }
  };

  const handleParaLogin = () => {
    navigation.navigate("Logar");
  };

  return (
    <View style={styles.fundo}>
      <Text style={styles.title}>Cadastra-se</Text>
      <Image source={require("../images/Coruja.png")} style={styles.imagem} />
      <TextInput
        style={styles.input}
        placeholder="RA"
        value={ra}
        onChangeText={setRA}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.botão}>
        <Button
          color="#9F9A4D"
          title="Cadastrar"
          onPress={() => handleCadastrar()}
        />
      </View>
      <View style={styles.botão}>
        <Button
          color="#9F9A4D"
          title="Já Possui Cadastro?"
          onPress={() => handleParaLogin()}
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

export default Cadastrar;
