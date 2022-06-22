import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './styles'

const Dropdown = ({
    onDismiss,
    openMenu,
    isOpen,
  ...props
}) => {

  const onSelect = (item) => {
    props.onSelectItem(item);
  }

  return (
            <DropDownPicker
                open={isOpen}
                setOpen={openMenu}
                onClose={onDismiss}
                items={props.items}
                value={props.selectedItem}
                onSelectItem={(item) => {
                  onSelect(item.value)
                }}
                style={styles.dropDown}
                containerStyle={styles.containerStyle}
                placeholderStyle={styles.placeHolder}
                placeholder="Select Goal"
                dropDownContainerStyle={styles.dropDownContainerStyle}
                itemProps={{
                  style:{ 
                   padding: 10,
                   paddingLeft: 20
                  }
                }}
                textStyle={styles.text}
            />
  );
};

export default Dropdown;
