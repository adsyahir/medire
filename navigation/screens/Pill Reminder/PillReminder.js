import { StyleSheet, View, Alert } from "react-native";
import {
  Input,
  Select,
  SelectItem,
  Layout,
  IndexPath,
  Button,
  CheckBox,
  Text,
  Divider,
  List,
  ListItem,
} from "@ui-kitten/components";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PillReminder({ navigation }) {
  const route = useRoute();

  let dep_name = route.params.dep_name;
  let dep_id = route.params.dep_id;
  let listDep = route.params.listDep;
  let setDepList = route.params.setDepList;
  let i = route.params.index;
  console.log("+");
  console.log(listDep[i].dep_med);

  React.useEffect(() => {
    getDepList();
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
  const addMedication = () => {
    navigation.navigate("Add Reminder", {
      dep_name: dep_name,
      dep_id: dep_id,
      listDep: listDep,
      setDepList: setDepList,
      index: i,
    });
  };

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.med_name}`}
      description={`${item.how_times} times per day`}
      accessoryRight={() => renderItemAccessory(item.med_id)}
    />
  );
  const renderItemAccessory = (index) => (
    <Button onPress={() => deleteMedList(index)} size="small">
      <Icon name="trash"></Icon>
    </Button>
  );
  const deleteMedList = (index) => {
    Alert.alert("Confirm", "Delete this dependent?", [
      {
        text: "Yes",
        onPress: () => onDeleteHandler(index),
      },
      {
        text: "No",
      },
    ]);
  };
 

  const onDeleteHandler = key => {
    setDepList(listDep=> listDep.map(listDep => ({
        ...listDep,
        dep_med: listDep.dep_med.filter(item => item.med_id !== key)
      })
    ));
  };
  return (
    <View style={styles.container}>
      <Button
        style={styles.flex}
        icon="plus"
        mode="contained"
        onPress={addMedication}
      >
        <Icon name="plus"> </Icon>
      </Button>
      <View style={styles.row}>
        <List
          data={listDep[i].dep_med}
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
