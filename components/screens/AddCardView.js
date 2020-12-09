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

import {
  DeckStateContext,
  DispatchContext,
} from "../../contextProvider/cardDeckContextProvider";
import { actionCreators } from "../../reducers/DeckStateReducer";
import getBackgroundImg from "../../utils/getBackgroundImg";
import InputField from "../InputField";

export default function AddCardView({ route, navigation }) {
  const { deckKey } = route.params;
  const dispatchDeckAction = useContext(DispatchContext);
  const deckstate = useContext(DeckStateContext);
  const { title, imgId } = deckstate[deckKey];

  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");

  const handleInput = (input) => {
    alert(`New card input ${input}`);
  };

  const createSuccessAlert = (title, message) =>
    Alert.alert(
      title,
      message,
      [
        {
          text: "OK",
          onPress: () => console.log(`ALERT(${title} : ${message})`),
        },
      ],
      { cancelable: false }
    );

  const handleSubmit = () => {
    if (!(answer && question)) {
      alert(`Please enter answer and question`);
    } else {
      dispatchDeckAction(actionCreators.addCard(deckKey, question, answer));
      createSuccessAlert(
        "All right!",
        `A new card has been added to deck ${deckKey}.`
      );
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <ImageBackground
        source={getBackgroundImg(imgId)}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          <Text style={[styles.largeText, styles.textStyle]}>Add new card</Text>
          <Text style={[styles.mediumText, styles.textStyle]}>to</Text>
          <Text style={[styles.mediumText, styles.textStyle, styles.bold]}>
            {title}
          </Text>
          <Text style={[styles.label, styles.textStyle, styles.smallText]}>
            Enter question:
          </Text>
          <InputField
            placeholder="Question"
            onChange={(newAnswer) => {
              setAnswer(newAnswer);
            }}
            onSubmit={handleSubmit}
          />
          <Text style={[styles.label, styles.textStyle, styles.smallText]}>
            Enter answer:
          </Text>
          <InputField
            placeholder="Answer"
            onChange={(newQuestion) => {
              setQuestion(newQuestion);
            }}
            onSubmit={handleSubmit}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text>Add Card to Deck</Text>
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
    //marginHorizontal: 16,
    marginHorizontal: 40,
    backgroundColor: "skyblue",
    borderRadius: 10,
  },
  // textStyle: {
  //   textAlign: 'center',
  //   ...Platform.select({
  //     ios: {
  //       fontFamily: 'AvenirNext-Regular',
  //       color: 'blue'
  //     }, android: {
  //       fontFamily: 'Roboto',
  //       color: 'purple'
  //     },
  //   }),
  // },
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
    marginTop: 20,
  },
  bold: {
    fontWeight: "bold",
  },
});
