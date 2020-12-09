import React, { useContext } from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";

import getBackgroundImg from '../../utils/getBackgroundImg';
import { DeckStateContext } from '../../contextProvider/cardDeckContextProvider'

export default function QuizStartScreen({ route, navigation }) {
    /* Get the params */
    const { deckKey } = route.params;
    const deckstate = useContext(DeckStateContext);
    const { title , cards, imgId } = deckstate[deckKey];
    
    return (
        <View style={styles.container} >
        <ImageBackground 
          source={getBackgroundImg(imgId)} 
          style={styles.imageContainer} 
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <Text style = {[styles.largeText, styles.textStyle]}>Do you know it?</Text>
            <Text style = {[styles.mediumText, styles.textStyle]}>Topic: {title}</Text>
            <Text style = {[styles.smallText, styles.textStyle, styles.textBlock]}>
                Test your knowledge on each question.
                Flip the card to check your answer. 
                Hit correct or wrong to get to the next card.
                View your results after finishing the quiz. 
            </Text>
            <Text style = {[styles.mediumText, styles.textStyle, {fontWeight: "bold"}]}>Good luck!</Text>
            <TouchableOpacity style={ styles.button } onPress={() => {
                navigation.navigate("Card", {
                deckKey: deckKey,
                cardCount: 1,
                correctAnswers: 0
                });
            }}>
                <Text>Start Quiz</Text>
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
    detailsContainer: { flex: 1,
        justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)', paddingHorizontal: 20,
        alignItems: "stretch"
    },
    imageContainer: { flex: 1,
    },
    image: {
        flex: 1,
        width: null,
        height: null, 
        resizeMode: 'cover',
    },
    button: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginVertical: 8,
        marginHorizontal: 40,
        backgroundColor: "skyblue",
        borderRadius: 10
      },
      textStyle: { 
        textAlign: 'center', 
        fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto', 
        color: 'white',
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
      }
  })