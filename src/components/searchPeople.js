import React, {Component} from 'react';
import { Text, ScrollView, View, TextInput, Image, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from "react-navigation";
import AsyncStorage from '@react-native-community/async-storage';
import data from '../data/people.json'

class SearchPeople extends Component {
    state = { value: "" , peopleList: "" }

    componentDidMount(){
      this.getItemValue();
      this.setState({ peopleList: data.data})
    }

    async getItemValue() {
      const email = await AsyncStorage.getItem('email');
      let detailsResponse = await AsyncStorage.getItem('detailsResponse');
      console.log('detailsResponse', JSON.parse(detailsResponse));
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

    sortData(users){
      let data = users.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
      })
      return data;
    }

    massageData(){
      let usersData = this.sortData(this.state.peopleList);
      let usersArray = [];
      usersData.map((item)=>{
        usersArray.push(item.name)
      })
      let sortedObj = usersArray.reduce((a, c) => {
        // c[0] should be the first letter of an entry
        let k = c[0].toLocaleUpperCase()
    
        // either push to an existing dict entry or create one
        if (a[k]) a[k].push(c)
        else a[k] = [c]
    
        return a
      }, {})

      let keys = Object.keys(sortedObj);
      let finalArray = [];
      keys.map((key)=>{
        let usersObj = {};
        usersObj.letter = key;
        usersObj.data = sortedObj[key]
        finalArray.push(usersObj)
      })
      
      finalArray.map((item)=>{
        let finalList = [];
        item.data.map((itemName)=>{
          let filterName = usersData.filter(function(item){
            return itemName == item.name
          })
          finalList.push(filterName[0])
        })
        item.data = finalList
      })
      return finalArray.map((item, i)=>{
        return (
          <View key={i}>
            <Text style={styles.letterStyle}>{item.letter}</Text>
            {this.renderData(item.data)}
          </View>
        )
      })
    }

    renderData(userData){
      return userData.map((people, i) => {
        return (
          <TouchableOpacity style={styles.peopleData} key={i} onPress={()=> this.props.navigation.navigate('Employee', people)}>
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
                  <View style={searchContainer}>
                    <Image source={require('../../assets/png/Search.png')} style={iconStyle}/>
                    <TextInput
                      style={inputStyle}
                      onChangeText={value => this.onChangeText({ value })}
                      value={this.state.value}
                      placeholder="Search"
                    />
                  </View>

                  <ScrollView style={peopleContainer}>
                    {this.massageData()}
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
      backgroundColor: "#e2e2e2"
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
      borderRadius: 3,
      position: "relative",
      borderColor: '#fff',
      margin: 20,
      marginBottom: 10,
      width: wp('90%'),
      flexDirection: 'row',
      paddingLeft: 15,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 2},
      shadowOpacity: 1,
      elevation: 3
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
      width: wp('100%'),
      height: hp('100%')
    },
    peopleData: {
      height: 70,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      borderColor: '#ddd',
      borderBottomWidth: 1,
      backgroundColor: '#fff',
      borderRadius: 5
    },
    imageContainer: {
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
    },
    letterStyle: {
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 20,
      fontFamily: 'TitilliumWeb-SemiBold'
    }
}

export default withNavigation(SearchPeople);