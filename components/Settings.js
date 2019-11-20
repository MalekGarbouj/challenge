import React from 'react';
import { View,ImageBackground,Text } from 'react-native';

export default class Settings extends React.Component {

render(){
return( <ImageBackground source={require('../assets/images/images.png')} style={{width: '100%', height: '100%'}}>
<View><Text>Com&Dev</Text> 
<Text>Tel(Fr)       +33 6 27 13 01 99</Text>
<Text>Tel(Tn)      +216  21 23 15 19</Text>
<Text>Site           www.altagem.com</Text> 
<Text>               www.com-and-dev.com</Text></View>
    <View style={{marginTop:300}}><Text numberOfLines={6} style={{textAlign:'center',fontWeight:'bold'}}>
Com&Dev est une société d’ingénierie logicielle spécialisée dans le développement des solutions personnalisées,la création des sites web et des chartes graphiques ainsi que le référencement naturel.</Text></View>
    </ImageBackground>
)
}}

