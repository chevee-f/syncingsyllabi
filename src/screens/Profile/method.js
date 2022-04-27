import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../actions/user';
import {Context as AuthContext} from '../../components/Context/AuthContext';
import * as ImagePicker from "react-native-image-picker"
import { Alert } from 'react-native';

const method = () => {

    const { state } = useContext(AuthContext);
    const { user } = useSelector(state => state.userReducer);
    const { error } = useSelector(state => state.errorReducer);
    const { goals } = useSelector(state => state.goalReducer);
    const { syllabus } = useSelector(state => state.syllabusReducer);

    const dispatch = useDispatch();
    const [hasError, setHasError] = useState(false);
    const [isUpdateImage, setIsUpdateImage] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    const data = [
        {
            title: 'Classes',
            count: syllabus.length
        },{
            title: 'Goals',
            count: goals.length
        },{
            title: 'Friends',
            count: '7'
        },
    ];

    const [profile, setProfile] = useState({
        firstName: null,
        lastName: null,
        email: null,
        school: null,
        dateOfBirth: null,
        major: null,
        image: '',
        imgFileName: '',
        imgType: ''
    });

    useEffect(() => {
        if(isUpdateImage){
            let userId = state.userId
            let token = state.token
            dispatch(updateUser(profile, userId, token))
            setIsUpdateImage(false)
            setImageLoading(true)
            setTimeout(function(){setImageLoading(false)}, 8000)
            Alert.alert('Success','Your profile image has been updated')
        }
    }, [syllabus.length,goals.length, profile, isUpdateImage]);

    const selectImage = async() => {
        let options = {
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
        };
      
        await ImagePicker.launchImageLibrary(options, (res) => {
          console.log('Response = ', res);
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
          } else {
              setProfile({
                  ...profile,
                  image: res.assets[0].uri,
                  imgType: res.assets[0].type,
                  imgFileName: res.assets[0].fileName
              })
              setIsUpdateImage(true)
          }
    
        });
    }

    return {
        data,
        imageLoading,
        setImageLoading,
        selectImage
    };
  };
  
  export default method;