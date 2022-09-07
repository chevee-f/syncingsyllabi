import React, { useState, useEffect } from 'react';
import { Text, 
         View, 
         Image,
         Dimensions, 
         Platform } from 'react-native';
import color from '../../styles/colors'
import label from '../../styles/label'
import styles from './styles'
import TabButton from './../../components/TabButton'
import method from './method';
import Syllabus from './Syllabus'
import Assignments from './Assignments'

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

    // useEffect(() => {
    //     console.log("new cscreen")
    // }, [props]);
    return (
      <View style={{flex:1, backgroundColor: '#fff'}}>
        <View style={styles.headerContainer}>
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
                       count={assignmentsItems.length} />
            }
            
        </View>

        {/* {activeTab === 0 ? */}
        { ocrResults.ocrSyllabusModel != null ?
            <Syllabus items={syllabusItems} 
                      syllabus={ocrResults.ocrSyllabusModel} 
                      classSyllabi={classSyllabi}
                      setClassSyllabi={setClassSyllabi}
                      setActiveTab={setActiveTab} /> :
            <Assignments items={assignmentsItems} 
                      assignments={ocrResults.ocrAssignmentModel}
                      //assignments={props.route.params.ocrResult.ocrAssignmentModel} 
                      classSyllabi={classSyllabi}
                      setClassSyllabi={setClassSyllabi}
                      setActiveTab={setActiveTab} />
        }

      </View>
    )
}

export default ConfidenceScoreScreen;