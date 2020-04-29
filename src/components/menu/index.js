import React from 'react'
import { Icon, TopNavigationAction } from '@ui-kitten/components';

const MenuIcon = (props) => (
	<Icon {...props} name='menu'/>
);
  
const ReloadIcon = (props) => (
	<Icon {...props} name='refresh-outline' />
);

export const MenuAction = (navigation) => (
    <TopNavigationAction onPress={ () => navigation.toggleDrawer()} icon={MenuIcon}/>
);

export const ReloadAction = functionToRun => (
  	<TopNavigationAction onPress={ functionToRun } icon={ReloadIcon}/>
);