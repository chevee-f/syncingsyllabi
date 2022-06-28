import React, { useContext, useEffect } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import styles from './styles'
import label from '../../styles/label'
import color from '../../styles/colors'
import method from './method';
import TabButton from './../../components/TabButton'
import Pdf from 'react-native-pdf';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native'

var {height, width} = Dimensions.get('window');

const PdfViewerScreen = props => {
  const navigation = useNavigation()
  const {
    pdfPage,
    currentPage,
    totalPages,
    includedPagesInSyllabi,
    includePageInSyllabi,
    onSelect,
    activeTab,
    setPdfPage,
    setTotalPages,
    setCurrentPage,
    scanPdf
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
            <TouchableOpacity onPress={() => scanPdf(props.route.params.file.uri)}>
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
                       count={0} />
        </View>
        <View style={styles.filenameContainer}>
          <Text numberOfLines={1} style={[label.boldMediumHeading, {color: color.primary}]}>
            {props.route.params.file.name}
          </Text>
        </View>
          <Pdf
            source={{uri:`${props.route.params.source}`}}
            trustAllCerts={false}
            onLoadComplete={(numberOfPages, filePath) => {
              setTotalPages(numberOfPages);
            }}
            onPageChanged={(page, numberOfPages) => {
              setCurrentPage(page);
            }}
            onError={(error) => {
              console.log(error);
            }}
            horizontal={true}
            enablePaging={true}
            page={pdfPage}
            style={styles.pdf}
          />
        <View style={styles.checkboxContainer}>
          <Text style={[label.smallHeading2, {color: color.primary,textAlign:'right'}]}>
            Include Page as Syllabi
          </Text>
          <CheckBox
              style={styles.checkbox}
              boxType={'square'}
              onValueChange={(isInclude) => includePageInSyllabi(isInclude)}
              value={includedPagesInSyllabi.includes(currentPage)} 
              onCheckColor={color.primary}
              onTintColor={color.primary}
          />
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={() => setPdfPage(currentPage - 1)}>
            <Image source={require('../../assets/icons/CaretCircle.png')}
                    resizeMode='contain'
                    style={styles.prevNextImage}/>
          </TouchableOpacity>
              <Text style={[label.smallHeading2, {color: color.primary}]}>
                  {currentPage}/{totalPages}
              </Text>
          <TouchableOpacity onPress={() => setPdfPage(currentPage + 1)}>
            <Image source={require('../../assets/icons/CaretCircle.png')}
                    resizeMode='contain'
                    style={[styles.prevNextImage, {transform: [{ rotate: "180deg" }]}]}/>
          </TouchableOpacity>
        </View>
      </View>
    )
}

export default PdfViewerScreen;