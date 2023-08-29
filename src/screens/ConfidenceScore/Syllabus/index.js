import React, {useEffect, useState} from 'react';
import { Text, 
         View,
         ScrollView } from 'react-native';
import Label from '../../../components/Label'
import RadioButtonGroup from '../../../components/RadioButtonGroup'
import Colors from '../../../components/GradientColor'
import GradientItem from '../../../components/GradientItem'
import DefaultButton from '../../../components/DefaultButton';
import method from './method';
import styles from './styles'
import label from '../../../styles/label'
import color from '../../../styles/colors'
import SuccessModal from '../../../components/SuccessModal'
import CheckBox from '@react-native-community/checkbox';
import DefaultInput from '../../../components/DefaultInput';
import ConfirmationModal from '../../../components/ConfirmationModal'
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Syllabus = ({
    setActiveTab,
    classSyllabi,
    setClassSyllabi,
    ...props
  }) => {
    
    const {
        colors,
        bgColor,
        successMessage,
        successModalVisible,
        otherSchedule,
        isOtherScheduleSelected,
        isLoading,
        confirmationVisible,
        confirmationMessage,
        setConfirmationMessage,
        setConfirmationVisible,
        setIsOtherScheduleSelected,
        setOtherSchedule,
        setSuccessModalVisible,
        handleSubmitSyllabus,
        handleSetSchedule,
    } = method(setClassSyllabi,classSyllabi);
    const navigation = useNavigation();
    
    const [scannedSyllabus, setScannedSyllabus] = useState({});
    const [otherVal, setOtherVal] = useState('');
    useEffect(() => {
        // props.syllabus.map((item, index)=>{
        //     console.log(item)
        // });
        // for(var key in props.syllabus) {
        //     console.log(props.syllabus[key][0])
        // }
        console.log("PROOOOOPS");
        // console.log(props.syllabus['teacherName'][0]['name'])
        console.log(props.syllabus)
        
        teacherName = "";
        className = "";
        schedule = "";
        if(props.syllabus['teacherName'].length > 0)
            teacherName = props.syllabus['teacherName'][0]['name'];
        if(props.syllabus['className'].length > 0)
            className = props.syllabus['className'][0]['name'];
        if(props.syllabus['className'].length > 0)
            className = props.syllabus['className'][0]['name'];
        console.log(teacherName + " " + className);
        setClassSyllabi({...classSyllabi, 
            teacherName: teacherName,
            className: className,
            schedule: schedule
        })
    }, [props.syllabus])

    useEffect(() => {
        console.log("************scan coooooount******************")
        setOtherVal('');
        setIsOtherScheduleSelected(false);
        setOtherSchedule('');
    }, [props.scanCount])
    
    return (
        <ScrollView>
            <View style={{flex:1, marginBottom: 10}}>
                {props.items.map(res => {
                    // console.log(res)
                    if(res.field != 'classCode')
                    return (
                        <View key={res.field}>
                            <View style={styles.container}>
                                <View style={styles.labelContainer}>
                                    <Label text={res.title} />
                                </View>
                                <View style={styles.scoreContainer}>
                                    <Text style={[label.smallHeading2,{color:color.primary, textAlign: 'center'}]}>
                                        Syncing Score
                                    </Text>
                                </View>
                            </View>
                            <View>
                                {props.syllabus !== null && res.field === 'teacherName' ?
                                    <RadioButtonGroup field={res.field} items={props.syllabus.teacherName} 
                                                      setValue={(teacherName) => setClassSyllabi({...classSyllabi, teacherName: teacherName})}
                                                      value={classSyllabi.teacherName}
                                                      scanCount={props.scanCount} />
                                :props.syllabus !== null && res.field === 'classCode' ?
                                    <RadioButtonGroup field={res.field} items={props.syllabus.classCode}
                                                      setValue={(classCode) => setClassSyllabi({...classSyllabi, classCode: classCode})}
                                                      value={classSyllabi.classCode} />
                                :props.syllabus !== null && res.field === 'className' ?
                                    <RadioButtonGroup field={res.field} items={props.syllabus.className} 
                                                      setValue={(className) => setClassSyllabi({...classSyllabi, className: className})}
                                                      value={classSyllabi.className}
                                                      scanCount={props.scanCount} />
                                :
                                <>
                                {props.syllabus !== null && props.syllabus.classSchedule.map(res => {
                                return (
                                    <View key={Math.random()} style={styles.container}>
                                        <View style={styles.subContainer}>
                                            <CheckBox
                                                style={styles.checkbox}
                                                boxType={'square'}
                                                onValueChange={() => handleSetSchedule(res.name)}
                                                value={classSyllabi.scheduleList.includes(res.name)} 
                                                onCheckColor={color.primary}
                                                onTintColor={color.primary}
                                            />
                                            <Text style={styles.checkboxText}>{res.name}</Text>
                                        </View>
                                        <View style={styles.scoreContainer}>
                                            <Text style={[styles.scoreText,{color: res.confidenceScore > 85 ? color.green : color.warning}]}>
                                                {`${Math.round(res.confidenceScore)}%`}
                                            </Text>
                                        </View>
                                    </View>
                                    )
                                })}
                                <View style={styles.container}>
                                    <View style={styles.subContainer}>
                                        <CheckBox
                                            style={styles.checkbox}
                                            boxType={'square'}
                                            onValueChange={(value) => {
                                                setIsOtherScheduleSelected(value)
                                                console.log(value)
                                            }}
                                            value={isOtherScheduleSelected} 
                                            onCheckColor={color.primary}
                                            onTintColor={color.primary}
                                        />
                                        <View style={styles.inputContainer}>
                                            <DefaultInput 
                                                label="Other"
                                                onChangeText={(otherValue) =>  {
                                                    setOtherSchedule(otherValue)
                                                    setOtherVal(otherValue)
                                                }}
                                                value={otherVal} /> 
                                        </View>
                                    </View>
                                </View>
                                </>
                                }
                            </View>
                        </View>
                    );
                })}

                <View style={styles.fieldContainer}>
                    <Label text="Pick a color" />
                    <View style={{flexDirection:'row'}}>
                        <ScrollView horizontal>
                            {colors.map((item) => {
                                return (
                                    <Colors key={Math.random()} selectedColor={item} 
                                            onPress={() => setClassSyllabi({...classSyllabi, colorInHex: item})} />
                                );
                            })}              
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.fieldContainer}>
                    <Label text="Preview" />
                    <GradientItem 
                        containerStyle={{alignSelf:'center'}}
                        code={classSyllabi.className}
                        name={classSyllabi.teacherName}
                        // schedule={classSyllabi.schedule + `${isOtherScheduleSelected ? otherSchedule : ''}`}
                        schedule={classSyllabi.schedule + `${isOtherScheduleSelected ? otherSchedule : ''}`}
                        selectedBgColor={bgColor[classSyllabi.colorInHex]}
                    />
                </View>
                <View style={styles.fieldContainer} >
                    <DefaultButton title={isLoading ? <ActivityIndicator size="small" color={color.textDefault} /> : `${classSyllabi.id === '' ? 'Save' : 'Update'} Syllabi`}
                        onPress={() => {
                            setConfirmationMessage(`${classSyllabi.id === '' ? 'Add' : 'Update'} this Syllabi?`)
                            setConfirmationVisible(true)
                        }}/>       
                </View>
            </View>

            <ConfirmationModal 
                modalVisible={confirmationVisible} 
                confirmationMessage={confirmationMessage}
                onClose={() => setConfirmationVisible(!confirmationVisible)}
                onConfirm={() => handleSubmitSyllabus()}
            />

            <SuccessModal 
                isRemove={false}
                successModalVisible={successModalVisible} 
                successMessage={successMessage}
                headerText='Success'
                onClose={() => {setSuccessModalVisible(!successModalVisible)
                                // setActiveTab(1)
                            
                    navigation.navigate("MainTabScreen", { counter: 1})}}
            />
        </ScrollView>
    )
}

export default Syllabus;