import {View, Text, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = ({
  moneda,
  criptomoneda,
  guardarMoneda,
  guardarCriptomoneda,
  guardarConsultarApi,
}) => {
  const [criptomonedas, setCriptomonedas] = useState([]);

  useEffect(() => {
    const consultarApi = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await axios.get(url);
      setCriptomonedas(resultado.data.Data);
    };
    consultarApi();
  }, []);

  //Almacena la seleccion del usuario
  const obtenerMoneda = money => {
    guardarMoneda(money);
  };

  // Almacena el api
  const obtenerCriptoMoneda = cripto => {
    guardarCriptomoneda(cripto);
  };

  const cotizarPrecio = () => {
    if (moneda.trim() === '' || criptomoneda.trim() === '') {
      mostrarAlerta();
      return;
    }

    guardarConsultarApi(true);
  };

  const mostrarAlerta = () => {
    Alert.alert('Aviso Importante', 'Ambos campos son obligatorios', [
      {text: 'Ok'},
    ]);
  };

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        selectedValue={moneda}
        onValueChange={money => obtenerMoneda(money)}>
        <Picker.Item label="- Seleccione -" value="" />
        <Picker.Item label="Dolar Estados Unidos" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        selectedValue={criptomoneda}
        onValueChange={criptomoney => obtenerCriptoMoneda(criptomoney)}>
        <Picker.Item label="- Seleccione -" value="" />
        {criptomonedas.map(cripto => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={() => cotizarPrecio()}>
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
    fontWeight: '600',
  },
  btnCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20,
  },
  textoCotizar: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
export default Formulario;
