import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";

import getBackgroundImg from "../../utils/getBackgroundImg";
import {
  DeckStateContext,
  DispatchContext,
} from "../../contextProvider/cardDeckContextProvider";
import { actionCreators } from "../../reducers/DeckStateReducer";

export default function IntroScreen() {
  const deckstate = useContext(DeckStateContext);
  const dispatchDeckAction = useContext(DispatchContext);

  const addExampleDeck = () => {
    const deckName = "Our Solar System";
    if (Object.keys(deckstate).includes(deckName)) {
      createCustomAlert("Deck already exists", `${deckName} already exists`);
    } else {
      dispatchDeckAction(actionCreators.addDeck(deckName, "sky"));
      dispatchDeckAction(
        actionCreators.addCard(
          deckName,
          "How many planets does our solar system have?",
          "8"
        )
      );
      dispatchDeckAction(
        actionCreators.addCard(
          deckName,
          "What are the planets of our solar system?",
          "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune"
        )
      );
      dispatchDeckAction(
        actionCreators.addCard(
          deckName,
          "Which are the gas planets in our solar system?",
          "Jupiter, Saturn, Uranus, Neptune"
        )
      );
      dispatchDeckAction(
        actionCreators.addCard(
          deckName,
          "Which are the rocky planets in our solar system?",
          "Mercury, Venus, Earth, Mars"
        )
      );
      createCustomAlert(
        "All right!",
        `New card deck ${deckName} has been added.`
      );
    }
  };

  const createCustomAlert = (title, message) =>
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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={getBackgroundImg("ocean")}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          <Text style={[styles.title, styles.textStyle]}>
            Mobile FlashCards
          </Text>
          {/* <Text style={[styles.mediumText, styles.textStyle]}>About:</Text> */}
          <Text style={[styles.smallText, styles.textStyle, styles.textBlock]}>
            This application helps you to memorize facts by providing a mobile
            version of good old flash cards. Add cards with questions and
            answers, organize your cards in decks and test your knowledge by
            taking a quiz on a certain deck.
          </Text>
          <Text style={[styles.smallText, styles.textStyle, styles.caption]}>
            Add a deck:
          </Text>
          <Text style={[styles.smallText, styles.textStyle, styles.textBlock]}>
            Switch to the AddDeck tab to add your first Deck or hit the button
            below to add an example deck.
          </Text>
          <Text style={[styles.smallText, styles.textStyle, styles.caption]}>
            Add cards and take a quiz:
          </Text>
          <Text style={[styles.smallText, styles.textStyle, styles.textBlock]}>
            A list of available decks is listed in this tab as soon as you have
            added your first deck. Select a deck to start adding cards or taking
            a quiz.
          </Text>
          <TouchableOpacity style={styles.button} onPress={addExampleDeck}>
            <Text>Add Example Deck</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34495E",
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "skyblue",
    borderRadius: 10,
  },
  title: {
    fontSize: 44,
    marginBottom: 20,
    fontWeight: "bold",
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
  caption: {
    textAlign: "left",
    fontWeight: "bold",
  },
  textBlock: {
    marginBottom: 20,
    textAlign: "justify",
  },
});
