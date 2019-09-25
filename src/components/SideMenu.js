import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import {ScrollView, Text, View, ImageBackground,StyleSheet, Image} from 'react-native';

class SideMenu extends Component {

  state = { currentImageIndex: 0}
  
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  images = {
    0:require("../../assets/jpg/bg1.jpg"),
    1:require("../../assets/jpg/bg3.jpg"),
    2:require("../../assets/jpg/bg2.jpg")
   }

  componentDidMount() {
    this.getEmail();
  }

  async getEmail(){
    const email = await AsyncStorage.getItem('email');
    let initialData = email.charAt(0);
    if(initialData > 'a' && initialData < 'g'){
      this.setState({ currentImageIndex: 0})
    } else if(initialData >= 'g' && initialData < 'p'){
      this.setState({ currentImageIndex: 1})
    } else {
      this.setState({ currentImageIndex: 2})
    }
  }

  render () {
    return (
        <ScrollView>
          <ImageBackground
              style={styles.bg}
              source={this.images[this.state.currentImageIndex]}
          >
          <View style={styles.dropview}>
              <Text style={styles.textBg} onPress={this.navigateToScreen('Home')}>
              Home
              </Text>
          </View>
          <View style={styles.dropview}>
              <Text style={styles.textBg} onPress={this.navigateToScreen('LogOut')}>
              Logout
              </Text>
          </View>
          </ImageBackground>
        </ScrollView>
    );
  }
}

const styles = {
    bg:{
        height: 800,
        flex: 1,
        resizeMode: 'center'
    },
    textBg: {
      backgroundColor: 'transparent',
      color: 'white',
      fontSize: 18
    },
    dropview: {
      paddingLeft: 20,
      paddingTop: 20
    }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;