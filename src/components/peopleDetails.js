import React, {Component} from 'react';
import { Text, ScrollView, View, TextInput, Image, TouchableOpacity, Linking, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

class peopleDetails extends Component {
    state = { name:"", photoUrl:"", phoneNumber:"", email:"", address:"", designation:"" }
    
    componentDidMount(){
        let name = this.props.navigation.getParam('name', '');
        let photoUrl = this.props.navigation.getParam('photoUrl', '');
        let phoneNumber = this.props.navigation.getParam('phoneNumber', '');
        let email = this.props.navigation.getParam('email', '');
        let address = this.props.navigation.getParam('address', '');
        let designation = this.props.navigation.getParam('designation', '');
        this.setState({ name, photoUrl, phoneNumber, email, address, designation})
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
        const { container, photoContainer, topHeader, textStyle } = styles;
        return(
            <View style={container}>
                <View style={topHeader}>
                    <View style={photoContainer}>
                        <Image style={styles.picstyle} source={{uri:this.state.photoUrl}}></Image>
                    </View>
                    <Text style={textStyle}>{this.state.name}</Text>
                </View>

                <View style={topHeader}>
                    <TouchableOpacity onPress={()=>this.dialCall()}>
                        <Icon name="phone" size={30}/>
                    </TouchableOpacity>
                    <Text style={textStyle}>{this.state.phoneNumber}</Text>
                </View>

                <View style={topHeader}>
                    <TouchableOpacity onPress={()=>this.sendEmail()}>
                        <Icon name="envelope" size={30}/>
                    </TouchableOpacity>
                    <Text style={textStyle}>{this.state.email}</Text>
                </View>
                
                <View style={topHeader}>
                    <TouchableOpacity>
                        <Icon name="map-marker" size={30}/>
                    </TouchableOpacity>
                    <Text style={textStyle}>{this.state.address}</Text>
                </View>

                <View style={topHeader}>
                    <TouchableOpacity>
                        <Icon name="id-card" size={30}/>
                    </TouchableOpacity>
                    <Text style={textStyle}>{this.state.designation}</Text>
                </View>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: "#FF5F58",
        padding: 20,
        alignItems: 'center'
    },
    topHeader: {
        width: wp('90%'),
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
        justifyContent: 'space-evenly'
    },
    photoContainer: {
        borderWidth: 2,
        borderRadius: 100,
        borderColor: "#4EB29C",
        backgroundColor: "#ccc",
        overflow: 'hidden'
    },
    picstyle: {
        width:100,
        height:100,
        resizeMode: 'contain'
    },
    textStyle: {
        color: '#fff',
        fontFamily: 'TitilliumWeb-Light',
        fontSize: 18,
        flexWrap: 'wrap',
        width: wp('60%')
    }
}

export default peopleDetails