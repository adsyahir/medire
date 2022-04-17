import {
  StyleSheet,
  View,
  Picker,
  Platform,
  ScrollView,
  FlatList,
  Alert
} from "react-native";
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
  useTheme,
} from "@ui-kitten/components";
import { useState } from "react";
import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Reminder from "./Reminder";
import NavigationReminder from "./NavigationReminder";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const frequency = ["Every Day", "Specific day"];
const howt = [1, 2, 3, 4, 5, 6, 7];
const to12Hours = require("to12hours");
const cap = [1, 2, 3, 4, 5, 6, 7];

export default function AddReminder({navigation}) {
  const route = useRoute();
  let dep_name = route.params.dep_name;
  let dep_id = route.params.dep_id;
  let listDep = route.params.listDep;
  let setDepList = route.params.setDepList;

  const [selectedHow, setSelectedHow] = React.useState(new IndexPath(0));
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [selectedCap, setSelectedCap] = React.useState(new IndexPath(0));
  const [medName, setMedName] = React.useState("");
  const [show, setShow] = useState(false);
  const [time, setTime] = useState("00.00");
  const [time24, setTime24] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);

    setTime(to12Hours(tempDate.toTimeString().slice(0, 5)));
    setTime24(_12FromTo24Hours("9:00 PM"));
    console.log(time24);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showTimepicker = () => {
    showMode("time");
  };
  const displayCap = cap[selectedCap.row];
  const renderOption = (title, cap) => (
    <SelectItem title={title} key={cap.toString()} />
  );
  const displayHowt = howt[selectedHow.row];
  /* 
    const data = [
      { id: 1, day: "Monday", isChecked: false },
      { id: 2, day: "Tuesday", isChecked: false },
      { id: 3, day: "Wednesday", isChecked: false },
      { id: 4, day: "Thursday", isChecked: false },
      { id: 5, day: "Friday", isChecked: false },
      { id: 6, day: "Saturday", isChecked: false },
      { id: 7, day: "Sunday", isChecked: false },
    ];
  
    const displayFrequency = frequency[selectedF.row];

    const renderOption = (title, numbers) => (
      <SelectItem title={title} key={numbers.toString()} />
    );

    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
    const [products, setProducts] = useState(data);
  
  
    let selected = products.filter((product) => product.isChecked);
  
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
    */
    console.log(listDep[0].dep_name);

  const Submit = () => {
    if(medName == '' || time == '00.00')
    {
      Alert.alert("Error", "Please Enter Input");
    }
    else{
      let times = []
      for(let i=0; i< displayHowt; i++)
      {
        times.push(time);
      }
      const reminder = { med_id:Date.now(),  med_name:medName, how_times: displayHowt, time:times, capsule_num: displayCap}

      const newDeplist = listDep.map((item,index)=>{
        if(dep_id == item.id)
        {
          listDep[index].dep_med.push(reminder);
        }
        return item;
      })
      console.log(listDep);

      setDepList(newDeplist);
      navigation.navigate("List Medicine",{
        dep_name: dep_name,
        dep_id: id,
        listDep:listDep,
        setDepList:setDepList,
        index:index,
      })
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


  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Input
          style={styles.input}
          label="Medicine Name"
          placeholder="Enter Medicine Name"
          onChangeText={(text) => setMedName(text)}
          size="medium"
          value={medName}
        />
      </View>
      <View style={styles.row}>
        <Layout level="1">
          <Select
            label="HOW MANY TIMES A DAY?"
            style={styles.dropDown}
            placeholder="Default"
            value={displayHowt}
            selectedIndex={selectedHow}
            onSelect={(index) => setSelectedHow(index)}
          >
            {howt.map(renderOption)}
          </Select>
        </Layout>
      </View>
      <View style={styles.row}>
        <Button   size='small' appearance='outline' status="primary" onPress={showTimepicker}>
          {time}
        </Button>
        </View>
        <View style={styles.row}>
        {show && (
          <DateTimePicker
            testID="TimePicker"
            value={date}
            mode={mode}
            is24Hour={false}
            onChange={onChange}
          />
        )}
        <Select
          label="Capsule"
          style={styles.select}
          placeholder="Default"
          value={displayCap}
          selectedIndex={selectedCap}
          onSelect={(index) => setSelectedCap(index)}
        >
          {cap.map(renderOption)}
        </Select>
      </View>

      <Button onPress={Submit}>Submit</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 20,
    paddingLeft:30,
  },
  input: {
    width: 350,
  },
  text: {
    flex: 1,
    marginTop: 10,
    justifyContent: "flex-end",
    fontSize: 12,
  },
  row: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-start", 
    alignSelf:'flex-start', 
  },
  dropDown: {
    width: 350,
    marginBottom: 10,
    color: "black",
  },
  button: {
    color: "yellow",
    backgroundColor: "black",
  },
  howt: {
    width: 150,
    marginBottom: 10,
    color: "black",
  },
  textCheckbox: {
    flex: 1,
    marginTop: 10,
    fontSize: 12,
    color: "black",
  },
  rowCheck: {
    flexDirection: "row",
  },
  rowText: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "space-between",
    marginLeft: 30,
  },
  select: {
    width: 150,
  },
});
