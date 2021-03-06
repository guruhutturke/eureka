/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createSwitchNavigator, createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import testView from './src/components/testView';
import LoginForm from './src/components/LoginForm';
import Dashboard from './src/components/Dashboard';
import HolidayList from './src/components/HolidayList';
import Leave from './src/components/Leave';
import WFH from './src/components/WFH';
import Search from './src/components/searchPeople';
import Details from './src/components/peopleDetails';
import Employee from './src/components/empDetails';
import Birthday from './src/components/Birthday';
import Settings from './src/components/Settings';
import SideMenu from './src/components/SideMenu'
import { widthPercentageToDP } from 'react-native-responsive-screen';

const AuthStackNavigator = createStackNavigator(
  {
    Dashboard: { screen: Dashboard},
    testView: { screen: testView},
    HolidayList: { screen: HolidayList},
    Leave: { screen: Leave},
    WFH: { screen: WFH},
    Search: { screen: Search},
    Details: { screen: Details},
    Employee: { screen: Employee},
    Birthday: { screen: Birthday},
    Settings: { screen: Settings}
  },
  {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
)

const DrawerNavigator = createDrawerNavigator(
 {
  default:{screen:AuthStackNavigator},
  Home: { screen: Dashboard},
  LogOut: { screen: testView}
 },
 {
  contentComponent: SideMenu,
  contentOptions: {
    labelStyle: {
    color: 'blue'
  }
  }
 }  
 
 )

const AuthSwitchNavigator = createSwitchNavigator(
  {
    Login: { screen: LoginForm },
    Dashboard: { screen: DrawerNavigator }
  }
)

export default createAppContainer(AuthSwitchNavigator);
