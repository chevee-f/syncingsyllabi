import React, { Component } from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import styles from './styles'
import color from '../../styles/colors'

const Loader = props => {
  const {
    loading,
    ...attributes
  } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {console.log('close modal')}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator size="medium" color={color.textDefault} />
        </View>
      </View>
    </Modal>
  )
}

export default Loader;