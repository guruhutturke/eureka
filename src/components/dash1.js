import React, {Component,useState,useEffect} from 'react';
import { View,Text, Image, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { withNavigation } from "react-navigation";
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Barcode from 'react-native-barcode-builder';
import response from '../data/response.json'
import { ProgressiveImage } from '../common';

const Dashboard = () => {

    const [ data,setData ] = useState('');
    const [ visible,setVisible ] = useState(false);
    let _isMounted = false;
    let animation = new Animated.Value();

    useEffect(() => {
        _isMounted = true;
        if(_isMounted){
            getItemValue();
        }
    }, [_isMounted]);

    useEffect(() => {
        _isMounted = false;
    }, [_isMounted]);


    // _isMounted = false;
    // state = { data: "", visible: false, animation: new Animated.Value() };

    // componentDidMount(){
    //     this._isMounted = true;
    //     if(this._isMounted){
    //         this.getItemValue();
    //     }
    // }

    // componentWillUnmount() {
    //     this._isMounted = false;
    // }

    const toggle = () => {
        let initialValue = visible ? 250 : 0,
        finalValue  = visible ? 0 : 250;

        animation.setValue(initialValue); 

        if(!visible){
            // setState(prevState => ({
            //     visible: !prevsetVisible
            setVisible(prevState => prevState.set(!prevsetVisible))
            };
    
        
        Animated.spring(     //Step 4
            animation,
            {
                toValue: finalValue,
                duration: 2000
            }
        ).start();
        
        // let self=this;
        if(visible){
            setTimeout(function(){
                    // setState(prevState => ({
                    // visible: !prevsetVisible
                setVisible(prevState => prevState.set(!prevsetVisible))
                },300)
        }
    }

    async function getItemValue() {
        const email = await AsyncStorage.getItem('email');
        const profileData = await AsyncStorage.getItem('data');
        const userToken = await AsyncStorage.getItem('userToken');
        // let self=this;
        if(profileData){
            setData(JSON.parse(profileData))
        } else {
           setTimeout(function(){
            setData(response)
            AsyncStorage.setItem('data', JSON.stringify(response));
           },5000)
        }
    };

    const moveTo = () => {
        props.navigation.navigate('HolidayList');
    }

    const routeTo = (data) => {
        props.navigation.navigate(data);
    }

    const renderData = () => {
        return (
            <View>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require("../../assets/png/Piktorlabs_LOGO_Black.png")}/> 
                </View>
                <ProgressiveImage 
                    style={styles.profilePic}
                    thumbnailSource={{ uri: `https://piktorlabs-digitalidcard.s3.amazonaws.com/shetty%40piktorlabs.com/IMG_9549_croped-min-min.png ` }}
                    source={{uri: data.photoUrl}}
                    resizeMode="cover"
                />
                <LinearGradient colors={["transparent", "transparent", "transparent", "rgba(255,255,255,0.1)", "rgba(255,255,255,0.2)", "rgba(255,255,255,0.3)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.5)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.9)", "rgba(255,255,255,0.9)", "rgba(255,255,255,0.9)", "rgba(255,255,255,1)", "rgba(255,255,255,1)", "rgba(255,255,255,1)"]}  style={styles.linearStyle} />
                <Text style={styles.firstName}>{data.firstName}</Text>
                <Text style={styles.lastName}>{data.lastName}</Text>
                <Text style={styles.otherDetails}>{data.designation} {data.employeeId}</Text>
                <View style={styles.barCodeData}>
                    <Barcode value={data.mobile} format="CODE128" height={50} /> 
                </View>
            </View>
        );
    }

    let getDash = ()=>{
        if(data !== ""){
            return (
                <View style={styles.content}>
                    <TouchableOpacity style={styles.optionContainer} onPress={()=>toggle()}>
                        <Image style={styles.options} source={require("../../assets/png/Oval.png")}/>
                    </TouchableOpacity>
                    {renderData()}
                    {visible && 
                        <View style={styles.topDetails}>
                            <Animated.View style={[styles.topView,{height: animation}]}>
                                <Image style={styles.insideLogo} source={require("../../assets/png/Piktorlabs_LOGO_Black.png")}/>
                                <View style={styles.statusBar}>
                                    <Text style={styles.statusText}>YOUR STATUS</Text>
                                    <TouchableOpacity style={styles.holidaysContainer} onPress={()=>moveTo()}>
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
                                    <TouchableOpacity  activeOpacity={0.5} style={styles.ButtonStyle} onPress={()=>routeTo('WFH')}>
                                        <Image style={styles.statusImage} source={require("../../assets/png/wfh.png")} />
                                        <View style={styles.status}>
                                            <Text style={styles.topText}>Work from</Text>
                                            <Text style={styles.bottomText}>Home</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity  activeOpacity={0.5} style={styles.ButtonStyle} onPress={()=>routeTo('Leave')}>
                                        <Image style={styles.statusImage} source={require("../../assets/png/leave.png")} />
                                        <View style={styles.status}>
                                            <Text style={styles.topText}>Apply</Text>
                                            <Text style={styles.bottomText}>Leave</Text>
                                        </View>
                                    </TouchableOpacity>
                                </ScrollView>
                            </Animated.View>
                            <TouchableOpacity style={styles.bottomView} onPress={()=>toggle()}></TouchableOpacity>
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


    return <View>{getDash()}</View>
}


const styles = {
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    loaderContainer: {
        backgroundColor: '#000'
    },
    logoContainer: {
        position: 'absolute',
        textAlign: 'center',
        width: 415,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        alignSelf: 'center',
        top: -80,
        height: 30,
        width: 130
    },
    profilePic: {
        height: 515,
        width: 415,
        // position: 'relative'
    },
    linearStyle: {
        width: 500,
        height: 300,
        position: 'absolute',
        bottom: 0
    },
    firstName: {
        width: 415,
        textAlign: 'center',
        position: 'absolute',
        bottom: 50,
        fontSize: 39,
        fontWeight: '400',
        letterSpacing: 0.7
    },
    lastName: {
        width: 415,
        textAlign: 'center',
        position: 'absolute',
        bottom: 20,
        fontSize: 26,
        color: '#4f4f4f',
        letterSpacing: 0.7
    },
    otherDetails: {
        width: 415,
        textAlign: 'center',
        position: 'absolute',
        bottom: -10,
        color: "#000",
        opacity: 0.8
    },
    barCodeData: {
        position: 'absolute',
        textAlign: 'center',
        width: 415,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: -100,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2},
        shadowOpacity: 0.2
    },
    optionContainer: {
        position: 'absolute',
        top: 60,
        right: 20
    },
    options: {
        width: 20,
        height: 20
    },
    topDetails: {
        height: '100%',
        width: '100%',
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