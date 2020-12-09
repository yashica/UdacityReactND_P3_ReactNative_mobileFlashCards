import React, { useContext } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import getBackgroundImg from "../../utils/getBackgroundImg";
import { DeckStateContext } from "../../contextProvider/cardDeckContextProvider";

import {
  getDailyReminderValue,
  clearLocalNotification,
  setLocalNotification,
} from "../../utils/localNotifications";

export default function QuizResultsScreen({ route, navigation }) {
  /* Get the params */
  const { deckKey, correctAnswers } = route.params;
  const deckstate = useContext(DeckStateContext);
  const { title, cards, imgId } = deckstate[deckKey];

  const questions = cards.length;

  //local notifications:
  //If the user has'nt taken a quiz that day, we will remind him at 6 pm to do so:
  //1)As he has youst finished a quiz, we clear the reminder for today with clearLocalNotification()
  //2)and set a new notification for tomorrow with setLocalNotification
  clearLocalNotification().then(setLocalNotification);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={getBackgroundImg(imgId)}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          <Text style={[styles.largeText, styles.textStyle]}>Results</Text>
          <Text style={[styles.mediumText, styles.textStyle]}>
            Topic: {title}
          </Text>
          <Text style={[styles.label, styles.textStyle, styles.smallText]}>
            Your score:
          </Text>
          <Text style={[styles.textStyle, styles.score]}>
            {Math.round((correctAnswers / questions) * 100)}%
          </Text>
          <Text style={[styles.smallText, styles.textStyle]}>
            Questions: {questions}
          </Text>
          <Text style={[styles.smallText, styles.textStyle]}>
            Correct answers: {correctAnswers}
          </Text>
          <Text style={[styles.smallText, styles.textStyle]}>
            Wrong answers: {questions - correctAnswers}
          </Text>
          <Text style={[styles.label, styles.textStyle, styles.smallText]}>
            Try again?
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Quiz Start", {
                deckKey: deckKey,
              });
            }}
          >
            <Text>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Deck View", {
                deckKey: deckKey,
              });
            }}
          >
            <Text>Back to Deck View</Text>
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
    marginTop: 10,
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
  bold: {
    fontWeight: "bold",
  },
  textBlock: {
    marginVertical: 20,
    textAlign: "justify",
  },
  score: {
    fontSize: 80,
    fontWeight: "bold",
  },
});
