import React, { useEffect, useReducer } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import DecksView from "./components/screens/DecksView";
import AddDeckView from "./components/screens/AddDeckView";

import { actionCreators, DeckStateReducer } from "./reducers/DeckStateReducer";
import {
  DispatchContext,
  DeckStateContext,
} from "./contextProvider/cardDeckContextProvider";

import { setLocalNotification } from "./utils/localNotifications";

//Tab Navigation
const MainBottomTabNav = createBottomTabNavigator();

export default function App() {
  //on init, load stored deckstate
  useEffect(() => {
    console.log("In use Effect..");
    loadDeckState();
    //ask user for permission for local notifications
    setLocalNotification();
  }, []);

  //store new deckstate after each change
  useEffect(() => {
    saveDeckstate();
  });

  //deckstate holds all our memo cards, sorted in card decks
  const [deckstate, dispatch] = useReducer(DeckStateReducer, {});
  //dispatchDeckAction and deckstate will be provided to every component of the app
  //using DispatchContext.Provider and DeckStateContext.Provider (see render method)
  const dispatchDeckAction = (actionObject) => {
    dispatch(actionObject);
  };

  //We use Async Storage to persist deck state
  const STORAGE_KEY = "ASYNC_STORAGE_DECKSTATE";

  async function loadDeckState() {
    console.log("In loadDeckState..");
    try {
      const storedDeckState = await AsyncStorage.getItem(STORAGE_KEY);
      const storedStateObject = JSON.parse(storedDeckState);
      if (storedDeckState === null) return;
      dispatchDeckAction(actionCreators.replaceState(storedStateObject));
      console.log("Stored deck state has been retrieved and set");
    } catch (e) {
      console.error(`Failed to load stored deck state. Error: ${e}`);
      console.error(e);
    }
  }

  async function saveDeckstate() {
    try {
      const newDeckState = deckstate;
      const jsonStateObject = JSON.stringify(newDeckState);
      await AsyncStorage.setItem(STORAGE_KEY, jsonStateObject);
      console.log("New deck state has been stored");
    } catch (e) {
      console.error("Failed to store deck state.");
    }
  }

  return (
    <DispatchContext.Provider value={dispatchDeckAction}>
      <DeckStateContext.Provider value={deckstate}>
        <NavigationContainer>
          <MainBottomTabNav.Navigator
            tabBarOptions={{
              activeTintColor: "tomato",
              inactiveTintColor: "gray",
            }}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                if (route.name === "Decks") {
                  return (
                    <Ionicons
                      name={focused ? "ios-list-box" : "ios-list"}
                      size={size}
                      color={color}
                    />
                  );
                } else if (route.name === "AddDeck") {
                  return (
                    <AntDesign
                      name={focused ? "plussquare" : "plussquareo"}
                      size={size}
                      color={color}
                    />
                  );
                }
              },
            })}
          >
            <MainBottomTabNav.Screen name="Decks" component={DecksView} />
            <MainBottomTabNav.Screen name="AddDeck" component={AddDeckView} />
          </MainBottomTabNav.Navigator>
        </NavigationContainer>
      </DeckStateContext.Provider>
    </DispatchContext.Provider>
  );
}
