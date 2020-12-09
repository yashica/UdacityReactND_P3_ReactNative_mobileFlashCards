import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import PropTypes from "prop-types";
import { Picker } from "@react-native-picker/picker";

const imgLabels = {
  bubbles: "Bubbles",
  ocean: "Ocean",
  rock: "Rock",
  sky: "Sky",
};

export default function ImgPicker({ onSubmit }) {
  const [backgroundImgLabel, setBackgroundImgLabel] = useState("bubbles");
  const handleValueChange = (value) => {
    if (!value) return;
    if (onSubmit) {
      //if parent has passed in onSubmit handler
      const label = imgLabels[value];
      onSubmit(value, label);
    }
    //alert(`New selection: ${selection}`);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={backgroundImgLabel}
        style={styles.picker}
        itemStyle={styles.textStyle}
        onValueChange={(itemValue, itemIndex) => {
          setBackgroundImgLabel(itemValue);
          handleValueChange(itemValue);
        }}
      >
        <Picker.Item label="Ocean" value="ocean" />
        <Picker.Item label="Rock" value="rock" />
        <Picker.Item label="Sky" value="sky" />
        <Picker.Item label="Bubbles" value="bubbles" />
      </Picker>
    </View>
  );
}

ImgPicker.propTypes = {
  onSubmit: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: 'rgba(100,0,0,0.2)',
    height: 200,
    //width: 200,
    //marginTop: 20,
    //backgroundColor: '#666',
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 40,
    paddingHorizontal: 10,
    //marginHorizontal: 40,
    //paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    //flex: 1,
    height: 50,
    width: 100,
    color: "white",
  },
  textStyle: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
    color: "white",
  },
});
