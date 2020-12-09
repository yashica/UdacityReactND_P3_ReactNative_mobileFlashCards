import React, {
  useState,
  useCallback,
  useContext,
  //useFocusEffect,
} from "react";

import { useFocusEffect } from "@react-navigation/native";

import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import getBackgroundImg from "../../utils/getBackgroundImg";
import {
  DeckStateContext,
  DispatchContext,
} from "../../contextProvider/cardDeckContextProvider";
import { actionCreators } from "../../reducers/DeckStateReducer";

export default function IndividualDeckView({ route, navigation }) {
  const { deckKey } = route.params;
  if (!deckKey) return null;
  const deckstate = useContext(DeckStateContext);
  if (!deckstate) return null;
  const dispatchDeckAction = useContext(DispatchContext);
  let thisDeckState = deckstate[deckKey];
  if (!thisDeckState) return null;
  const { title, cards, imgId } = thisDeckState; //deckstate[deckKey];
  const [toBeDeleted, setToBeDeleted] = useState([false]);

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      //console.log("IndicidualDeckView has focus");

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        console.log("IndividualDeckView lost focus");
        // console.log("toBeDeleted = " + toBeDeleted);
        // if (toBeDeleted === true) {
        //   console.log("IndividualDeckView " + title + " will be deleted");
        //deleteDeckCallback(title);
        //dispatchDeckAction(actionCreators.removeDeck(title));
        //navigation.navigate("Deck List", { post: title });
        //navigation.navigate("Deck List", { deletionDeckKey: title });
        // }
      };
    }, [])
  );

  const createNoCardsAlert = (title, message) =>
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

  const addCard = () => {
    navigation.navigate("Add Card", {
      deckKey: deckKey,
    });
  };

  const startQuiz = () => {
    if (!(cards.length > 0)) {
      createNoCardsAlert(
        "No Cards",
        "Please add some cards to your deck first!"
      );
      return;
    }
    navigation.navigate("Quiz", {
      deckKey: deckKey,
      cardsInDeck: cards.length,
    });
  };

  //TODO: Find error
  const handleDeleteRequest = () => {
    // console.log("handleDeleteRequest")
    createConfirmDeleteAlert("Delete Deck?", `Deck ${title} will be deleted`);
    //navigation.popToTop();

    // console.log(`Deck ${deckKey} will be deleted`)
    // dispatchDeckAction(actionCreators.removeDeck(title));

    //console.log(`Deck has been deleted`)
  };

  const createConfirmDeleteAlert = (popuptitle, message) =>
    Alert.alert(
      popuptitle,
      message,
      [
        {
          text: "OK",
          onPress: () => {
            console.log(`ALERT(${popuptitle} : ${message})`);
            setToBeDeleted(true);
            console.log("toBeDeleted (in popup )= " + toBeDeleted);
            navigation.navigate("Deck List", { post: title });
            //navigation.popToTop({ post: title });
            //navigation.navigate("Deck List", { deletionDeckKey: title });
            //navigation.popToTop();
          },
        },
        {
          text: "Cancel",
          onPress: () => {
            console.log(`ALERT(${popuptitle} : ${message}) canceled`);
          },
        },
      ],
      { cancelable: true }
    );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={getBackgroundImg(imgId)}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          <Text style={[styles.largeText, styles.textStyle]}>{title}</Text>
          <Text style={[styles.mediumText, styles.textStyle]}>
            {`Cards in deck: ${cards.length}`}
          </Text>

          <TouchableOpacity style={styles.button} onPress={addCard}>
            <Text>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={startQuiz}>
            <Text>Take a Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn_remove}
            onPress={handleDeleteRequest}
          >
            <Text style={{ color: "darkred" }}>Remove Deck</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  btn_remove: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginVertical: 8,
    marginHorizontal: 40,
    backgroundColor: "gray",
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
