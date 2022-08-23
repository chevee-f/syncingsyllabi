import React from 'react';
import DocumentPicker, { types } from 'react-native-document-picker'
import * as ImagePicker from 'react-native-image-picker';
import { PermissionsAndroid, Alert } from 'react-native';
import styles from './styles'

const method = (navigation,props) => {

    const openCamera = async (nextScreen) => {  
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                  title: 'Camera Permission',
                  message: 'Syncing Syllabi needs access to your camera ',
                  //buttonNeutral: 'Ask Me Later', 
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
                },
            );
          
          if ((granted === PermissionsAndroid.RESULTS.GRANTED && Platform.OS === 'android') || (Platform.OS === 'ios')) {
              let options = {
                mediaType: 'photo', 
                cameraType: 'back',
                //saveToPhotos: true
              };
              setTimeout(() => {
                ImagePicker.launchCamera(options, (response) => {
                    props.onClose()
                    if (response.errorCode) {
                        Alert.alert(response.errorMessage);
                    }else if (response.didCancel) {
                       
                    }
                     else {
                       if(response.assets !== undefined)  navigation.navigate('ImageViewerScreen', { file: response.assets, source: 'camera', nextScreen: nextScreen })
                    }
                });
              }, 1000)
          } else {
            alert('Camera permission denied');
          }
        } catch (err) {
            alert(err.message);
        } 
    };

    const selectPdf = async(nextScreen) => {
        const pickerResult = await DocumentPicker.pickSingle({
            type: [types.pdf]
        })
        props.onClose()
        navigation.navigate('PdfViewerScreen', { file: pickerResult, source: decodeURI(pickerResult.uri), nextScreen: nextScreen})
    };

    const selectImage = async(nextScreen) => {
        let options = {
            mediaType: 'photo',
            selectionLimit: 0
        };
        setTimeout(() => {
        ImagePicker.launchImageLibrary(options, (response) => {
            props.onClose()
            if (response.errorCode) {
                Alert.alert('ImagePicker Error: ', response.errorMessage);
            } else {
                if(response.assets !== undefined)  navigation.navigate('ImageViewerScreen', { file: response.assets, source: 'imgGallery', nextScreen: nextScreen })
            }
        });
        }, 1000)
    };

    return {
        openCamera,
        selectPdf,
        selectImage
    };
  };
  
  export default method;