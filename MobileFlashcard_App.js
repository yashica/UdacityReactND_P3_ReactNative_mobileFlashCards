import React, { useState, useEffect, useReducer, useContext } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { useAsyncStorage } from "@react-native-async-storage/async-storage";

import DecksView from "./components/screens/DecksView";
import AddDeckView from "./components/screens/AddDeckView";

// import { actionCreators, initialDeckState, DeckStateReducer } from './reducers/DeckStateReducer'

import { actionCreators, DeckStateReducer } from "./reducers/DeckStateReducer";
import {
  DispatchContext,
  DeckStateContext,
} from "./contextProvider/cardDeckContextProvider";

//Tab Navigation
const Tab = createBottomTabNavigator();

export default function App() {
  //load stored deckstate
  useEffect(() => {
    console.log("In use Effect..");
    // console.log("In use Effect: DECKSTATE = ");
    // console.log(deckstate);
    //loadCount();
    loadDeckState();
    // const storedObject = getData();
    // console.log("Stored Data Object is:");
    // console.log(storedObject);
    //dispatchDeckAction({ type: "REPLACE_STATE", payload: storedObject });

    // let title = 'NewDeck';
    // dispatchDeckAction({ type: 'ADD_DECK', payload: {title} })

    // dispatchDeckAction(actionCreators.addDeck("Birds","ocean"))
    // dispatchDeckAction(actionCreators.addDeck("Animals","bubbles"))

    // dispatchDeckAction(actionCreators.addCard("Animals", "What does a dog eat","Meat"))
    // dispatchDeckAction(actionCreators.addCard("Animals", "What does a rabbit eat","Carrots"))
  }, []);

  //store new deckstate after each change
  useEffect(() => {
    saveDeckstate();
  });

  //const { getItem, setItem } = useAsyncStorage("@storage_key");

  // const storeData = async (value) => {
  //   try {
  //     const jsonValue = JSON.stringify(value);
  //     await setItem(jsonValue);
  //     // await AsyncStorage.setItem("@storage_Key", jsonValue);
  //   } catch (e) {
  //     // saving error
  //     console.error(`XXFailed to save deck state. Error: ${e}`);
  //   }
  //   console.log("storeData done.");
  // };

  // const getData = async () => {
  //   try {
  //     // const jsonValue = await AsyncStorage.getItem("@storage_Key");
  //     const jsonValue = await getItem();
  //     // return jsonValue != null ? JSON.parse(jsonValue) : null;
  //     const result = jsonValue != null ? JSON.parse(jsonValue) : null;
  //     console.log("getData: result =");
  //     console.log(result);
  //     dispatchDeckAction(actionCreators.replaceState(result));
  //     //dispatchDeckAction({ type: "REPLACE_STATE", payload: result });
  //   } catch (e) {
  //     // error reading value
  //     console.error(`XXFailed to load stored deck state. Error: ${e}`);
  //   }
  //   console.log("getData done.");
  // };

  // console.log("App - initialDeckstate 1");
  // console.log(initialDeckState);
  //const [initialDeckState, setInitialDeckstate] = useState({});
  const [deckstate, dispatch] = useReducer(DeckStateReducer, {});

  // console.log("App - initialDeckstate 2");
  // console.log(initialDeckState);
  // const [count, setCount] = useState(0);
  // const increment = () => {
  //   setCount((value) => value + 1, saveCount(count));
  // };

  //dispatchDeckAction(actionCreators.addDeck(deckName,backgroundImgKey));
  const dispatchDeckAction = (actionObject) => {
    // console.log(`In dispatchDeckAction. actionObject =`);
    // console.log(actionObject);
    // //increment();
    // console.log(`In dispatchDeckAction. DECKSTATE BEFORE DISPATCH:`);
    // console.log(deckstate);
    dispatch(actionObject);
    // saveDeckstate();
    // console.log(`In dispatchDeckAction. DECKSTATE AFTER DISPATCH:`);
    // console.log(newDeckstate);
    // //console.log(`Count = ${count}`);
    //saveDeckstate(newDeckstate);
    //console.log("dispatchDeckAction: New deckstate = ");
    //console.log(deckstate);

    //storeData(deckstate);
    //storeData({ name: "Test", number: 77 });
    //console.log(`In dispatchDeckAction. DECKSTATE HAS BEEN SAVED`);
  };
  //next: feed dispatchAndStoreDeckAction in context instead of dispatchDeckActio

  // const COUNTER_STORAGE_KEY = "ASYNC_STORAGE_COUNTER";
  const STORAGE_KEY = "ASYNC_STORAGE_DECKSTATE";

  async function loadDeckState() {
    console.log("In loadDeckState..");
    try {
      const storedDeckState = await AsyncStorage.getItem(STORAGE_KEY);
      // console.log("storedDeckState: ");
      // console.log(storedDeckState);

      const storedStateObject = JSON.parse(storedDeckState);
      // console.log("storedDeckStateObject after JSON.parse(storedDeckState): ");
      // console.log(storedStateObject);

      if (storedDeckState === null) return; //replaceState
      // console.log("App.js loadDeckState: old deckstate will be replaced:");
      // console.log("OLD DECKSTATE:");
      // console.log(deckstate);
      // console.log("WILL BE REPLACED WITH:");
      // console.log(storedStateObject);
      dispatchDeckAction(actionCreators.replaceState(storedStateObject));
      // console.log("RESULTING dectate:");
      // console.log(deckstate);
      //setInitialDeckstate(storedDeckState);
    } catch (e) {
      console.error(`Failed to load stored deck state. Error: ${e}`);
      console.error(e);
    }
  }

  // async function loadCount() {
  //   AsyncStorage.getItem(COUNTER_STORAGE_KEY).then(
  //     (value = {
  //       if(value) {
  //         setCount(parseInt(value));
  //         console.log(`countervalue ${value} retrieved from storage`);
  //       },
  //     })
  //   );
  //   //console.log("In loadDeckState..")
  //   // try {
  //   //   const storedCount = await AsyncStorage.getItem(COUNTER_STORAGE_KEY)
  //   //   console.log(`storedCount: `)
  //   //   console.log(storedCount)

  //   //   //const jsonValue = JSON.stringify(storedDeckState)
  //   //   // console.log("storedDeckState - JSON.stringified: ")
  //   //   // console.log(jsonValue)

  //   //   if (storedCount === null) return
  //   //   setCount(storedCount)
  //   // } catch (e) {
  //   //   console.error('Failed to load stored counter state.')
  //   // }
  // }

  // async function saveCount(newCount) {
  //   try {
  //     // console.log('newDeckState to store: ')
  //     // console.log(newDeckState)
  //     const jsonCount = JSON.stringify(newCount);
  //     //console.log('jsonStateObject stringified to store: ')
  //     //console.log(jsonStateObject)
  //     await AsyncStorage.setItem(COUNTER_STORAGE_KEY, jsonCount);
  //     //setInitialDeckstate(newDeckState)
  //   } catch (e) {
  //     console.error("Failed to save count state.");
  //   }
  // }

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

  // const testFunction = (input) => {
  //   alert(input);
  // };

  return (
    //dispatchAndStoreDeckAction
    // <DispatchContext.Provider value={dispatch}>
    <DispatchContext.Provider value={dispatchDeckAction}>
      {/* //<DispatchContext.Provider value={dispatchAndStoreDeckAction}> */}
      <DeckStateContext.Provider value={deckstate}>
        <NavigationContainer>
          <Tab.Navigator
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
            <Tab.Screen name="Decks" component={DecksView} />
            <Tab.Screen name="AddDeck" component={AddDeckView} />
          </Tab.Navigator>
        </NavigationContainer>
      </DeckStateContext.Provider>
    </DispatchContext.Provider>
  );
}
