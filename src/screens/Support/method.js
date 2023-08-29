import React, { useState, useContext } from 'react';
import {Context as AuthContext} from '../../components/Context/AuthContext';

const method = (navigation) => {
    const { state } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [notAvailableModalVisible, setNotAvailableModalVisible] = useState(false);

    const closeModal = () => {
        //setModalVisible(false)
        navigation.navigate('MainDrawerContent')
    }

    const handleSendSupport = () => {
        if(state.userId) {
            // send support
        } else {
            setNotAvailableModalVisible(true);
        }
    }

    return {
        notAvailableModalVisible,
        setNotAvailableModalVisible,
        closeModal,
        handleSendSupport
    };
  };
  
  export default method;