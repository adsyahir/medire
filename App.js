import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Navigation from './navigation/Navigation';
import * as eva from '@eva-design/eva';
import { ApplicationProvider} from '@ui-kitten/components';


export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
    <Navigation/>
    </ApplicationProvider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
