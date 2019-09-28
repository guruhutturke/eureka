import React, {Component} from 'react';
import { Text, ScrollView, View, TextInput, Image, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from "react-navigation";
import data from '../data/people.json'

class SearchPeople extends Component {
    state = { value: "" , peopleList: "" }

    componentDidMount(){
      this.setState({ peopleList: data.data})
    }

    onChangeText(value){
      this.setState({ value: value.value })
      let filteredValue
      if(value.value.length > 0){
        filteredValue = this.state.peopleList.filter(function(item){
          return item.name.includes(value.value)
        })
      } else {
        filteredValue = data.data
      }
      console.log('filteredValue ', filteredValue);
      this.setState({ peopleList: filteredValue})
    }

    renderData(){
      return this.state.peopleList.map((people, i) => {
        return (
          <TouchableOpacity style={styles.peopleData} key={i} onPress={()=> this.props.navigation.navigate('Details', people)}>
            <View style={styles.imageContainer}>
              <Image style={styles.picstyle} source={{uri:people.photoUrl}}></Image>
            </View>
            <Text>{people.name}</Text>
          </TouchableOpacity>
        )
      })
    }

    render() {
        const { container, textStyle, flexContainer, inputStyle, iconStyle, searchContainer, peopleContainer } = styles;
        if(this.state.peopleList != ""){
          return (
            <View style={container}>
                <View style={flexContainer}>
                  <Text style={textStyle}>SEARCH</Text>

                  <View style={searchContainer}>
                    <Icon name="search" size={25} style={iconStyle}/>
                    <TextInput
                      style={inputStyle}
                      onChangeText={value => this.onChangeText({ value })}
                      value={this.state.value}
                    />
                  </View>

                  <ScrollView style={peopleContainer}>
                    {this.renderData()}
                  </ScrollView>
                </View>
            </View>
          );
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
      flex: 1,
      position: 'relative',
      backgroundColor: "#F0B41B",
      padding: 20
    },
    flexContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    textStyle: {
      letterSpacing: 1,
      color: "#fff",
      fontSize: 20,
      fontFamily: 'TitilliumWeb-Light'
    },
    searchContainer: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderRadius: 5,
      marginTop: 5,
      position: "relative",
      borderColor: '#fff',
      marginBottom: 20,
      width: wp('90%'),
      flexDirection: 'row',
      paddingLeft: 15
    }, 
    inputStyle: {
      backgroundColor: '#fff',
      width: wp('60%'),
      height: 40,
    },
    iconStyle: {
      top: 6,
      marginRight: 5
    },
    peopleContainer: {
      width: wp('90%'),
      height: hp('100%')
    },
    peopleData: {
      height: 50,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      marginBottom: 10,
      backgroundColor: '#fff',
      borderRadius: 5
    },
    imageContainer: {
      borderWidth: 2,
      borderRadius: 100,
      borderColor: "#000",
      backgroundColor: "#ccc",
      overflow: 'hidden',
      marginRight: 20
    },
    picstyle: {
      width:40,
      height:40,
      resizeMode: 'contain'
    }
}

export default withNavigation(SearchPeople);