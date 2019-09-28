import React, {Component} from 'react';
import { Text, TextInput, View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

const InfoCard = (props) =>{

    const { inputStyle, header, colorStyle, content } = styles

    return(
        <View style={content}>
            <View style={header}>
                <Icon name={props.iconName} size={30} color="#fff"/>
                <Text style={colorStyle}>{props.value}</Text>
            </View>
            <TextInput
                style={inputStyle}
                value={props.data}
                editable={props.editable}
                onChangeText={value => props.onChangeText(value, props.value)}
            />
        </View>
    )
};

const styles={
    inputStyle: {
        fontFamily: 'TitilliumWeb-ExtraLight',
        color: "#fff",
        borderColor: '#fff',
        borderWidth: 1,
        fontSize: 18
    },
    header: {
        width: wp('60%'),
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    colorStyle: {
        color: '#fff',
        marginLeft: 20,
        textTransform: 'uppercase'
    },
    content: {
        marginBottom: 30
    }
}

export default InfoCard