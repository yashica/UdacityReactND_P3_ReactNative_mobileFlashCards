import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import QuizStartScreen from "./QuizStartScreen";
import QuizResultsScreen from "./QuizResultsScreen";
import CardView from "./CardView";

const QuizStack = createStackNavigator();

export default function QuizView({ route, navigation }) {
  const { deckKey, cardsInDeck } = route.params;
  return (
    <QuizStack.Navigator initialRouteName="Quiz Start">
      <QuizStack.Screen
        name="Quiz Start"
        component={QuizStartScreen}
        initialParams={{ deckKey: deckKey }}
      />
      <QuizStack.Screen
        name="Card"
        component={CardView}
        initialParams={{
          deckKey: deckKey,
          cardsInDeck: cardsInDeck,
          correctAnswers: 0,
          cardNr: 1,
        }}
        options={({ route }) => ({
          title: `Card ${route.params.cardNr} of ${route.params.cardsInDeck}`,
          headerBackTitleVisible: route.params.cardNr <= 1,
        })}
      />
      <QuizStack.Screen
        name="Quiz Results"
        component={QuizResultsScreen}
        initialParams={{ deckKey: deckKey }}
        options={{ headerBackTitle: "Cards" }}
      />
    </QuizStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "skyblue",
    borderRadius: 10,
  },
  title: {
    fontSize: 45,
  },
  subTitle: {
    fontSize: 32,
  },
});
