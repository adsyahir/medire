import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet, View, Platform, Text, FlatList } from "react-native";
import {
  Select,
  SelectItem,
  IndexPath,
  Button,
  CheckBox,
} from "@ui-kitten/components";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";

const to12Hours = require("to12hours");
const _12FromTo24Hours = require("12fromto24hours");

const cap = [1, 2, 3, 4, 5, 6, 7];
export default function Reminder() {
  const route = useRoute();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [time, setTime] = useState("00.00");
  const [selectedCap, setSelectedCap] = React.useState(new IndexPath(0));
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

  const data = [
    { id: 1, day: "Monday", isChecked: false },
    { id: 2, day: "Tuesday", isChecked: false },
    { id: 3, day: "Wednesday", isChecked: false },
    { id: 4, day: "Thursday", isChecked: false },
    { id: 5, day: "Friday", isChecked: false },
    { id: 6, day: "Saturday", isChecked: false },
    { id: 7, day: "Sunday", isChecked: false },
  ];

  const [products, setProducts] = useState(data);

  const handleChange = (id) => {
    let temp = products.map((product) => {
      if (id === product.id) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setProducts(temp);
  };
  let selected = products.filter((product) => product.isChecked);

  const handleSubmit = () => {
    let medName = route.params.medName;
    let depName = route.params.depName;
    let howt = route.params.howt;

    const dayTime = [];

    for (let i = 0; i < displayCap; i++) {
      dayTime.push(time);
    }
    const medReminder = {
      id: Date.now(),
      medicine_name: medName,
      dependent_name: depName,
      time_per_day: howt,
      day: selected,
      time: dayTime,
    };
    console.log(medReminder);
  };

  const renderFlatList = (renderData) => {
    return (
      <FlatList
        data={renderData}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.day}</Text>
            <View>
              <CheckBox
                checked={item.isChecked}
                onChange={() => {
                  handleChange(item.id);
                }}
              />
            </View>
          </View>
        )}
      />
    );
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.rowCap}>{renderFlatList(products)}</View>

      <View style={styles.rowCap}>
        <Button appearance="ghost" status="primary" onPress={showTimepicker}>
          {time}
        </Button>
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
      <View style={styles.rowCap}>
        <Button style={styles.button} onPress={handleSubmit}>
          Submit
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    width: 300,
    justifyContent: "space-between",
    margin: 10,
    shadowColor: "black",
    height: 20,
  },
  rowCap: {
    flexDirection: "row",
    width: 330,
    justifyContent: "center",
    marginTop: 20,
  },
  select: {
    width: 100,
  },
});
