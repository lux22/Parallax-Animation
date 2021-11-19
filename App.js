/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Text} from 'react-native';
import Slider from './src/components/Slider'; //* Slider Carousel using flatlist *//
import Parallex from './src/components/Parallex'; //* Parallex using flatlist component and Animated API *//

const App = () => {
  return <View style={{flex: 1}}>{<Parallex />}</View>;
};

export default App;
