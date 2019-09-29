import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import response from '../data/response.json'
import {ScrollView, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

class SideMenu extends Component {

  _isMounted = false;
  state = { currentImageIndex: 0, data: ""}
   email =  '';

  componentDidMount(){
    this._isMounted = true;
        if(this._isMounted){
            this.getItemValue();
        }
  }
  
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
 

  async getItemValue() {
    this.email = await AsyncStorage.getItem('email');
    const profileData = await AsyncStorage.getItem('data');
    let self=this;
    if(profileData){
        this.setState({data: JSON.parse(profileData)})
    } else {
       setTimeout(function(){
        self.setState({data: response})
        AsyncStorage.setItem('data', JSON.stringify(response));
       },5000)
    }
  }


  render () {
    return (
        <View style={styles.content}>
          <View style={styles.firstHalf}>
              <View style={styles.imageContainer}>
                <Image style={styles.picstyle} source={{uri:this.state.data.photoUrl}}></Image>
              </View>
              <View style={{flexDirection: 'column',justifyContent: 'center'}}>
                <Text style={styles.firstHalfText}>{`${this.state.data.firstName} ${this.state.data.lastName}`}</Text>
                <Text style={styles.secondHalfText}>{this.email}</Text>
              </View>
          </View>
          <View style={styles.dropview}>
              <TouchableOpacity style={styles.textBg} onPress={this.navigateToScreen('Home')}>
                <Text style={styles.marginLeft}>ID CARD</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.textBg} onPress={this.navigateToScreen('Details')}>
                <Text style={styles.marginLeft}>PERSONAL DETAILS</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.textBg} onPress={this.navigateToScreen('Birthday')}>
                <Text style={styles.marginLeft}>BIRTHDAYS</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.textBg} onPress={this.navigateToScreen('Search')}>
                <Text style={styles.marginLeft}>EMPLOYEES</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.logoutBtn}>
            <TouchableOpacity style={styles.signoutTextContainer} onPress={this.navigateToScreen('LogOut')}>
              <Text style={styles.signoutText}>SIGNOUT</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  } 
}

const styles = {
    imageContainer: {
      backgroundColor: "#ccc",
      borderRadius: 50,
      borderColor: '#fff',
      borderWidth: 1,
      overflow: 'hidden'
    },
    content: {
      flex: 1,
      position: 'relative',
      overflow: 'hidden'
    },
    picstyle: {
      width:60,
      height:60,
      resizeMode: 'contain'
    },
    textBg: {
      width: '100%',
      color: 'black',
      fontSize: 16,
      padding: 20,
      alignItems: 'center',
      flexDirection: 'row'
    },
    signoutTextContainer: {
      alignItems: 'center',
      width: widthPercentageToDP('78%')
    },
    signoutText:{
      textAlign: 'center',
      color: '#fff',
      padding: 20,
      fontFamily: 'TitilliumWeb-Regular'
    },
    firstHalf: {
      backgroundColor: '#fff',
      padding:20,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#ddd'
    },
    firstHalfText: {
      color: '#000',
      fontSize: 20,
      paddingLeft: 15,
      fontFamily: 'TitilliumWeb-Regular'
    },
    secondHalfText: {
      color: '#666',
      fontSize: 12,
      paddingLeft: 15,
      fontFamily: 'TitilliumWeb-Regular'
    },
    dropview: {
      width: '100%',
      padding: 5
    },
    marginLeft: {
      paddingLeft: 15,
      fontFamily: 'TitilliumWeb-SemiBold'
    },
    logoutBtn: {
      position: 'absolute',
      backgroundColor: '#1989FA',
      bottom: 0
    }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;