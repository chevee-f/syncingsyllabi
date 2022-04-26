import React from 'react';
import { Text } from 'react-native';
import label from '../../styles/label'
import color from '../../styles/colors'

const Label = props => {
 
    return (
        <Text style={[label.boldMediumHeading,{color: props.isDarkTheme ? color.default : color.primary}]}>{props.text}</Text>
    );
};

export default Label;
