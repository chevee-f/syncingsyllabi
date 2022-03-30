import React from 'react';
import { View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './styles'

const Dropdown = ({
    onDismiss,
    openMenu,
    isOpen,
  ...props
}) => {
  return (
            <DropDownPicker
                open={isOpen}
                setOpen={openMenu}
                onClose={onDismiss}
                items={[
                    {label: 'Item 1', value: 'item1'},
                    {label: 'Item 2', value: 'item2', selected: true},
                ]}

                //itemStyle={{alignItems: 'center'}}
                //labelStyle={{fontSize: 25, color: '#000'}}
                //defaultValue="TypeScript"
                //defaultIndex={1}

                containerStyle={styles.containerStyle}
                style={styles.dropDown}
                placeholderStyle={styles.placeHolder}
                placeholder="Select Goal"
            />
  );
};

export default Dropdown;
