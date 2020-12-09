import React, { useState, useEffect, useContext }  from "react";
import {  
  Text,
  View, 
  Platform, 
  KeyboardAvoidingView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Animated
} from 'react-native';

import getBackgroundImg from '../../utils/getBackgroundImg';
import { DeckStateContext } from '../../contextProvider/cardDeckContextProvider'

export default function CardView({ route, navigation }) {
  /* 2. Get the params */
  const { deckKey, cardNr, correctAnswers } = route.params;
  const deckstate = useContext(DeckStateContext);
  const { title , cards, imgId } = deckstate[deckKey];
  const [ cardFlipped, setCardFlipped ] = useState(false)
  const currentCard = cards[cardNr-1]

 const handleInput = input => {
    alert(`New card input ${input}`)
 }

 const handleSubmit = correct => {
   let nextScreen = cardNr >= cards.length ? "Quiz Results" : "Card"
   navigation.push(nextScreen, {
    deckKey: deckKey,
    cardNr: parseInt(JSON.stringify(cardNr))+1,
    correctAnswers: parseInt(JSON.stringify(correctAnswers))+correct,
    });
}


  return (
    <View style={styles.container} >
        <ImageBackground 
            source={getBackgroundImg(imgId)} 
            style={styles.imageContainer} 
            imageStyle={styles.image}
          > 
          <View style={styles.detailsContainer}>
            <View style={styles.QAContainer}>
              <Text style={[styles.label, styles.textStyle, styles.mediumText,]}>
                {cardFlipped ? 'Answer:' : 'Question:'}
              </Text>
              <Text style={[styles.largeText, styles.textStyle]}>
                { cardFlipped ? cards[cardNr-1].answer
                              : cards[cardNr-1].question }
              </Text>
            </View> 
            
            <TouchableOpacity style={ styles.button } onPress={()=>{
              cardFlipped ? setCardFlipped(0) : setCardFlipped(1)
            }}>
              <Text>
                {cardFlipped ? 'show question' : 'show answer'}
              </Text>
            </TouchableOpacity>

            <View style = {styles.buttonRowContainer}>
              <TouchableOpacity style={ [ styles.button, {flex: 1, backgroundColor: "darkred"}] } onPress={() => {
                    let nextScreen = cardNr >= cards.length ? "Quiz Results" : "Card"
                    navigation.navigate(nextScreen, {
                      deckKey: deckKey,
                      cardNr: parseInt(JSON.stringify(cardNr))+1,
                      correctAnswers: parseInt(JSON.stringify(correctAnswers)),
                      });
                      setCardFlipped(0);
                }}>
                    <Text>WRONG</Text>
                </TouchableOpacity>
                <TouchableOpacity style={  [ styles.button, {flex: 1, backgroundColor: "darkgreen"}] } onPress={() => {
                    let nextScreen = cardNr >= cards.length ? "Quiz Results" : "Card"
                    navigation.navigate(nextScreen, {
                      deckKey: deckKey,
                      cardNr: parseInt(JSON.stringify(cardNr))+1,
                      correctAnswers: parseInt(JSON.stringify(correctAnswers))+1,
                      });
                      setCardFlipped(0);
                }}>
                    <Text>CORRECT</Text>
                </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  detailsContainer: { flex: 1,
    justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)', paddingHorizontal: 20,
  },
  imageContainer: { flex: 1,
  },
  buttonRowContainer: {
    flexDirection: "row"
  }, 
  QAContainer: {
    //backgroundColor: 'rgba(100,0,0,0.2)',
    height: 300,
    //width: 200,
    //marginTop: 20,
    //backgroundColor: '#666',
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
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
    //marginHorizontal: 16,
    marginHorizontal: 40,
    backgroundColor: "skyblue",
    borderRadius: 10
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
    marginTop: 20,
  },
  title: {
    fontSize: 45,
  },
  subTitle: {
      fontSize: 32,
    },
});