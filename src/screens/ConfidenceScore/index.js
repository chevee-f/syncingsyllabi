import React from 'react';
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
        assignment,
        assignments,
        onSelect,
        activeTab,
        classSyllabi,
        setClassSyllabi,
        setActiveTab
    } = method(props);
    return (
      <View style={{flex:1}}>
        <View style={styles.headerContainer}>
                <View style={{marginTop: Platform.OS === 'ios' ? height * 0.08 : height * 0.05}}>
                    <Text style={[label.boldExtraLargeHeading,{color:color.textDefault}]}>One more step</Text>
                    <Text style={[label.smallHeading,styles.headerActionText]}>
                        Help us out to get the correct information for your Syllabi.
                    </Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image 
                        source={require('../../assets/Saly12.png')}
                        style={styles.image}
                    />
                </View>
        </View>
        <View style={styles.tab}>
            <TabButton title='Syllabus'
                       isActive={0 === activeTab}
                       isDone={1 === activeTab}
                       onSelect={onSelect}
                       value={0} 
                       count={syllabusItems.length} />
            <TabButton title='Assignments'
                       isActive={1 === activeTab}
                       onSelect={onSelect}
                       value={1}
                       count={assignment.length} />
            
        </View>

        {activeTab === 0 ?
            <Syllabus items={syllabusItems} 
                      syllabus={ocrResults.ocrSyllabusModel} 
                      classSyllabi={classSyllabi}
                      setClassSyllabi={setClassSyllabi}
                      setActiveTab={setActiveTab} /> :
            <Assignments items={assignment} 
                         assignments={assignments}
                         //assignments={props.route.params.ocrResult.ocrAssignmentModel} 
                         classSyllabi={classSyllabi}
                         setClassSyllabi={setClassSyllabi}
                         setActiveTab={setActiveTab} />
        }

      </View>
    )
}

export default ConfidenceScoreScreen;