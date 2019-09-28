import React, {Component} from 'react';
import { Text, ScrollView, View, Image, TouchableOpacity, Linking } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import data from '../data/birthday.json'

class BirthDay extends Component {
    state = { birthdayList:"" };

    componentDidMount(){
        this.setState({ birthdayList: data.data });
    }

    sendEmail(email){
        Linking.openURL('mailto:'+email+'?subject=Happy BirthDay&body=Description')
    }

    renderData(){
        return this.state.birthdayList.map((item, i)=> {
            return (
                <View key={i} style={styles.dataContainer}>
                    <Image style={styles.cakeLogo} source={require("../../assets/png/cake.png")}/>
                    <View style={styles.contentContainer}>
                        <Text style={styles.fontStyle}>{item.birthDay}</Text>
                        <TouchableOpacity style={styles.content} onPress={()=>this.sendEmail(item.email)}>
                            <View style={styles.photoContainer}>
                                <Image style={styles.photoStyle} source={{uri:item.photoUrl}}/>
                            </View>
                            <Text style={styles.birthDaytext}>{item.name}'s Birthday</Text>
                        </TouchableOpacity>
                    </View>
                    {(this.state.birthdayList.length-1) !== i && (
                        <View style={styles.bar}></View>
                    )}
                </View>
            )
        })
    }

    render(){
        const { container, textStyle, peopleContainer } = styles
        if(this.state.birthdayList !== ""){
            return (
                <View style={container}>
                    <Text style={textStyle}>BIRTHDAY CALENDER</Text>
                    <ScrollView contentContainerStyle={peopleContainer}>
                        {this.renderData()}
                    </ScrollView>
                </View>
            )   
        } else {
            return (
                <View>
                    <Text>LOADING</Text>
                </View>
            )
        }
    }
}

const styles = {
    container: {
        backgroundColor: '#9352FF',
        flex: 1,
        position: 'relative'
    },
    textStyle: {
        padding: 30,
        color: "#fff",
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Light'
    },
    peopleContainer: {
        width: wp('90%'),
        height: hp('100%'),
        alignSelf: 'flex-end'
    },
    dataContainer: {
        width: wp('90%'),
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative'
    },
    cakeLogo: {
        width: 20,
        height: 20
    },
    contentContainer: {
        width: wp('100%'),
        marginLeft: 20,
    },
    content: {
        width: wp('100%'),
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 8},
        shadowOpacity: 0.6,
        flexDirection: 'row',
        alignItems: 'center'
    },
    photoContainer: {
        backgroundColor: '#ccc',
        borderRadius: 50,
        overflow: 'hidden'
    },
    photoStyle: {
        width: 40,
        height: 40,
        resizeMode: 'contain'
    },
    fontStyle: {
        color: "#fff",
        textTransform: 'uppercase',
        fontFamily: 'TitilliumWeb-Regular',
        marginBottom: 5
    },
    birthDaytext: {
        marginLeft: 10,
        fontSize: 16,
        fontFamily: 'TitilliumWeb-Regular'
    },
    bar: {
        position:'absolute',
        width: 1,
        backgroundColor: '#b68ff7',
        height: hp('13%'),
        top: 70,
        left: 10
    }
}

export default BirthDay;