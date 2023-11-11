import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Formulario from './src/components/Formulario';
import Header from './src/components/Header';
import {ColorsDefaut} from './src/helpers/ColorsDefaut';
import axios from 'axios';
import Cotizacion from './src/components/Cotizacion';

const App = () => {
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [consultarApi, guardarConsultarApi] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarApi) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const result = await axios.get(url);

        guardarCargando(true);

        // Ocultar el spinner y mostrar el resultado
        setTimeout(() => {
          guardarResultado(result.data.DISPLAY[criptomoneda][moneda]);
          guardarConsultarApi(false);
          guardarCargando(false);
        }, 3000);
      }
    };
    cotizarCriptomoneda();
  }, [consultarApi]);

  const backgroundColor = ColorsDefaut();

  // Mostrar el spinner o el resultado
  const componente = cargando ? (
    <ActivityIndicator size="large" color="#5E49E2" />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <SafeAreaView style={(backgroundColor, styles.content)}>
      <ScrollView>
        <Header />
        <Image
          style={styles.imagen}
          source={require('./assets/img/cryptomonedas.png')}
        />
        <View style={styles.contenedor}>
          <Formulario
            moneda={moneda}
            criptomoneda={criptomoneda}
            guardarMoneda={guardarMoneda}
            guardarCriptomoneda={guardarCriptomoneda}
            guardarConsultarApi={guardarConsultarApi}
          />
        </View>

        <View style={{marginTop: 40}}>{componente}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {flex: 1},
  contenedor: {
    marginHorizontal: '2.5%',
  },
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
});
export default App;
