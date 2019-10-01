import React, {Component} from 'react';
import { View, Image, Button, ImageBackground, Text, TouchableOpacity, Animated } from 'react-native';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Card, CardSection, Input, Spinner } from '../common';

class LoginForm extends Component{
    state = { error: '', loading: false, loggedIn: false, loader: false, animation: new Animated.Value(0) }

    renderButton() {
        if(this.state.loading){
            return (
                <View style={styles.loaderStyle}>
                    <Spinner size="large" color="#fff" />
                </View>
            )
        } else if(this.state.error !== ''){
            return (
                <View style={styles.loaderStyle}>
                    <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                </View>
            )
        }

        return (
            <TouchableOpacity onPress={this._signIn} style={styles.buttonStyle}>
                <Image 
                    style={styles.googleStyle}
                    source={require('../../assets/png/Pasted_Image.png')}
                />
                <Text style={styles.buttonTextStyle}>
                    Sign in with Google
                </Text>
            </TouchableOpacity>
        )
    }

    async componentDidMount() {
        const userToken = await AsyncStorage.getItem('userToken')
        Animated.timing(
            this.state.animation,
            {
                toValue: 1,
                duration: 1000,
            }
        ).start();
        let self=this;
        setTimeout(function(){
            if(userToken == null){
                self.setState({loader: true})
            }
            self.props.navigation.navigate(userToken ? 'Dashboard' : 'Login')
        }, 3000)
        this._configureGoogleSignIn();
    }

    _configureGoogleSignIn() {
        GoogleSignin.configure({
          webClientId: '755529038379-uorgl2pntaatiaomsqjqdd7m9lgs84np.apps.googleusercontent.com',
          offlineAccess: false,
        });
    }
    
    _signIn = async () => {
        try {
            let self = this;
            this.setState({ loading: true})
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            // await GoogleSignin.revokeAccess();
            console.log('Success:',userInfo);
            let domain = userInfo.user.email.split('@')[1];
            if(domain == 'piktorlabs.com'){
                AsyncStorage.setItem('email', userInfo.user.email);
                AsyncStorage.setItem('userToken', userInfo.idToken);
                console.log('localstoragetoken',userInfo.idToken)
                this.props.navigation.navigate('Dashboard')
            } else {
                this.setState({ loading: false,
                                error: 'Please Sign in using Piktorlabs'})
                setTimeout(function(){
                    self.setState({ loading: false,
                        error: ''})
                },3000)
            }
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // sign in was cancelled
                this.setState({ loading: false})
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation in progress already
                this.setState({ loading: false})
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                this.setState({ loading: false})
            } else {
                console.log('Something went wrong:',error.toString());
                this.setState({ loading: false})
                this.setState({
                error,
                });
            }
        }
    };
    
    render() {
        const { loginView, container, thumbnailStyle, textStyle } = styles
        if(this.state.loader){
            return (
                <View style={loginView}>
                    <ImageBackground source={require('../../assets/png/Group.png')} style={{width: '100%', height: '100%'}} />
                    <View style={container}>
                        <Image 
                            style={thumbnailStyle}
                            source={require('../../assets/png/Layer_1.png')}
                        />
                        <Text style={textStyle}>
                            Sign in with your Google Account
                        </Text>
                        {this.renderButton()}
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.loginViewLoader}>
                    <View style={styles.logoContainer}>
                        <Animated.Image style={[styles.logo,{opacity: this.state.animation}]} source={require("../../assets/png/Piktorlabs_LOGO_Black.png")}/> 
                    </View>
                </View>
            )
        }
    }
}

const styles = {
    logoContainer: {
        position: 'absolute',
        flex: 1,
        width: wp('105%'),
        height: hp('15%'),
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        height: hp('5%'),
        width: wp('45%')
    },
    loginViewLoader:{
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginView: {
        backgroundColor: "#4A90E2",
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    thumbnailStyle: {
        position: 'absolute',
        bottom: 60,
        height: 30
    },
    textStyle: {
        position: 'absolute',
        color: '#fff',
        width: 250,
        textAlign: 'center',
        fontFamily: 'TitilliumWeb-Regular'
    },
    loaderStyle: {
        top: 70
    },
    buttonStyle: {
        top: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderColor: '#fff',
        height: 45,
        width: 250,
        borderRadius: 3,
        margin: 5,
        position: 'relative',
        backgroundColor: '#fff',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.2,
        elevation: 2
    },
    googleStyle: {
        padding: 10,
        margin: 5,
        height: 20,
        width: 20,
        resizeMode: 'stretch',
        position: 'absolute',
        left: 6
    },
    buttonTextStyle: {
        fontSize: 14,
        color: '#000',
        marginTop: 4,
        marginBottom: 4,
        fontFamily: 'TitilliumWeb-Regular'
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

export default LoginForm