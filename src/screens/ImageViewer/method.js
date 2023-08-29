import React, { useState, useEffect } from 'react';
import * as RNFS from 'react-native-fs'
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import { Platform } from 'react-native';

const method = (props) => {
    const navigation = useNavigation();

    const [activeTab, setActiveTab] = useState(0);
    const [syllabiPagesCount, setSyllabiPagesCount] = useState(0);
    const [assignmentPagesCount, setAssignmentPagesCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [includedPagesInSyllabi, setIncludedPagesInSyllabi] = useState([]);
    const [includedPagesInAssignment, setIncludedPagesInAssignment] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);

    const onSelect = (value) => {
        setActiveTab(value)
        setCurrentPage(1)
    }

    const includePages = () => {
        let pages = activeTab === 0 ? includedPagesInSyllabi : includedPagesInAssignment;
        if(((includedPagesInSyllabi).includes(currentPage) && activeTab === 0) || ((includedPagesInAssignment).includes(currentPage) && activeTab === 1)){
            var index = pages.indexOf(currentPage)
            pages.splice(index, 1)
        }else{
            pages.push(currentPage) 
        }
        activeTab === 0 ? setIncludedPagesInSyllabi(pages) : setIncludedPagesInAssignment(pages);
        activeTab === 0 ? setSyllabiPagesCount(includedPagesInSyllabi.length) : setAssignmentPagesCount(includedPagesInAssignment.length)
    }

    useEffect(() => {
        setTotalPages(props.route.params.file.length)
        setImageFiles(props.route.params.file)
    }, [props.route.params.file]);

    const scanImage = async(nextScreen) => {
        try{
            let base64ArraySyllabi = [];
            let base64ArrayAssignment = [];

            if(activeTab == 0) {
                for(let i = 0; i < includedPagesInSyllabi.length; i++) {
                    let imgBase64 = await RNFS.readFile(decodeURI(props.route.params.file[includedPagesInSyllabi[i] - 1].uri), 'base64');
                    base64ArraySyllabi.push(imgBase64);
                }
            }

            if(activeTab == 1) {
                for(let i = 0; i < includedPagesInAssignment.length; i++) {
                    let imgBase64 = await RNFS.readFile(decodeURI(props.route.params.file[includedPagesInAssignment[i] - 1].uri), 'base64');
                    base64ArrayAssignment.push(imgBase64);
                }
            }

            setIncludedPagesInSyllabi([])
            setIncludedPagesInAssignment([])
            setSyllabiPagesCount(0)
            setAssignmentPagesCount(0)

            navigation.navigate('LoadingScreen', 
                {previousScreen: 'Syllabus', 
                 nextScreen: nextScreen,
                 base64StringSyllabi: base64ArraySyllabi,
                 base64StringAssignment: base64ArrayAssignment})

        }catch(e){
            alert(JSON.stringify(e.message))
        }
    }

    const openCamera = async () => {  
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                  title: 'Camera Permission',
                  message: 'Syncing Syllabi needs access to your camera ',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
                },
            );
          
          if ((granted === PermissionsAndroid.RESULTS.GRANTED && Platform.OS === 'android') || (Platform.OS === 'ios')) {
              let options = {
                mediaType: 'photo', 
                cameraType: 'back',
                //includeBase64: true,
                //saveToPhotos: true
              };
              ImagePicker.launchCamera(options, (response) => {
          
                if (response.errorCode) {
                    alert('ImagePicker Error: ', response.error);
                }else if (response.didCancel) {
                       
                }
                 else {
                    let images = imageFiles
                    images.push(response.assets[0])
                    setImageFiles(images)
                    setTotalPages(images.length) 
                }
              });
          } else {
            console.log('Camera permission denied');
          }
        } catch (err) {
            alert(err.message);
        } 
    };

    return {
       currentPage,
       totalPages,
       includedPagesInSyllabi,
       includePages,
       includedPagesInAssignment,
       onSelect,
       activeTab,
       imageFiles,
       openCamera,
       setCurrentPage,
       scanImage
    };
  };
  
  export default method;