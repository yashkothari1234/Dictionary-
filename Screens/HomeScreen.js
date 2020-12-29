
import {Text,View,StyleSheet,TextInput,TouchableOpacity, Image,} from 'react-native';
import Header from '../assets/Header'
import React from 'react';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
isSearchPressed : false,
word : "",
lexicalCategory : '',
examples : [],
definition : ""
    };
  }
getWord=(word)=>{
var searchKeyWord = word.toLowerCase();
var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyWord +".json"

return fetch(url)

.then((data)=>{
    if(data.status ===200){
return data.json()
    }
    else{
        return null
    }
})

.then((response)=>{
var responseObject = response
if(responseObject){
    var wordData =  responseObject.definitions[0]

    var definition = wordData.description
    var lexicalCategory = wordData.wordtype

    this.setState({
        "definition" : definition,
        "word" : this.state.text,
        "lexicalCategory" : lexicalCategory
    })
}

else {
    this.setState({
        "word" :this.state.text,
        "definition" : "Not Found",
    })
}
})
}


  render() {
    return (
        
    <View>
<Header/>
<View style ={styles.container}>
<Text style = {styles.buttonText}>
Word : {""}
</Text>

<Text style = {styles.buttonText}>
{this.state.text}
</Text>
</View>

<View style ={styles.container}>
<Text style = {styles.buttonText}>
Type :{""}
</Text>

<Text style = {styles.buttonText}>
{this.state.lexicalCategory}
</Text>
</View>

<View style ={styles.container}>
<Text style = {styles.buttonText}>
Definition :{""}
</Text>

<Text style = {styles.buttonText}>
{this.state.definition}
</Text>
</View>


        <TextInput
          style={styles.inputBox}
          onChangeText={text => {
            this.setState(
            { text: text,
               isSearchPressed : false,
               word : "Loading",
               lexicalCategory : '',
               examples :[],
               defination : ""                     
            
            
            });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
           this.setState({isSearchPressed : true });
           this.getWord(this.state.text);
          }}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 2,
    outline: 'none',
    fontFamily : 'TimesNewRoman',
    fontWeight :20,
    fontSize :20
  },
  searchButton: {
    width: '50%',
    height: 45,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  borderWidth : 2,
  borderRadius :20
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily : 'TimesNewRoman'
  },



});