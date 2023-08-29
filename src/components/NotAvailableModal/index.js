import React, {useEffect} from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
// import styles from './styles';
// import method from './method';
import Card from '../Card';
import Modal from "react-native-modal";
import Label from '../Label';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import SecondaryButton from '../../components/SecondaryButton';
import GradientItem from '../../components/GradientItem';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '../../components/DateTimePicker';
import { getAssignmentsByUser } from '../../actions/assignments';
import { getSyllabusByUser } from '../../actions/syllabus';

import {Context as AuthContext} from '../../components/Context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import WeekdayTimePicker from '../../components/WeekdayTimePicker';
import Moment from 'moment';
import ConfirmationModal from '../../components/ConfirmationModal';
import SuccessModal from '../../components/SuccessModal';
import DocumentPicker, { types } from 'react-native-document-picker';
import { WebView } from 'react-native-webview';
import CalendarStrip from 'react-native-calendar-strip';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotAvailableModal = props => {
    return (
      <Modal 
      isVisible={props.isVisible} 
      // isVisible={true} 
      style={{
        margin: 0
      }} 
      transparent={true} 
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      backdropOpacity={0.4}
      avoidKeyboard
      onBackdropPress={() => props.onClose()} 
      >
      <View style={{
        paddingBottom: 15,
        backgroundColor:'white',
        position: 'relative',
        borderRadius: 16,
        width: Dimensions.get("window").width - 40,
        marginHorizontal: 20
      }}>
          <View style={{ marginHorizontal: 13, marginTop: 12 }}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#0036A1',
                marginTop: 20,
                marginBottom: 20,
                marginHorizontal: 10
              }}>This feature is only available for Logged in users</Text>
              <DefaultButton 
                      title="Close" 
                      style={{ marginBottom: 10 }}
                      buttonColor={{ 
                        backgroundColor: "#E6EAF2", 
                        borderColor: '#A6BEED',
                        borderWidth: 1
                      }}
                      textStyle={{ 
                        color: '#494AE2'
                      }}
                      onPress={() => props.onClose()}
                    /> 
          </View>
      </View>
    </Modal>
    )
  }

export default NotAvailableModal;