import React from "react";
import {
  Input,
  Select,
  SelectItem,
  Layout,
  Icon,
  IndexPath,
  Button,
  CheckBox,
  Text,
} from "@ui-kitten/components";
import {
  StyleSheet,
  View,
  Picker,
  Platform,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

const relay = [
  "Myself",
  "Mother",
  "Father",
  "Daughter",
  "Son",
  "Sister",
  "Brother",
  "Aunt",
  "Uncle",
  "Niece",
  "Nephew",
  "Cousin",
  "Grandmother",
  "Granddaughter",
  "Grandson",
];

export default function DepProfile({navigation }) {

  const route = useRoute();
  let listDep = route.params.listDep;
  let setDepList = route.params.setDepList;
  const [depName, setDepName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [selectedRelay, setSelectedRelay] = React.useState(new IndexPath(0));

  const displayRelay = relay[selectedRelay.row];

  const renderOption = (title, numbers) => (
    <SelectItem title={title} key={numbers.toString()} />
  );

  
  const handleSubmit = () => {
    if (age == "" || depName == "") {
      Alert.alert("Error", "Please Enter Input");
    } else {
      const depList = {
        id: Math.random(),
        dep_name: depName,
        dep_age: age,
        dep_relay: displayRelay,
        dep_med:[],
      };
      setDepList([...listDep, depList]);
      navigation.navigate("Dependent");
    }
  };

  console.log(listDep.dep_age)

  React.useEffect(() => {
    getDepList();
    console.log(listDep);
  }, []);


  const getDepList = async () => {
    try {
      const depList = await AsyncStorage.getItem('depList');
      if (depList != null) {
        setDepList(JSON.parse(depList));
        console.log(listDep);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearAllTodos = () => {
    Alert.alert('Confirm', 'Clear todos?', [
      {
        text: 'Yes',
        onPress: () => setDepList([]),
      },
      {
        text: 'No',
      },
    ]);
  }
 
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Input
          value={depName}
          label="Dependent Name"
          placeholder="Enter Dependent Name"
          onChangeText={(nextValue) => setDepName(nextValue)}
          size="medium"
          style={styles.input}
        />
      </View>
      <View style={styles.row}>
        <Input
          value={age}
          label="Age"
          placeholder="Enter Age"
          onChangeText={(nextValue) => setAge(nextValue)}
          size="medium"
          style={styles.input}
          keyboardType='numeric'

        />
      </View>
      <View style={styles.rowSelect}>
        <Layout level="1" style={styles.rowSelect}>
          <Select
            label="Relationship?"
            placeholder="Default"
            value={displayRelay}
            selectedIndex={selectedRelay}
            onSelect={(index) => setSelectedRelay(index)}
            style={styles.inputSelect}
          >
            {relay.map(renderOption)}
          </Select>
        </Layout>
      </View>
      <View style={styles.row}>
        <Button onPress={handleSubmit}>Submit</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 20,
  },
  row: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "space-between",
  },
  input: {
    width: 350,
  },
  rowSelect: {
    marginBottom: 10,
    flexDirection: "row",
    alignContent: "flex-start",
    width: 350,
  },
  inputSelect: {
    width: 200,
  },
});
