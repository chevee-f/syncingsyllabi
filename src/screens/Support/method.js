import React from 'react';

const method = (navigation) => {

    const [modalVisible, setModalVisible] = React.useState(false);

    const closeModal = () => {
        //setModalVisible(false)
        navigation.navigate('MainDrawerContent')
    }

    return {
        closeModal
    };
  };
  
  export default method;