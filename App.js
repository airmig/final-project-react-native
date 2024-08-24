
import {View, Text} from 'react-native';
import {styles} from './components/styles';
import Onboarding from './screens/Onboarding';


export default function App() {

  return (
    <View style={styles.main}>
      <Onboarding/>
    </View>
  );
}


