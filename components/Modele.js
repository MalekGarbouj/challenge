
import React from 'react'
import {TextInput,Alert,ImageBackground,Image,Button,Text } from 'react-native'
import '@firebase/firestore'
import firebase from '../firebase'
import { View,} from 'native-base'

const ref = firebase.firestore().collection('Modele');
const db = firebase.firestore();
export default class Modele extends React.Component{  
  constructor(props) {
    super(props)
      this.state = {
      date:"01-01-2019",
      list: [],
    isLoading: "false",
     }
  }

  date(){
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear();  
  
    var Daate=date + '-' + month + '-' + year;
    return (Daate)
   }
  addModele() {
    if (!((this.state.type=="text")||(this.state.type=="image")||(this.state.type=="date")||(this.state.type=="signature")))
    {return Alert.alert(
      'type invalide',
      'text-image-date-signature',
      [
        
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );}
    
  else {
      ref.add({
      nomM:this.state.nom,
      labelM:this.state.label,
      typeM:this.state.type,
      dateM:this.date()
      })

 let citiesRef = db.collection('Modele');
 let allModele = citiesRef.get()
   .then(snapshot => {
     if (snapshot.empty) {
       console.log('No matching documents.');
       return;
     }  

     snapshot.forEach(doc => {
      const { nomM,labelM,typeM,dateM } = doc.data();
      const x= doc.data();
      list.push({
        nomM,
        labelM,
        typeM,
        dateM
       
      });
  
     });
     this.setState({
      list:list,
      isLoading: "true"
    })
 
     
    
   }).catch(err => {
     console.log('Error getting documents', error);
    
   });
    return Alert.alert('ajout avec succes');
    }
    
  }

  render() {
    return(
      <ImageBackground source={require('../assets/images/arriere-plan.jpg')} style={{width: '100%', height: '100%'}}>
         <View><Image  style={{width:60,height:50,marginTop:5,marginLeft:5}}
          source={require('../assets/images/images.png')}/></View>
          <View style={{marginTop:16}}><Text style={{textAlign:'center',fontSize:30,fontWeight:'bold'}}>Ajouter votre modèle</Text></View>
      <View>
        <View style={{marginTop:60}}>
        <TextInput style={{borderWidth:3,borderColor:'black',height:50,marginLeft:10,marginRight:10,textAlign:'center',marginTop:10,borderRadius:10,backgroundColor:'white'}}
         placeholder='Saisie un nom' returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({nom:text})}></TextInput>
      <TextInput style={{borderWidth:3,borderColor:'black',height:50,marginLeft:10,marginRight:10,textAlign:'center',marginTop:10,borderRadius:10,backgroundColor:'white'}} 
      placeholder='Saisie un label'  returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({label:text})}></TextInput>
      <TextInput style={{borderWidth:3,borderColor:'black',height:50,marginLeft:10,marginRight:10,textAlign:'center',marginTop:10,borderRadius:10,backgroundColor:'white'}}
       placeholder='Saisie un type'  returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({type:text})}></TextInput>
         </View>
         <View style={{marginTop:100,marginLeft:10,marginRight:10}}><Button title='Enregistrer'  onPress={() => this.addModele()}></Button></View>
    </View>
    </ImageBackground>  
    )
  }
}
