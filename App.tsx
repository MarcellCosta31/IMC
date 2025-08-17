import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';

import Icon from "./src/LUNARIO.png";

export default function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [imc, setImc] = useState(null);
  const [estado, setEstado] = useState('');

  const calcularIMC = () => {
    const altura = parseFloat(height);
    const peso = parseFloat(weight);

    if (!altura || !peso) {
      setImc(null);
      setEstado('Por favor, preencha todos os campos.');
      return;
    }

    const resultado = (peso / (altura * altura)).toFixed(2);
    setImc(resultado);
    definirEstadoSaude(resultado);
  };

  const definirEstadoSaude = (imcValor) => {
    const imc = parseFloat(imcValor);

    if (imc < 18.5) {
      setEstado('Você está abaixo do peso.');
    } else if (imc >= 18.5 && imc < 25) {
      setEstado('Você está no peso ideal.');
    } else if (imc >= 25 && imc < 30) {
      setEstado('Você está com sobrepeso.');
    } else if (imc >= 30 && imc < 35) {
      setEstado('Você está com obesidade.');
    } else {
      setEstado('Você está com obesidade grave.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
      style={styles.image}
      resizeMode='contain'    
      source={Icon}
      />
      <Text style={styles.title}>Lunario IMC</Text>

      <Text style={styles.text}>Altura</Text>

      <TextInput
        style={styles.input}
        placeholder="Altura (Ex: 1.75)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />

      <Text style={styles.text}>Altura</Text>


      <TextInput
        style={styles.input}
        placeholder="Peso (Ex: 70.5)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      <Button title="Calcular IMC" onPress={calcularIMC} />

      {imc && (
        <View style={styles.result}>
          <Text style={styles.resultText}>Seu IMC é: {imc}</Text>
          <Text style={styles.resultText}>{estado}</Text>
        </View>
      )}

      {!imc && estado !== '' && (
        <Text style={styles.error}>{estado}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#352A40',
  },
  image:{
    alignSelf: "center",
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "white",
    marginBottom: 30,
  },
  text:{
    alignContent: "center",
    alignSelf: "center",
    marginBottom:20,
    fontSize:20,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#D3D3D3',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  
  },
  result: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#dff0d8',
    borderRadius: 5,
  },
  resultText: {
    fontSize: 18,
    textAlign: 'center',
  },
  error: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
