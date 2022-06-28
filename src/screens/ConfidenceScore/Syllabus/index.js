import React from 'react';
import { Text, 
         View, 
         ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements'
import Label from '../../../components/Label'
import RadioButtonGroup from '../../../components/RadioButtonGroup'
import Colors from '../../../components/GradientColor'
import GradientItem from '../../../components/GradientItem'
import DefaultButton from '../../../components/DefaultButton';
import method from './method';
import styles from './styles'
import label from '../../../styles/label'
import color from '../../../styles/colors'


const Syllabus = ({
    setActiveTab,
    ...props
  }) => {
    
    const {
        colors,
        bgColor,
        selectedColor,
        setSelectedColor,
    } = method();

    return (
        <ScrollView>
            <View style={{flex:1, marginBottom: 30}}>
           
                {props.items.map(res => {
                    return (
                            <View>
                                <View style={styles.container}>
                                    <View style={styles.labelContainer}>
                                        <Label text={res.title} />
                                    </View>
                                    <View style={styles.scoreContainer}>
                                        <Text style={[label.smallHeading2,{color:color.primary, textAlign: 'center'}]}>Syncing Score</Text>
                                    </View>
                                </View>
                                <View>
                                    {res.field === 'teacherName' ?
                                        <RadioButtonGroup fieldName={res.field} items={props.syllabus.teacherName} />
                                    : res.field === 'classCode' ?
                                        <RadioButtonGroup fieldName={res.field} items={props.syllabus.classCode} />
                                    : res.field === 'className' ?
                                        <RadioButtonGroup fieldName={res.field} items={props.syllabus.className} />
                                    : <RadioButtonGroup fieldName={res.field} items={props.syllabus.classSchedule} />
                                    }
                                </View>
                            </View>
                        );
                    })
                }

                <View style={styles.fieldContainer}>
                    <Label text="Pick a color" />
                    <View style={{flexDirection:'row'}}>
                        <ScrollView horizontal>
                            {
                                colors.map((item) => {
                                    return (
                                        <Colors selectedColor={item} onPress={() => setSelectedColor(item)} />
                                    );
                                })                
                            }              
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.fieldContainer}>
                    <Label text="Preview" />
                    <GradientItem 
                        containerStyle={{alignSelf:'center'}}
                        code='MKTG 100S'
                        name='Brian Goerlich'
                        schedule='M 6pm-9pm'
                        selectedBgColor={bgColor[selectedColor]}
                    />
                </View>
                <View style={styles.fieldContainer} >
                    <DefaultButton title="Save Syllabi" onPress={() => {setActiveTab(1)}}/>       
                </View>
            </View>
        </ScrollView>
    )
}

export default Syllabus;