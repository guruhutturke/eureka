import React, {Component} from 'react';
import { Text, ScrollView, View, TextInput, Image, TouchableOpacity, Linking, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';

class empDetails extends Component {
    state = { data:"", firstName: "", lastName: "" }
    
    componentDidMount(){
        this.getItemValue();
    }

    setValues(response){
        let nameValue = response.name;
        nameValue = nameValue.split(' ');
        let firstName = nameValue[0];
        let lastName = "";
        nameValue.shift();
        nameValue.map((item)=>{
            lastName = lastName + item + ' ';
        })
        lastName = lastName.trimRight();
        this.setState({ data: response,
                        firstName: firstName,
                        lastName: lastName});
      }

    async getItemValue() {
        const profileData = await AsyncStorage.getItem('data');
        this.setValues(JSON.parse(profileData));
    }

    dialCall(){
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${'+this.state.phoneNumber+'}';
        }
        else {
            phoneNumber = 'telprompt:${'+this.state.phoneNumber+'}';
        }
        Linking.openURL(phoneNumber);
    }

    sendEmail(){
        Linking.openURL('mailto:'+this.state.email+'?subject=SendMail&body=Description')
    }

    render(){
        const { container, photoContainer, topSection, textStyle, headerStyle, 
                phoneStyle, phoneText, section, rightSection, title, value, noBorder } = styles;
        return(
            <ScrollView style={container}>
                <Text style={headerStyle}>PERSONAL DETAILS</Text>
                <View style={topSection}>
                    <View style={photoContainer}>
                        <Image style={styles.picstyle} source={{uri:this.state.data.photoUrl}}></Image>
                    </View>
                    <Text style={textStyle}>{this.state.firstName + ' ' + this.state.lastName}</Text>
                    <TouchableOpacity style={phoneStyle} onPress={()=>this.dialCall()}>
                        <Text style={phoneText}>{this.state.data.mobile}</Text>
                        <Image source={require('../../assets/png/phone.png')} />
                    </TouchableOpacity>
                </View>
                <View style={section}>
                    <View>
                        <Text style={title}>DESIGNATION</Text>
                        <Text style={value}>{this.state.designation || this.state.data.designation}</Text>
                    </View>
                    <View style={rightSection}>
                        <Text style={title}>EMP.ID</Text>
                        <Text style={value}>#40</Text>
                    </View>
                </View>
                <View style={section}>
                    <View>
                        <Text style={title}>EMAIL</Text>
                        <Text style={value}>{this.state.data.email}</Text>
                    </View>
                    <View style={rightSection}>
                        <TouchableOpacity onPress={()=>this.sendEmail()}>
                            <Image source={require('../../assets/png/email.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={section}>
                    <View>
                        <Text style={title}>REPORTING TO</Text>
                        <Text style={value}>Vidhi Maheswari</Text>
                    </View>
                </View>
                <View style={[section, noBorder]}>
                    <View>
                        <Text style={title}>DOJ</Text>
                        <Text style={value}>01-Jun-2019</Text>
                    </View>
                    <View style={rightSection}>
                        <Text style={title}>REGION</Text>
                        <Text style={value}>India</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: "#fff",
        padding: 20
    },
    headerStyle: {
        color: '#828282',
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 18
    },
    topSection: {
        width: wp('90%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 30
    },
    photoContainer: {
        borderRadius: 100,
        backgroundColor: "#ccc",
        overflow: 'hidden',
        margin: 20,
        marginTop: 0
    },
    picstyle: {
        width:100,
        height:100,
        resizeMode: 'contain'
    },
    textStyle: {
        textAlign: 'center',
        fontFamily: 'TitilliumWeb-Light',
        fontSize: 20,
        flexWrap: 'wrap',
        width: wp('60%'),
        marginBottom: 10
    },
    phoneStyle: {
        backgroundColor: '#2AC940',
        borderRadius: 50,
        padding: 10,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp('45%')
    },
    phoneText: {
        color: '#fff',
        fontFamily: 'TitilliumWeb-Regular'
    },
    section: {
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    title: {
        fontSize: 12,
        color: '#a2a2a2',
        fontFamily: 'TitilliumWeb-Regular'
    },
    value: {
        fontSize: 16,
        fontFamily: 'TitilliumWeb-Regular'
    },
    rightSection: {
        alignItems: 'flex-end'
    },
    noBorder: {
        borderBottomWidth: 0
    }
}

export default empDetails