import React from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import styles from './styles'
import label from '../../styles/label'
import color from '../../styles/colors'
import method from './method';
import TabButton from './../../components/TabButton'
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'

var {height, width} = Dimensions.get('window');

const ImageViewerScreen = props => {
  const navigation = useNavigation()
  const {
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
  } = method(props);

    return (
      <View style={{ height: height}}>
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/icons/CaretRight.png')}
                  resizeMode='contain'
                  style={styles.image}
              />
            </TouchableOpacity>
            <Text style={[label.boldLargeHeading, {color: color.textDefault,textAlign:'right', width:'15%'}]}>
              OCR
            </Text>
            <TouchableOpacity onPress={() => scanImage()}>
                <Text style={[label.boldMediumHeading, {color: color.textDefault}]}>Scan</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.tab}>
            <TabButton title='Syllabus'
                       isActive={0 === activeTab}
                       isDone={1 === activeTab}
                       onSelect={onSelect}
                       value={0} 
                       count={includedPagesInSyllabi.length} />
            <TabButton title='Assignments'
                       isActive={1 === activeTab}
                       onSelect={onSelect}
                       value={1}
                       count={includedPagesInAssignment.length} />
        </View>
        <View style={styles.filenameContainer}>
            <Text numberOfLines={1} style={[label.boldMediumHeading, {color: color.primary}]}>
                {imageFiles.length > 0 ? 
                  props.route.params.source === 'camera' ? imageFiles[currentPage - 1].fileName : imageFiles[currentPage - 1].name : null}
            </Text>
        </View>
        {imageFiles.length > 0 && 
          <Image source={{uri: imageFiles[currentPage - 1].uri}}
              resizeMode='contain'
              style={[styles.scannedImage, {height: props.route.params.source === 'camera' ? height * 0.5 : height * 0.58}]}
          />
        }
        {props.route.params.source === 'camera' &&
          <View style={styles.addImageButtonContainer}>
            <TouchableOpacity style={styles.source} onPress={() => openCamera()}>
              <Icon 
                  name="camera-outline"
                  color={color.textDefault}
                  size={30}
              />
              <Text style={[label.smallHeading2, {color: color.textDefault, marginLeft: 5}]}>Take more photos</Text>
            </TouchableOpacity>
          </View>
        }
        <View style={styles.checkboxContainer}>
          <Text style={[label.smallHeading2, {color: color.primary,textAlign:'right'}]}>
            Include Image as {activeTab === 0 ? 'Syllabi' : 'Assignment'}
          </Text>
          <CheckBox
              style={styles.checkbox}
              boxType={'square'}
              onValueChange={() => includePages()}
              value={activeTab === 0 ? includedPagesInSyllabi.includes(currentPage) : includedPagesInAssignment.includes(currentPage)} 
              onCheckColor={color.primary}
              onTintColor={color.primary}
          />
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={() => {if(currentPage > 1 )setCurrentPage(currentPage - 1)}}>
            <Image source={require('../../assets/icons/CaretCircle.png')}
                    resizeMode='contain'
                    style={styles.prevNextImage}/>
          </TouchableOpacity>
              <Text style={[label.smallHeading2, {color: color.primary}]}>
                  {currentPage}/{totalPages}
              </Text>
          <TouchableOpacity onPress={() => {if(currentPage < totalPages )setCurrentPage(currentPage + 1)}}>
            <Image source={require('../../assets/icons/CaretCircle.png')}
                    resizeMode='contain'
                    style={[styles.prevNextImage, {transform: [{ rotate: "180deg" }]}]}/>
          </TouchableOpacity>
        </View>
      </View>
    )
}

export default ImageViewerScreen;