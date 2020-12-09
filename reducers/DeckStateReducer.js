const types = {
  ADD_DECK: "ADD_DECK",
  REMOVE_DECK: "REMOVE_DECK",
  ADD_CARD: "ADD_CARD",
  REPLACE_STATE: "REPLACE_STATE",
  //REMOVE_QUESTION: 'REMOVE_QUESTION',
};

export const actionCreators = {
  addDeck: (title, newImgId) => ({
    type: types.ADD_DECK,
    payload: { title, newImgId },
  }),
  //removeDeck: () => ({ type: types.REMOVE_DECK }),
  removeDeck: (key) => ({
    type: types.REMOVE_DECK,
    payload: { key },
  }),
  addCard: (key, newQuestion, newAnswer) => {
    const newCard = { question: newQuestion, answer: newAnswer };
    return {
      type: types.ADD_CARD,
      payload: { key, newCard },
    };
  },
  //removeQuestion: () => ({ type: types.REMOVE_QUESTION }),
  // removeQuestion: ( key , q_index ) => ({
  //     type: types.REMOVE_QUESTION,
  //     payload: { key , q_index },
  //   }),
  replaceState: (newState) => {
    console.log("In actionCreators > replaceState: newState =");
    console.log(newState);
    return {
      type: types.REPLACE_STATE,
      payload: newState,
    };
  },
  // replaceState: (newState) => ({

  //   type: types.REPLACE_STATE,
  //   payload: newState,
  // }),
};

export const initialDeckState = {};

// export const initialDeckState = {
//   'Initial Deck': {
//       title: 'Initial Deck',
//       cards: [
//           {question: "Your question 1", answer: "Your answer 1"},
//           {question: "Your question 2", answer: "Your answer 2"}
//       ],
//       imgId: "sky"
//     },
//     'React': {
//         title: 'React',
//         cards: [
//           {
//             question: 'What is React?',
//             answer: 'A library for managing user interfaces'
//           },
//           {
//             question: 'Where do you make Ajax requests in React?',
//             answer: 'The componentDidMount lifecycle event'
//           }
//         ],
//         imgId: "rock"
//       }
//   }

export function DeckStateReducer(state, action) {
  switch (action.type) {
    case types.ADD_DECK: {
      const { title, newImgId } = action.payload;
      return {
        ...state,
        [title]: {
          title: title,
          cards: [],
          imgId: newImgId,
        },
      };
    }
    case types.ADD_CARD: {
      const { key, newCard } = action.payload;
      return {
        ...state,
        [key]: {
          ...state[key],
          cards: [...state[key].cards, newCard],
        },
      };
    }
    case types.REMOVE_DECK: {
      const { key } = action.payload;
      let newState = { ...state };
      console.log("REMOVE_DECK: state before deck deletion =");
      console.log("REMOVE_DECK: Deck key to delet = " + key);
      delete newState[key];
      console.log("REMOVE_DECK: state after deck deletion will be =");
      console.log(newState);
      return {
        ...newState,
      };
    }
    case types.REPLACE_STATE: {
      const newState = action.payload;
      console.log("In DeckStateReducer: newState =");
      console.log(newState);
      return {
        ...newState,
      };
    }
    default: {
      return state;
    }
  }
}
