
import React from 'react'
import {Image,Button,Text,StyleSheet,Alert} from 'react-native'
import '@firebase/firestore'
import firebase from '../firebase'
import { View} from 'native-base'
import {Input} from 'react-native-elements'

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
    return(<View>
       <View><Image  style={{width:40,height:40,marginTop:4,marginLeft:4}}
          source={require('../assets/images/images.png')}/></View>
           <View style={{alignContent:'center',justifyContent:'center'}}>
          <View style={styles.titre}><Text style={styles.texttire}>Ajouter un modèle</Text></View>
        <View style={{marginTop:100}}>
        <Input style={{height:50,marginLeft:30,marginRight:30,textAlign:'center'}}
         placeholder='Saisie un nom' returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({nom:text})}/>
      <Input style={{height:50,marginLeft:30,marginRight:30,textAlign:'center'}} 
      placeholder='Saisie un label'  returnKeyLabel = {"next"}
          onChangeText={(text) =>this.setState({label:text})}/>
           <Input style={{height:50,marginLeft:30,marginRight:30,textAlign:'center'}} 
      placeholder='Saisie un type'  returnKeyLabel = {"next"}
          onChangeText={(text) =>this.setState({type:text})}/></View>
   <View style={{marginTop:100,marginLeft:10,marginRight:10}}><Button title='Enregistrer'  onPress={() => this.addModele()}></Button></View>
    </View>
    </View>
    )
  }
}


const styles = StyleSheet.create({
 titre:{
   borderBottomWidth:3,
   backgroundColor:'#B8F436',
   color:'black',
   borderColor:'white',
   borderRadius:15
  },
  texttire:{
fontSize:18,
fontWeight: 'bold',
marginLeft:10
  },
 })
 