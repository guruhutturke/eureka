import React, {Component} from 'react';
import { Text, TextInput, ScrollView, View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import response from '../data/response.json';
import InfoCard from '../common/InfoCard';

class Settings extends Component {
    state = { data:"" };
    constructor(props){
        super(props)
        this.onChangeText = this.onChangeText.bind(this);
    }

    componentDidMount(){
        this.setState({ data: response})
    }
    
    onChangeText(value, key){
        this.setState(prevState => {
            let data = Object.assign({}, prevState.data);       // creating copy of state variable data
            data[key] = value;                                  // update the name property, assign a new value                 
            return { data };                                    // return new object data object
        })
    }
    
    render(){
        const { container, textStyle, inputContainer } = styles;
        if(this.state.data !== ""){
            return(
                <View style={container}>
                    <Text style={textStyle}>EDIT PROFILE</Text>
                    <ScrollView style={inputContainer}>
                        <InfoCard data={this.state.data.firstName} value="firstName" iconName="id-badge" editable={false} onChangeText={this.onChangeText}/>
                        <InfoCard data={this.state.data.designation} value="designation" iconName="briefcase" editable={false} onChangeText={this.onChangeText}/>
                        <InfoCard data={this.state.data.mobile} value="mobile" iconName="mobile" editable={false} onChangeText={this.onChangeText}/>
                        <InfoCard data={this.state.data.emergencyNumber} value="emergencyNumber" iconName="phone" editable={true} onChangeText={this.onChangeText}/>
                        <InfoCard data={this.state.data.birthday} value="birthday" iconName="birthday-cake" editable={true} onChangeText={this.onChangeText}/>
                        <InfoCard data={this.state.data.address} value="address" iconName="map-marker" editable={true} onChangeText={this.onChangeText}/>
                    </ScrollView>
                </View>
            )
        } else {
            return(
                <View>
                    <Text>LOADING</Text>
                </View>
            )
        }
    }
}

const styles={
    container: {
        backgroundColor: '#262525',
        flex: 1,
        position: 'relative',
        padding: 20
    },
    textStyle: {
        color: '#fff',
        fontFamily: 'TitilliumWeb-Light',
        fontSize: 20,
        marginBottom: 10
    },
    inputContainer: {
        width: wp('90%')
    }
}

export default Settings;