import { StyleSheet, View, FlatList, Alert } from "react-native";
import {
  Input,
  Select,
  SelectItem,
  Layout,
  IndexPath,
  Button,
  CheckBox,
  Text,
  ListItem,
  List,
  Divider,
} from "@ui-kitten/components";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function Dependent({ navigation }) {
  const [ready, setReady] = React.useState(false);

  const [listDep, setDepList] = React.useState([]);

  React.useEffect(() => {
    getDepList();
    console.log(listDep);
  }, []);

  const getDepList = async () => {
    try {
      const depList = await AsyncStorage.getItem("depList");
      if (depList != null) {
        setDepList(JSON.parse(depList));
        console.log(listDep);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    saveDepList(listDep);
  }, [listDep]);

  const saveDepList = async (listDep) => {
    try {
      const stringifyDepList = JSON.stringify(listDep);
      await AsyncStorage.setItem("depList", stringifyDepList);
    } catch (error) {
      console.log(error);
    }
  };

  const registerMed = () => {
    navigation.navigate("Dep Profile", {
      listDep: listDep,
      setDepList: setDepList,
    });
  };
  const renderItemAccessory = (index) => (
    <Button onPress={() => deleteDepList(index)} size="small">
      <Icon name="trash"></Icon>
    </Button>
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.dep_name}`}
      description={`${item.dep_relay}`}
      accessoryRight={() => renderItemAccessory(item.id)}
      onPress={() => navigation.navigate("List Medicine",{
        dep_name: item.dep_name,
        dep_id: item.id,
        listDep:listDep,
        setDepList:setDepList,
        index:index,
      })}
    />
  );

  const deleteDepList = (index) => {
    Alert.alert("Confirm", "Delete this dependent?", [
      {
        text: "Yes",
        onPress: () => setDepList(listDep.filter((item) => item.id != index)),
      },
      {
        text: "No",
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <Button
        style={styles.flex}
        icon="plus"
        mode="contained"
        onPress={registerMed}
      >
        <Icon name="plus"> </Icon>
      </Button>
      <View style={styles.row}>
        <List
          data={listDep}
          renderItem={renderItem}
          style={styles.container1}
          ItemSeparatorComponent={Divider}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flex: {
    bottom: 25,
    right: 20,
    position: "absolute",
    width: 60,
    height: 60,
    padding: 10,
    borderRadius: 100,
  },
  container1: {
    maxHeight: 2000,
  },
});
