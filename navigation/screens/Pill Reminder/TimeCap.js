import React from "react";
import { StyleSheet } from 'react-native';

import { IndexPath, Layout, Select, SelectGroup, SelectItem } from '@ui-kitten/components';
import { useRoute } from "@react-navigation/native";


const data = ["Developer", "Designer", "Product Manager"];

export default function TimeCap() {

  const route = useRoute();
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const displayValue = data[selectedIndex.row];
  const renderOption = (title) => (
    <SelectItem title={title}/>
  );


  return (<Select
  style={styles.select}
  placeholder='Default'
  value={displayValue}
  selectedIndex={selectedIndex}
  onSelect={index => setSelectedIndex(index)}>
  {data.map(renderOption)}
</Select>)

}
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 192,
    },
    select: {
      flex: 1,
      margin: 2,
    },
  })
