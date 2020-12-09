import React, { useState, useContext } from "react";

import {
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import getBackgroundImg from "../../utils/getBackgroundImg";
import InputField from "../InputField";
import ImgPicker from "../ImgPicker";

import {
  DeckStateContext,
  DispatchContext,
} from "../../contextProvider/cardDeckContextProvider";
import { actionCreators } from "../../reducers/DeckStateReducer";

export default function AddDeckView({ route, navigation }) {
  const deckstate = useContext(DeckStateContext);
  const dispatchDeckAction = useContext(DispatchContext);

  const [deckName, setDeckName] = useState("");
  const [backgroundImgLabel, setBackgroundImgLabel] = useState("Ocean");
  const [backgroundImgKey, setBackgroundImgKey] = useState("ocean");

  const handlePickerInput = (value, label) => {
    setBackgroundImgKey(value);
    setBackgroundImgLabel(label);
  };

  const createSuccessAlert = (title, message) =>
    Alert.alert(
      title,
      message,
      [
        {
          text: "OK",
          onPress: () => {
            console.log(`ALERT(${title} : ${message})`);
          },
        },
      ],
      { cancelable: false }
    );

  const handleSubmit = () => {
    if (!deckName) {
      alert(`Please enter a deck name`);
    } else {
      if (Object.keys(deckstate).includes(deckName)) {
        alert(
          "It already exists a deck with this name. Please choose another deck name."
        );
      } else {
        dispatchDeckAction(actionCreators.addDeck(deckName, backgroundImgKey));

        //We could show a success Alert here
        // createSuccessAlert(
        //   "All right!",
        //   `New card deck ${deckName} has been added.`
        // );

        //navigate to newly created deck's details view
        navigation.navigate("Decks", {
          screen: "Deck View",
          params: { deckKey: deckName },
        });
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <ImageBackground
        source={getBackgroundImg(backgroundImgKey)}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          <Text style={[styles.largeText, styles.textStyle]}>Add new deck</Text>
          <Text style={[styles.label, styles.textStyle, styles.mediumText]}>
            Enter deck name:
          </Text>
          <InputField
            placeholder="MyNewDeck"
            onChange={(newDeckName) => {
              setDeckName(newDeckName);
            }}
            onSubmit={handleSubmit}
          />

          <Text
            style={[styles.label, styles.textStyle, styles.mediumText]}
          >{`Selected Background: ${backgroundImgLabel}`}</Text>

          <ImgPicker onSubmit={handlePickerInput} />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text>Add Deck</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34495E",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20,
    alignItems: "stretch",
  },
  imageContainer: { flex: 1 },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  button: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginVertical: 8,
    marginHorizontal: 40,
    backgroundColor: "skyblue",
    borderRadius: 10,
  },
  textStyle: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
    color: "white",
  },
  largeText: {
    fontSize: 44,
  },
  mediumText: {
    fontSize: 24,
  },
  smallText: {
    fontSize: 18,
  },
  label: {
    marginTop: 30,
  },
});
