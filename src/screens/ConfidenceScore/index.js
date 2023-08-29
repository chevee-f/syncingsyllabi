import React, { useState, useEffect } from 'react';
import { Text, 
         View, 
         Image,
         Dimensions, 
         Platform, TouchableOpacity } from 'react-native';
import color from '../../styles/colors'
import label from '../../styles/label'
import styles from './styles'
import TabButton from './../../components/TabButton'
import method from './method';
import Syllabus from './Syllabus'
import Assignments from './Assignments'
import { useNavigation } from '@react-navigation/native';

var {height, width} = Dimensions.get('window');

const ConfidenceScoreScreen = (props) => {
    
    const {
        ocrResults,
        syllabusItems,
        assignmentsItems,
        assignments,
        onSelect,
        activeTab,
        classSyllabi,
        setClassSyllabi,
        setActiveTab
    } = method(props);
    const [scanCount, setScanCount] = useState(0)
    const navigation = useNavigation();
    useEffect(() => {
        console.log("new confidence score creen=======================")
        console.log(ocrResults.ocrAssignmentModel)
        setScanCount(scanCount+1)
    }, [ocrResults]);
    console.log(ocrResults)
    return (
      <View style={{flex:1, backgroundColor: '#fff'}}>
        <View style={styles.headerContainer}>
            <TouchableOpacity style={{
                position: 'absolute',
                top: Platform.OS === 'ios' ? height * 0.07 : height * 0.065,
                left: 12,
                }} onPress={() => {
                    navigation.navigate("MainTabScreen");
                }}><Image style={{transform: [{ rotate: '180deg'}]
            }} source={require('../../assets/icons/CaretRight.png')}/></TouchableOpacity>
            <View style={{marginTop: Platform.OS === 'ios' ? height * 0.08 : height * 0.065}}>
                <Text style={[label.boldExtraLargeHeading,{color:color.textDefault}]}>One more step</Text>
                <Text style={[label.smallHeading,styles.headerActionText]}>
                    Help us out to get the correct information for your Syllabi.
                </Text>
            </View>
            <View style={styles.imageContainer}>
                <Image 
                    source={require('../../assets/Saly12-1.png')}
                    style={styles.image}
                />
            </View>
        </View>
        <View style={styles.tab}>
            { ocrResults.ocrSyllabusModel != null ?
            <TabButton title='Syllabus'
                       isActive={true}
                       isDone={1 === activeTab}
                       onSelect={onSelect}
                       value={0} 
                       count={syllabusItems.length} /> :
            <TabButton title='Assignments'
                       isActive={true}
                       onSelect={onSelect}
                       value={1}
                       count={ocrResults.ocrAssignmentModel.length} />
            }
            
        </View>

        {/* {activeTab === 0 ? */}
        { ocrResults.ocrSyllabusModel != null ?
            <Syllabus items={syllabusItems} 
                      syllabus={ocrResults.ocrSyllabusModel} 
                      classSyllabi={classSyllabi}
                      setClassSyllabi={setClassSyllabi}
                      setActiveTab={setActiveTab}
                      scanCount={scanCount} /> :
            <Assignments items={assignmentsItems} 
                      assignments={ocrResults.ocrAssignmentModel}
                      //assignments={props.route.params.ocrResult.ocrAssignmentModel} 
                      classSyllabi={classSyllabi}
                      setClassSyllabi={setClassSyllabi}
                      setActiveTab={setActiveTab}
                      scanCount={scanCount} />
        }

      </View>
    )
}

export default ConfidenceScoreScreen;