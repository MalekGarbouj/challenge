import React from 'react'
import {View,StyleSheet,Text,FlatList,TouchableOpacity,Image,Button,ToastAndroid} from 'react-native';
import firebase from '../firebase'
import '@firebase/firestore'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import '@firebase/firestore';
import { Textarea,CardItem,Icon} from 'native-base';
import {Input} from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import Dialog from "react-native-dialog";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Signature from 'react-native-signature-canvas';
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
    return( <View>
      <View><Image  style={{width:40,height:40,marginTop:4,marginLeft:4}}
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
           <View style={{flexDirection:'row'}}><Icon name='paper'/><Text style={{fontWeight:'bold',fontSize:12,color:'black',textAlign:'center'}}>  {item.nomM}</Text></View>
            <Text style={{fontWeight:'bold',fontSize:12,color:'#797D7F',textAlign:'center'}}>{item.dateM}</Text>
             </TouchableOpacity>
            ) }}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <Text style={{textAlign:'center'}}></Text>}
            refreshing= {this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
          </View>
  </View></View>    
     )}}
     
    
     const ref = firebase.firestore().collection('Rapport');
     const style = `.m-signature-pad--footer
     .button {
       background-color: red;
       color: #FFF;
     }`;
    
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
dateClient:"",
signature: null,
date:"01-01-2019" 
}
}
handleSignature = signature => {
  this.setState({ signature });
};

date(){
  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear();  

  var Daate=date + '-' + month + '-' + year;
  return (Daate)
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


    if (type=='text'){
    ref.add({
      Fragment:this.state.Description,
      NomRapport:this.state.nomR,
      Titre:this.props.navigation.state.params.data0,
      type:"texte",
      dateR:this.date()
     });}
    

    if (type=='date'){
      ref.add({
        Fragment:this.state.dateClient,
        NomRapport:this.state.nomR,
        Titre:this.props.navigation.state.params.data0,
        type:"texte",
        dateR:this.date()
       
      });}
      if (type=='image'){
        ref.add({
          Fragment:this.state.imageL,
          NomRapport:this.state.nomR,
          Titre:this.props.navigation.state.params.data0,
          type:"image",
          dateR:this.date()
         });
        
          this.uploadImage(this.state.imageL, "test-image")
          }
          if (type=='signature'){
            ref.add({
              Fragment:this.state.signature,
              NomRapport:this.state.nomR,
              Titre:this.props.navigation.state.params.data0,
              type:"image",
              dateR:this.date()
             }); }
             ToastAndroid.show('Rapport ajout avec succès ', ToastAndroid.SHORT);

        }
    

 cond(type){
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
  onDateChange={(date) => {this.setState({dateClient:date})}}/></View>}

else if (type=='image'){
  let { imageL } = this.state.imageL;
  return(<View style={{alignItems: 'center',marginTop:130}}>
<View>{imageL && <CardItem style={{height:20,width:20}}><Image source={{uri:imageL }}/></CardItem>}</View>
<View><Button title='Prendre photo' onPress={this._pickImageC}/></View>
<View style={{marginTop:5}}><Button title='Choisir depuis la galerie' onPress={this._pickImageL}/></View></View>)}
              
else if (type=='signature'){
  return ( <View style={{height:250,width:300}}>
    <View style={styles.preview}>
      {this.state.signature ? (
        <Image
          resizeMode={"contain"}
          style={{ width: 300, height: 300 }}
          source={{ uri: this.state.signature }}/>
      ) : null}
    </View>
    <Signature
      onOK={this.handleSignature}
      descriptionText="Sign"
      clearText="Clear"
      confirmText="Save"
      webStyle={style}/>
  </View> )
}}

 render() {
    const type=this.props.navigation.state.params.data1;
    const label=this.props.navigation.state.params.data0;
    
    return (
     <View>
        <View><Image  style={{width:40,height:40,marginTop:4,marginLeft:4}}
          source={require('../assets/images/images.png')}/></View>
         <View style={styles.titre}><Text style={styles.texttire}>Ajouter votre rapport</Text></View>
     <View>
        <View><Text style={{fontWeight:'bold',marginLeft:5,marginTop:20}}>Nom De Rapport</Text></View> 
      <View style={{marginTop:20}}><Input style={{marginLeft:5,marginRight:5,marginTop:20}} returnKeyLabel = {"next"} placeholder='Saisie le nom ici'
        onChangeText={(text) => this.setState({nomR:text})}/></View>
     <View style={{marginLeft:5,marginTop:5}}><Text style={{fontWeight:'bold'}}>{label}</Text></View> 
     <View>{this.cond(type)}</View>
     <View style={{flexDirection:'row',flex: 1, position: "absolute",  left: 0, right: 0, justifyContent:'space-between',marginTop:400}}><Button title='Enregistrer' onPress={() => this.addRapport(type)}></Button>
     <Button title='Liste de rapport' onPress={() => this.props.navigation.navigate('Rapport')}></Button></View>
  </View></View>
  
    );
  }
}


class AffRapport extends React.Component{
  constructor(props) {
    super(props)
      this.state = {
      isLoading: "false",
      listR: [],
      }}
 
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
         const {Fragment,NomRapport,Titre,type,dateR} = doc.data();
         id=doc.id;
         listR.push({
           id,
           Fragment ,
           NomRapport,
           Titre,
           type,
           dateR
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
        
       render(){
    return( <View>
      <View><Image  style={{width:40,height:40,marginTop:4,marginLeft:4}}
          source={require('../assets/images/images.png')}/></View>
    <View  style={styles.container}>

    <View style={styles.titre}><Text style={styles.texttire}>Liste de rapport</Text></View>
  
    
      <View  style={styles.containerf}>
    <FlatList
            data={this.state.listRa}
            showsVerticalScrollIndicator
            renderItem={({ item }) => { return(
              <TouchableOpacity 
              onPress={() => this.props.navigation.navigate('ListRap',{'data':item.NomRapport,'data0':item.Titre,'data1':item.Fragment,'data2':item.type,'data3':item.id})}>
          <View style={{flexDirection:'row'}}><Icon name='paper'/><Text style={{fontWeight:'bold',fontSize:12,color:'black',textAlign:'center'}}>  {item.NomRapport}</Text></View>
            <Text style={{fontWeight:'bold',fontSize:12,color:'#797D7F',textAlign:'center'}}>{item.dateR}</Text>
             </TouchableOpacity>
            ) }}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <Text style={{textAlign:'center'}}></Text>}
            refreshing= {this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
          </View>
  </View></View>    
     ) }}



class ListeRapport extends React.Component{
  state = {
    imageL: null
   };

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
         const {Fragment,NomRapport,Titre,type,dateR} = doc.data();
         id=doc.id;
         listR.push({
           id,
           Fragment ,
           NomRapport,
           Titre,
           type,
           dateR
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
      
        submit(inputText){
          console.log(inputText);
          this.setState({isAlertVisible:false})
        }
      

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

condUpdate(type,frg,nomr,titrer,idr) {
    if (type=='image'){
    return(<View><Dialog.Container visible={this.state.dialogVisible}>
    <Dialog.Title style={{}}>Pour modifier vos données</Dialog.Title>
    <Text>Nouveau Nom</Text>
    <Dialog.Input defaultValue={nomr} returnKeyLabel = {"next"}
  onChangeText={(text) => this.setState({nomR:text})}/>
   <Text>Nouveau Titre</Text>
    <Dialog.Input defaultValue={titrer} returnKeyLabel = {"next"}
  onChangeText={(text) => this.setState({titrR:text})}/>
   <Text>Nouveau Fragment</Text>
   <View><Dialog.Button label="Prendre une photo" onPress={this._pickImageC}></Dialog.Button>
    <Dialog.Button label="Choisir depuis la galerie "  onPress={this._pickImageL}></Dialog.Button></View>
    <Dialog.Button label="Cancel" onPress={this.handleCancel} />
    <Dialog.Button label="Modifier" onPress={() => this.handleModif(idr)}/></Dialog.Container></View>)}   
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

  supp(x){
    return (db.collection('Rapport').doc(x).delete()+alert('Rapport supprimé'));
     }
   

  showDialog(idt,nom,titre,frg,typef){
    this.setState({ dialogVisible: true,
    itemid:idt,
    titrR:titre,
    nomR:nom,
    fragR:frg,
  itemtype:typef });
  };
  
  condFragment(type,z) {
    if (type=='image'){
    return<Image source={{ uri:z }} style={{ borderWidth:1,borderRadius:10,width: 200, height: 200,flex: 1}}/>
    }
   else{
    return <Text style={{backgroundColor: 'whitesmoke',padding: 5,textAlign:'center'}}>{z}</Text>
    }}
 
    render(){
    const nomRap = this.props.navigation.state.params.data;
    const titreRap = this.props.navigation.state.params.data0;
    const fragRap = this.props.navigation.state.params.data1;
    const typeRap = this.props.navigation.state.params.data2;
    const idRap = this.props.navigation.state.params.data3;
  return(
    <View style={{flex:1}}>
      <View style={styles.titre}><Text style={styles.texttire}>Nom de Rapport</Text></View>
    <Text style={{textAlign:'center',fontWeight: 'bold',marginTop:15,fontSize:30,marginBottom:15}}>{nomRap}</Text>
    <View style={styles.titre}><Text style={styles.texttire}>Titre de Rapport</Text></View>
    <Text style={{marginLeft:5,fontWeight: 'bold',marginTop:15,fontSize:20,marginBottom:15,textAlign:'center'}}>{titreRap}</Text>
    <View style={styles.titre}><Text style={styles.texttire}>Votre Fragment</Text></View>
    <View style={{alignItems:'center',height:200,widht:200,marginTop:30}}>{this.condFragment(typeRap,fragRap)}</View>
    <View style={{flexDirection:"row" ,marginTop:20}}><TouchableOpacity onPress={() => this.showDialog(idRap,nomRap,titreRap,fragRap,typeRap)}><Text style={{fontSize:20,marginLeft:10,borderWidth:1,borderRadius:10}}>Modifier</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => this.supp(idRap)}><Text style={{borderRadius:10,fontSize:20,marginLeft:170,borderWidth:1}}>Supprimer</Text></TouchableOpacity></View>
    <View>{this.condUpdate(this.state.itemtype,this.state.fragR,this.state.nomR,this.state.titrR,this.state.itemid)}</View>
    </View>
  )
}
}
const RootStack = createStackNavigator(
  { 
    Home: HomeScreen,
    Modeles: Mon_modele,
    Rapport:AffRapport,
    ListRap:ListeRapport,

  },
  {
    initialRouteName: 'Home',
  }
);
const AppContainer = createAppContainer(RootStack);

export default class Rapport extends React.Component{
 render() {
    return <AppContainer/>;
  }
}
 const styles = StyleSheet.create({
  container: {
  height:500,
  },
  
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
  countContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
    },
  containerf: {
    flex: 1,
marginLeft:15,
marginTop:10
  },
  preview: {
    width: 300,
    height: 100,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    
  },
  previewText: {
    color: "#FFF",
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#69B2FF",
    width: 120,
    textAlign: "center",
   
  }
 })
 