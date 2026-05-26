import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import AUTH_ROUTES, { getProtectedScreens } from "../navigation/StackNavigation"
import { StyleSheet, Text, View, ActivityIndicator, DeviceEventEmitter } from 'react-native'
// import { useDispatch, useSelector } from 'react-redux';
// import { loadUser } from '../redux/Slices/authSlice';

const Stack = createStackNavigator()

const AppNavigator = () => {
    // const dispatch = useDispatch();

    const isAuthenticated = true;

    return (
        <NavigationContainer onStateChange={() => DeviceEventEmitter.emit('SCREEN_CHANGED')}>
            <Stack.Navigator
                // initialRouteName="technician_home_screen"
                initialRouteName="splash_screen"
                screenOptions={{
                    headerBackTitleVisible: false,
                    gestureEnabled: false,
                    headerShown: false
                }}
            >
                {AUTH_ROUTES.map((route) => {
                    return (
                        <Stack.Screen
                            key={route.name}
                            name={route.name}
                            component={route.component}
                            options={route.options}
                        />
                    )

                })}

                {/* Protected Screens (only shown when authenticated) */}
                {isAuthenticated &&
                    getProtectedScreens().map(route => {
                        // console.log("Protected Routes Data: ", route)
                        return (
                            <Stack.Screen
                                key={route.name}
                                name={route.name}
                                component={route.component}
                                options={route.options}
                            />
                        )
                    })}

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
})