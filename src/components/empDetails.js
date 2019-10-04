import React, {Component} from 'react';
import { Text, ScrollView, View, TextInput, Image, TouchableOpacity, Linking, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';

class empDetails extends Component {
    state = { name:"", photoUrl:"", phoneNumber:"", email:"", designation:"", employeeId:"", managerId:"", location:""}
    
    componentDidMount(){
        this.getItemValue()
        let name = this.props.navigation.getParam('name', '');
        let photoUrl = this.props.navigation.getParam('photoUrl', '');
        let phoneNumber = this.props.navigation.getParam('mobile', '');
        let email = this.props.navigation.getParam('email', '');
        let designation = this.props.navigation.getParam('designation', '');
        let employeeId = this.props.navigation.getParam('employeeId', '');
        let managerId = this.props.navigation.getParam('managerId', '');
        let location = this.props.navigation.getParam('location', '');
        this.setState({ name, photoUrl, phoneNumber, email, designation, employeeId, managerId, location},()=>{
            console.log(this.state)
        })
    }

    async getItemValue() {
        const email = await AsyncStorage.getItem('email');
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
                <Text style={headerStyle}>EMPLOYEE DETAILS</Text>
                <View style={topSection}>
                    <View style={photoContainer}>
                        <Image style={styles.picstyle} source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/1200px-Google_Images_2015_logo.svg.png'}}></Image>
                    </View>
                    <Text style={textStyle}>{this.state.name}</Text>
                    <TouchableOpacity style={phoneStyle} onPress={()=>this.dialCall()}>
                        <Text style={phoneText}>{this.state.phoneNumber}</Text>
                        <Image source={require('../../assets/png/phone.png')} />
                    </TouchableOpacity>
                </View>
                <View style={section}>
                    <View>
                        <Text style={title}>DESIGNATION</Text>
                        <Text style={value}>{this.state.designation}</Text>
                    </View>
                    <View style={rightSection}>
                        <Text style={title}>EMP.ID</Text>
                        <Text style={value}>#{this.state.employeeId}</Text>
                    </View>
                </View>
                <View style={section}>
                    <View>
                        <Text style={title}>EMAIL</Text>
                        <Text style={value}>{this.state.email}</Text>
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
                        <Text style={value}>{this.state.managerId}</Text>
                    </View>
                </View>
                <View style={[section, noBorder]}>
                    <View>
                        <Text style={title}>DOJ</Text>
                        <Text style={value}>01-Jun-2019</Text>
                    </View>
                    <View style={rightSection}>
                        <Text style={title}>REGION</Text>
                        <Text style={value}>{this.state.location}</Text>
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