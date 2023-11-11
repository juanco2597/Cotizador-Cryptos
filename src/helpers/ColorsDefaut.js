import {useColorScheme} from 'react-native';

export const ColorsDefaut = () => {
  const isDarkMode = useColorScheme();
  return isDarkMode === 'light' ? 'white' : 'black';
};
