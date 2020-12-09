import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';

InputField.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

InputField.defaultProps = {
  placeholder: '',
};

export default function InputField(props){

  const [text, setText] = useState('');

  const handleChangeText = text => {
    const { onChange } = props;
    setText( text );

    //if (!text) return;
    if(onChange){
      onChange(text);
    } 
  };

  const handleSubmitEditing = () => {
    const { onSubmit } = props;

    //if (!text) return;
    if(onSubmit){
      onSubmit(text);
    }  
    setText('');
  };

  const { placeholder } = props;

  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        value={text}
        placeholder={placeholder ? placeholder : 'Enter Text'}
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
        style={styles.textInput}
        clearButtonMode="always"
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmitEditing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    //marginTop: 20,
    //backgroundColor: '#666',
    backgroundColor: 'rgba(200,200,200,0.6)',
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: 'white',
  },
});