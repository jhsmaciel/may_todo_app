import React from 'react';
import { DrawerItems } from '@react-navigation/drawer';
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    flex1: {
        flex: 1,
    },

});

export const CustomDrawerComponent = (props) =>(
    <SafeAreaView style={styles.flex1}>
        <ScrollView>
            <DrawerItems
                {...props}
            />
        </ScrollView>
    </SafeAreaView>
);