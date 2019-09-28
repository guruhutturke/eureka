import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import response from '../data/response.json'
import {ScrollView, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        <ScrollView style={styles.content}>
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
              <TouchableOpacity style={[styles.textBg, styles.borderBottom]} onPress={this.navigateToScreen('Home')}>
                <Icon name="home" size={30} />
                <Text style={styles.marginLeft}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.textBg, styles.borderBottom]} onPress={this.navigateToScreen('Search')}>
                <Icon name="search" size={30} />
                <Text style={styles.marginLeft}>Search</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.textBg, styles.borderBottom]} onPress={this.navigateToScreen('Birthday')}>
                <Icon name="birthday-cake" size={30} />
                <Text style={styles.marginLeft}>Birthdays</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.textBg, styles.borderBottom]} onPress={this.navigateToScreen('Settings')}>
                <Icon name="cog" size={30} />
                <Text style={styles.marginLeft}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.textBg} onPress={this.navigateToScreen('LogOut')}>
                <Icon name="sign-out" size={30} />
                <Text style={styles.marginLeft}>Logout</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
    );
  } 
}

const styles = {
    imageContainer: {
      backgroundColor: "#fff",
      borderRadius: 50,
      borderColor: '#fff',
      borderWidth: 1,
      overflow: 'hidden'
    },
    content: {
      flex: 1
    },
    picstyle: {
      width:80,
      height:80,
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
    firstHalf: {
      backgroundColor: 'black',
      paddingTop:20,
      flexDirection: 'row',
      paddingBottom: 20,
      paddingRight: 5,
      paddingLeft: 5
    },
    firstHalfText: {
      color: 'white',
      fontSize: 20,
      paddingLeft: 15,
      fontFamily: 'TitilliumWeb-Regular'
    },
    secondHalfText: {
      color: 'white',
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
      fontFamily: 'TitilliumWeb-Regular'
    },
    borderBottom: {
      borderColor: '#ddd',
      borderBottomWidth: 1 
    }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;