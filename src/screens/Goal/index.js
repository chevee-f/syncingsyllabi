import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import TabButton from './../../components/TabButton'
import DropDownPicker from 'react-native-dropdown-picker';
import CardItem from '../../components/CardItem'
import styles from './styles'
import label from '../../styles/label'
import color from '../../styles/colors'

var terms = [{ name: "Short-Term", isActive: true },
             { name: "Medium-Term", isActive: false },
             { name: "Long-Term", isActive: false },
             { name: "Archived", isActive: false }];

const GoalScreen = ({ navigation }) => {

    return (
      <View style={{ flex:1 }}>
        <View style={styles.header}>
          {
            terms.map((item) => {
                return (
                    <TabButton title={item.name} isActive={item.isActive} />
                );
            })                
          }     
        </View>
        <View style={styles.sortContainer}>
            <Text style={[label.boldExtraSmallHeading, {color: color.default, marginLeft:10}]}>Sort by</Text>
            <DropDownPicker
                open={false}
                //setOpen={setOpen}
                items={[
                    {label: 'Item 1', value: 'item1'},
                    {label: 'Item 2', value: 'item2', selected: true},
                ]}

                containerStyle={styles.containerStyle}
                style={styles.dropDown}
                placeholderStyle={styles.placeHolder}
                placeholder="Due Date"
            />
        </View>

        <CardItem />
      </View>
    )
}

export default GoalScreen;