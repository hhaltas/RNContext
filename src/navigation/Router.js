import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//Pages
import BlogList from '../pages/BlogList';
import BlogDetail from '../pages/BlogDetail';
import {ApiProvider} from '../context/ApiContext';

export default function App(props) {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <ApiProvider>
        <Stack.Navigator
          screenOptions={{headerShown: true, headerTitleAlign: 'center'}}>
          <Stack.Screen name="maestrocr.com" component={BlogList} />
          <Stack.Screen name="detail" component={BlogDetail} />
        </Stack.Navigator>
      </ApiProvider>
    </NavigationContainer>
  );
}
