import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DeckListView from "./DeckListView";
import IndividualDeckView from "./IndividualDeckView";
import AddCardView from "./AddCardView";
import QuizView from "./QuizView";

const DecksViewStack = createStackNavigator();

export default function DecksView({ route, navigation }) {
  const tabBarRoute = route;
  const tabBarNavigation = navigation;

  return (
    <DecksViewStack.Navigator initialRouteName="Deck List">
      <DecksViewStack.Screen name="Deck List" component={DeckListView} />
      <DecksViewStack.Screen name="Deck View" component={IndividualDeckView} />
      <DecksViewStack.Screen name="Add Card" component={AddCardView} />
      <DecksViewStack.Screen name="Quiz" component={QuizView} />
    </DecksViewStack.Navigator>
  );
}
