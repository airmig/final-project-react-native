import {ScrollView, View, Text} from "react-native";
import Header from "./Header";
import { styles } from "./styles";
export default function Loading(){
    return  <ScrollView><Header/>
    <View style={styles.loading}>
        <Text style={styles.loadingtext}>LOADING</Text>
        <Text style={styles.loadingwait}>Please Wait!</Text>
    </View>
    </ScrollView>
}