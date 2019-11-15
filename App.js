import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  ImageBackground,
  Modal,
  TouchableHighlight,
  Alert,
  Picker,
  DeviceEventEmitter,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from 'react-native-vector-icons/Ionicons';
import { Button, ThemeProvider, Image, Input, Overlay, ListItem, Card } from 'react-native-elements';
import AppIntroSlider from 'react-native-app-intro-slider';
import ValidationComponent from 'react-native-form-validator/index';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';
var PushNotification = require("react-native-push-notification");
import BackgroundFetch from "react-native-background-fetch";
 
 

let MyHeadlessTask = async () => {

AsyncStorage.getItem("payntuser").then(value => {
                 
return fetch("https://paynt.p.rapidapi.com/notifications/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "user": value,
  }),
}).then((response) => response.json())
    .then((dataJson) => {
      if(dataJson.push === true){
      PushNotification.localNotification({
    /* Android Only Properties */
    // ticker: "My Notification Ticker", // (optional)
    autoCancel: true, // (optional) default: true
    largeIcon: "notif", // (optional) default: "ic_launcher"
    smallIcon: "logo", // (optional) default: "ic_notification" with fallback for "ic_launcher"
    bigText: dataJson.bigText, // (optional) default: "message" prop
    vibrate: true, // (optional) default: true
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    group: "group", // (optional) add group to message
    ongoing: false, // (optional) set whether this is an "ongoing" notification
    priority: "high", // (optional) set notification priority, default: high
    visibility: "private", // (optional) set notification visibility, default: private
    importance: "high", // (optional) set notification importance, default: high
    data: dataJson,
    /* iOS and Android properties */
    title: dataJson.title, // (optional)
    message: dataJson.message, // (required)
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    // actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
});
    }else{

    }

    })
    .catch((error) => {
     
  }); 
  BackgroundFetch.finish();


            
            });


}

BackgroundFetch.configure({
      minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
      stopOnTerminate: false,   // <-- Android-only,
      startOnBoot: true ,
      enableHeadless: true        // <-- Android-only
    }, MyHeadlessTask);
BackgroundFetch.registerHeadlessTask(MyHeadlessTask);


const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom:0,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e1e2e3',
    color: '#4682B4',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#F5FCFF',
    marginBottom: 5,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 320,
  },

});



const theme = {

  Button: {
    raised: true,
    marginTop: 20,
  },

};

const image = "./home.jpg";

const slides = [
  {
    key: 'somethun',
    title: '',
    text: 'Paynt is a 21st century fintech solution that has come to make online payments much more easier.',
    image: require('./logo.png'),
    backgroundColor: '#e1e2e3',
    titleStyle: {color: 'rgba(0,51,82,1)', fontWeight: 'bold'},
    textStyle: {color: 'rgba(0,51,82,1)', fontWeight: 'bold', textAlign: 'left'},
    imageStyle: {width: 150, height: 150, },
  },
  {
    key: 'som1',
    title: 'Airtime and Data',
    text: 'Buy airtime and data at a very cheap rate.',
    image: require('./e-recharge.png'),
    backgroundColor: '#e1e2e3',
    titleStyle: {color: 'rgba(0,51,82,1)', fontWeight: 'bold'},
    textStyle: {color: 'rgba(0,51,82,1)', fontWeight: 'bold', textAlign: 'left'},
    imageStyle: {width: 200, height: 200},
  },
  {
    key: 'somethun-dos',
    title: 'Pay Utiltity Bills',
    text: 'Coming soon...',
    image: require('./soon.png'),
    backgroundColor: '#e1e2e3',
    titleStyle: {color: 'rgba(0,51,82,1)', fontWeight: 'bold'},
    textStyle: {color: 'rgba(0,51,82,1)', fontWeight: 'bold', textAlign: 'left'},
    imageStyle: {width: 200, height: 200},
  }
];


const list = [
  
  {
    title: 'Check Balance',
    icon: 'account-balance-wallet',
    function: 'balance',
    subtitle: '',
    color: 'rgba(0,51,82,1)',
  },
  {
    title: 'Load Account',
    icon: 'monetization-on',
    function: 'money',
    subtitle: '',
    color: 'rgba(0,51,82,1)',
  },
  {
    title: 'Live Support',
    icon: 'message',
    function: 'support',
    subtitle: '',
    color: 'rgba(0,51,82,1)',
  },
  {
    title: 'Change PIN',
    icon: 'lock',
    function: 'change',
    subtitle: '',
    color: 'rgba(0,51,82,1)',
  },
  {
    title: 'Sign Out',
    icon: 'exit-to-app',
    function: 'logout',
    subtitle: '',
    color: 'rgba(0,51,82,1)',
  },
  
  
];

class SplashScreen extends React.Component {
  render() {
    const viewStyles = [
      styles.container,
      { backgroundColor: '#e1e2e3', marginTop: 0, justifyContent: 'center' }
    ];
    const textStyles = {
      color: 'white',
      fontSize: 40,
      fontWeight: 'bold'
    };

    return (
      <View style={viewStyles}>
      <StatusBar 
          hidden={true}
          barStyle="light-content"
          backgroundColor="#e1e2e3"
        />
        <Image 
        resizeMode={'contain'}
        source={ require('./logo.png') } 
        style={{width: 100, height: 100}} 
        />
      </View>
    );
  }
}


//
class Dashboard extends ValidationComponent {
  constructor(props) {
    super(props);
  this.state = { 
    login: true,
    user: this.props.data.user,
    modal: false,
    modal1: false,
    Bank: 'paynt',
    banks: this.props.data.banks,
    Account: '',
    Password: '',
    transferPassShow: true,
    transferPassIcon: 'eye',
    transferButLoad: false,
    transferButDisabled: false,
    Amount: '',
    transAccount: '',
    transAmount: '',
    transPassword: '',
    transferGo: false,
    recipient: '',
    transferCancelDisabled: false,
    transferProceedDisabled: false,
    transferProceedLoad: false,
    transferRef: '',
    amountDue: '',
    transferSuccess: false,
    bal: this.props.data.bal,
    tranz: this.props.data.tranz,
    viewTranzOverlay: false,
    putTranz: '',
    modal2: false,
    depoError: '',
    Depositor: '',
    depoMethod: '',
    depoBank: '',
    depoButLoad: false,
    depoButDisabled: false, 
    depoAmount: '',
    depoOverlay: false,
    depoData: '',
    balOverlay: false,
    balLoad: false,
    modal4: false,
    resetCancelDisabled: false,
    resetPass: '',
    resetPassShow: true,
    resetPassIcon: 'eye',
    resetPassError: '',
    resetPass1: '',
    resetPass1Show: true,
    resetPass1Icon: 'eye',
    resetPass1Error: '',
    resetPass2: '',
    resetPass2Show: true,
    resetPass2Icon: 'eye',
    resetPass2Error: '',
    resetChangeLoad: false,
    resetChangeDisabled: false,
    resetPassError: '',
    resetPass1Error: '',
    resetPass2Error: '',
    resetSuccess: false,
    Message: '',
    Subject: '',
    modal3: false,
    support: this.props.data.support,
    conv: "",
    modal5: false,
    conv_title: '',
    repz: [],
    Reply: '',
    mesInd: '',
    replySender: '',
    replyRef: '',
    conv_time: '',
    mesDisabled: false,
    indicator: "rgba(0,51,82,1)",
    menuIcon: "bars",
    modal6: false,
    network: '',
    phoneNumber: '',
    airtimeAmount: '',
    airtimeButLoad: false,
    airtimeButDisabled: false,
    airtimeGo: false,
    airtimeSuccess: false,
    airtimeProceedButLoad: false,
    airtimeProceedButDisabled: false,
    airtimeCancelButDisabled: false,
    modal7: false,
    dataPlan: '',
    dataPlans: [],
    mtnPlans: this.props.data.mtnPlans,
    gloPlans: this.props.data.gloPlans,
    mobilePlans: this.props.data.mobilePlans,
    airtelPlans: this.props.data.airtelPlans,
    dataButLoad: false,
    dataButDisabled: false,
    dataGo: false,
    dataSuccess: false,
    dataAmount: '',
    dataCancelButDisabled: false,
    dataProceedButDisabled: false,
    dataProceedButLoad: false,
    tab1: true,
    tab2: false,
    backTab1: "rgba(0,51,82,1)",
    colorTab1: "#fff",
    backTab2: "transparent",
    colorTab2: "rgba(0,51,82,1)",
    Password1: '',
    Password2: '',
    Password3: '',
    Password4: '',
    nPassword1: '',
    nPassword2: '',
    nPassword3: '',
    nPassword4: '',
    cPassword1: '',
    cPassword2: '',
    cPassword3: '',
    cPassword4: '',
    pushmodal: false,
    pushData: [],
  }
}


setModalVisible(visible) {
 this.setState({modal: visible});
}
setModal1Visible(visible) {
  this.setState({modal1: visible});
}
setModal2Visible(visible) {
  this.setState({modal2: visible});
}
setModal3Visible(visible) {
  this.setState({modal3: visible});
}
setModal4Visible(visible) {
  this.setState({modal4: visible});
}
setModal5Visible(visible) {
  this.setState({modal5: visible});
}
setModal6Visible(visible) {
  this.setState({modal6: visible});
}
setModal7Visible(visible) {
  this.setState({modal7: visible});
}
pushmodalVisible(visible) {
  this.setState({pushmodal: visible});
}

setResetPassShow(show) {
  this.setState({resetPassShow: show});
  if(this.state.resetPassIcon == 'eye'){
  this.setState({resetPassIcon: 'eye-slash'});
  }else{
  this.setState({resetPassIcon: 'eye'});
  }
  }

setResetPass1Show(show) {
  this.setState({resetPass1Show: show});
  if(this.state.resetPass1Icon == 'eye'){
  this.setState({resetPass1Icon: 'eye-slash'});
  }else{
  this.setState({resetPass1Icon: 'eye'});
  }
  }

setResetPass2Show(show) {
  this.setState({resetPass2Show: show});
  if(this.state.resetPass2Icon == 'eye'){
  this.setState({resetPass2Icon: 'eye-slash'});
  }else{
  this.setState({resetPass2Icon: 'eye'});
  }
  }

setTransferPassShow(show) {
  this.setState({transferPassShow: show});
  if(this.state.transferPassIcon == 'eye'){
  this.setState({transferPassIcon: 'eye-slash'});
  }else{
  this.setState({transferPassIcon: 'eye'});
  }
  }


tabs(a){
  
  if(a === 'tab1'){
    this.setState({tab2: false, tab1: true, backTab1: "rgba(0,51,82,1)", colorTab1: "#fff", backTab2: "transparent", colorTab2: "rgba(0,51,82,1)"});
  }else{
    this.setState({tab1: false, tab2: true, backTab2: "rgba(0,51,82,1)", colorTab2: "#fff", backTab1: "transparent", colorTab1: "rgba(0,51,82,1)"});
  }
}

data_go(){
  this.setState({dataProceedButLoad: true, dataProceedButDisabled: true, dataCANCELButDisabled: true,});
  var password =  this.state.Password1+this.state.Password2+this.state.Password3+this.state.Password4;
  var dt = this.state.dataPlan.split("{//}");
  return fetch("https://paynt.p.rapidapi.com/data/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "user": this.state.user,
    "network": this.state.network,
    "phoneNumber": this.state.phoneNumber,
    "code": dt[0],
    "amount": dt[1],
    "pin": password,
  }),
})
.then((response) => response.json())
    .then((data) => {
      
        if(data.done === true && data.msg === "Success"){
          // console.error(data.data);
          this.setState({dataProceedButLoad: false, dataProceedButDisabled: false, dataCancelButDisabled: false, dataGo: false});
          this.setState({dataSuccess: true, bal: data.bal, network: '', phoneNumber: '', dataPlan: '', Password: '', Password1: '', Password2: '', Password3: '', Password4: ''});
          this.fetch_tranz();

       }else{
        Snackbar.show({
        title: data.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { this.setState({ dataGo: false}); },
        },
      });
      this.setState({dataProceedButLoad: false, dataProceedButDisabled: false, dataCancelButDisabled: false,});
       }
    })
    .catch((error) => {
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  }); 
}


buy_data(){
var password =  this.state.Password1+this.state.Password2+this.state.Password3+this.state.Password4;
  var dt = this.state.dataPlan.split("{//}");

   this.setState({dataButLoad: true, dataButDisabled: true});
  if(password !== "" && password.length === 4){
  if(this.state.network !== ""){
    if(this.state.phoneNumber !== ""){
        if(this.state.phoneNumber.length === 11 && this.state.phoneNumber.substr(0,1) === "0"){
          if(dt[0] !== "" && dt[1] !== "" ){
              this.setState({dataButLoad: false, dataButDisabled: false, dataAmount: dt[1].split("//")[1], dataGo: true,});

        }else{
          this.setState({dataButLoad: false, dataButDisabled: false});
          Snackbar.show({
              title: "Oops! You have to select a data plan.",
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: 'rgba(0,51,82,0.8)',
              color: 'white',
            });
        }
  
      }else{
        this.setState({dataButLoad: false, dataButDisabled: false});
        Snackbar.show({
            title: "Oops! Phone number is invalid",
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: 'rgba(0,51,82,0.8)',
            color: 'white',
          });
      }
    }else{
      this.setState({dataButLoad: false, dataButDisabled: false});
      Snackbar.show({
          title: "Destination phone number is required.",
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: 'rgba(0,51,82,0.8)',
          color: 'white',
        });
    }
  }else{
    this.setState({dataButLoad: false, dataButDisabled: false});
    Snackbar.show({
        title: "You have to select a network.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  }
}else{
    this.setState({dataButLoad: false, dataButDisabled: false});
    Snackbar.show({
        title: "Authentication PIN is required.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  }

}


data_plan(a){
if(a === "MTN"){
this.setState({dataPlans: this.state.mtnPlans});
}else if(a === "GLO"){
this.setState({dataPlans: this.state.gloPlans});
}else if(a === "9MOBILE"){
this.setState({dataPlans: this.state.mobilePlans});
}else if(a === "AIRTEL"){
this.setState({dataPlans: this.state.airtelPlans});
}

}

airtime_go(){
  this.setState({airtimeProceedButLoad: true, airtimeProceedButDisabled: true, airtimeCancelButDisabled: true});
  var password =  this.state.Password1+this.state.Password2+this.state.Password3+this.state.Password4;
  return fetch("https://paynt.p.rapidapi.com/airtime/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "user": this.state.user,
    "network": this.state.network,
    "phoneNumber": this.state.phoneNumber,
    "amount": this.state.airtimeAmount,
    "pin": password,
  }),
})
.then((response) => response.json())
    .then((data) => {
      
        if(data.done === true && data.msg === "Success"){
          // console.error(data.data);
          this.setState({airtimeProceedButLoad: false, airtimeProceedButDisabled: false, airtimeCancelButDisabled: false, airtimeGo: false});
          this.setState({airtimeSuccess: true, bal: data.bal, network: '', phoneNumber: '', airtimeAmount: '', Password: '', Password1: '', Password2: '', Password3: '', Password4: ''});
          this.fetch_tranz();

       }else{
this.setState({airtimeProceedButLoad: false, airtimeProceedButDisabled: false, airtimeCancelButDisabled: false,});
        Snackbar.show({
        title: data.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { this.setState({ airtimeGo: false}); },
        },
      });
       }
    })
    .catch((error) => {
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  }); 


}



airtime(){
  var password =  this.state.Password1+this.state.Password2+this.state.Password3+this.state.Password4;
  this.setState({airtimeButLoad: true, airtimeButDisabled: true});
  if(password !== "" && password.length === 4){
  if(this.state.network !== ""){
    if(this.state.phoneNumber !== ""){
        if(this.state.phoneNumber.length === 11 && this.state.phoneNumber.substr(0,1) === "0"){
          if(this.state.airtimeAmount !== "" && parseInt(this.state.airtimeAmount) >= 50 && parseInt(this.state.airtimeAmount) <= 50000){
              this.setState({airtimeButLoad: false, airtimeButDisabled: false, airtimeGo: true,});

        }else{
          this.setState({airtimeButLoad: false, airtimeButDisabled: false});
          Snackbar.show({
              title: "Airtime amount must be between #50 - #50,000 NGN.",
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: 'rgba(0,51,82,0.8)',
              color: 'white',
            });
        }
  
      }else{
        this.setState({airtimeButLoad: false, airtimeButDisabled: false});
        Snackbar.show({
            title: "Phone number is invalid",
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: 'rgba(0,51,82,0.8)',
            color: 'white',
          });
      }
    }else{
      this.setState({airtimeButLoad: false, airtimeButDisabled: false});
      Snackbar.show({
          title: "Destination phone number is required.",
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: 'rgba(0,51,82,0.8)',
          color: 'white',
        });
    }
  }else{
    this.setState({airtimeButLoad: false, airtimeButDisabled: false});
    Snackbar.show({
        title: "You have to select a network.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  }
}else{
    this.setState({airtimeButLoad: false, airtimeButDisabled: false});
    Snackbar.show({
        title: "Authentication PIN is required.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  }
}



performTimeConsumingTask = async() => { AsyncStorage.getItem("payntuser").then(value => { if(value == null){ AsyncStorage.setItem('payntuser', this.state.user); } }); }



 componentDidMount() {
    
var self = this;
PushNotification.configure({

      onNotification: function (notification) {
        // console.log('NOTIFICATION:', notification);
        const clicked = notification.userInteraction;
        if (clicked) {
         // ToastAndroid.show(notification.message,ToastAndroid.CENTER);
         // alert(notification.ref);
         self.setState({pushData: notification.data});
         self.pushmodalVisible(true, notification.ref);
        } else {
        
        }
        // ToastAndroid.show(notification.message,ToastAndroid.CENTER);
      },
      popInitialNotification: true,
      requestPermissions: true,
    });


// (function() {
//   // Register all the valid actions for notifications here and add the action handler for each action
//   PushNotification.registerNotificationActions(['Yes', 'No']);
//   DeviceEventEmitter.addListener('notificationActionReceived', function(action){
//     const info = JSON.parse(action.dataJSON);
//     if (info.action === 'Yes') {
//       // Do work pertaining to Accept action here
//       Alert.alert("Yes ooo...");
//     } else if (info.action === 'No') {
//       // Do work pertaining to Accept action here
//       Alert.alert("No ooo...");
//     } 
//     // Add all the required actions handlers
//   });
//   })();


  var intava = setInterval(() => {
    return fetch("https://paynt.p.rapidapi.com/support/fetch/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla,
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "user": this.state.user,
  }),
})
.then((response) => response.json())
    .then((dtt) => {
      
        if(dtt.data !== ""){
        this.setState({support: dtt.data});
       return fetch("https://paynt.p.rapidapi.com/support/notif/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "user": this.state.user,
  }),
})
.then((response) => response.json())
    .then((data) => {
      
        if(data.done === true){
        list[2]['subtitle'] = data.msg;
        this.setState({indicator: data.color, menuIcon: data.icon});
       }
    })
    .catch((error) => {
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  }); 
       }
    })
    .catch((error) => {
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });
  }, 30000);
}





send_reply(){
if(this.state.Reply !== ""){
  var rep = {
    msg: this.state.Reply,
    who: this.state.replySender,
    time: 'now',
    right: '0',
    color: 'rgba(0,51,82,1)',
    back: '#fff',
    leftr: 15,
    rightr: 0,
  };
  var ln = this.state.repz.length;
  this.state.repz[ln] = rep;
  this.state.support[this.state.mesInd]['reply'] =  this.state.repz;
  this.state.support[this.state.mesInd]['unread'] =  "#fff";
  this.setState({support: this.state.support, repz: this.state.repz, Reply: ''});

   return fetch("https://paynt.p.rapidapi.com/support/reply/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "user": this.state.user,
    "ref": this.state.replyRef,
    "reply": this.state.Reply,
  }),
})
.then((response) => response.json())
    .then((dtt) => {
      if(dtt.done === true){
          return fetch("https://paynt.p.rapidapi.com/support/fetch/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "user": this.state.user,
  }),
})
.then((response) => response.json())
    .then((dtt) => {
      if(dtt.data !== ""){
        this.setState({support: dtt.data});
        var m = this.state.support[this.state.mesInd];
        this.setState({mesInd: this.state.mesInd, mesDisabled: m['disabled'], replyRef: m['ref'], conv: m['mes'], repz: m['reply'], conv_time: m['date'], replySender: m['sender'], modal5: true, conv_title: m['title']});
       }
    })
    .catch((error) => {
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });

        
       }
    })
    .catch((error) => {
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });


}
}

show_mes(a){
  var m = this.state.support[a];
  if(m['icon'] !== "flag"){
  m['unread'] = "#fff";
  this.setState({support: this.state.support, mesInd: a, mesDisabled: m['disabled'], replyRef: m['ref'], conv: m['mes'], repz: m['reply'], conv_time: m['date'], replySender: m['sender'], modal5: true, conv_title: m['title']});
  this.readmsg();
  // console.error(this.state.conv);
  }
}

fetch_support(){
  return fetch("https://paynt.p.rapidapi.com/support/fetch/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "user": this.state.user,
  }),
})
.then((response) => response.json())
    .then((dtt) => {
      
        if(dtt.data !== ""){
        this.setState({support: dtt.data});
       }
    })
    .catch((error) => {
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });

}


readmsg(){
  return fetch("https://paynt.p.rapidapi.com/support/readmsg/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "user": this.state.user,
    "ref": this.state.replyRef,
  }),
})
.then((response) => response.json())
    .then((dtt) => {
      
        if(dtt.done === true){
          this.fetch_support();
       }
    })
    .catch((error) => {
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });

}

sendm(){
  if(this.state.Message !== "" && this.state.Subject !== ""){
  var item = {
    mes: this.state.Message,
    title: this.state.Subject,
    icon: 'lock-open',
    status: 'open',
    color: 'rgba(0,51,82,0.8)',
    key: 0,
    ref: '',
    reply: [],
    disabled: false,
    unread: '#fff',
  };
  var res = [];
  res[0] = item;
  var i = 0;
  var ln = this.state.support.length;
  for(m in this.state.support){
    if(this.state.support[m]['icon'] !== "flag"){
    var k = i + 1;
    this.state.support[m]['key'] = k;
    res[k] = this.state.support[m];
    i++;
  }
  }
  this.setState({support: res, Message: '', Subject: ''});

      return fetch("https://paynt.p.rapidapi.com/support/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "user": this.state.user,
    "sub": this.state.Subject,
    "mes": this.state.Message,
  }),
})
.then((response) => response.json())
    .then((data) => {
      if(data.done === true && data.data !== ""){
        this.setState({support: data.data,});
        Snackbar.show({
        title: data.msg,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
      }else{
  Snackbar.show({
        title: data.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { },
        },
      });
       
      }
    })
    .catch((error) => {
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });


}else{
  Snackbar.show({
        title: "Subject and message body are required!",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
}
}


reset_p(){
  var password =  this.state.Password1+this.state.Password2+this.state.Password3+this.state.Password4;
  var password1 =  this.state.nPassword1+this.state.nPassword2+this.state.nPassword3+this.state.nPassword4;
  var password2 =  this.state.cPassword1+this.state.cPassword2+this.state.cPassword3+this.state.cPassword4;
  this.setState({resetCancelDisabled: true, resetChangeDisabled: true, resetChangeLoad: true,});
  if(password !== "" && password.length === 4){
    if(password1 !== "" && password1.length === 4){
      if(password2 !== "" && password2.length === 4){
      if(password1 === password2){

      return fetch("https://paynt.p.rapidapi.com/resetpass/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "user": this.state.user,
    "pass": password,
    "pass1": password1,
    "pass2": password2,
  }),
})
.then((response) => response.json())
    .then((data) => {
      if(data.done === true){
        this.setState({resetOverlay: false, resetSuccess: true, resetCancelDisabled: false, resetChangeDisabled: false, resetChangeLoad: false, Password1: '', Password2: '', Password3: '', Password4: '', nPassword1: '', nPassword2: '', nPassword3: '', nPassword4: '', cPassword1: '', cPassword2: '', cPassword3: '', cPassword4: ''});
      }else{
  Snackbar.show({
        title: data.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { },
        },
      });
       
      }
    })
    .catch((error) => {
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });


      }else{
        Snackbar.show({
        title: "New passwords do not match!",
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { },
        },
      });
      }

      }else{
        this.setState({resetPass2Error: "You have to confirm your new password."});
      }

    }else{
      this.setState({resetPass1Error: "Your new password is required."});
    }

  }else{
    this.setState({resetPassError: "Your current password is required."});
  }

}



settings(a){

 if(a === "logout"){
  this.setState({login: false});
 }


 if(a === "balance"){
  
this.setState({balLoad: true, balOverlay: true,});
return fetch("https://paynt.p.rapidapi.com/balance/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "user": this.state.user,
  }),
})
.then((response) => response.json())
    .then((data) => {
      if(data.done === true && data.bal !== ""){
        this.setState({bal: data.bal, balLoad: false});
      }else{
  Snackbar.show({
        title: data.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { },
        },
      });
       
      }
    })
    .catch((error) => {
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });




 }

 if(a === "money"){
  this.setModal2Visible(true);
 }

 if(a === "change"){
  this.setState({modal4: true,});
 }

 if(a === "support"){
  this.setState({modal3: true});
 }

}


  deposit(){
  var password =  this.state.Password1+this.state.Password2+this.state.Password3+this.state.Password4;
  this.setState({depoButLoad: true});
  this.setState({depoButDisabled: true});
        if(this.state.depoBank !== ""){
        if(this.state.depoMethod !== ""){
        if(this.state.depoAmount > 0){
        if(this.state.Depositor !== ""){
        if(password !== "" && password.length === 4){
          // send API request

          return fetch("https://paynt.p.rapidapi.com/deposit/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "user": this.state.user,
    "bank": this.state.depoBank,
    "method": this.state.depoMethod,
    "depositor": this.state.Depositor,
    "amount": this.state.depoAmount,
    "pin": password,
  }),
})
.then((response) => response.json())
    .then((data) => {
        this.setState({depoButDisabled: false});
        this.setState({depoButLoad: false});
      if(data.done === true && data.msg === "Success"){
        //load confirmation UI transferGoMsg: data.msg,
        this.setState({depoBank: '', depoMethod: '', depoAmount: '', Depositor: '', depoData: data.data,  depoOverlay: true, Password: '', Password1: '', Password2: '', Password3: '', Password4: ''});
        
      }else{

  Snackbar.show({
        title: data.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { },
        },
      });
       
      }
      
      
    })
    .catch((error) => {
      // console.error(error);
        this.setState({depoButLoad: false});
        this.setState({depoButDisabled: false});
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });

    // API request ends

        }else{
          this.setState({depoButDisabled: false});
        this.setState({depoButLoad: false});
         Snackbar.show({
        title: 'Authentication PIN is required',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
        }
        }else{
          this.setState({depoButDisabled: false});
        this.setState({depoButLoad: false});
         Snackbar.show({
        title: "Depositor's name is required.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
        }
        }else{
          this.setState({depoButDisabled: false});
        this.setState({depoButLoad: false});
          Snackbar.show({
        title: "Payment method is required.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
        }
        }else{
          this.setState({depoButDisabled: false});
        this.setState({depoButLoad: false});
          Snackbar.show({
        title: "Deposit amount is required.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
        }
        }else{
          this.setState({depoButDisabled: false});
        this.setState({depoButLoad: false});
          Snackbar.show({
        title: "Destination bank is required.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
        }
        
  }






view_tranz(a){
var t = this.state.tranz[a];
this.setState({putTranz: t, viewTranzOverlay: true,});
}


fetch_tranz(){
return fetch("https://paynt.p.rapidapi.com/transactions/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "user": this.state.user,
  }),
})
.then((response) => response.json())
    .then((data) => {
      this.setState({bal: data.bal});
      if(data.data !== ""){
        this.setState({tranz: data.data});
      }else{
  Snackbar.show({
        title: data.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { },
        },
      });
       
      }
      
      
    })
    .catch((error) => {
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });


}

transfer_go(){
  var password =  this.state.Password1+this.state.Password2+this.state.Password3+this.state.Password4;
  this.setState({transferCancelDisabled: true});
  this.setState({transferProceedLoad: true});
  this.setState({transferProceedDisabled: true});
  var chk = this.validate({
        Account: {required: true, min: 10},
        });
        if(chk == true){
          this.setState({transAccount: ''});
        if(this.state.Amount >= 0){
          this.setState({transAmount: ''});
        if(password !== "" && password.length === 4){
          this.setState({transPassword: ''});
        if(this.state.Bank !== ""){
          
          // send API request

          return fetch("https://paynt.p.rapidapi.com/transfer/go/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "user": this.state.user,
    "bank": this.state.Bank,
    "account": this.state.Account,
    "amount": this.state.Amount,
    "ref": this.state.transferRef,
    "pin": password,
  }),
})
.then((response) => response.json())
    .then((data) => {
        this.setState({transferCancelDisabled: false});
        this.setState({transferProceedLoad: false});
        this.setState({transferProceedDisabled: false});
      if(data.done === true && data.msg === "Transaction completed."){
        //load confirmation UI   transferGoMsg: data.msg,
        this.setState({transferRef: '', Bank: '', Account: '', Amount: '', Password: '', Password1: '', Password2: '', Password3: '', Password4: '', transferGo: false, transferSuccess: true,});
        
      }else{

  Snackbar.show({
        title: data.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { },
        },
      });
       
      }
      
      
    })
    .catch((error) => {
      console.error(error);
      this.setState({transferCancelDisabled: false});
        this.setState({transferProceedLoad: false});
        this.setState({transferProceedDisabled: false});
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });

    // API request ends

        }else{
          this.setState({transferCancelDisabled: false});
        this.setState({transferProceedLoad: false});
        this.setState({transferProceedDisabled: false});
         Snackbar.show({
        title: "Destination bank is required.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
        }
        }else{
          this.setState({transferCancelDisabled: false});
        this.setState({transferProceedLoad: false});
        this.setState({transferProceedDisabled: false});
        Snackbar.show({
        title: 'Authentication PIN is required',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
        }
        }else{
          this.setState({transferCancelDisabled: false});
        this.setState({transferProceedLoad: false});
        this.setState({transferProceedDisabled: false});
          this.setState({transAmount: 'Amount is invalid'});
        }
        }else{
          this.setState({transferCancelDisabled: false});
        this.setState({transferProceedLoad: false});
        this.setState({transferProceedDisabled: false});
          this.setState({transAccount: 'Account number is invalid'});
        }

}



transfer(){
var password =  this.state.Password1+this.state.Password2+this.state.Password3+this.state.Password4;
this.setState({transferButLoad: true});
this.setState({transferButDisabled: true});
var chk = this.validate({
        Account: {required: true, min: 10},
        });
        if(chk == true){
          this.setState({transAccount: ''});
        if(this.state.Amount >= 0){
          this.setState({transAmount: ''});
        if(password !== "" && password.length === 4){
          this.setState({transPassword: ''});
        if(this.state.Bank !== ""){
          
          // send API request

          return fetch("https://paynt.p.rapidapi.com/transfer/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "user": this.state.user,
    "bank": this.state.Bank,
    "account": this.state.Account,
    "amount": this.state.Amount,
    "pin": password,
  }),
})
.then((response) => response.json())
    .then((data) => {
        this.setState({transferButLoad: false});
        this.setState({transferButDisabled: false});
      if(data.done === true && data.ref !== ""){
        //load confirmation UI
        this.setState({transferRef: data.ref, recipient: data.account_name, transferGo: true, amountDue: "#"+data.amount+" NGN",});
        
      }else{

  Snackbar.show({
        title: data.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { },
        },
      });
       
      }
      
      
    })
    .catch((error) => {
      // console.error(error);
      this.setState({transferButLoad: false});
      this.setState({transferButDisabled: false});
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });

    // API request ends

        }else{
          this.setState({transferButLoad: false});
          this.setState({transferButDisabled: false});
         Snackbar.show({
        title: "Destination bank is required.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
        }
        }else{
          this.setState({transferButLoad: false});
          this.setState({transferButDisabled: false});

  Snackbar.show({
        title: 'Authentication PIN is required',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
        }
        }else{
          this.setState({transferButLoad: false});
          this.setState({transferButDisabled: false});
          this.setState({transAmount: 'Amount is invalid'});
        }
        }else{
          this.setState({transferButLoad: false});
          this.setState({transferButDisabled: false});
          this.setState({transAccount: 'Account number is invalid'});
        }
}

  render() {
    if(this.state.login === true){
    return (
      <View style={{flex: 1, width: '100%', backgroundColor: '#e1e2e3'}}>
      <StatusBar
          barStyle="light-content"
          backgroundColor="rgba(0,51,82,1)"
        />
        <View raised={true} style={{flex: 1, elevation: 15, minHeight: 150}}>
        <View raised={true} style={{flex: 1, flexDirection: 'row', padding: 10, minHeight: 60,}}>
                            <View style={{fontSize: 20, fontWeight: 'bold', color: '#fff', width: "90%"}}>
                            <Image 
                            resizeMode={'contain'}
                            source={ require('./logo.png') } 
                            style={{width: 30, height: 30, padding: 5}} 
                            />
                            </View>
                            <Button 
                            title=""
                            type="clear"
                            raised={true}
                            icon={ <Icon type='font-awesome' name={this.state.menuIcon} size={30} color={this.state.indicator} /> } 
                            iconRight={true}
                            onPress={() => {this.setModalVisible(true);}}
                            buttonStyle={{padding: 5}}
                            />
                              
                          </View>
                          
                          <View raised={true} style={{flex: 1, minHeight: 80, flexDirection: 'row', backgroundColor: "#e1e2e3", paddingTop: 5, borderBottomWidth: 0, borderColor: 'rgba(0,51,82,1)' }}>
      
      <View style={{width: '25%', alignItems: 'center', }}>
      <TouchableHighlight onPress={() => {this.setModal1Visible(true);}} underlayColor="rgba(0,0,0,0)" >
      <View style={{width: 80, height: 80, alignItems: 'center', padding: 5, }}>
      <Image raised={true} resizeMode={'contain'} source={ require('./transfer.png') }  style={{width: 30, height: 30, padding: 5}}  />
      <Text h3 style={{color: 'rgba(0,51,82,1)', fontSize: 12, fontWeight: 'bold'}} >Transfer</Text>
      </View>
      </TouchableHighlight>
      </View>
      <View style={{width: '25%', alignItems: 'center', }}>
      <TouchableHighlight onPress={() => {this.setModal2Visible(true);}} underlayColor="rgba(0,0,0,0)" >
      <View style={{width: 80, height: 80, alignItems: 'center', padding: 5, }}>
      <Image raised={true} resizeMode={'contain'} source={ require('./deposit.png') }  style={{width: 30, height: 30, padding: 5}}  />
      <Text h3 style={{color: 'rgba(0,51,82,1)', fontSize: 12, fontWeight: 'bold'}} ><Icon type='font-awesome' name="plus" size={12} color='rgba(0,51,82,1)' /> Money</Text>
      </View>
      </TouchableHighlight>
      </View>
      <View style={{width: '25%', alignItems: 'center', }}>
      <TouchableHighlight onPress={() => {this.setModal6Visible(true);}} underlayColor="rgba(0,0,0,0)" >
      <View style={{width: 80, height: 80, alignItems: 'center', padding: 5, }}>
      <Image raised={true} resizeMode={'contain'} source={ require('./e-recharge.png') }  style={{width: 30, height: 30, padding: 5}}  />
      <Text h3 style={{color: 'rgba(0,51,82,1)', fontSize: 12, fontWeight: 'bold'}} >Airtime</Text>
      </View>
      </TouchableHighlight>
      </View>
      <View style={{width: '25%', alignItems: 'center', }}>
      <TouchableHighlight onPress={() => {this.setModal7Visible(true);}} underlayColor="rgba(0,0,0,0)" >
      <View style={{width: 80, height: 80, alignItems: 'center', padding: 5, }}>
      <Image raised={true} resizeMode={'contain'} source={ require('./e-recharge.png') }  style={{width: 30, height: 30, padding: 5}}  />
      <Text h3 style={{color: 'rgba(0,51,82,1)', fontSize: 12, fontWeight: 'bold'}} >Data</Text>
      </View>
      </TouchableHighlight>
      </View>
    
      </View>
      </View>
        <ScrollView style={{backgroundColor: '#e1e2e3', minHeight: '70%'}}>
      
      <View style={{flex: 1,}}>
      
  {
    this.state.tranz.map((item) => (
      <ListItem
        containerStyle={{paddingTop: 10, paddingBottom: 10, backgroundColor: '#e1e2e3'}}
        titleStyle={{color: 'rgba(0,51,82,1)', fontWeight: 'bold', fontSize: 12}}
        subtitleStyle={{color: 'rgba(0,51,82,1)', textTransform: 'uppercase', fontSize: 10}}
        key={item.key}
        title={item.amount}
        subtitle={item.purpose+"\n"+item.date}
        leftIcon={{ name: item.icon, color: item.color, size: 12}}
        bottomDivider
        chevron={{color: 'rgba(0,51,82,1)'}}
        onPress={() => {this.view_tranz(item.key);}}
        disabled={item.disabled}
      />
    ))
  }

      </View>

<Overlay 
isVisible={this.state.viewTranzOverlay}
onBackdropPress={() => {this.setState({viewTranzOverlay: false});}}
overlayStyle={{backgroundColor: '#fff', justifyContent: 'center'}}
height= {400}
>
<View style={{flex: 1,}}>
<Button title= {this.state.putTranz['amount']} 
  titleStyle={{color: "#fff", fontSize: 20, fontWeight: 'bold'}} 
  raised={true}
  buttonStyle={{minWidth: "100%", backgroundColor: this.state.putTranz['color']}}
  type='solid'
  />
<View style={{flexDirection: 'row', paddingTop: 10,}}>
<Text style={{backgroundColor: '#e1e2e3', width: "40%",  height: 40, color: 'rgba(0,51,82,1)', paddingLeft: 5, textAlign: 'left', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase'}}>Ref</Text>
<Text style={{borderWidth: 2, borderColor: '#e1e2e3', width: "60%", height: 40, color: 'rgba(0,51,82,1)', paddingLeft: 5, textAlign: 'left', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase'}}>{this.state.putTranz['ref']}</Text>
</View>
<View style={{flexDirection: 'row',}}>
<Text style={{backgroundColor: '#e1e2e3', width: "40%",  height: 40, color: 'rgba(0,51,82,1)', paddingLeft: 5, textAlign: 'left', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase'}}>Purpose</Text>
<Text style={{borderWidth: 2, borderTopWidth: 0, borderColor: '#e1e2e3', width: "60%", height: 40, color: 'rgba(0,51,82,1)', paddingLeft: 5, textAlign: 'left', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase'}}>{this.state.putTranz['purpose']}</Text>
</View>
<View style={{flexDirection: 'row',}}>
<Text style={{backgroundColor: '#e1e2e3', width: "40%",  height: 40, color: 'rgba(0,51,82,1)', paddingLeft: 5, textAlign: 'left', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase'}}>Description</Text>
<Text style={{borderWidth: 2, borderTopWidth: 0, borderColor: '#e1e2e3', width: "60%", height: 40, color: 'rgba(0,51,82,1)', paddingLeft: 5, textAlign: 'left', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase'}}>{this.state.putTranz['description']}</Text>
</View>
<View style={{flexDirection: 'row',}}>
<Text style={{backgroundColor: '#e1e2e3', width: "40%",  height: 40, color: 'rgba(0,51,82,1)', paddingLeft: 5, textAlign: 'left', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase'}}>Bank</Text>
<Text style={{borderWidth: 2, borderTopWidth: 0, borderColor: '#e1e2e3', width: "60%", height: 40, color: 'rgba(0,51,82,1)', paddingLeft: 5, textAlign: 'left', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase'}}>{this.state.putTranz['bank']}</Text>
</View>
<View style={{flexDirection: 'row',}}>
<Text style={{backgroundColor: '#e1e2e3', width: "40%",  height: 40, color: 'rgba(0,51,82,1)', paddingLeft: 5, textAlign: 'left', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase'}}>Account</Text>
<Text style={{borderWidth: 2, borderTopWidth: 0, borderColor: '#e1e2e3', width: "60%", height: 40, color: 'rgba(0,51,82,1)', paddingLeft: 5, textAlign: 'left', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase'}}>{this.state.putTranz['account']}</Text>
</View>
<View style={{flexDirection: 'row',}}>
<Text style={{backgroundColor: '#e1e2e3', width: "40%",  height: 40, color: 'rgba(0,51,82,1)', paddingLeft: 5, textAlign: 'left', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase'}}>RECIPIENT</Text>
<Text style={{borderWidth: 2, borderTopWidth: 0, borderColor: '#e1e2e3', width: "60%", height: 40, color: 'rgba(0,51,82,1)', paddingLeft: 5, textAlign: 'left', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase'}}>{this.state.putTranz['recipient']}</Text>
</View>
<View style={{flexDirection: 'row',}}>
<Text style={{backgroundColor: '#e1e2e3', width: "40%",  height: 40, color: 'rgba(0,51,82,1)', paddingLeft: 5, textAlign: 'left', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase'}}>Remark</Text>
<Text style={{borderWidth: 2, borderTopWidth: 0, borderColor: '#e1e2e3', width: "60%", height: 40, color: this.state.putTranz['remark_c'], paddingLeft: 5, textAlign: 'left', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase'}}>{this.state.putTranz['remark_m']}</Text>
</View>
<View style={{flexDirection: 'row',}}>
<Text style={{backgroundColor: '#e1e2e3', width: "40%",  height: 40, color: 'rgba(0,51,82,1)', paddingLeft: 5, textAlign: 'left', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase'}}>Date</Text>
<Text style={{borderWidth: 2, borderTopWidth: 0, borderColor: '#e1e2e3', width: "60%", height: 40, color: 'rgba(0,51,82,1)', paddingLeft: 5, textAlign: 'left', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase'}}>{this.state.putTranz['date']}</Text>
</View>

</View>
</Overlay>

<Overlay 
isVisible={this.state.transferSuccess}
onBackdropPress={() => {this.setState({ transferSuccess: false, modal1: false }); this.fetch_tranz();}}
overlayStyle={{backgroundColor: 'rgba(0,51,82,1)', justifyContent: 'center'}}
height= {200}
>
<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
<Text style={{color: '#fff', fontSize: 25, marginLeft: 20, marginRight: 30, fontWeight: 'bold',}}>SUCCESS</Text>
<Icon type='font-awesome' name="check-circle" size={60} color="#fff" />
</View>
</Overlay>


<Overlay 
isVisible={this.state.resetSuccess}
onBackdropPress={() => {this.setState({ resetSuccess: false, login: false,});}}
overlayStyle={{backgroundColor: 'rgba(0,51,82,1)', justifyContent: 'center'}}
height= {200}
>
<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
<Text style={{color: '#fff', fontSize: 25, marginLeft: 20, marginRight: 30, fontWeight: 'bold',}}>SUCCESS</Text>
<Icon type='font-awesome' name="check-circle" size={60} color="#fff" />
</View>
</Overlay>

<Overlay 
isVisible={this.state.airtimeSuccess}
onBackdropPress={() => {this.setState({ airtimeSuccess: false, modal6: false,});}}
overlayStyle={{backgroundColor: 'rgba(0,51,82,1)', justifyContent: 'center'}}
height= {200}
>
<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
<Text style={{color: '#fff', fontSize: 25, marginLeft: 20, marginRight: 30, fontWeight: 'bold',}}>SUCCESS</Text>
<Icon type='font-awesome' name="check-circle" size={60} color="#fff" />
</View>
</Overlay>

<Overlay 
isVisible={this.state.dataSuccess}
onBackdropPress={() => {this.setState({ dataSuccess: false, modal7: false,});}}
overlayStyle={{backgroundColor: 'rgba(0,51,82,1)', justifyContent: 'center'}}
height= {200}
>
<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
<Text style={{color: '#fff', fontSize: 25, marginLeft: 20, marginRight: 30, fontWeight: 'bold',}}>SUCCESS</Text>
<Icon type='font-awesome' name="check-circle" size={60} color="#fff" />
</View>
</Overlay>

<Overlay 
isVisible={this.state.depoOverlay}
onBackdropPress={() => {this.setState({depoOverlay: false, modal2: false});this.fetch_tranz();}}
overlayStyle={{backgroundColor: 'rgba(0,51,82,1)'}}
height= {250}
>
<View style={{flex: 1,}}>
<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
<Text style={{color: '#fff', fontSize: 25, marginLeft: 20, marginRight: 30, fontWeight: 'bold',}}>SUCCESS</Text>
<Icon type='font-awesome' name="check-circle" size={60} color="#fff" />
</View>
<Text h3 style={{color: '#fff'}}>Transaction Details</Text>
<Text h3 style={{color: '#fff'}}>Amount: {this.state.depoData['amount']}</Text>
<Text h3 style={{color: '#fff'}}>Bank: {this.state.depoData['bname']}</Text>
<Text h3 style={{color: '#fff'}}>Accl. Name: {this.state.depoData['accname']}</Text>
<Text h3 style={{color: '#fff'}}>Accl. No: {this.state.depoData['accn']}</Text>
<Text h3 style={{color: '#fff'}}>Ref. Num: {this.state.depoData['ref']}</Text>
</View>
</Overlay>


<Overlay 
isVisible= {this.state.balOverlay}
overlayStyle={{backgroundColor: "rgba(0,51,82,1)" }}
height= {200}
>
<View style={{flex: 1}}>
  <Button title= {this.state.bal} 
  titleStyle={{color: "#fff", fontSize: 20, fontWeight: "bold"}} 
  raised={true}
  loadingProps={{color: '#fff'}}
  loading={this.state.balLoad}
  buttonStyle={{minWidth: "100%", marginBottom: 30, marginTop: 40}}
  type='clear'
  />

  <View style={{flexDirection: 'row'}}>
  <Button title="CANCEL" 
  titleStyle={{color: "#fff", fontSize: 14}} 
  raised={true} 
  loadingProps={{color: 'rgba(0,51,82,1)'}}
  buttonStyle={{minWidth: 100, backgroundColor: 'transparent'}}
  type='clear'
  onPress={() => {this.setState({balOverlay: false});}}
  />
  </View>
  </View>
</Overlay>

<Overlay 
isVisible= {this.state.transferGo}
overlayStyle={{backgroundColor: "#fff" }}
height= {200}
>
<View style={{flex: 1}}>
  <Button title= {this.state.amountDue} 
  titleStyle={{color: "#fff", fontSize: 14, fontWeight: "bold"}} 
  raised={true}
  buttonStyle={{minWidth: "100%", backgroundColor: 'rgba(0,51,82,1)'}}
  type='solid'
  />

  <Button title= {this.state.recipient} 
  titleStyle={{color: 'rgba(0,51,82,1)', fontSize: 12, fontWeight: "bold"}} 
  raised={true}
  buttonStyle={{minWidth: "100%", marginBottom: 40,}}
  type='clear'
  />

  <View style={{flexDirection: 'row'}}>
  <Button title="CANCEL" 
  titleStyle={{color: "rgba(0,51,82,1)", fontSize: 14}} 
  raised={true} 
  disabled={this.state.transferCancelDisabled}
  loadingProps={{color: 'rgba(0,51,82,1)'}}
  buttonStyle={{minWidth: 100, backgroundColor: 'transparent'}}
  type='clear'
  onPress={() => {this.setState({transferGo: false});}}
  />
  <Button title="PROCEED" 
  titleStyle={{color: "rgba(0,51,82,1)", fontSize: 14}} 
  raised={true} 
  loadingProps={{color: 'rgba(0,51,82,1)'}}
  disabled={this.state.transferProceedDisabled}
  loading={this.state.transferProceedLoad}
  buttonStyle={{minWidth: 100, backgroundColor: 'transparent', marginLeft: 25}}
  type='clear'
  onPress={() => {this.transfer_go();}}
  />
  </View>
  </View>
</Overlay>



<Overlay 
isVisible= {this.state.airtimeGo}
overlayStyle={{backgroundColor: "#fff" }}
height= {200}
>
<View style={{flex: 1}}>
  <Button title= {"#"+this.state.airtimeAmount+" NGN"} 
  titleStyle={{color: "#fff", fontSize: 14, fontWeight: "bold"}} 
  raised={true}
  buttonStyle={{minWidth: "100%", backgroundColor: 'rgba(0,51,82,1)'}}
  type='solid'
  />

  <Button title= {this.state.network+" ["+this.state.phoneNumber+"]"} 
  titleStyle={{color: 'rgba(0,51,82,1)', fontSize: 12, fontWeight: "bold"}} 
  raised={true}
  buttonStyle={{minWidth: "100%", marginBottom: 40,}}
  type='clear'
  />

  <View style={{flexDirection: 'row'}}>
  <Button title="CANCEL" 
  titleStyle={{color: "rgba(0,51,82,1)", fontSize: 14}} 
  raised={true} 
  disabled={this.state.airtimeCANCELButDisabled}
  loadingProps={{color: 'rgba(0,51,82,1)'}}
  buttonStyle={{minWidth: 100, backgroundColor: 'transparent'}}
  type='clear'
  onPress={() => {this.setState({airtimeGo: false});}}
  />
  <Button title="PROCEED" 
  titleStyle={{color: "rgba(0,51,82,1)", fontSize: 14}} 
  raised={true} 
  loadingProps={{color: 'rgba(0,51,82,1)'}}
  disabled={this.state.airtimeProceedButDisabled }
  loading={this.state.airtimeProceedButLoad}
  buttonStyle={{minWidth: 100, backgroundColor: 'transparent', marginLeft: 25}}
  type='clear'
  onPress={() => {this.airtime_go();}}
  />
  </View>
  </View>
</Overlay>




<Overlay 
isVisible= {this.state.dataGo}
overlayStyle={{backgroundColor: "#fff" }}
height = {200}
>
<View style={{flex: 1}}>
  <Button title= {"#"+this.state.dataAmount+" NGN"} 
  titleStyle={{color: "#fff", fontSize: 14, fontWeight: "bold"}} 
  raised={true}
  buttonStyle={{minWidth: "100%", backgroundColor: 'rgba(0,51,82,1)'}}
  type='solid'
  />

  <Button title= {this.state.network+" ["+this.state.phoneNumber+"]"} 
  titleStyle={{color: 'rgba(0,51,82,1)', fontSize: 12, fontWeight: "bold"}} 
  raised={true}
  buttonStyle={{minWidth: "100%", marginBottom: 40,}}
  type='clear'
  />

  <View style={{flexDirection: 'row'}}>
  <Button title="CANCEL" 
  titleStyle={{color: "rgba(0,51,82,1)", fontSize: 14}} 
  raised={true} 
  disabled={this.state.dataCANCELButDisabled}
  loadingProps={{color: 'rgba(0,51,82,1)'}}
  buttonStyle={{minWidth: 100, backgroundColor: 'transparent'}}
  type='clear'
  onPress={() => {this.setState({dataGo: false});}}
  />
  <Button title="PROCEED" 
  titleStyle={{color: "rgba(0,51,82,1)", fontSize: 14}} 
  raised={true} 
  loadingProps={{color: 'rgba(0,51,82,1)'}}
  disabled={this.state.dataProceedButDisabled }
  loading={this.state.dataProceedButLoad}
  buttonStyle={{minWidth: 100, backgroundColor: 'transparent', marginLeft: 25}}
  type='clear'
  onPress={() => {this.data_go();}}
  />
  </View>
  </View>
</Overlay>




<Modal
  animationType="slide"
  transparent={false}
  visible={this.state.modal4}
  onRequestClose={() => {
    this.setModal4Visible(!this.state.modal4);
  }} style={{backgroundColor: '#4682B4'}}>
  <View style={{flex: 1, width: '100%', backgroundColor: '#e1e2e3'}}>
  <View raised={true} style={{flex: 1, flexDirection: 'row', backgroundColor: '#e1e2e3', padding: 10, paddingTop: 15, minHeight: 60, elevation: 5}}>
    <TouchableHighlight onPress={() => { this.setModal4Visible(!this.state.modal4); }} underlayColor="rgba(0,0,0,0)" >
    <View style={{width: 40, textAlign: 'left', padding: 5}}>
    <Icon type='font-awesome' name="arrow-left" size={20} color="rgba(0,51,82,1)" />
    </View>
    </TouchableHighlight>
      <Text h1 style={{fontSize: 20, fontWeight: 'bold', color: 'rgba(0,51,82,1)', marginLeft: 10}}>CHANGE PIN</Text>
  </View>
  <ScrollView style={{ width: '100%', height: '100%', paddingTop: '10%'}}>
  <View style={{flex: 1, alignItems: 'center'}}>
  <Text h1 style={{color: 'rgba(0,51,82,1)', fontWeight: 'bold', textAlign: 'left'}}>PIN</Text>
<View style={{flexDirection: 'row', width: '100%', paddingRight: 10}}>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref="Password1"
                            onChangeText={(Password1) => this.setState({Password1})} value={this.state.Password1}
                            secureTextEntry={true}
                            placeholder= 'A'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.Password2.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.Password2 = input; }}
                            onChangeText={(Password2) => this.setState({Password2})} value={this.state.Password2}
                            secureTextEntry={true}
                            placeholder= 'U'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.Password3.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.Password3 = input; }}
                            onChangeText={(Password3) => this.setState({Password3})} value={this.state.Password3}
                            secureTextEntry={true}
                            placeholder= 'T'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.Password4.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.Password4 = input; }}
                            onChangeText={(Password4) => this.setState({Password4})} value={this.state.Password4}
                            secureTextEntry={true}
                            placeholder= 'H'
                            shake={true}
                            maxLength={1}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          </View>
<Text h1 style={{color: 'rgba(0,51,82,1)', fontWeight: 'bold', textAlign: 'left'}}>NEW PIN</Text>
<View style={{flexDirection: 'row', width: '100%', paddingRight: 10}}>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref="nPassword1"
                            onChangeText={(nPassword1) => this.setState({nPassword1})} value={this.state.nPassword1}
                            secureTextEntry={true}
                            placeholder= 'A'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.nPassword2.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.nPassword2 = input; }}
                            onChangeText={(nPassword2) => this.setState({nPassword2})} value={this.state.nPassword2}
                            secureTextEntry={true}
                            placeholder= 'U'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.nPassword3.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.nPassword3 = input; }}
                            onChangeText={(nPassword3) => this.setState({nPassword3})} value={this.state.nPassword3}
                            secureTextEntry={true}
                            placeholder= 'T'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.nPassword4.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.nPassword4 = input; }}
                            onChangeText={(nPassword4) => this.setState({nPassword4})} value={this.state.nPassword4}
                            secureTextEntry={true}
                            placeholder= 'H'
                            shake={true}
                            maxLength={1}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          </View>
<Text h1 style={{color: 'rgba(0,51,82,1)', fontWeight: 'bold', textAlign: 'left'}}>CONFIRM PIN</Text>
<View style={{flexDirection: 'row', width: '100%', paddingRight: 10}}>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref="cPassword1"
                            onChangeText={(cPassword1) => this.setState({cPassword1})} value={this.state.cPassword1}
                            secureTextEntry={true}
                            placeholder= 'A'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.cPassword2.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.cPassword2 = input; }}
                            onChangeText={(cPassword2) => this.setState({cPassword2})} value={this.state.cPassword2}
                            secureTextEntry={true}
                            placeholder= 'U'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.cPassword3.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.cPassword3 = input; }}
                            onChangeText={(cPassword3) => this.setState({cPassword3})} value={this.state.cPassword3}
                            secureTextEntry={true}
                            placeholder= 'T'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.cPassword4.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.cPassword4 = input; }}
                            onChangeText={(cPassword4) => this.setState({cPassword4})} value={this.state.cPassword4}
                            secureTextEntry={true}
                            placeholder= 'H'
                            shake={true}
                            maxLength={1}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          </View>

<Button title="CHANGE" 
    titleStyle={{color: "rgba(0,51,82,1)"}} 
    raised={true} 
    loading={this.state.resetChangeLoad}
    disabled={this.state.resetChangeDisabled} 
    loadingProps={{color: 'rgba(0,51,82,1)'}}
    buttonStyle={{minWidth: 120, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'rgba(0,51,82,1)', borderRadius: 10}}
    onPress={() => {this.reset_p()}}
    />

  </View>
  </ScrollView>
  </View>
</Modal>


<Modal
  animationType="slide"
  transparent={false}
  visible={this.state.modal2}
  onRequestClose={() => {
    this.setModal2Visible(!this.state.modal2);
  }} style={{backgroundColor: '#4682B4'}}>
  <View style={{flex: 1, width: '100%', backgroundColor: '#e1e2e3'}}>
  <View raised={true} style={{flex: 1, flexDirection: 'row', backgroundColor: '#e1e2e3', padding: 10, paddingTop: 15, minHeight: 60, elevation: 5}}>
    <TouchableHighlight onPress={() => { this.setModal2Visible(!this.state.modal2); }} underlayColor="rgba(0,0,0,0)" >
    <View style={{width: 40, textAlign: 'left', padding: 5}}>
    <Icon type='font-awesome' name="arrow-left" size={20} color="rgba(0,51,82,1)" />
    </View>
    </TouchableHighlight>
      <Text h1 style={{fontSize: 20, fontWeight: 'bold', color: 'rgba(0,51,82,1)', marginLeft: 10}}>ADD MONEY</Text>
  </View>
  <ScrollView style={{ width: '100%', height: '100%', paddingTop: '10%'}}>
  <View style={{flex: 1, alignItems: 'center'}}>
  <Picker
    selectedValue={this.state.depoBank}
    style={{height: 50, width: '95%', backgroundColor: 'white', margin: 10, borderRadius: 0, color: 'rgba(0,51,82,1)' }}
    onValueChange={(itemValue, itemIndex) =>
    this.setState({depoBank: itemValue})
    }
    
    >
    <Picker.Item key="0" label="Select Bank" value="" />
    {
      this.state.banks.map((item) => (
        <Picker.Item key={item.code} label={item.name} value={item.ref} itemStyle={{color: 'rgba(0,51,82,1)'}} />
      ))
    }
    
  </Picker>
  <Picker
    selectedValue={this.state.depoMethod}
    style={{height: 50, width: '95%', backgroundColor: 'white', margin: 10, borderRadius: 0, color: 'rgba(0,51,82,1)' }}
    onValueChange={(itemValue, itemIndex) =>
    this.setState({depoMethod: itemValue})
    }
    
    >
    <Picker.Item key="0" label="Select Method" value="" />
    <Picker.Item key="1" label="Bank Deposit" value="Cash%20Deposit" />
    <Picker.Item key="2" label="Bank Transfer" value="Transfer%20Deposit" />
    <Picker.Item key="3" label="USSD Transfer" value="USSD%20Deposit" />
    
  </Picker>
  <Input
    ref="depoAmount"
    onChangeText={(depoAmount) => this.setState({depoAmount})} value={this.state.depoAmount}
    placeholder='Amount'
    shake={true}
    inputContainerStyle={{backgroundColor: 'white', margin: 10,
    marginLeft: 0, marginRight: 0, borderRadius: 0, borderBottomWidth: 0}}
    inputStyle={{color: 'rgba(0,51,82,1)'}}
    errorStyle={{ color: 'red' }}
    keyboardType='numeric'
  />
  <Input
    ref="Depositor"
    onChangeText={(Depositor) => this.setState({Depositor})} value={this.state.Depositor}
    placeholder="Depositor's Name"
    shake={true}
    inputContainerStyle={{backgroundColor: 'white', margin: 10,
    marginLeft: 0, marginRight: 0, borderRadius: 0, borderBottomWidth: 0}}
    inputStyle={{color: 'rgba(0,51,82,1)'}}
    errorStyle={{ color: 'red' }}
    errorMessage= {this.state.depoError}
  />
  <View style={{flexDirection: 'row', width: '100%', paddingRight: 10}}>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref="Password1"
                            onChangeText={(Password1) => this.setState({Password1})} value={this.state.Password1}
                            secureTextEntry={true}
                            placeholder= 'A'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.Password2.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.Password2 = input; }}
                            onChangeText={(Password2) => this.setState({Password2})} value={this.state.Password2}
                            secureTextEntry={true}
                            placeholder= 'U'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.Password3.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.Password3 = input; }}
                            onChangeText={(Password3) => this.setState({Password3})} value={this.state.Password3}
                            secureTextEntry={true}
                            placeholder= 'T'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.Password4.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.Password4 = input; }}
                            onChangeText={(Password4) => this.setState({Password4})} value={this.state.Password4}
                            secureTextEntry={true}
                            placeholder= 'H'
                            shake={true}
                            maxLength={1}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          </View>
                          
  <Button title="PROCEED" 
    titleStyle={{color: "rgba(0,51,82,1)"}} 
    raised={true} 
    loading={this.state.depoButLoad}
    disabled={this.state.depoButDisabled} 
    loadingProps={{color: 'rgba(0,51,82,1)'}}
    buttonStyle={{minWidth: 120, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'rgba(0,51,82,1)', borderRadius: 10}}
    onPress={() => {this.deposit()}}
    />
</View>
  </ScrollView>
  </View>
</Modal>


<Modal
                          animationType="slide"
                          transparent={false}
                          visible={this.state.modal1}
                          onRequestClose={() => {
                            this.setModal1Visible(!this.state.modal1);
                          }} style={{backgroundColor: '#4682B4'}}>
                          <StatusBar
                            barStyle="light-content"
                            backgroundColor="rgba(0,51,82,1)"
                          />
                          <View style={{flex: 1, width: '100%', backgroundColor: '#e1e2e3'}}>
                          <View raised={true} style={{flex: 1, flexDirection: 'row', backgroundColor: '#e1e2e3', padding: 10, paddingTop: 15, minHeight: 60, elevation: 5}}>
                            <TouchableHighlight onPress={() => { this.setModal1Visible(!this.state.modal1); }} underlayColor="rgba(0,0,0,0)" >
                            <View style={{width: 40, textAlign: 'left', padding: 5}}>
                            <Icon type='font-awesome' name="arrow-left" size={20} color="rgba(0,51,82,1)" />
                            </View>
                            </TouchableHighlight>
                              <Text h1 style={{fontSize: 20, fontWeight: 'bold', color: 'rgba(0,51,82,1)', marginLeft: 10}}>TRANSFER</Text>
                          </View>
                          <ScrollView style={{ width: '100%', height: '100%', paddingTop: 10}}>
                         <View style={{flexDirection: 'row', width: '100%'}}>
                          <Button title="PAYNT" 
                          titleStyle={{color: this.state.colorTab1, fontSize: 14}} 
                          raised={true} 
                          buttonStyle={{minWidth: '50%', backgroundColor: this.state.backTab1, height: 50,}}
                          type='solid'
                          onPress={ () =>{this.tabs('tab1'); this.setState({Bank: "paynt"});}}
                          />
                          <Button title="BANKS" 
                          titleStyle={{color: this.state.colorTab2, fontSize: 14}} 
                          raised={true} 
                          buttonStyle={{minWidth: '50%', backgroundColor: this.state.backTab2, height: 50,}}
                          type='solid'
                          onPress={ () =>{this.tabs('tab2');}}
                          />
                        </View>
                        { this.state.tab1 ?
                          <View style={{flex: 1, alignItems: 'center'}}>
                            
                          <Input
                            ref="Account"
                            onChangeText={(Account) => this.setState({Account})} value={this.state.Account}
                            placeholder='Phone Number'
                            shake={true}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, borderBottomWidth: 0}}
                            inputStyle={{color: 'rgba(0,51,82,1)'}}
                            errorStyle={{ color: 'red' }}
                            errorMessage= {this.state.transAccount}
                            keyboardType='numeric'
                          />
                          <Input
                            ref="Amount"
                            onChangeText={(Amount) => this.setState({Amount})} value={this.state.Amount}
                            placeholder='Enter Amount'
                            shake={true}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, borderBottomWidth: 0}}
                            inputStyle={{color: 'rgba(0,51,82,1)'}}
                            errorStyle={{ color: 'red' }}
                            errorMessage= {this.state.transAmount}
                            keyboardType='numeric'
                          />
                          <View style={{flexDirection: 'row', width: '100%', paddingRight: 10}}>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref="Password1"
                            onChangeText={(Password1) => this.setState({Password1})} value={this.state.Password1}
                            secureTextEntry={true}
                            placeholder= 'A'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.Password2.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.Password2 = input; }}
                            onChangeText={(Password2) => this.setState({Password2})} value={this.state.Password2}
                            secureTextEntry={true}
                            placeholder= 'U'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.Password3.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.Password3 = input; }}
                            onChangeText={(Password3) => this.setState({Password3})} value={this.state.Password3}
                            secureTextEntry={true}
                            placeholder= 'T'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.Password4.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.Password4 = input; }}
                            onChangeText={(Password4) => this.setState({Password4})} value={this.state.Password4}
                            secureTextEntry={true}
                            placeholder= 'H'
                            shake={true}
                            maxLength={1}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          </View>
                           <Button title="SEND   " 
                                titleStyle={{color: "rgba(0,51,82,1)"}} raised={true} icon={ <Icon name="send" size={15}
                                color="rgba(0,51,82,1)" /> } 
                                iconRight={true}
                                loading={this.state.transferButLoad}
                                disabled={this.state.transferButDisabled} 
                                loadingProps={{color: 'rgba(0,51,82,1)'}}
                                buttonStyle={{minWidth: 100, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'rgba(0,51,82,1)', borderRadius: 10}}
                                onPress={() => {this.transfer()}}
                                />
                         </View>
                        : null }
                        {this.state.tab2 ?

                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Picker
                                selectedValue={this.state.Bank}
                                style={{height: 50, width: '95%', backgroundColor: 'white', margin: 10, borderRadius: 0, color: 'rgba(0,51,82,1)' }}
                                onValueChange={(itemValue, itemIndex) =>
                                this.setState({Bank: itemValue})
                                }
                                
                                >
                                <Picker.Item key="0" label="Select Bank" value="" />
                                {
                                  this.state.banks.map((item) => (
                                    <Picker.Item key={item.code} label={item.name} value={item.ref} itemStyle={{color: 'rgba(0,51,82,1)'}} />
                                  ))
                                }
                                
                              </Picker>
                          <Input
                            ref="Account"
                            onChangeText={(Account) => this.setState({Account})} value={this.state.Account}
                            placeholder='Account Number'
                            shake={true}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, borderBottomWidth: 0}}
                            inputStyle={{color: 'rgba(0,51,82,1)'}}
                            errorStyle={{ color: 'red' }}
                            errorMessage= {this.state.transAccount}
                            keyboardType='numeric'
                          />
                          <Input
                            ref="Amount"
                            onChangeText={(Amount) => this.setState({Amount})} value={this.state.Amount}
                            placeholder='Enter Amount'
                            shake={true}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, borderBottomWidth: 0}}
                            inputStyle={{color: 'rgba(0,51,82,1)'}}
                            errorStyle={{ color: 'red' }}
                            errorMessage= {this.state.transAmount}
                            keyboardType='numeric'
                          />
                          <View style={{flexDirection: 'row', width: '100%', paddingRight: 10}}>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref="Password1"
                            onChangeText={(Password1) => this.setState({Password1})} value={this.state.Password1}
                            secureTextEntry={true}
                            placeholder= 'A'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.Password2.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.Password2 = input; }}
                            onChangeText={(Password2) => this.setState({Password2})} value={this.state.Password2}
                            secureTextEntry={true}
                            placeholder= 'U'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.Password3.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.Password3 = input; }}
                            onChangeText={(Password3) => this.setState({Password3})} value={this.state.Password3}
                            secureTextEntry={true}
                            placeholder= 'T'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.Password4.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.Password4 = input; }}
                            onChangeText={(Password4) => this.setState({Password4})} value={this.state.Password4}
                            secureTextEntry={true}
                            placeholder= 'H'
                            shake={true}
                            maxLength={1}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          </View>
                           <Button title="SEND   " 
                                titleStyle={{color: "rgba(0,51,82,1)"}} raised={true} icon={ <Icon name="send" size={15}
                                color="rgba(0,51,82,1)" /> } 
                                iconRight={true}
                                loading={this.state.transferButLoad}
                                disabled={this.state.transferButDisabled} 
                                loadingProps={{color: 'rgba(0,51,82,1)'}}
                                buttonStyle={{minWidth: 100, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'rgba(0,51,82,1)', borderRadius: 10}}
                                onPress={() => {this.transfer()}}
                                />
                         </View>
                         : null
                         }
                         
                          </ScrollView>
                          </View>
                        </Modal>


<Modal
                          animationType="slide"
                          transparent={false}
                          visible={this.state.modal6}
                          onRequestClose={() => {
                            this.setModal6Visible(!this.state.modal6);
                          }} style={{backgroundColor: '#4682B4'}}>
                          <StatusBar
                            barStyle="light-content"
                            backgroundColor="rgba(0,51,82,1)"
                          />
                          <View style={{flex: 1, width: '100%', backgroundColor: '#e1e2e3'}}>
                          <View raised={true} style={{flex: 1, flexDirection: 'row', backgroundColor: '#e1e2e3', padding: 10, paddingTop: 15, minHeight: 60, elevation: 5}}>
                            <TouchableHighlight onPress={() => { this.setModal6Visible(!this.state.modal6); }} underlayColor="rgba(0,0,0,0)" >
                            <View style={{width: 40, textAlign: 'left', padding: 5}}>
                            <Icon type='font-awesome' name="arrow-left" size={20} color="rgba(0,51,82,1)" />
                            </View>
                            </TouchableHighlight>
                              <Text h1 style={{fontSize: 20, fontWeight: 'bold', color: 'rgba(0,51,82,1)', marginLeft: 10}}>AIRTIME</Text>
                          </View>
                          <ScrollView style={{ width: '100%', height: '100%', paddingTop: '10%'}}>
                          <View style={{flex: 1, alignItems: 'center'}}>
                            <Picker
                                selectedValue={this.state.network}
                                style={{height: 50, width: '95%', backgroundColor: 'white', margin: 10, borderRadius: 0, color: 'rgba(0,51,82,1)' }}
                                onValueChange={(itemValue, itemIndex) =>
                                this.setState({network: itemValue})
                                }
                                
                                >
                                <Picker.Item key="0" label="Select Network" value="" />
                                <Picker.Item key="9mobile" label="9MOBILE NIGERIA" value="9MOBILE" />
                                <Picker.Item key="airtel" label="AIRTEL NIGERIA" value="AIRTEL" />
                                <Picker.Item key="glo" label="GLO NIGERIA" value="GLO" />
                                <Picker.Item key="mtn" label="MTN NIGERIA" value="MTN" />
                                
                                
                              </Picker>
                          <Input
                            ref="phoneNumber"
                            onChangeText={(phoneNumber) => this.setState({phoneNumber})} value={this.state.phoneNumber}
                            placeholder='Phone Number'
                            shake={true}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, borderBottomWidth: 0}}
                            inputStyle={{color: 'rgba(0,51,82,1)'}}
                            keyboardType='numeric'
                          />
                          <Input
                            ref="airtimeAmount"
                            onChangeText={(airtimeAmount) => this.setState({airtimeAmount})} value={this.state.airtimeAmount}
                            placeholder='Amount (#50 - #50,000 NGN)'
                            shake={true}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, borderBottomWidth: 0}}
                            inputStyle={{color: 'rgba(0,51,82,1)'}}
                            keyboardType='numeric'
                          />
                          <View style={{flexDirection: 'row', width: '100%', paddingRight: 10}}>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref="Password1"
                            onChangeText={(Password1) => this.setState({Password1})} value={this.state.Password1}
                            secureTextEntry={true}
                            placeholder= 'A'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.Password2.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.Password2 = input; }}
                            onChangeText={(Password2) => this.setState({Password2})} value={this.state.Password2}
                            secureTextEntry={true}
                            placeholder= 'U'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.Password3.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.Password3 = input; }}
                            onChangeText={(Password3) => this.setState({Password3})} value={this.state.Password3}
                            secureTextEntry={true}
                            placeholder= 'T'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.Password4.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.Password4 = input; }}
                            onChangeText={(Password4) => this.setState({Password4})} value={this.state.Password4}
                            secureTextEntry={true}
                            placeholder= 'H'
                            shake={true}
                            maxLength={1}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          </View>
                          
                           <Button title="PURCHASE" 
                                titleStyle={{color: "rgba(0,51,82,1)"}} 
                                raised={true}
                                loading={this.state.airtimeButLoad}
                                disabled={this.state.airtimeButDisabled} 
                                loadingProps={{color: 'rgba(0,51,82,1)'}}
                                buttonStyle={{minWidth: 120, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'rgba(0,51,82,1)', borderRadius: 10}}
                                onPress={() => {this.airtime()}}
                                />
                         </View>
                         
                          </ScrollView>
                          </View>
                        </Modal>

<Modal
                          animationType="slide"
                          transparent={false}
                          visible={this.state.pushmodal}
                          onRequestClose={() => {
                            this.pushmodalVisible(!this.state.pushmodal);
                          }} style={{backgroundColor: '#4682B4'}}>
                          <View style={{flex: 1, width: '100%', backgroundColor: '#e1e2e3'}}>
                          <View raised={true} style={{flex: 1, flexDirection: 'row', backgroundColor: '#e1e2e3', padding: 10, paddingTop: 15, minHeight: 60, elevation: 5}}>
                            <TouchableHighlight onPress={() => { this.pushmodalVisible(!this.state.pushmodal); }} underlayColor="rgba(0,0,0,0)" >
                            <View style={{width: 40, textAlign: 'left', padding: 5}}>
                            <Icon type='font-awesome' name="arrow-left" size={20} color="rgba(0,51,82,1)" />
                            </View>
                            </TouchableHighlight>
                              <Text h1 style={{fontSize: 20, fontWeight: 'bold', color: 'rgba(0,51,82,1)', marginLeft: 10}}>NOTIFICATION</Text>
                          </View>
                          <ScrollView style={{ width: '100%', height: '100%' }}>
                          <View style={{flex: 1, alignItems: 'center', }}>
                          <Card
                            containerStyle={{width: '100%', backgroundColor: '#e1e2e3'}}
                            title={this.state.pushData.title}
                            titleStyle={{textTransform: 'uppercase', color: 'rgba(0,51,82,1)'}}
                            >
                            <Text style={{marginBottom: 10}}>{this.state.pushData.bigText}</Text>
                            <Image
                            source={{ uri: this.state.pushData.image }}
                            style={{ width: '100%', height: 200 }}
                            PlaceholderContent={<ActivityIndicator />}
/>
                            <Button
                              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,}}
                              title='DONE'
                              type="outline"
                              onPress={() => { this.pushmodalVisible(!this.state.pushmodal); }}
                               />
                          </Card>
                         </View>
                          </ScrollView>
                          </View>
                        </Modal>

<Modal
                          animationType="slide"
                          transparent={false}
                          visible={this.state.modal7}
                          onRequestClose={() => {
                            this.setModal7Visible(!this.state.modal7);
                          }} style={{backgroundColor: '#4682B4'}}>
                          <StatusBar
                            barStyle="light-content"
                            backgroundColor="rgba(0,51,82,1)"
                          />
                          <View style={{flex: 1, width: '100%', backgroundColor: '#e1e2e3'}}>
                          <View raised={true} style={{flex: 1, flexDirection: 'row', backgroundColor: '#e1e2e3', padding: 10, paddingTop: 15, minHeight: 60, elevation: 5}}>
                            <Button 
                            title=""
                            type="clear"
                            raised={true}
                            icon={ <Icon type='font-awesome' name="arrow-left" size={20} color="rgba(0,51,82,1)" /> } 
                            iconRight={true}
                            onPress={() => { this.setModal7Visible(!this.state.modal7); }}
                            buttonStyle={{padding: 5}}
                            />
                              <Text h1 style={{fontSize: 20, fontWeight: 'bold', color: 'rgba(0,51,82,1)', marginLeft: 50}}>DATA</Text>
                          </View>
                          <ScrollView style={{ width: '100%', height: '100%', paddingTop: '10%'}}>
                          <View style={{flex: 1, alignItems: 'center'}}>
                            <Picker
                                selectedValue={this.state.network}
                                style={{height: 50, width: '95%', backgroundColor: 'white', margin: 10, borderRadius: 0, color: 'rgba(0,51,82,1)' }}
                                onValueChange={(itemValue, itemIndex) =>{
                                this.setState({network: itemValue}); this.data_plan(itemValue);}
                                }
                                
                                >
                                <Picker.Item key="0" label="Select Network" value="" />
                                <Picker.Item key="9mobile" label="9MOBILE NIGERIA" value="9MOBILE" />
                                <Picker.Item key="airtel" label="AIRTEL NIGERIA" value="AIRTEL" />
                                <Picker.Item key="glo" label="GLO NIGERIA" value="GLO" />
                                <Picker.Item key="mtn" label="MTN NIGERIA" value="MTN" />
                              </Picker>

                              <Picker
                                selectedValue={this.state.dataPlan}
                                style={{height: 50, width: '95%', backgroundColor: 'white', margin: 10, borderRadius: 0, color: 'rgba(0,51,82,1)' }}
                                onValueChange={(itemValue, itemIndex) => {
                                this.setState({dataPlan: itemValue}); }
                                }
                                
                                >
                                <Picker.Item key="empty" label="Select Data PLan" value="" />
                                {
                                  this.state.dataPlans.map((item, i) => (
                                    <Picker.Item key={i} label={item.name} value={item.code+"{//}"+item.price} itemStyle={{color: 'rgba(0,51,82,1)'}} />
                                  ))
                                }
                                
                              </Picker>

                          <Input
                            ref="phoneNumber"
                            onChangeText={(phoneNumber) => this.setState({phoneNumber})} value={this.state.phoneNumber}
                            placeholder='Phone Number'
                            shake={true}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, borderBottomWidth: 0}}
                            inputStyle={{color: 'rgba(0,51,82,1)'}}
                            keyboardType='numeric'
                          />
                          <View style={{flexDirection: 'row', width: '100%', paddingRight: 10}}>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref="Password1"
                            onChangeText={(Password1) => this.setState({Password1})} value={this.state.Password1}
                            secureTextEntry={true}
                            placeholder= 'A'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.Password2.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.Password2 = input; }}
                            onChangeText={(Password2) => this.setState({Password2})} value={this.state.Password2}
                            secureTextEntry={true}
                            placeholder= 'U'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.Password3.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.Password3 = input; }}
                            onChangeText={(Password3) => this.setState({Password3})} value={this.state.Password3}
                            secureTextEntry={true}
                            placeholder= 'T'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.Password4.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.Password4 = input; }}
                            onChangeText={(Password4) => this.setState({Password4})} value={this.state.Password4}
                            secureTextEntry={true}
                            placeholder= 'H'
                            shake={true}
                            maxLength={1}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          </View>
                          
                           <Button title="PURCHASE" 
                                titleStyle={{color: "rgba(0,51,82,1)"}} 
                                raised={true}
                                loading={this.state.dataButLoad}
                                disabled={this.state.dataButDisabled} 
                                loadingProps={{color: 'rgba(0,51,82,1)'}}
                                buttonStyle={{minWidth: 120, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'rgba(0,51,82,1)', borderRadius: 10}}
                                onPress={() => {this.buy_data()}}
                                />
                         </View>
                         
                          </ScrollView>
                          </View>
                        </Modal>



<Modal
animationType="slide"
transparent={false}
visible={this.state.modal}
onRequestClose={() => {
  this.setModalVisible(!this.state.modal);
}} style={{backgroundColor: '#4682B4'}}>
<StatusBar
  barStyle="light-content"
  backgroundColor="rgba(0,51,82,1)"
/>
<View style={{flex: 1, width: '100%', backgroundColor: '#e1e2e3'}}>
<View raised={true} style={{flex: 1, flexDirection: 'row', backgroundColor: '#e1e2e3', padding: 10, paddingTop: 15, minHeight: 60, elevation: 5}}>
<TouchableHighlight onPress={() => { this.setModalVisible(!this.state.modal); }} underlayColor="rgba(0,0,0,0)" >
<View style={{width: 40, textAlign: 'left', padding: 5}}>
<Icon type='font-awesome' name="arrow-left" size={20} color="rgba(0,51,82,1)" />
</View>
</TouchableHighlight>
    <Text h1 style={{fontSize: 20, fontWeight: 'bold', color: 'rgba(0,51,82,1)', marginLeft: 10}}>SETTINGS</Text>
</View>
<ScrollView style={{ width: '100%', height: '100%',}}>
<View style={{flex: 1,}}>
      
  {
    list.map((item, i) => (
      <ListItem
        containerStyle={{paddingTop: 20, paddingBottom: 20, backgroundColor: '#e1e2e3'}}
        titleStyle={{color: 'rgba(0,51,82,1)', fontWeight: 'bold'}}
        subtitleStyle={{color: 'red', fontWeight: 'bold', fontSize: 8}}
        key={i}
        title={item.title}
        subtitle={item.subtitle}
        leftIcon={{ name: item.icon, color: item.color }}
        bottomDivider
        chevron={{color: 'rgba(0,51,82,1)'}}
        onPress={() => {this.settings(item.function);}}
      />
    ))
  }

</View>                 
</ScrollView>
</View>
</Modal>


<Modal
animationType="slide"
transparent={false}
visible={this.state.modal5}
onRequestClose={() => { this.setModal5Visible(!this.state.modal5);}} 
style={{backgroundColor: '#4682B4'}}>
<StatusBar
  barStyle="light-content"
  backgroundColor="rgba(0,51,82,1)"
/>
<View style={{flex: 1, width: '100%', backgroundColor: '#e1e2e3',}}>
<View raised={true} style={{flex: 1, flexDirection: 'row', backgroundColor: '#e1e2e3', padding: 10, paddingTop: 15, minHeight: 60, elevation: 5}}>
  <TouchableHighlight onPress={() => { this.setModal5Visible(!this.state.modal5);}} underlayColor="rgba(0,0,0,0)" >
<View style={{width: 40, textAlign: 'left', padding: 5}}>
<Icon type='font-awesome' name="arrow-left" size={20} color="rgba(0,51,82,1)" />
</View>
</TouchableHighlight>
    <Text h1 style={{fontSize: 18, fontWeight: 'bold', color: 'rgba(0,51,82,1)', marginLeft: 10}}>{this.state.conv_title.length > 25? this.state.conv_title.split("_").join("\r").substr(0, 25)+"...": this.state.conv_title.split("_").join("\r").substr(0, 25) }</Text>
</View>
<ScrollView style={{ width: '100%',}}> 
   <View style={{flex: 1, minHeight: 500, paddingLeft: 5, paddingRight: 5,}}>
   <View style={{marginBottom: 10, marginTop: 10, alignItems: 'flex-end'}}>
   <ListItem
        containerStyle={{paddingTop: 10, paddingBottom: 10, borderRadius: 15, borderTopRightRadius: 0, width: "80%", position: 'relative', right: 0}}
        titleStyle={{color: 'rgba(0,51,82,1)',}}
        key="refmes"
        title={this.state.conv.split("_").join("\r")}
         subtitle={this.state.conv_time}
        subtitleStyle={{position: 'relative', right: 5, fontSize: 10}}
      />   
      </View>
   {
    this.state.repz !== []?
    this.state.repz.map((item, i) => (
      <View key={i} style={{ marginBottom: 10, alignItems: 'flex-end', position: 'relative', right: item.right+"%"}}>
      <ListItem
        containerStyle={{backgroundColor: item.back, paddingTop: 10, paddingBottom: 10, borderRadius: 15, borderTopRightRadius: item.rightr, borderTopLeftRadius: item.leftr, width: "80%",}}
        titleStyle={{color: item.color,}}
        key={i}
        title={item.msg !== null? item.msg.split("_").join("\r"): ""}
        subtitle={item.time}
        subtitleStyle={{position: 'relative', right: 5, fontSize: 10}}
      />
      </View>
    ))
    : (
      <Button 
  title=""
  type="clear"
  raised={true}
  loading={true}
  loadingProps={{color: 'rgba(0,51,82,1)'}}
  />
  )
  }
</View>
  
</ScrollView>
<View style={{bottom: 0, backgroundColor: '#fff'}}>
  <Input
    ref="Reply"
    onChangeText={(Reply) => this.setState({Reply})} value={this.state.Reply}
    placeholder="Reply"
    shake={true}
    disabled={this.state.mesDisabled}
    rightIcon={{ type: 'font-awesome', name: 'arrow-right', color: '#fff', onPress: () => {this.send_reply();} }}
    inputContainerStyle={{backgroundColor: '#fff', marginTop: 10, height: 50,
    marginLeft: 0, marginRight: 0, borderRadius: 0, borderBottomWidth: 0, padding: 0,}}
    inputStyle={{color: 'rgba(0,51,82,1)', height: 50, margin: 0, backgroundColor: '#fff'}}
    multiline={true}
    rightIconContainerStyle={{marginRight: 10, padding: 5, backgroundColor: 'rgba(0,51,82,1)', borderRadius: 10, position: 'absolute',  right: 5}}
  />
</View>
</View>
</Modal>


<Modal
animationType="slide"
transparent={false}
visible={this.state.modal3}
onRequestClose={() => {
  this.setModal3Visible(!this.state.modal3);
}} style={{backgroundColor: '#4682B4'}}>
<StatusBar
  barStyle="light-content"
  backgroundColor="rgba(0,51,82,1)"
/>

<View style={{flex: 1, width: '100%', backgroundColor: '#e1e2e3'}}>

<View style={{flex: 1, minHeight: 50, backgroundColor: '#e1e2e3', elevation: 5}}>
<View raised={true} style={{flex: 1,  flexDirection: 'row', backgroundColor: '#e1e2e3', padding: 10, paddingTop: 15, height: 60}}>
  <TouchableHighlight onPress={() => { this.setModal3Visible(!this.state.modal3); }} underlayColor="rgba(0,0,0,0)" >
<View style={{width: 40, textAlign: 'left', padding: 5}}>
<Icon type='font-awesome' name="arrow-left" size={20} color="rgba(0,51,82,1)" />
</View>
</TouchableHighlight>
    <Text h1 style={{fontSize: 20, fontWeight: 'bold', color: 'rgba(0,51,82,1)', marginLeft: 10}}>SUPPORT</Text>
</View>
</View> 
   <ScrollView style={{ width: '100%',}}> 
   <View style={{flex: 1, minHeight: 480}}>
{
    this.state.support.map((item) => (
      <ListItem
        containerStyle={{paddingTop: 20, paddingBottom: 20, backgroundColor: '#e1e2e3'}}
        titleStyle={{color: 'rgba(0,51,82,1)', fontWeight: 'bold'}}
        subtitleStyle={{color: 'rgba(0,51,82,1)',}}
        key={item.key}
        title={item.title.length > 30? item.title.split("_").join("\r").substr(0, 30)+"...": item.title.split("_").join("\r").substr(0, 30) }
        subtitle={item.mes.length > 60? item.mes.split("_").join("\r").substr(0, 60)+"..."+"\n\n"+item.date: item.mes.split("_").join("\r").substr(0, 60)+"\n\n"+item.date }
        leftIcon={{ name: item.icon, color: item.color }}
        rightIcon={{ name: 'star', color: item.unread }}
        bottomDivider
        chevron={{color: 'rgba(0,51,82,1)'}}
        onPress={() => {this.show_mes(item.key);}}
      />
    ))
  }
 
  </View>
  
</ScrollView>
<View style={{bottom: 0, backgroundColor: '#fff'}}>
  <Input
    ref="Subject"
    onChangeText={(Subject) => this.setState({Subject})} value={this.state.Subject}
    placeholder="Subject"
    shake={true}
    inputContainerStyle={{backgroundColor: '#e1e2e3', marginTop: 10,
    marginLeft: 0, marginRight: 0, borderRadius: 0, borderBottomWidth: 0, padding: 0,}}
    inputStyle={{color: 'rgba(0,51,82,1)', margin: 0, backgroundColor: '#fff'}}
  />
  <Input
    ref="Message"
    onChangeText={(Message) => this.setState({Message})} value={this.state.Message}
    placeholder="Type message"
    shake={true}
    rightIcon={{ type: 'font-awesome', name: 'arrow-right', color: '#fff', onPress: () => {this.sendm();} }}
    inputContainerStyle={{backgroundColor: '#fff', marginTop: 10, height: 80,
    marginLeft: 0, marginRight: 0, borderRadius: 0, borderBottomWidth: 0, padding: 0,}}
    inputStyle={{color: 'rgba(0,51,82,1)', height: 80, margin: 0, backgroundColor: '#fff'}}
    multiline={true}
    rightIconContainerStyle={{marginRight: 10, padding: 5, backgroundColor: 'rgba(0,51,82,1)', borderRadius: 10,}}
  />
</View>
</View>
</Modal>




        </ScrollView>
        
      </View>
    );
  }else{
   return(<Mainz />);
  }
  }
}


class Mainz extends ValidationComponent {
constructor(props) {
    super(props);
  this.state = { 
  UserMail: '',
  UserPass: '',
  usermail: '',
  userpass: '',
  logButLoad: false,
  logButDisabled: false,
  modalVisible: false,
  modal1Visible: false,
  modal2Visible: false,
  modal3Visible: false,
  modal4Visible: false,
  loginPassShow: true,
  loginPassIcon: 'eye',
  regPassShow: true,
  regPassIcon: 'eye',
  regConPassShow: true,
  regConPassIcon: 'eye',
  regButLoad: false,
  regButDisabled: false,
  Firstname: '',
  Lastname: '',
  Email: '',
  Mobile: '',
  Password: '',
  ConfirmPassword: '',
  fn: '',
  ln: '',
  em: '',
  mo: '',
  pa: '',
  co: '',
  ActivationNum: '',
  actNum: '',
  activateButLoad: false,
  activateButDisabled: false,
  login: false,
  resendButLoad: false,
  resendButDisabled: false,
  ForgotMail: '',
  forgotConf: '',
  ForgotCode: '',
  forgotcode: '',
  forgotAuthButLoad: false,
  forgotAuthButDisabled: false,
  resendForgotButLoad: false,
  resendForgotButDisabled: false,
  NewPassword: '',
  ConfirmNewPassword: '',
  newPassShow: true,
  newPassIcon: 'eye',
  newConPassShow: true,
  newConPassIcon: 'eye',
  newpa: '',
  newco: '',
  setPassButDisable: false,
  setPassButLoad: false,
  fmailerr: '',
  banks: '',
  bal: '',
  tranz: [
    {
    amount: "No transaction record yet." ,
    icon: 'flag',
    color: 'rgba(0,51,82,1)',
    key: 0,
    purpose: '',
    date: '',
    ref: '',
    disabled: true,
  }
    ],
  support: [
    {
    mes: "You don't have any active ticket." ,
    title: "No Active Ticket",
    icon: 'flag',
    status: 'open',
    color: 'rgba(0,51,82,1)',
    key: 0,
    ref: '',
    reply: [],
    disabled: true,
  }
    ],
    gloPlans: [],
    mtnPlans: [],
    mobilePlans: [],
    airtelPlans: [],
    pushmodal: false,
    pushData: [],
    setPin: false,
    nPassword1: '',
    nPassword2: '',
    nPassword3: '',
    nPassword4: '',
    cPassword1: '',
    cPassword2: '',
    cPassword3: '',
    cPassword4: '',
    resetChangeLoad: false,
    resetChangeDisabled: false,
}

}
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
      setModal1Visible(visible) {
        this.setState({modal1Visible: visible});
      }
      setModal2Visible(visible) {
        this.setState({modal2Visible: visible});
      }
      setModal3Visible(visible) {
        this.setState({modal3Visible: visible});
      }
      setModal4Visible(visible) {
        this.setState({modal4Visible: visible});
      }
      pushmodalVisible(visible) {
        this.setState({pushmodal: visible});
      }
      setPinVisible(visible) {
        this.setState({setPin: visible});
      }
      setLoginPassShow(show) {
        this.setState({loginPassShow: show});
        if(this.state.loginPassIcon == 'eye'){
        this.setState({loginPassIcon: 'eye-slash'});
      }else{
        this.setState({loginPassIcon: 'eye'});
      }
      
      }

      setRegPassShow(show) {
        this.setState({regPassShow: show});
        if(this.state.regPassIcon == 'eye'){
        this.setState({regPassIcon: 'eye-slash'});
      }else{
        this.setState({regPassIcon: 'eye'});
      }
      
      }

      setRegConPassShow(show) {
        this.setState({regConPassShow: show});
        if(this.state.regConPassIcon == 'eye'){
        this.setState({regConPassIcon: 'eye-slash'});
      }else{
        this.setState({regConPassIcon: 'eye'});
      }
      
      }

      setNewPassShow(show) {
        this.setState({newPassShow: show});
        if(this.state.newPassIcon == 'eye'){
        this.setState({newPassIcon: 'eye-slash'});
      }else{
        this.setState({newPassIcon: 'eye'});
      }
      
      }

      setNewConPassShow(show) {
        this.setState({newConPassShow: show});
        if(this.state.newConPassIcon == 'eye'){
        this.setState({newConPassIcon: 'eye-slash'});
      }else{
        this.setState({newConPassIcon: 'eye'});
      }
      
      }

reset_p(){
  var password1 =  this.state.nPassword1+this.state.nPassword2+this.state.nPassword3+this.state.nPassword4;
  var password2 =  this.state.cPassword1+this.state.cPassword2+this.state.cPassword3+this.state.cPassword4;
  this.setState({ resetChangeDisabled: true, resetChangeLoad: true,});
    if(password1 !== "" && password1.length === 4){
      if(password2 !== "" && password2.length === 4){
      if(password1 === password2){

      return fetch("https://paynt.p.rapidapi.com/resetpass/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "user": this.state.user,
    "pass": "",
    "pass1": password1,
    "pass2": password2,
  }),
})
.then((response) => response.json())
    .then((data) => {
      if(data.done === true){
        this.setState({resetOverlay: false, resetSuccess: true, resetChangeDisabled: false, resetChangeLoad: false, Password1: '', Password2: '', Password3: '', Password4: '', nPassword1: '', nPassword2: '', nPassword3: '', nPassword4: '', cPassword1: '', cPassword2: '', cPassword3: '', cPassword4: ''});
         Snackbar.show({
        title: "Signed up successfully!",
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'LOGIN',
          color: 'white',
          onPress: () => { this.setState({setPin: false}); this.setModal2Visible(false); },
        },
      });
      }else{
        this.setState({ resetChangeDisabled: false, resetChangeLoad: false,});
  Snackbar.show({
        title: data.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { },
        },
      });
       
      }
    })
    .catch((error) => {
      this.setState({ resetChangeDisabled: false, resetChangeLoad: false,});
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });


      }else{
        Snackbar.show({
        title: "New passwords do not match!",
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { },
        },
      });
      }

      }else{
        this.setState({resetPass2Error: "You have to confirm your new password."});
      }

    }else{
      this.setState({resetPass1Error: "Your new password is required."});
    }

}





componentDidMount(){
var self = this;
PushNotification.configure({

      onNotification: function (notification) {
        // console.log('NOTIFICATION:', notification);
        const clicked = notification.userInteraction;
        if (clicked) {
         // ToastAndroid.show(notification.message,ToastAndroid.CENTER);
         // alert(notification.ref);
         self.setState({pushData: notification.data});
         self.pushmodalVisible(true, notification.ref);
        } else {
        
        }
        // ToastAndroid.show(notification.message,ToastAndroid.CENTER);
      },
      popInitialNotification: true,
      requestPermissions: true,
    });


}





activ8(){
this.setState({activateButLoad: true});
this.setState({activateButDisabled: true});
var chk = this.validate({
        ActivationNum: {required: true, equalto: 6},
        });
        if(chk == true){
          this.setState({actNum: ''});
          // send API request

          return fetch("https://paynt.p.rapidapi.com/confirm/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "email": this.state.user,
    "conf": this.state.ActivationNum,
  }),
})
.then((response) => response.json())
    .then((data) => {
        this.setState({activateButLoad: false});
        this.setState({activateButDisabled: false});
      if(data.confirmed === true){
        this.state.ActivationNum = '';
        this.setModal2Visible(false);
        this.setState({user: data.ref, setPin: true});
        
      }else{

  Snackbar.show({
        title: data.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { },
        },
      });
       
      }
      
      
    })
    .catch((error) => {
      // console.error(error);
      this.setState({activateButLoad: false});
      this.setState({activateButDisabled: false});
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });

    // API request ends

        }else{
          this.setState({activateButLoad: false});
          this.setState({activateButDisabled: false});
          this.setState({actNum: 'The activation number is required and must be 6 characters in length.'});
        }
}

resend(){
  this.setState({resendButLoad: true});
this.setState({resendButDisabled: true});
// send API request
return fetch("https://paynt.p.rapidapi.com/confirm/gen/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "email": this.state.user,
  }),
})
.then((response) => response.json())
    .then((data) => {
        this.setState({resendButLoad: false});
        this.setState({resendButDisabled: false});
      if(data.sent === true){
        Snackbar.show({
        title: data.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { },
        },
      });
       
      }else{
  Snackbar.show({
        title: data.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { },
        },
      });
       
      }
      
      
    })
    .catch((error) => {
      // console.error(error);
      this.setState({resendButLoad: false});
      this.setState({resendButDisabled: false});
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });

    // API request ends
  
}


forgot(){
  this.setState({forgotButLoad: true});
this.setState({forgotButDisabled: true});
var chk = this.validate({
        ForgotMail: {email: true, required: true},
        });
        if(chk == true){
// send API request
return fetch("https://paynt.p.rapidapi.com/forgot/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "u": this.state.ForgotMail
  }),
})
.then((response) => response.json())
    .then((data) => {
        this.setState({forgotButLoad: false});
        this.setState({forgotButDisabled: false});
      if(data.sent === true){
        this.setState({forgotConf: data.sent});
        this.setModal4Visible(true);
        this.setModal1Visible(false);
        Snackbar.show({
        title: data.msg,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
       
      }else{
        if(data.msg === "Oops! This account has not been activated, an activation code has been sent to your email."){
          
            Snackbar.show({
        title: data.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => {
          this.setModal2Visible(true);
          this.setModal1Visible(false);
          this.setState({user: this.state.ForgotMail});
          this.state.ForgotMail = '';
          },
        },
      });
          

        }else{
          Snackbar.show({
        title: data.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { },
        },
      });
        }
      }
      
      
    })
    .catch((error) => {
      // console.error(error);
      this.setState({forgotButLoad: false});
      this.setState({forgotButDisabled: false});
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });
}else{
  this.setState({forgotButLoad: false});
  this.setState({forgotButDisabled: false});
  this.setState({fmailerr: 'Invalid email address.'});
}
    // API request ends
  
}



resend_forgot(){
  this.setState({resendForgotButLoad: true});
this.setState({resendForgotButDisabled: true});
// send API request
return fetch("https://paynt.p.rapidapi.com/forgot/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "u": this.state.ForgotMail,
  }),
})
.then((response) => response.json())
    .then((data) => {
        this.setState({resendForgotButLoad: false});
        this.setState({resendForgotButDisabled: false});
      if(data.sent !== ""){
        this.setState({forgotConf: data.sent});
        Snackbar.show({
        title: data.msg,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
       
      }else{
  Snackbar.show({
        title: data.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { },
        },
      });
       
      }
      
      
    })
    .catch((error) => {
      // console.error(error);
      this.setState({resendForgotButLoad: false});
      this.setState({resendForgotButDisabled: false});
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });

    // API request ends
  
}


forgot_auth(){
this.setState({forgotAuthButLoad: true});
this.setState({forgotAuthButDisabled: true});
var chk = this.validate({
        ForgotCode: {required: true, equalto: 6},
        });
        if(chk == true){
          this.setState({forgotcode: ''});

          return fetch("https://paynt.p.rapidapi.com/confirm/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "email": this.state.ForgotMail,
    "conf": this.state.ForgotCode,
  }),
})
.then((response) => response.json())
    .then((responseJson) => {
        this.setState({forgotAuthButLoad: false});
        this.setState({forgotAuthButDisabled: false});
      if(responseJson.confirmed === true){
        //load password reset UI
        this.setModal3Visible(true);
        this.setModal4Visible(false);
      }else{

  Snackbar.show({
        title: responseJson.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { },
        },
      });
       
      }
      
      
    })
    .catch((error) => {
      // console.error(error);
      this.setState({forgotAuthButLoad: false});
      this.setState({forgotAuthButDisabled: false});
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });
    // API request ends

        }else{
          this.setState({forgotAuthButLoad: false});
          this.setState({forgotAuthButDisabled: false});
          this.setState({forgotcode: 'Authorization code is required and must be 6 characters in length.'});
        }
}

setPassword(){
  this.setState({setPassButLoad: true});
this.setState({setPassButDisable: true});
var chk = this.validate({
        NewPassword: {required: true, minlength: 6},
        ConfirmNewPassword: {required: true, minlength: 6},
        });

        if(chk == true){
          this.setState({newpa: '', newco: ''});
          
          if(this.state.NewPassword === this.state.ConfirmNewPassword){
            // send API request

          return fetch("https://paynt.p.rapidapi.com/forgot/change/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "email": this.state.ForgotMail,
    "conf": this.state.ForgotCode,
    "pass": this.state.NewPassword,
  }),
})
.then((response) => response.json())
    .then((responseJson) => {
        this.setState({setPassButLoad: false});
        this.setState({setPassButDisable: false});
      if(responseJson.changed === true){
        //load password reset UI
        this.state.ForgotCode = '';
        this.state.forgotConf = '';
        this.state.ForgotMail = '';
        Snackbar.show({
        title: responseJson.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { this.state.NewPassword = ''; this.state.ConfirmNewPassword = ''; this.setModal3Visible(false); },
        },
      });
      }else{
        if(responseJson.msg === "Oops! This account has not been activated, an activation code has been sent to your email."){
           Snackbar.show({
        title: responseJson.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { 
            this.state.ForgotCode = '';
            this.state.forgotConf = '';
            this.state.ForgotMail = ''; 
            this.state.NewPassword = '';
            this.state.ConfirmNewPassword = '';
            this.setModal2Visible(true);
            this.setModal3Visible(false);
          },
        },
      });
        }else{
           Snackbar.show({
        title: responseJson.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { },
        },
      });
        }

 
       
      }
      
      
    })
    .catch((error) => {
      // console.error(error);
      this.setState({setPassButLoad: false});
      this.setState({setPassButDisable: false});
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });
    // API request ends


          }else{
            this.setState({setPassButLoad: false});
            this.setState({setPassButDisable: false});
            this.setState({newco: "Passwords do not match."});
          }

        
        }else{
          this.setState({setPassButLoad: false});
          this.setState({setPassButDisable: false});
          var p = this.getErrorsInField('NewPassword');
          var i = 0;
          var pa_str = "";
          for(i in p){
            var br = "";
            if(pa_str !== ""){
              br = "\n";
            }
            pa_str = pa_str+br+p[i];
          }
          this.setState({newpa: pa_str});

          var c = this.getErrorsInField('ConfirmNewPassword');
          var i = 0;
          var co_str = "";
          for(i in c){
            var br = "";
            if(co_str !== ""){
              br = "\n";
            }
            co_str = co_str+br+c[i];
          }
          this.setState({newco: co_str});
        }
}


      reg(){
        this.setState({regButLoad: true});
        this.setState({regButDisabled: true});
        var chk = this.validate({
        Firstname: {required: true},
        Lastname: {required: true},
        Password: {minlength:6, required: true},
        ConfirmPassword: {minlength:6, required: true},
        Email: {email: true, required: true},
        Mobile: {numbers: true, equalto: 11, required: true},
        });
        if(chk == true){
          this.state.fn = '';
          this.state.ln = '';
          this.state.em = '';
          this.state.pa = '';
          this.state.co = '';
          this.state.mo = '';
          //check if Confirm is equalto Password
          if(this.state.ConfirmPassword === this.state.Password){
            this.state.co = '';
            
return fetch("https://paynt.p.rapidapi.com/reg/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body":  JSON.stringify({
    "pass_conf": this.state.ConfirmPassword,
    "fname": this.state.Firstname,
    "code": "234",
    "passw": this.state.Password,
    "mobile": this.state.Mobile,
    "email": this.state.Email,
    "lname": this.state.Lastname,
    "username": this.state.Email,
  }),
  
})
.then(response => response.json())
.then((data) => {
      // alert("rsp");
      // console.error(data);
      this.setState({regButLoad: false});
      this.setState({regButDisabled: false});
      if(data.reg === true && data.ud !== ""){
        //load confirmation UI
        this.setModal2Visible(true);
        this.setModalVisible(false);
        this.state.Firstname = '';
        this.state.Lastname = '';
        this.state.Email = '';
        this.state.Mobile = '';
        this.state.Password = '';
        this.state.ConfirmPassword = '';
        this.setState({user: data.ud}); 

      }else{
        Snackbar.show({
        title: data.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { },
        },
      });

      }
      
      
    })
    .catch(error => {
      // alert("err");
      // console.error(error);
      this.setState({regButLoad: false});
      this.setState({regButDisabled: false});
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });

// API call end

          }else{
            this.state.co = "Passwords do not match.";
          }
          

        }else{

          var f = this.getErrorsInField('Firstname');
          var i = 0;
          var fn_str = "";
          for(i in f){
            var br = "";
            if(fn_str !== ""){
              br = "\n";
            }
            fn_str = fn_str+br+f[i];
          }
          this.state.fn = fn_str;

          var l = this.getErrorsInField('Lastname');
          var i = 0;
          var ln_str = "";
          for(i in l){
            var br = "";
            if(ln_str !== ""){
              br = "\n";
            }
            ln_str = ln_str+br+l[i];
          }
          this.state.ln = ln_str;

          var e = this.getErrorsInField('Email');
          var i = 0;
          var em_str = "";
          for(i in e){
            var br = "";
            if(em_str !== ""){
              br = "\n";
            }
            em_str = em_str+br+e[i];
          }
          this.state.em = em_str;

          var m = this.getErrorsInField('Mobile');
          var i = 0;
          var mo_str = "";
          for(i in m){
            var br = "";
            if(mo_str !== ""){
              br = "\n";
            }
            mo_str = mo_str+br+m[i];
          }
          this.state.mo = mo_str;

          var p = this.getErrorsInField('Password');
          var i = 0;
          var pa_str = "";
          for(i in p){
            var br = "";
            if(pa_str !== ""){
              br = "\n";
            }
            pa_str = pa_str+br+p[i];
          }
          this.state.pa = pa_str;

          var c = this.getErrorsInField('ConfirmPassword');
          var i = 0;
          var co_str = "";
          for(i in c){
            var br = "";
            if(co_str !== ""){
              br = "\n";
            }
            co_str = co_str+br+c[i];
          }
          this.state.co = co_str;

          this.setState({regButLoad: false});
          this.setState({regButDisabled: false});
        }
        
      }


login(){
  this.setState({logButLoad: true});
  this.setState({logButDisabled: true});
  var chk = this.validate({
  UserMail: {email: true, required: true},
  UserPass: {required: true},
  });
  if(chk == true){
    this.state.usermail = '';
    this.state.userpass = '';
    this.setState({user: this.state.UserMail});
    // API call start

 return fetch("https://paynt.p.rapidapi.com/login/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "u": this.state.UserMail,
    "p": this.state.UserPass,
  }),
})
.then((response) => response.json())
    .then((dat) => {
      if(dat.login === true){
        return fetch("https://paynt.p.rapidapi.com/banks/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "email": this.state.user,
  }),
})
.then((response) => response.json())
    .then((data) => {
      if(data.data !== "" && data.ref !== ""){
        



return fetch("https://paynt.p.rapidapi.com/transactions/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "user": data.ref,
  }),
})
.then((response) => response.json())
    .then((dataa) => {
      

return fetch("https://paynt.p.rapidapi.com/support/fetch/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "user": data.ref,
  }),
})
.then((response) => response.json())
    .then((dtt) => {
        return fetch("https://paynt.p.rapidapi.com/data/plans/", 
{
  "method": "POST",
  "headers": {
   "x-rapidapi-host": "paynt.p.rapidapi.com",
    "x-rapidapi-key": "blablabla",
    "content-type": "application/x-www-form-urlencoded",
  },
  "body": JSON.stringify({
    "user": data.ref,
  }),
})
.then((response) => response.json())
    .then((dato) => {
      this.setState({logButLoad: false});
      this.setState({logButDisabled: false});
      this.setState({bal: dataa.bal});
      if(data.data !== ""){
        this.setState({banks: data.data});
        if(dtt.data !== ""){
        this.setState({support: dtt.data});
       }
       if(dataa.data !== ""){
        this.setState({tranz: dataa.data});
       }
       if(dato.done === true){
        this.setState({mtnPlans: dato.mtn, airtelPlans: dato.airtel, gloPlans: dato.glo, mobilePlans: dato.mobile });
       }
        this.state.UserMail = '';
        this.state.UserPass = '';
        this.setState({user: data.ref});
        this.setState({login: dat.login});

      }else{
  Snackbar.show({
        title: data.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { },
        },
      });
       
      }
    })
    .catch((error) => {
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });   
      
    })
    .catch((error) => {
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });   
      
    })
    .catch((error) => {
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });





       
      }else{
  Snackbar.show({
        title: data.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { },
        },
      });
       
      }
      
      
    })
    .catch((error) => {
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });

        

      }else{
      this.setState({logButLoad: false});
      this.setState({logButDisabled: false});
      if(dat.error !== "Oops! This account has not been activated, an activation code has been sent to your email." && dat.error !== "You need to set a new authentication PIN for your account."){
        this.setState({user: dat.ud});
        Snackbar.show({
        title: dat.error,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { },
        },
      });

      }else{
        if(dat.error === "You need to set a new authentication PIN for your account."){
          this.setPinVisible(true);
          Snackbar.show({
        title: dat.error,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { },
        },
      });
        }else{
          this.setModal2Visible(true);
          Snackbar.show({
        title: dat.error,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
        action: {
          title: 'OK',
          color: 'white',
          onPress: () => { },
        },
      });
        }
        
        
      }

        
      }
      
      
    })
    .catch((error) => {
      // console.error(error);
      this.setState({logButLoad: false});
      this.setState({logButDisabled: false});
      Snackbar.show({
        title: "Unable to connect to the internet.",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0,51,82,0.8)',
        color: 'white',
      });
  });

// API call end
  }else{
   this.setState({logButLoad: false});
   this.setState({logButDisabled: false});
   var p = this.getErrorsInField('UserMail');
    var i = 0;
    var pa_str = "";
    for(i in p){
      var br = "";
      if(pa_str !== ""){
        br = "\n";
      }
      pa_str = pa_str+br+p[i];
    }
    this.setState({usermail: pa_str});

    var c = this.getErrorsInField('UserPass');
    var i = 0;
    var co_str = "";
    for(i in c){
      var br = "";
      if(co_str !== ""){
        br = "\n";
      }
      co_str = co_str+br+c[i];
    }
    this.setState({userpass: co_str});
  }
}


  render() {
if(this.state.login === false){
    return (
      
      <View>
        <StatusBar
          barStyle="light-content"
          backgroundColor="rgba(0,51,82,1)"
        />
        <ScrollView style={{minHeight: '100%', backgroundColor: '#e1e2e3'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: '25%'}}>
          <Image 
        resizeMode={'contain'}
        source={ require('./logo.png') } 
        style={{width: 100, height: 100, marginBottom: '10%'}} 
        />
        </View>
        <View style={styles.container}>
                  <Input
                    ref="UserMail"
                    onChangeText={(UserMail) => this.setState({UserMail})} value={this.state.UserMail}
                    placeholder='Email'
                    shake={true}
                    leftIcon={{ type: 'font-awesome', name: 'user', color: 'rgba(0,51,82,1)' }}
                    inputContainerStyle={{backgroundColor: 'white', margin: 10,
                    marginLeft: 0, marginRight: 0, borderRadius: 10}}
                    containerStyle={{ marginTop: '10%' }}
                    inputStyle={{color: 'rgba(0,51,82,1)'}}
                    keyboardType='email-address'
                    errorMessage= {this.state.usermail}
                  />
                  <Input
                    ref="UserPass"
                    onChangeText={(UserPass) => this.setState({UserPass})} value={this.state.UserPass}
                    secureTextEntry={this.state.loginPassShow}
                    placeholder='Password'
                    shake={true}
                    leftIcon={{ type: 'font-awesome', name: 'lock', color: 'rgba(0,51,82,1)' }}
                    rightIcon={{ type: 'font-awesome', name: this.state.loginPassIcon, color: 'rgba(0,51,82,1)', onPress: () => {this.setLoginPassShow(!this.state.loginPassShow)} }}
                    inputContainerStyle={{backgroundColor: 'white', margin: 10,
                    paddingRight: 10, marginLeft: 0, marginRight: 0, borderRadius: 10}}
                    inputStyle={{color: 'rgba(0,51,82,1)'}}
                    errorMessage= {this.state.userpass}
                  />
                   <Button 
                          title="LOGIN   "
                          titleStyle={{color: "rgba(0,51,82,1)"}}
                          raised={true}
                          icon={ <Icon name="arrow-right" size={15} color="rgba(0,51,82,1)" /> }
                          iconRight={true}
                          loading={this.state.logButLoad}
                          disabled={this.state.logButDisabled} 
                          loadingProps={{color: 'rgba(0,51,82,1)'}}
                          buttonStyle={{minWidth: 100, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'rgba(0,51,82,1)', borderRadius: 10}}
                          onPress={() => {this.login()}}
                           />
                          <View style={{flex: 1, marginTop: '2%', fontWeight: 'bold', fontSize: 20}}>
                            <Button title="Forgot Password?" titleStyle={{color: "rgba(0,51,82,1)"}} type="clear" onPress={() => {this.setModal1Visible(true);}} color="white" />
                           <Button title="Sign Up" titleStyle={{color: "#fff", textTransform: "uppercase"}} containerStyle={{marginTop: "12%",}} type='solid' onPress={() => {this.setModalVisible(true);}} buttonStyle={{minWidth: '100%', backgroundColor: 'rgba(0,51,82,1)', justifyContent: 'center'}} />
                           </View>


                        <Modal
                          animationType="slide"
                          transparent={false}
                          visible={this.state.modalVisible}
                          onRequestClose={() => {
                            this.setModalVisible(!this.state.modalVisible);
                          }} style={{backgroundColor: '#4682B4'}}>
                          <StatusBar
                            barStyle="light-content"
                            backgroundColor="rgba(0,51,82,1)"
                          />
                          <View style={{flex: 1, width: '100%', backgroundColor: '#e1e2e3'}}>
                          <View raised={true} style={{flex: 1, flexDirection: 'row', backgroundColor: '#e1e2e3', padding: 10, paddingTop: 15, minHeight: 60, elevation: 5}}>
                          <TouchableHighlight onPress={() => { this.setModalVisible(!this.state.modalVisible); }} underlayColor="rgba(0,0,0,0)" >
                          <View style={{width: 40, textAlign: 'left', padding: 5}}>
                          <Icon type='font-awesome' name="arrow-left" size={20} color="rgba(0,51,82,1)" />
                          </View>
                          </TouchableHighlight>
                              <Text h1 style={{fontSize: 20, fontWeight: 'bold', color: 'rgba(0,51,82,1)', marginLeft: 10}}>SIGN UP</Text>
                          </View>
                          <ScrollView style={{ width: '100%', height: '100%'}}>
                          <View style={{flex: 1, alignItems: 'center', paddingTop: 20}}>
                          
                            <Input
                            ref="Firstname"
                            onChangeText={(Firstname) => this.setState({Firstname})} value={this.state.Firstname}
                            placeholder='Firstname'
                            shake={true}
                            leftIcon={{ type: 'font-awesome', name: 'user', color: 'rgba(0,51,82,1)' }}
                            inputContainerStyle={{backgroundColor: 'white', marginBottom: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 10}}
                            inputStyle={{color: 'rgba(0,51,82,1)'}}
                            errorStyle={{ color: 'red' }}
                            errorMessage= {this.state.fn}
                          />
                          <Input
                            ref="Lastname"
                            onChangeText={(Lastname) => this.setState({Lastname})} value={this.state.Lastname}
                            placeholder='Lastname'
                            shake={true}
                            leftIcon={{ type: 'font-awesome', name: 'user', color: 'rgba(0,51,82,1)' }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 10}}
                            inputStyle={{color: 'rgba(0,51,82,1)'}}
                            errorStyle={{ color: 'red' }}
                            errorMessage= {this.state.ln}
                          />
                          <Input
                            ref="Email"
                            onChangeText={(Email) => this.setState({Email})} value={this.state.Email}
                            placeholder='Email Address'
                            shake={true}
                            leftIcon={{ type: 'font-awesome', name: 'at', color: 'rgba(0,51,82,1)' }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 10}}
                            inputStyle={{color: 'rgba(0,51,82,1)'}}
                            errorStyle={{ color: 'red' }}
                            errorMessage= {this.state.em}
                            keyboardType='email-address'
                          />
                          <Input
                            ref="Mobile"
                            onChangeText={(Mobile) => this.setState({Mobile})} value={this.state.Mobile}
                            placeholder='Mobile Number'
                            shake={true}
                            leftIcon={{ type: 'font-awesome', name: 'phone', color: 'rgba(0,51,82,1)' }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 10}}
                            inputStyle={{color: 'rgba(0,51,82,1)'}}
                            errorStyle={{ color: 'red' }}
                            errorMessage= {this.state.mo}
                            keyboardType='numeric'
                          />
                          <Input
                            ref="Password"
                            onChangeText={(Password) => this.setState({Password})} value={this.state.Password}
                            secureTextEntry={this.state.regPassShow}
                            placeholder='Password'
                            shake={true}
                            leftIcon={{ type: 'font-awesome', name: 'lock', color: 'rgba(0,51,82,1)' }}
                            rightIcon={{ type: 'font-awesome', name: this.state.regPassIcon, color: 'rgba(0,51,82,1)', onPress: () => {this.setRegPassShow(!this.state.regPassShow)} }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            paddingRight: 10, marginLeft: 0, marginRight: 0, borderRadius: 10}}
                            inputStyle={{color: 'rgba(0,51,82,1)'}}
                            errorStyle={{ color: 'red' }}
                            errorMessage= {this.state.pa}
                          />
                          <Input
                            ref="ConfirmPassword"
                            onChangeText={(ConfirmPassword) => this.setState({ConfirmPassword})} value={this.state.ConfirmPassword}
                            secureTextEntry={this.state.regConPassShow}
                            placeholder='Confirm Password'
                            shake={true}
                            leftIcon={{ type: 'font-awesome', name: 'lock', color: 'rgba(0,51,82,1)' }}
                            rightIcon={{ type: 'font-awesome', name: this.state.regConPassIcon, color: 'rgba(0,51,82,1)', onPress: () => {this.setRegConPassShow(!this.state.regConPassShow)} }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            paddingRight: 10, marginLeft: 0, marginRight: 0, borderRadius: 10}}
                            inputStyle={{color: 'rgba(0,51,82,1)'}}
                            errorStyle={{ color: 'red' }}
                            errorMessage= {this.state.co}
                          />
                           <Button title="SUBMIT   " 
                                titleStyle={{color: "rgba(0,51,82,1)"}} raised={true} icon={ <Icon name="check" size={15}
                                color="rgba(0,51,82,1)" /> } 
                                iconRight={true}
                                loading={this.state.regButLoad}
                                disabled={this.state.regButDisabled} 
                                loadingProps={{color: 'rgba(0,51,82,1)'}}
                                buttonStyle={{minWidth: 100, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'rgba(0,51,82,1)', borderRadius: 10}}
                                onPress={() => {this.reg()}}
                                />
                                  <View style={{flex: 1, flexDirection: 'row', marginTop: '10%', fontWeight: 'bold', fontSize: 20}}>
                                    <Button title="Already have an account? Login." titleStyle={{color: "rgba(0,51,82,1)"}}  type="clear" onPress={() => { this.setModalVisible(!this.state.modalVisible); }} style={{marginLeft: 50}} />
                                   </View>
                         </View>
                         
                          </ScrollView>
                          </View>
                        </Modal>



                         <Modal
                          animationType="slide"
                          transparent={false}
                          visible={this.state.modal1Visible}
                          onRequestClose={() => {
                            this.setModal1Visible(!this.state.modal1Visible);
                          }} style={{backgroundColor: '#4682B4'}}>
                          <View style={{flex: 1, width: '100%', backgroundColor: '#e1e2e3'}}>
                          <View raised={true} style={{flex: 1, flexDirection: 'row', backgroundColor: '#e1e2e3', padding: 10, paddingTop: 15, minHeight: 60, elevation: 5}}>
                            <TouchableHighlight onPress={() => { this.setModal1Visible(!this.state.modal1Visible); }} underlayColor="rgba(0,0,0,0)" >
                          <View style={{width: 40, textAlign: 'left', padding: 5}}>
                          <Icon type='font-awesome' name="arrow-left" size={20} color="rgba(0,51,82,1)" />
                          </View>
                          </TouchableHighlight>
                          <Text h1 style={{fontSize: 20, fontWeight: 'bold', color: 'rgba(0,51,82,1)', marginLeft: 10}}>RESET PASSWORD</Text>
                          </View>
                          <ScrollView style={{ width: '100%', height: '100%' }}>
                          <View style={{flex: 1, alignItems: 'center', paddingTop: '45%' }}>

                          <Input
                            ref="ForgotMail"
                            onChangeText={(ForgotMail) => this.setState({ForgotMail})} value={this.state.ForgotMail}
                            placeholder='Email Address'
                            shake={true}
                            leftIcon={{ type: 'font-awesome', name: 'at', color: 'rgba(0,51,82,1)' }}
                            inputContainerStyle={{backgroundColor: 'white', marginBottom: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 10}}
                            inputStyle={{color: 'rgba(0,51,82,1)'}}
                            keyboardType='email-address'
                            errorMessage= {this.state.fmailerr}
                          />

                           <Button 
                           loading={this.state.forgotButLoad}
                           disabled={this.state.forgotButDisabled}
                           title="RESET   " titleStyle={{color: "rgba(0,51,82,1)"}} raised={true} icon={ <Icon name="check" size={15}
                                color="rgba(0,51,82,1)" /> } iconRight={true}
                                loadingProps={{color: 'rgba(0,51,82,1)'}} 
                                buttonStyle={{minWidth: 100, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'rgba(0,51,82,1)', borderRadius: 10}}
                                onPress={() => { this.forgot(); }}                                
                                />
                                  <View style={{flex: 1, flexDirection: 'row', marginTop: '10%', fontWeight: 'bold', fontSize: 20}}>
                                    <Button title="<<< Back to login" titleStyle={{color: "rgba(0,51,82,1)"}} type="clear" onPress={() => { this.setModal1Visible(!this.state.modal1Visible); }} style={{marginLeft: 50}} />
                                   </View>
                         </View>
                          </ScrollView>
                          </View>
                        </Modal>
<Modal
                          animationType="slide"
                          transparent={false}
                          visible={this.state.pushmodal}
                          onRequestClose={() => {
                            this.pushmodalVisible(!this.state.pushmodal);
                          }} style={{backgroundColor: '#4682B4'}}>
                          <View style={{flex: 1, width: '100%', backgroundColor: '#e1e2e3'}}>
                          <View raised={true} style={{flex: 1, flexDirection: 'row', backgroundColor: '#e1e2e3', padding: 10, paddingTop: 15, minHeight: 60, elevation: 5}}>
                            <TouchableHighlight onPress={() => { this.pushmodalVisible(!this.state.pushmodal); }} underlayColor="rgba(0,0,0,0)" >
                          <View style={{width: 40, textAlign: 'left', padding: 5}}>
                          <Icon type='font-awesome' name="arrow-left" size={20} color="rgba(0,51,82,1)" />
                          </View>
                          </TouchableHighlight>
                          <Text h1 style={{fontSize: 20, fontWeight: 'bold', color: 'rgba(0,51,82,1)', marginLeft: 50}}>NOTIFICATION</Text>
                          </View>
                          <ScrollView style={{ width: '100%', height: '100%' }}>
                          <View style={{flex: 1, alignItems: 'center', }}>
                          <Card
                            containerStyle={{width: '100%', backgroundColor: '#e1e2e3'}}
                            title={this.state.pushData.title}
                            titleStyle={{textTransform: 'uppercase', color: 'rgba(0,51,82,1)'}}
                            >
                            <Text style={{marginBottom: 10}}>{this.state.pushData.bigText}</Text>
                            <Image
                            source={{ uri: this.state.pushData.image }}
                            style={{ width: '100%', height: 200 }}
                            PlaceholderContent={<ActivityIndicator />}
/>
                            <Button
                              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,}}
                              title='CLOSE NOTIFICATION'
                              type="outline"
                              onPress={() => { this.pushmodalVisible(!this.state.pushmodal); }}
                               />
                          </Card>
                         </View>
                          </ScrollView>
                          </View>
                        </Modal>
                         <Modal
                          animationType="slide"
                          transparent={false}
                          visible={this.state.modal2Visible}
                          onRequestClose={() => {
                            this.setModal2Visible(!this.state.modal2Visible);
                          }} style={{backgroundColor: '#4682B4'}}>
                          <View style={{flex: 1, width: '100%', backgroundColor: '#e1e2e3'}}>
                          <View raised={true} style={{flex: 1, flexDirection: 'row', backgroundColor: '#e1e2e3', padding: 10, paddingTop: 15, minHeight: 60, elevation: 5}}>
                              <TouchableHighlight onPress={() => { this.setModal2Visible(!this.state.modal2Visible); }} underlayColor="rgba(0,0,0,0)" >
                          <View style={{width: 40, textAlign: 'left', padding: 5}}>
                          <Icon type='font-awesome' name="arrow-left" size={20} color="rgba(0,51,82,1)" />
                          </View>
                          </TouchableHighlight>
                              <Text h1 style={{fontSize: 20, fontWeight: 'bold', color: 'rgba(0,51,82,1)', marginLeft: 10}}>ACTIVATE ACCOUNT</Text>
                          </View>
                          <ScrollView style={{ width: '100%', height: '100%' }}>
                          <View style={{flex: 1, alignItems: 'center', marginTop: '35%', justifyContent: 'center'}}>
                         <Input
                            ref="ActivationNum"
                            onChangeText={(ActivationNum) => this.setState({ActivationNum})} value={this.state.ActivationNum}
                            placeholder='Enter Confirmation Code'
                            shake={true}
                            leftIcon={{ type: 'font-awesome', name: 'lock', color: 'rgba(0,51,82,1)' }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, marginBottom: 50, borderRadius: 10}}
                            inputStyle={{color: 'rgba(0,51,82,1)'}}
                            errorStyle={{ color: 'red' }}
                            errorMessage= {this.state.actNum}
                            keyboardType='numeric'
                          />

                         <Button title="SUBMIT   " 
                                titleStyle={{color: "rgba(0,51,82,1)"}} raised={true} icon={ <Icon name="check" size={15}
                                color="rgba(0,51,82,1)" /> } 
                                iconRight={true}
                                loading={this.state.activateButLoad}
                                disabled={this.state.activateButDisabled} 
                                loadingProps={{color: 'rgba(0,51,82,1)'}}
                                buttonStyle={{minWidth: 100, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'rgba(0,51,82,1)', borderRadius: 10}}
                                onPress={() => { this.activ8(); }}
                                />
                                  <View style={{flex: 1, flexDirection: 'row', marginTop: '6%', fontWeight: 'bold', fontSize: 20}}>
                                    <Button loading={this.state.resendButLoad} disabled={this.state.resendButDisabled} title="Resend Code" titleStyle={{color: "rgba(0,51,82,1)"}}  type="clear" onPress={() => { this.resend(); }} buttonStyle={{minWidth: 200,}} />
                                   </View>
                         </View>
                          </ScrollView>
                          </View>
                        </Modal>






                          <Modal
                          animationType="slide"
                          transparent={false}
                          visible={this.state.modal3Visible}
                          onRequestClose={() => {
                            this.setModal3Visible(!this.state.modal3Visible);
                          }} style={{backgroundColor: '#4682B4'}}>
                          <View style={{flex: 1, width: '100%', backgroundColor: '#e1e2e3'}}>
                          <View raised={true} style={{flex: 1, flexDirection: 'row', backgroundColor: '#e1e2e3', padding: 10, paddingTop: 15, minHeight: 60, elevation: 5}}>
                          <TouchableHighlight onPress={() => { this.setModal3Visible(!this.state.modal3Visible); }} underlayColor="rgba(0,0,0,0)" >
                          <View style={{width: 40, textAlign: 'left', padding: 5}}>
                          <Icon type='font-awesome' name="arrow-left" size={20} color="rgba(0,51,82,1)" />
                          </View>
                          </TouchableHighlight>
                              <Text h1 style={{fontSize: 20, fontWeight: 'bold', color: 'rgba(0,51,82,1)', marginLeft: 10}}>RESET PASSWORD</Text>
                          </View>
                          <ScrollView style={{ width: '100%', height: '100%' }}>
                          <View style={{flex: 1, alignItems: 'center', paddingTop: '35%' }}>
                          <Input
                            ref="NewPassword"
                            onChangeText={(NewPassword) => this.setState({NewPassword})} value={this.state.NewPassword}
                            secureTextEntry={this.state.newPassShow}
                            placeholder='Password'
                            shake={true}
                            leftIcon={{ type: 'font-awesome', name: 'lock', color: 'rgba(0,51,82,1)' }}
                            rightIcon={{ type: 'font-awesome', name: this.state.newPassIcon, color: 'rgba(0,51,82,1)', onPress: () => {this.setNewPassShow(!this.state.newPassShow)} }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            paddingRight: 10, marginLeft: 0, marginRight: 0, borderRadius: 10}}
                            inputStyle={{color: 'rgba(0,51,82,1)'}}
                            errorStyle={{ color: 'red' }}
                            errorMessage= {this.state.newpa}
                          />
                          <Input
                            ref="ConfirmNewPassword"
                            onChangeText={(ConfirmNewPassword) => this.setState({ConfirmNewPassword})} value={this.state.ConfirmNewPassword}
                            secureTextEntry={this.state.newConPassShow}
                            placeholder='Confirm Password'
                            shake={true}
                            leftIcon={{ type: 'font-awesome', name: 'lock', color: 'rgba(0,51,82,1)' }}
                            rightIcon={{ type: 'font-awesome', name: this.state.newConPassIcon, color: 'rgba(0,51,82,1)', onPress: () => {this.setNewConPassShow(!this.state.newConPassShow)} }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            paddingRight: 10, marginLeft: 0, marginRight: 0, borderRadius: 10}}
                            inputStyle={{color: 'rgba(0,51,82,1)'}}
                            errorStyle={{ color: 'red' }}
                            errorMessage= {this.state.newco}
                          />
                           <Button loading={this.state.setPassButLoad} disabled={this.state.setPassButDisabled} title="CHANGE   " titleStyle={{color: "rgba(0,51,82,1)"}} raised={true} icon={ <Icon name="check" size={15}
                                color="rgba(0,51,82,1)" /> } iconRight={true} 
                                loadingProps={{color: 'rgba(0,51,82,1)'}} 
                                buttonStyle={{minWidth: 100, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'rgba(0,51,82,1)', borderRadius: 10}}
                                onPress={() => { this.setPassword(); }}                                
                                />
                         </View>
                          </ScrollView>
                          </View>
                        </Modal>





                         <Modal
                          animationType="slide"
                          transparent={false}
                          visible={this.state.modal4Visible}
                          onRequestClose={() => {
                            this.setModal4Visible(!this.state.modal4Visible);
                          }} style={{backgroundColor: '#4682B4'}}>
                          <View style={{flex: 1, width: '100%', backgroundColor: '#e1e2e3'}}>
                          <View raised={true} style={{flex: 1, flexDirection: 'row', backgroundColor: '#e1e2e3', padding: 10, paddingTop: 15, minHeight: 60, elevation: 5}}>
                            <TouchableHighlight onPress={() => { this.setModal4Visible(!this.state.modal4Visible); }} underlayColor="rgba(0,0,0,0)" >
                          <View style={{width: 40, textAlign: 'left', padding: 5}}>
                          <Icon type='font-awesome' name="arrow-left" size={20} color="rgba(0,51,82,1)" />
                          </View>
                          </TouchableHighlight>
                          <Text h1 style={{fontSize: 20, fontWeight: 'bold', color: 'rgba(0,51,82,1)', marginLeft: 10}}>EMAIL VERIFICATION</Text>
                          </View>
                          <ScrollView style={{ width: '100%', height: '100%' }}>
                          <View style={{flex: 1, alignItems: 'center', marginTop: '35%', justifyContent: 'center'}}>
                         <Input
                            ref="ForgotCode"
                            onChangeText={(ForgotCode) => this.setState({ForgotCode})} value={this.state.ForgotCode}
                            placeholder='Enter Authentication Code'
                            shake={true}
                            leftIcon={{ type: 'font-awesome', name: 'lock', color: 'rgba(0,51,82,1)' }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, marginBottom: 50, borderRadius: 10}}
                            inputStyle={{color: 'rgba(0,51,82,1)'}}
                            errorStyle={{ color: 'red' }}
                            errorMessage= {this.state.forgotcode}
                            keyboardType='numeric'
                          />

                         <Button title="SUBMIT   " 
                                titleStyle={{color: "rgba(0,51,82,1)"}} raised={true} icon={ <Icon name="check" size={15}
                                color="rgba(0,51,82,1)" /> } 
                                iconRight={true}
                                loading={this.state.forgotAuthButLoad}
                                disabled={this.state.forgotAuthButDisabled} 
                                loadingProps={{color: 'rgba(0,51,82,1)'}}
                                buttonStyle={{minWidth: 100, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'rgba(0,51,82,1)', borderRadius: 10}}
                                onPress={() => { this.forgot_auth(); }}
                                />
                                  <View style={{flex: 1, flexDirection: 'row', marginTop: '6%', fontWeight: 'bold', fontSize: 20}}>
                                    <Button loading={this.state.resendForgotButLoad} disabled={this.state.resendForgotButDisabled} title="Resend Code" titleStyle={{color: "rgba(0,51,82,1)"}}  type="clear" onPress={() => { this.resend_forgot(); }} buttonStyle={{minWidth: 200,}} />
                                   </View>
                         </View>
                          </ScrollView>
                          </View>
                        </Modal>

                         


<Modal
  animationType="slide"
  transparent={false}
  visible={this.state.setPin}
  onRequestClose={() => {
    this.setPinVisible(!this.state.setPin);
  }} style={{backgroundColor: '#4682B4'}}>
  <View style={{flex: 1, width: '100%', backgroundColor: '#e1e2e3'}}>
  <View raised={true} style={{flex: 1, flexDirection: 'row', backgroundColor: '#e1e2e3', padding: 10, paddingTop: 15, minHeight: 60, elevation: 5}}>
    <TouchableHighlight onPress={() => { this.setPinVisible(!this.state.setPin); }} underlayColor="rgba(0,0,0,0)" >
    <View style={{width: 40, textAlign: 'left', padding: 5}}>
    <Icon type='font-awesome' name="arrow-left" size={20} color="rgba(0,51,82,1)" />
    </View>
    </TouchableHighlight>
      <Text h1 style={{fontSize: 20, fontWeight: 'bold', color: 'rgba(0,51,82,1)', marginLeft: 10}}>SET PIN</Text>
  </View>
  <ScrollView style={{ width: '100%', height: '100%', paddingTop: '10%'}}>
  <View style={{flex: 1, alignItems: 'center'}}>
<Text h1 style={{color: 'rgba(0,51,82,1)', fontWeight: 'bold', textAlign: 'left'}}>NEW PIN</Text>
<View style={{flexDirection: 'row', width: '100%', paddingRight: 10}}>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref="nPassword1"
                            onChangeText={(nPassword1) => this.setState({nPassword1})} value={this.state.nPassword1}
                            secureTextEntry={true}
                            placeholder= 'A'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.nPassword2.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.nPassword2 = input; }}
                            onChangeText={(nPassword2) => this.setState({nPassword2})} value={this.state.nPassword2}
                            secureTextEntry={true}
                            placeholder= 'U'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.nPassword3.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.nPassword3 = input; }}
                            onChangeText={(nPassword3) => this.setState({nPassword3})} value={this.state.nPassword3}
                            secureTextEntry={true}
                            placeholder= 'T'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.nPassword4.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.nPassword4 = input; }}
                            onChangeText={(nPassword4) => this.setState({nPassword4})} value={this.state.nPassword4}
                            secureTextEntry={true}
                            placeholder= 'H'
                            shake={true}
                            maxLength={1}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          </View>
<Text h1 style={{color: 'rgba(0,51,82,1)', fontWeight: 'bold', textAlign: 'left'}}>CONFIRM PIN</Text>
<View style={{flexDirection: 'row', width: '100%', paddingRight: 10}}>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref="cPassword1"
                            onChangeText={(cPassword1) => this.setState({cPassword1})} value={this.state.cPassword1}
                            secureTextEntry={true}
                            placeholder= 'A'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.cPassword2.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.cPassword2 = input; }}
                            onChangeText={(cPassword2) => this.setState({cPassword2})} value={this.state.cPassword2}
                            secureTextEntry={true}
                            placeholder= 'U'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.cPassword3.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.cPassword3 = input; }}
                            onChangeText={(cPassword3) => this.setState({cPassword3})} value={this.state.cPassword3}
                            secureTextEntry={true}
                            placeholder= 'T'
                            shake={true}
                            maxLength={1}
                            returnKeyType = { "next" }
                            onChange={() => { this.cPassword4.focus(); }}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          <View style={{width: "25%", alignItems: 'center'}}>
                          <Input
                            ref={(input) => { this.cPassword4 = input; }}
                            onChangeText={(cPassword4) => this.setState({cPassword4})} value={this.state.cPassword4}
                            secureTextEntry={true}
                            placeholder= 'H'
                            shake={true}
                            maxLength={1}
                            inputContainerStyle={{backgroundColor: 'white', margin: 10,
                            marginLeft: 0, marginRight: 0, borderRadius: 0, marginBottom: 30, borderBottomWidth: 0, width: 80}}
                            inputStyle={{color: 'rgba(0,51,82,1)', textAlign: 'center', fontSize: 16,}}
                            keyboardType='numeric'
                            
                          />
                          </View>
                          </View>

<Button title="SET" 
    titleStyle={{color: "rgba(0,51,82,1)"}} 
    raised={true} 
    loading={this.state.resetChangeLoad}
    disabled={this.state.resetChangeDisabled} 
    loadingProps={{color: 'rgba(0,51,82,1)'}}
    buttonStyle={{minWidth: 120, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'rgba(0,51,82,1)', borderRadius: 10}}
    onPress={() => {this.reset_p()}}
    />

  </View>
  </ScrollView>
  </View>
</Modal>

 


                </View>

        </ScrollView>
      </View>

    );
}else{

return <Dashboard data={{user: this.state.user, banks: this.state.banks, bal: this.state.bal, tranz: this.state.tranz, support: this.state.support, mtnPlans: this.state.mtnPlans, gloPlans: this.state.gloPlans, airtelPlans: this.state.airtelPlans, mobilePlans: this.state.mobilePlans}} />;
}
  }
}




 export default class App extends Component {
   constructor(props) {
  super(props);

  this.state = { 
  isLoading: true, 
  showRealApp: false,
  user: '',
  firstLaunch: "null",
}
}


  // splash screen handler starts
 

performTimeConsumingTask = async() => {
  AsyncStorage.getItem("payntapp").then(value => {
            if(value == null){
                 AsyncStorage.setItem('payntapp', "true"); 
                 // No need to wait for `setItem` to finish, although you might want to handle errors
                 this.setState({firstLaunch: "true"});
            }else{
              // alert(value);
                 return new Promise((resolve) =>
    setTimeout(
      () => { this.setState({firstLaunch: "false"});  },
      2000
    )
  );

            }
            }); // Add some error handling, also you can simply do this.setState({fistLaunch: value == null})
 
}


async componentDidMount() {
  // Preload data from an external API
  // Preload data using AsyncStorage
  const data = await this.performTimeConsumingTask();

  if (data !== "null") {
    this.setState({ isLoading: false });
  }
}
// splash screen handler ends

 render() {

        if(this.state.firstLaunch === "null"){
    return <SplashScreen />;
           // return null;  This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user.
       }else{
        if(this.state.firstLaunch === "true"){
      return <AppIntroSlider slides={slides} renderDoneButton={this._renderDoneButton} renderNextButton={this._renderNextButton} onDone ={() =>{this.setState({ firstLaunch: "false" });}} showSkipButton={true} />;
  }else if(this.state.firstLaunch === "false"){
      return <Mainz/>;
  }
    }
      

     

   
  }



}




