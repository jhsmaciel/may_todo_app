import React, { useState, useContext } from 'react';
import Todo from './screens/Todo';
import { navigationRef } from './services/Navigation';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon, Drawer, DrawerItem, Divider, Layout, Text, IndexPath, Button } from '@ui-kitten/components';
import { ImageBackground } from 'react-native';
import { ThemeContext } from './theme-context';

// Bottom tab Navigator
const Tab = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title='TO DO' icon={(props) => <Icon {...props} name="layers-outline"/>}/>
        <BottomNavigationTab title='DOING' icon={(props) => <Icon {...props} name="loader-outline"/>}/>
        <BottomNavigationTab title='DONE' icon={(props) => <Icon {...props} name="done-all-outline"/> }/>
    </BottomNavigation>
);

const TabNavigator = () => (
    <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Tab.Screen name="To do" component={Todo.Get.Todo} />
        <Tab.Screen name="Doing" component={Todo.Get.Doing} />
        <Tab.Screen name="Done" component={Todo.Get.Done} />
    </Tab.Navigator>
);

// Drawer navigator
const DrawerNavigation = createDrawerNavigator();

const plusOutline = (props) => (
    <Icon name="plus-outline" {...props}/>
)

const listOutline = (props) => (
    <Icon name="list-outline" {...props}/>
)

const Header = (props) => (
    <>
        <Layout style={{
            height: '15%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ImageBackground
                style={[props.style, { height: 60, width: 60}]}
                source={require('./assets/images/Logo.jpg')}
            />
        </Layout>
        <Divider />
    </>
);

function Footer (props) {
    return (
        <>
            <Layout style={{
                height: '5%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Button 
                    size="small"
                    appearance="ghost" 
                    accessoryLeft={(props) => <Icon {...props} name="toggle-left-outline" />}
                    onPress={props.toggle}
                >
                    Toggle Theme
                </Button>
            </Layout>
            <Divider />
        </>
    );
};

const DrawerContent = ({ navigation, state }) => {

    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
    const themeContext = useContext(ThemeContext);
    
    return (
        <Drawer
            header={Header}
            footer={() => <Footer toggle={themeContext.toggleTheme} />}
            selectedIndex={selectedIndex}
            onSelect={index => {
                    setSelectedIndex(index)
                    navigation.navigate(state.routeNames[index.row])
                }
            }
        >
            <DrawerItem title={evaProps => <Text {...evaProps}>Criar</Text>} accessoryLeft={plusOutline} />
            <DrawerItem title={evaProps => <Text {...evaProps}>Listar</Text>} accessoryLeft={listOutline} />
        </Drawer>
    );
};

const DrawerNavigator = () => (
    <DrawerNavigation.Navigator drawerContent={props => <DrawerContent {...props}/>}>
        <DrawerNavigation.Screen name='Criar' component={Todo.Create}/>
        <DrawerNavigation.Screen name='Listar' component={TabNavigator}/>
        <DrawerNavigation.Screen name='Atualizar' component={Todo.Update}/>
    </DrawerNavigation.Navigator>
);

const TopStackComp = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer ref={navigationRef}>
            <DrawerNavigator />
        </NavigationContainer>
    );
};