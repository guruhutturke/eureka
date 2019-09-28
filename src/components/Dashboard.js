import React, {Component} from 'react';
import { View,Text, Image, Animated, TouchableOpacity, ScrollView, ToastAndroid} from 'react-native';
import { withNavigation } from "react-navigation";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';
import Barcode from 'react-native-barcode-builder';
import Icon from 'react-native-vector-icons/FontAwesome';
import response from '../data/response.json'
import { ProgressiveImage } from '../common';
console.disableYellowBox = true;


const latArray = ['12.9219','12.9220','12.9221','12.9222','12.9223','12.9224'];
const longArray = ['77.669','77.6700','77.6701'];

class Dashboard extends Component {

    _isMounted = false;
    state = { data: "", visible: false, animation: new Animated.Value(), status: "offline" };
    

    componentDidMount(){
        // ToastAndroid.showWithGravity(
        //     'All Your Base Are Belong To Us',
        //     ToastAndroid.SHORT,
        //     ToastAndroid.CENTER,
        //   );
        Geolocation.getCurrentPosition(info => this.determinePosition(info));      
        this._isMounted = true;
        if(this._isMounted){
            this.getItemValue();
        }
    }

    determinePosition(info){
        if(latArray.indexOf(info.coords.latitude.toFixed(4)) > -1 && longArray.indexOf(info.coords.longitude.toFixed(4) > -1))
		{
			this.setState({status: 'online'})
        }
        else{
            this.setState({status: 'offline'})
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    toggle(){
        let initialValue = this.state.visible ? 250 : 0,
        finalValue  = this.state.visible ? 0 : 250;

        this.state.animation.setValue(initialValue); 

        if(!this.state.visible){
            this.setState(prevState => ({
                visible: !prevState.visible
            }));
        }
        
        Animated.spring(     //Step 4
            this.state.animation,
            {
                toValue: finalValue,
                duration: 2000
            }
        ).start();
        
        let self=this;
        if(self.state.visible){
            setTimeout(function(){
                self.setState(prevState => ({
                    visible: !prevState.visible
                }));
            },300)
        }
    }

    async getItemValue() {
        const email = await AsyncStorage.getItem('email');
        const profileData = await AsyncStorage.getItem('data');
        const userToken = await AsyncStorage.getItem('userToken');
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

    moveTo(){
        this.props.navigation.navigate('HolidayList');
    }

    routeTo(data){
        this.props.navigation.navigate(data);
    }

    renderData(){
        return (
            <View >
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require("../../assets/png/Piktorlabs_LOGO_Black.png")}/> 
                </View>
                 <ProgressiveImage 
                    style={styles.profilePic}
                    thumbnailSource={{ uri: this.state.data.placeholder}}
                    source={{uri: this.state.data.photoUrl}}
                    // resizeMode="cover"
                />
                <LinearGradient colors={["transparent", "transparent", "transparent", "rgba(255,255,255,0.1)", "rgba(255,255,255,0.2)", "rgba(255,255,255,0.3)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.5)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.9)", "rgba(255,255,255,0.9)", "rgba(255,255,255,0.9)", "rgba(255,255,255,1)", "rgba(255,255,255,1)", "rgba(255,255,255,1)"]}  style={styles.linearStyle} />
                <Text style={styles.firstName}>{this.state.data.firstName}</Text>
                <Text style={styles.lastName}>{this.state.data.lastName}</Text>
                <Text style={styles.otherDetails}>{this.state.data.designation} {this.state.data.employeeId}</Text>
                <View style={styles.barCodeData}>
                    <Barcode value={this.state.data.mobile} format="CODE128" height={50} /> 
                </View> 
            </View>
        );
    }

    render() {
        if(this.state.data !== ""){
            return (
                <View style={styles.content}>
                    {this.renderData()}
                    <TouchableOpacity style={styles.hammenu} onPress={() => this.props.navigation.toggleDrawer()}>
                                <Icon name="bars" size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionContainer} onPress={()=>this.toggle()}>
                        {this.state.status == 'online' && (
                            <Image  source={require("../../assets/png/Oval.png")}/>
                        )}
                        {this.state.status == 'offline' && (
                            <Image  source={require("../../assets/png/wfh.png")}/>
                        )}
                    </TouchableOpacity>
                    
                    {this.state.visible && 
                        <View style={styles.topDetails}>
                            <Animated.View style={[styles.topView,{height: this.state.animation}]}>
                                <Image style={styles.insideLogo} source={require("../../assets/png/Piktorlabs_LOGO_Black.png")}/>
                                <View style={styles.statusBar}>
                                    <Text style={styles.statusText}>YOUR STATUS</Text>
                                    <TouchableOpacity style={styles.holidaysContainer} onPress={()=>this.moveTo()}>
                                        <Text style={styles.holidays}>HOLIDAYS</Text>
                                    </TouchableOpacity>
                                </View>
                                <ScrollView 
                                    horizontal={true} 
                                    showsHorizontalScrollIndicator={false} 
                                    contentContainerStyle={{flexDirection:'row',justifyContent:'flex-start'}}
                                    style={styles.statusContent}
                                >
                                    <TouchableOpacity  activeOpacity={0.5} style={styles.ButtonStyle}>
                                        <Image style={styles.statusImage} source={require("../../assets/png/Oval.png")} />
                                        <View style={styles.status}>
                                            <Text style={styles.topText}>In</Text>
                                            <Text style={styles.bottomText}>Office</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity  activeOpacity={0.5} style={styles.ButtonStyle} onPress={()=>this.routeTo('WFH')}>
                                        <Image style={styles.statusImage} source={require("../../assets/png/wfh.png")} />
                                        <View style={styles.status}>
                                            <Text style={styles.topText}>Work from</Text>
                                            <Text style={styles.bottomText}>Home</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity  activeOpacity={0.5} style={styles.ButtonStyle} onPress={()=>this.routeTo('Leave')}>
                                        <Image style={styles.statusImage} source={require("../../assets/png/leave.png")} />
                                        <View style={styles.status}>
                                            <Text style={styles.topText}>Apply</Text>
                                            <Text style={styles.bottomText}>Leave</Text>
                                        </View>
                                    </TouchableOpacity>
                                </ScrollView>
                            </Animated.View>
                            <TouchableOpacity style={styles.bottomView} onPress={()=>this.toggle()}></TouchableOpacity>
                        </View>
                    }
                </View>
            );
        } else {
            return (
                <View style={[styles.content, styles.loaderContainer]}>
                    <Image style={styles.loaderContent} source={require("../../assets/gifs/superhero.gif")} />
                </View>
            )
        }
    }
}

const styles = {
    content: {
        flex: 1,
        position: 'relative',
    },
    renderContent:{
        justifyContent:'center',
        alignItems:'flex-end'
    },
    loaderContainer: {
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        width: wp('100%'),
        height: hp('17%'),
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        height: hp('5%'),
        width: wp('45%')
    },
    profilePic: {
        height: hp('70%'),
        width: wp('100%')
    },
    linearStyle: {
        width: wp('100%'),
        height: hp('40%'),
        position: 'absolute',
        bottom: 0
    },
    firstName: {
        width: wp('105%'),
        textAlign: 'center',
        position: 'absolute',
        bottom: 60,
        fontSize: 39,
        fontWeight: '400',
        letterSpacing: 0.7
    },
    lastName: {
        width: wp('105%'),
        textAlign: 'center',
        position: 'absolute',
        bottom: 30,
        fontSize: 26,
        color: '#4f4f4f',
        letterSpacing: 0.7
    },
    otherDetails: {
        width: wp('105%'),
        textAlign: 'center',
        position: 'absolute',
        bottom: 10,
        color: "#000",
        opacity: 0.8
    },
    barCodeData: {
        position: 'absolute',
        textAlign: 'center',
        width: wp('105%'),
        justifyContent: 'center',
        alignItems: 'center',
        bottom: -70,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2},
        shadowOpacity: 0.2
    },
    optionContainer: {
        position: 'absolute',
        top: 45,
        right: 20,
        width: wp('10%')
    },
    hammenu: {
        position: 'absolute',
        top: 42,
        left: 20,
        width: wp('10%')
    },
    topDetails: {
        height: hp('100%'),
        width: wp('100%'),
        position: 'absolute',
        top: 0
    },
    topView: {
        backgroundColor: '#fff',
        position: 'relative',
        overflow: 'hidden'
    },
    insideLogo: {
        top: 50,
        position: 'absolute',
        height: 20,
        width: 90,
        alignSelf: 'center'
    },
    bottomView: {
        backgroundColor: '#000',
        height: '100%',
        opacity: 0.4
    },
    holidaysContainer: {
        alignSelf: 'center'
    },
    holidays: {
        color: '#4A90E2',
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 16,
        fontWeight: '600'
    },
    statusText: {
        fontSize: 14,
        color: '#666',
        fontFamily: 'TitilliumWeb-Regular'
    },
    statusBar: {
        marginLeft: 15,
        position: 'absolute',
        flexDirection: 'row',
        width: '93%',
        justifyContent: 'space-between',
        bottom: 130
    },
    statusContent: {
        width: '100%',
        position: 'absolute',
        bottom: 10,
        left: 10
    }, 
    ButtonStyle: {
        position: 'relative',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        padding: 20,
        width: 110,
        height: 110,
        marginRight: 13
    },
    statusImage: {
        position: 'absolute',
        left: 15,
        top: 15,
        height: 15,
        width: 15
    },
    status: {
        position: 'absolute',
        left: 15,
        bottom: 10
    },
    topText: {
        fontSize: 12,
        fontFamily: 'TitilliumWeb-Regular'
    },
    bottomText: {
        fontSize: 18,
        fontFamily: 'TitilliumWeb-Regular'
    }

}

export default withNavigation(Dashboard);