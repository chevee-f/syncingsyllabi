import React from 'react';
import { View } from 'react-native';
import styles from './styles'

const Triangle = props => {
    return <View style={[styles.triangle, props.style]} />;
};

export default Triangle;
