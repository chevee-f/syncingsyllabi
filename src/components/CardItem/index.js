
import React, {useState, useCallback} from 'react';
import {SafeAreaView, StyleSheet, View, StatusBar, Image, Text} from 'react-native';

import SwipeActionList from 'react-native-swipe-action-list';

import label from '../../styles/label'
import color from '../../styles/colors'

const CardItem = props => {
 
    return (
        <Text style={[label.boldMediumHeading,{color:color.primary}]}>{props.text}</Text>
    );
};

export default CardItem;
