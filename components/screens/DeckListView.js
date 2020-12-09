import React, { useEffect, useReducer, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  DeckStateContext,
  DispatchContext,
} from "../../contextProvider/cardDeckContextProvider";
import IntroScreen from "./IntroScreen";

import { actionCreators } from "../../reducers/DeckStateReducer";

const ListItem = ({ title, cardCount, imgId, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.title}>{title ? title : ""}</Text>
    <Text>Number of cards: {cardCount}</Text>
    {/* <Text>Background ID: {imgId}</Text> */}
  </TouchableOpacity>
);

export default function DeckListView({ route, navigation }) {
  const deckstate = useContext(DeckStateContext);
  const dispatchDeckAction = useContext(DispatchContext);
  // console.log(`DeckListView: deckstate = ${deckstate}`)
  // console.log(deckstate)

  useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      let key = route.params?.post;
      console.log("Post is " + key);
      deleteDeck(key);
    }
  }, [route.params?.post]);

  const deleteDeck = (decktitle) => {
    dispatchDeckAction(actionCreators.removeDeck(decktitle));
  };

  const renderItem = ({ item, index }) =>
    item && (
      <ListItem
        title={item.title ? item.title : "ITEM NOT FOUND"}
        cardCount={item.cards != null ? item.cards.length : 0}
        imgId={item.imgId}
        onPress={() => {
          /* 1. Navigate to the Deck View route with params */
          // const deleteDeckCallback = dispatchDeckAction(
          //   actionCreators.removeDeck(item.title)
          // );
          navigation.navigate("Deck View", {
            deckKey: item.title ? item.title : "ITEM NOT FOUND",
            //deleteDeckCallback: deleteDeck,
          });
        }}
      />
    );

  if (deckstate && deckstate != {} && Object.keys(deckstate).length > 0) {
    //show deck list
    return (
      <FlatList
        style={styles.container}
        data={deckstate ? Object.values(deckstate) : []}
        renderItem={renderItem}
        keyExtractor={(item) => (item ? item.title : "")}
        extraData={(item) => (item ? item.title : "")}
      />
    );
  } else {
    //if deckstate is still empty => show intro
    return <IntroScreen />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
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
    fontSize: 32,
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
  textBlock: {
    marginVertical: 20,
  },
});
