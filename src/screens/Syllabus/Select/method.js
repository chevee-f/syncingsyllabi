import React from 'react';
import Triangle from '../../../components/Triangle'
import DocumentPicker, { types } from 'react-native-document-picker'
import * as ImagePicker from 'react-native-image-picker';
import { PermissionsAndroid, Alert } from 'react-native';
import styles from './styles'

const method = (navigation,props) => {

    const openCamera = async () => {  
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
                    } else {
                       if(response.assets !== undefined)  navigation.navigate('ImageViewerScreen', { file: response.assets, source: 'camera' })
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

    const TriangleDown = () => {
        return <Triangle style={styles.triangleDown} />;
    };

    const selectPdf = async() => {
        const pickerResult = await DocumentPicker.pickSingle({
            type: [types.pdf]
        })
        props.onClose()
        navigation.navigate('PdfViewerScreen', { file: pickerResult, source: decodeURI(pickerResult.uri)})
    };

    const selectImage = async() => {
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
                if(response.assets !== undefined)  navigation.navigate('ImageViewerScreen', { file: response.assets, source: 'imgGallery' })
            }
        });
        }, 1000)
    };

    return {
        openCamera,
        TriangleDown,
        selectPdf,
        selectImage
    };
  };
  
  export default method;