/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import Routes from './Routes'
import * as themeLight from './config/theme.json';
import * as themeDark from './config/theme-dark.json';
import * as mapping from './config/mapping.json'
import * as eva from '@eva-design/eva';

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StatusBar } from 'react-native';
import { ThemeContext } from './theme-context';

const enumTheme = {
	LIGHT: 'light',
	DARK: 'dark'
}

const App  = () => {
	const [theme, setTheme] = useState(enumTheme.LIGHT);
	
	const toggleTheme = () => {
		const nextTheme = theme === enumTheme.LIGHT ? enumTheme.DARK : enumTheme.LIGHT;
		setTheme(nextTheme);
	};

	return (
		<>
			<StatusBar
				backgroundColor={theme == enumTheme.LIGHT ? "#FFF" : "#222B45" }
				barStyle={theme == enumTheme.LIGHT ? "dark-content" : "light-content"}
			/>
			<IconRegistry icons={EvaIconsPack} />
			<ThemeContext.Provider value={{ theme, toggleTheme }}>
				<ApplicationProvider 
					{...eva} 
					theme={
						theme == enumTheme.LIGHT ?
							{ 
								...eva[theme],
								...themeLight 
							}
						:
							{
								...eva[theme],
								...themeDark
							}
					}

					customMapping={mapping}
				>
					<Routes />
				</ApplicationProvider >
			</ThemeContext.Provider>
		</>
	);
};

export default App;
