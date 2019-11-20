import React from 'react'
import {View,StyleSheet,Text,FlatList,TouchableOpacity,Image,Alert,ImageBackground,Button,} from 'react-native';
import {  ScrollView } from 'react-native-gesture-handler';
import firebase from '../firebase'
import '@firebase/firestore'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import '@firebase/firestore';
import { Textarea,CardItem} from 'native-base';
import { TextInput } from 'react-native-paper';
import DatePicker from 'react-native-datepicker'
import SwipeView from 'react-native-swipeview';
import Dialog from "react-native-dialog";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const db = firebase.firestore()



class HomeScreen extends React.Component {
  
constructor(props) {
  super(props)
    this.state = {
    list: [],
    isLoading: "false",
    date:"01-01-2019",
    refreshing: false,
   
  }

}

componentDidMount() {
  this.makeRequest();
}
makeRequest = () => {
  list=[];
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
      isLoading: "true",
      refreshing: false

    })
 
     
    
   }).catch(err => {
     console.log('Error getting documents', error);
    
   });
      } 
     
      handleRefresh = () => {
        this.setState({
          refreshing: true,
        }, () => {
          this.makeRequest();
        })
      }
  render() {
    return(   
      <ImageBackground source={require('../assets/images/arriere-plan.jpg')} style={{width: '100%', height: '100%'}}>
       <View><Image  style={{width:60,height:50,marginTop:5,marginLeft:5}}
          source={require('../assets/images/images.png')}/></View>
    <View  style={styles.container}>

    <View style={styles.titre}><Text style={styles.texttire}>Choisir un modèle</Text></View>
  
    
      <View  style={styles.containerf}>
    <FlatList
            data={this.state.list}
            showsVerticalScrollIndicator
            renderItem={({ item }) => { return(
              <TouchableOpacity 
              onPress={() => this.props.navigation.navigate('Modeles',{'data':item.nomM,'data0':item.labelM,'data1':item.typeM,'data2':item.dateM})}>
            <Text style={{textAlign:'center',fontWeight: 'bold',marginTop:7,fontSize:20,color:'#797D7F'}}>{item.nomM} créer le : {item.dateM}</Text>
             </TouchableOpacity>
            ) }}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <Text style={{textAlign:'center'}}>___________</Text>}
            refreshing= {this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
          </View>
  </View>
     </ImageBackground>    
     )}}
     
    
     const ref = firebase.firestore().collection('Rapport');
    
    
class Mon_modele extends React.Component{
  state = {
    imageL: null
   
  };

constructor(props){
  super(props)
  this.state = {
  listR: [],
Description:"",
nomR:"",
imageL:"",
dateClient:""
}
}


componentDidMount() {
  this.getPermissionAsync();
  console.log('hi');
}

getPermissionAsync = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }
}


_pickImageL = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1
  });

  console.log(result);

  if (!result.cancelled) {
    this.setState({ imageL: result.uri });
   
  }
};
uploadImage = async (uri, imageName) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  var ref = firebase.storage().ref().child("images/" + imageName);
  return ref.put(blob);
}

_pickImageC = async () => {
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1
  });

  console.log(result);

  if (!result.cancelled) {
    this.setState({ imageL: result.uri });

  }
};

addRapport(type) {

  if ((this.state.Description=="")||(this.state.nomR=="")||(this.state.dateClient=="")||(this.state.imageL==""))
  {return Alert.alert(
    'Champ invalide',
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
    if (type=='text'){
    ref.add({
      Fragment:this.state.Description,
      NomRapport:this.state.nomR,
      Titre:this.props.navigation.state.params.data0,
      type:"texte"
     });}
    

    if (type=='date'){
      ref.add({
        Fragment:this.state.dateClient,
        NomRapport:this.state.nomR,
        Titre:this.props.navigation.state.params.data0,
        type:"texte"
       
      });}
      if (type=='image'){
        ref.add({
          Fragment:this.state.imageL,
          NomRapport:this.state.nomR,
          Titre:this.props.navigation.state.params.data0,
          type:"image"
         
        });
        
          this.uploadImage(this.state.imageL, "test-image")
          }
        }
    return(Alert.alert('ajout avec success'))}

 cond(type) {
      if (type=='text'){
        return <Textarea style={{borderWidth:2,borderColor:'#566573',marginLeft:5,marginRight:5,height:180,backgroundColor:'#E5E7E9',marginTop:5}} 
        placeholder='Saisie votre description'  returnKeyLabel = {"next"}
        onChangeText={(text) => this.setState({Description:text})} />
      }
else if (type=='date'){
  return <View style={{marginTop:40,margin:50}}><DatePicker
  style={{width:250}}
  date={this.state.dateClient}
  mode="date"
  placeholder="select date"
  format="DD-MM-YYYY"
  minDate="01-01-1970"
  maxDate="01-12-2050"
  confirmBtnText="Confirm"
  cancelBtnText="Cancel"
  customStyles={{
    dateIcon: {
      position: 'absolute',
      left: 0,
      top: 4,
      marginLeft: 0
    },
    dateInput: {
      marginLeft: 36
    }
  }}
  returnKeyLabel = {"next"}
  onDateChange={(date) => {this.setState({dateClient:date})}}
/></View>}

else if (type=='image') {
  let { imageL } = this.state;
  return (<View>{(imageL) &&
<CardItem cardBody style={{marginHorizontal:30}}><Image source={{ uri: imageL}} style={{ width:100, height: 130,flex:1}}/></CardItem>}
<View style={{marginTop:2,marginHorizontal:30}}><Button title='Prendre photo' onPress={this._pickImageC}></Button></View>
<View style={{marginTop:2,marginHorizontal:30}}><Button title='Choisir depuis la galerie' onPress={this._pickImageL}></Button></View></View>)}
              
else if (type=='signature'){
  return
}}

 render() {
    const type=this.props.navigation.state.params.data1;
    const label=this.props.navigation.state.params.data0;
    
    return (
      <ImageBackground source={require('../assets/images/arriere-plan.jpg')} style={{width: '100%', height: '100%'}}>
        <View><Image  style={{width:60,height:50,marginTop:5,marginLeft:5}}
          source={require('../assets/images/images.png')}/></View>
          <View style={{marginTop:9}}><Text style={{textAlign:'center',fontSize:30,fontWeight:'bold'}}>Ajouter votre rapport</Text></View>
      <View style={{justifyContent:'center'}}>
        
       <View style={{marginTop:9,marginLeft:5}}><Text style={{fontWeight:'bold'}}>Nom De Rapport</Text></View> 
      
       <View style={{marginTop:5}}><TextInput style={{borderWidth:2,borderColor:'#566573',marginLeft:5,marginRight:5}} returnKeyLabel = {"next"} placeholder='Saisie le nom ici'
        onChangeText={(text) => this.setState({nomR:text})} ></TextInput></View>
       <View style={{marginLeft:5,marginTop:5}}><Text style={{fontWeight:'bold'}}>{label}</Text></View> 
     <View>{this.cond(type)}</View>
     <View style={{marginTop:10,marginLeft:5,marginRight:5}}>
     <Button title='Enregistrer' onPress={() => this.addRapport(type)}></Button>
     <View style={{marginTop:2}}><Button title='Liste de rapport' onPress={() => this.props.navigation.navigate('Rapport')}></Button></View>
     </View>
  </View>
  </ImageBackground>
    );
  }
}


class AffRapport extends React.Component{
  constructor(props) {
    super(props)
      this.state = {
      isLoading: "false",
      listR: [],
     }
  }
 
  state = {
    dialogVisible: false,
    itemid:null,
    itemtype:null,
    
  };

  _pickImageL = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
  
    console.log(result);
  
    if (!result.cancelled) {
      this.setState({ imageL: result.uri, 
        fragR: result.uri });
     
    }
  };
  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
  
    var ref = firebase.storage().ref().child("images/" + imageName);
    return ref.put(blob);
  }
  
  _pickImageC = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
  
    console.log(result);
  
    if (!result.cancelled) {
      this.setState({ imageL: result.uri,
      fragR: result.uri});
  
    }
  };
  showDialog(idt,nom,titre,frg,typef){
    this.setState({ dialogVisible: true,
    itemid:idt,
    titrR:titre,
    nomR:nom,
    fragR:frg,
  itemtype:typef });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  handleModif(y){
   return ( db.collection('Rapport').doc(y).update({
      NomRapport:this.state.nomR,
      Titre: this.state.titrR,
      Fragment :this.state.fragR}), 
    this.setState({ dialogVisible: false }),
    alert('Champs modifier avec succes')
    )}
    
  
  supp(x){
 return (db.collection('Rapport').doc(x).delete()+alert('Rapport supprimé'));
  }

  componentDidMount() {
    const listR=[];
    let citiesRef = db.collection('Rapport');
    let allModele = citiesRef.get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }  
   
        snapshot.forEach(doc => {
         const {Fragment,NomRapport,Titre,type} = doc.data();
         id=doc.id;
         listR.push({
           id,
           Fragment ,
           NomRapport,
           Titre,
           type

          
         });
     
        });
       
      this.setState({
         listRa:listR,
         isLoading: "true",
        })
         
         
    
        
       
      }).catch(err => {
        console.log('Error getting documents', err);
       
      });
         } 
         submit(inputText){
          console.log(inputText);
          this.setState({isAlertVisible:false})
        }
     
        condFragment(type,z) {
          if (type=='image'){
          return <Image source={{ uri:z }} style={{ borderWidth:1,borderRadius:10,width: 200, height: 200,flex: 1}}/>
          }
         else{
          return <Text style={{backgroundColor: 'whitesmoke',padding: 5,textAlign:'center'}}>{z}</Text>
          }}

 condUpdate(type,frg,nomr,titrer,idr) {
            if (type=='image'){
            return (<View><Dialog.Container visible={this.state.dialogVisible}>
            <Dialog.Title style={{}}>Pour modifier vos données</Dialog.Title>
            <Text>Nouveau Nom</Text>
            <Dialog.Input defaultValue={nomr} returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({nomR:text})}/>
           <Text>Nouveau Titre</Text>
            <Dialog.Input defaultValue={titrer} returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({titrR:text})}/>
           <Text>Nouveau Fragment</Text>
           <View>
           <Dialog.Button label="Prendre une photo" onPress={this._pickImageC}></Dialog.Button>
            <Dialog.Button label="Choisir depuis la galerie "  onPress={this._pickImageL}></Dialog.Button></View>
            <Dialog.Button label="Cancel" onPress={this.handleCancel} />
            <Dialog.Button label="Modifier" onPress={() => this.handleModif(idr)} />
          </Dialog.Container></View>)}   
          else{
            return(<View><Dialog.Container visible={this.state.dialogVisible}>
            <Dialog.Title style={{}}>Pour modifier vos données</Dialog.Title>
            <Text>Nouveau Nom</Text>
            <Dialog.Input defaultValue={nomr} returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({nomR:text})}/>
           <Text>Nouveau Titre</Text>
            <Dialog.Input defaultValue={titrer} returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({titrR:text})}/>
           <Text>Nouveau Fragment</Text>
           <Dialog.Input defaultValue={frg} returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({fragR:text})}/>
            <Dialog.Button label="Cancel" onPress={this.handleCancel} />
            <Dialog.Button label="Modifier" onPress={() => this.handleModif(idr)} />
          </Dialog.Container></View>)}}
  render(){
    
    return(
      <ImageBackground source={require('../assets/images/arriere-plan.jpg')} style={{width: '100%', height: '100%'}}>
  <View><View><Image  style={{width:60,height:50,marginTop:5,marginLeft:5}}
          source={require('../assets/images/images.png')}/><Text style={{textAlign:'center',fontWeight:'bold',fontSize:20}}>Liste de rapport</Text></View>
    <View>
    <FlatList
        data={this.state.listRa}
        renderItem={({ item }) => { return(
          <ScrollView>
    <SwipeView            
        disableSwipeToRight = {false}
        renderVisibleContent={() => 
         
            <View style={{borderWidth:3,borderColor:'black',marginTop:10,marginRight:30,marginLeft:30,borderRadius:10}}>
             <Text style={{textAlign:'center'}} >{item.NomRapport}</Text>
        <Text style={{textAlign:'center'}}>{item.Titre}</Text>
        <View style={{alignItems:'center'}}>{this.condFragment(item.type,item.Fragment)}</View>
            
    </View> }
renderRightView={() => (
            <View style={{}}></View> )}
        leftOpenValue = {this.leftOpenValue}
        rightOpenValue = {this.rightOpenValue}
        onSwipedLeft={() => this.supp(item.id)}
        swipeDuration = {300}
        swipeToOpenPercent = {40}
        disableSwipeToRight = {true}/>
         <View style={{marginLeft:50,marginRight:50,marginTop:2}}><TouchableOpacity onPress={() => this.showDialog(item.id,item.NomRapport,item.Titre,item.Fragment,item.type)}>
          <Text style={{textAlign:'center',padding:3,fontWeight:'bold',color:'#66CC00'}}>Clique pour Modifier</Text>
        </TouchableOpacity></View></ScrollView>)}}
 keyExtractor={item => item.id}/>
     <View>{this.condUpdate(this.state.itemtype,this.state.fragR,this.state.nomR,this.state.titrR,this.state.itemid)}</View>
     </View></View></ImageBackground> )}}



const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Modeles: Mon_modele,
    Rapport:AffRapport
  },
  {
    initialRouteName: 'Home',
  }
);
const AppContainer = createAppContainer(RootStack);

export default class Rapport extends React.Component{
  render() {
    return <AppContainer />;
  }
}




  
      const styles = StyleSheet.create({
  container: {
   
    justifyContent: 'center',
    height:400,
    marginTop:30,
    margin:20,
    borderWidth: 6,
    borderRadius:20,
    borderColor:'black'
  },
  
  titre:{
   borderBottomWidth:6,
   
  },
  texttire:{
textAlign:"center",
fontSize:25,
fontWeight: 'bold'
  },
  countContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  containerf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
 })
 