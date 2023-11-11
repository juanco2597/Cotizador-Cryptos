import {View, Text, StyleSheet, Platform} from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View>
      <Text style={styles.encabezado}>Criptomonedas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  encabezado: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    fontFamily: 'Lato-Black',
    backgroundColor: '#5E49E2',
    paddingBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 22,
    color: '#FFF',
    marginBottom: 20,
  },
});

export default Header;
