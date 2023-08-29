import React, { useEffect, useContext, useState } from 'react';
import { Text, 
         View, 
         ScrollView,Dimensions,
         TextInput, Image, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import Label from '../../../components/Label'
import RadioButtonGroup from '../../../components/RadioButtonGroup'
import DefaultButton from '../../../components/DefaultButton';
import SecondaryButton from '../../../components/SecondaryButton';
import styles from './styles'
import label from '../../../styles/label'
import color from '../../../styles/colors'
import method from './method';
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SuccessModal from '../../../components/SuccessModal'
import CheckBox from '@react-native-community/checkbox';
import DefaultInput from '../../../components/DefaultInput';
import ConfirmationModal from '../../../components/ConfirmationModal'
import { ActivityIndicator } from 'react-native-paper';
import {Context as AuthContext} from '../../../components/Context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { getSyllabusByUser } from '../../../actions/syllabus';
import GradientItem from '../../../components/GradientItem';
import DateTimePicker from '../../../components/DateTimePicker';
import Moment from 'moment';
import { Alert } from 'react-native';

const Assignments = ({
    setActiveTab,
    classSyllabi,
    setClassSyllabi,
    ...props
  }) => {
    
    const navigation = useNavigation();
    const [notes, setNotes] = useState('');
    const [value, setValue] = useState([]);
    const [dateValue, setDateValue] = useState(0);
    const [syllabiValue, setSyllabiValue] = useState(0);
    const [dueIndex, setDueIndex] = useState(0);
    const {
        successMessage,
        successTitle,
        successModalVisible,
        assignmentSyllabi,
        isSaving,
        closeDisabled,
        setCloseDisabled,
        setIsSaving,
        setAssignmentSyllabi,
        handleSaveAssignments,
        setSuccessMessage,
        setSuccessTitle,
        setSuccessModalVisible,
        isDateValid
    } = method(classSyllabi,setClassSyllabi);
    // console.log("props.assignments")
    // console.log(props.assignments)
    // console.log(props)
    data = [
        {
          title: "Recognition System",
          body:`     Have the ability to scan and copy
     your syllabi directly to your calendar
             and sync them to your device`
        },
        {
          title: "Calendar",
          body: `                 You have the option to sync 
    your class syllabi to your phone's calendar 
                              or Google's calendar`
        },
        {
          title: "Reminders in Advance",
          body: `  Once scanned, you can set reminders 
                        for your assignments 
               as far or as close as you'd like`
        },
        {
          title: "Goals",
          body: `                        Help yourself out this semester 
    by keeping track of any goals you make for yourself. 
                               From short-term to long-term`
        },
        {
          title: "Sync with School",
          body: `You can login through your school's website
        and connect to their academic calendar 
             to get notified or important dates`
        }
    ]
    
    const [bgColor, setBgColor] = React.useState(
        [
          ['#FF9966', '#FF5E62'],
          ['#56CCF2', '#2F80ED'],
          ['#4776E6', '#8E54E9'],
          ['#00B09B', '#96C93D'],
          ['#A8C0FF', '#3F2B96'],
          ['#ED213A', '#93291E'],
          ['#FDC830', '#F37335'],
          ['#00B4DB', '#0083B0'],
          ['#AD5389', '#3C1053'],
          ['#EC008C', '#FC6767'],
          ['#DA4453', '#89216B'],
          ['#654EA3', '#EAAFC8']
        ]
      );
    const [scannedAssignments, setScannedAssignments] = useState([]);
    // const [successModalVisible, setSuccessModalVisible] = useState(false);
    const { state } = useContext(AuthContext);
    const { syllabus } = useSelector(state => state.syllabusReducer);
    const dispatch = useDispatch();
    const isCarousel = React.useRef(null)
    const [index, setIndex] = React.useState(0);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [calendarValue, setCalendarValue] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [deletedIndexes, setDeletedIndexes] = useState([]);
    const [tmpAssignments, setTmpAssignments] = useState();
    
    useEffect(() => {
        console.log("HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        let arr = [];
        // console.log(props.assignments)
        setTmpAssignments(props.assignments);
        props.assignments.map((item, index)=>{
            setIndex(0)
            let title = item.assignmentTitle;
            let dueDate = item.assignmentDateEnd.name;
            if(item.assignmentTitle != null)
                title = item.assignmentTitle.name;
            else
                title = '';
            
            arr.push({'id': index, 'title': title, 'dueDate': dueDate, 'syllabi': 0, 'note': '', 'included': true})
        });
        // console.log(arr)
        setScannedAssignments(arr)
        let userId = state.userId;
        let token = state.token;
        dispatch(getSyllabusByUser(userId, token));
        // console.log(syllabus)
        isCarousel.current?.snapToItem?.(0)
    }, [props.assignments]);
    // console.log("!@#$%" + index)
    // console.log(scannedAssignments)
    const CarouselCardItem = ({ item, index }) => {
        // props.assignments.map(res => {
        //     if(res.assignmentTitle)
        //         console.log(res.assignmentTitle.name)
        // })
        let title = '';
        let dueDate = '';
        if ("name" in Object(item.assignmentTitle)) {
            title = item.assignmentTitle.name;
        }
        if ("name" in Object(item.assignmentDateEnd))
            dueDate = item.assignmentDateEnd.name;
        // console.log("scannedAssignments " + index)
        // console.log(scannedAssignments)
        // console.log(item)
        // console.log(scannedAssignments.length + " < " + index)
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.labelContainer}>
                        <Label text={"Assignment Title"} />
                    </View>
                    <View style={styles.scoreContainer}>
                        <Text style={[label.smallHeading2,{color:color.primary, textAlign: 'center'}]}>Syncing Score</Text>
                    </View>
                </View>
                <View>
                    <RadioButtonGroup   items={[item.assignmentTitle]} 
                                        setValue={(value) => setValue(value)} 
                                        setAssignmentValue={(index, val) => {
                                            setScannedAssignments(current =>
                                                current.map(obj => {
                                                if (obj.id === index) {
                                                    return {...obj, title: val};
                                                }
                                                return obj;
                                                }),
                                            );
                                        }}
                                        index={index}
                                        tab={'assignments'}
                                        value={scannedAssignments[index].title}
                                        scanCount={props.scanCount} />
                </View>
                <View style={styles.container}>
                    <View style={styles.labelContainer}>
                        <Label text={'Due Date'} />
                    </View>
                    <View style={styles.scoreContainer}>
                        <Text style={[label.smallHeading2,{color:color.primary, textAlign: 'center'}]}>Syncing Score</Text>
                    </View>
                </View>
                <View>
                    <RadioButtonGroup   items={[item.assignmentDateEnd]} 
                                        setValue={(value) => setDateValue(value)}
                                        setAssignmentValue={(index, val) => {
                                            console.log(index + ", " + val)
                                            setScannedAssignments(current =>
                                                current.map(obj => {
                                                if (obj.id === index) {
                                                    return {...obj, dueDate: val};
                                                }
                                                return obj;
                                                }),
                                            );
                                        }} 
                                        index={index}
                                        tab={'assignments'}
                                        fieldType={'date'}
                                        setCalendarVisible={(bool, index) => { 
                                            setCalendarVisible(bool); 
                                            setDueIndex(index);
                                            console.log("hello") 
                                        }}
                                        calendarValue={calendarValue}
                                        value={scannedAssignments[index].dueDate}
                                        scanCount={props.scanCount} />
                </View>
                <View style={styles.container}>
                    <View style={styles.labelContainer}>
                        <Label text={'Note'} />
                    </View>
                    <View style={styles.scoreContainer}>
                        <Text style={[label.smallHeading2,{color:color.primary, textAlign: 'center'}]}></Text>
                    </View>
                </View>
                <View style={{marginLeft: 16}}>
                    <TextInput 
                        multiline
                        numberOfLines={8}
                        style={{
                            backgroundColor: '#FAF6EA', 
                            marginTop: 10, 
                            marginBottom: 24, 
                            paddingTop: 10, 
                            paddingHorizontal: 10, 
                            textAlignVertical: 'top',
                            width: Dimensions.get("window").width - 32,
                            borderRightColor: '#C1C6CE',
                            borderRightWidth: 0.4,
                            borderBottomColor: '#C1C6CE',
                            borderBottomWidth: 1,
                            height: 150
                        }}
                        value={scannedAssignments[index].note}
                        onChangeText={(notes) => {
                            setScannedAssignments(current =>
                                current.map(obj => {
                                if (obj.id === index) {
                                    return {...obj, note: notes};
                                }
                                return obj;
                                }),
                            );
                        }}
                    />
                </View>
                <View style={styles.container}>
                    <View style={styles.labelContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <Label text={'Include'} />
                            <CheckBox
                                style={styles.checkbox}
                                boxType={'square'}
                                onCheckColor={color.primary}
                                onTintColor={color.primary}
                                onValueChange={(value) => {
                                    setScannedAssignments(current =>
                                        current.map(obj => {
                                        if (obj.id === index) {
                                            return {...obj, included: value};
                                        }
                                        return obj;
                                        }),
                                    );
                                }}
                                value={scannedAssignments[index].included}
                            />
                        </View>
                    </View>
                    <View style={styles.scoreContainer}>
                        <Text style={[label.smallHeading2,{color:color.primary, textAlign: 'center'}]}></Text>
                    </View>
                </View>
                <View style={{ height: 20}}></View>
            </View>
        )
    
        // return (
        //     <View style={{backgroundColor: 'red'}} key={index}>
        //     <Text style={styles.header}>{item.title}</Text>
        //     <View style={{width:'100%',alignItems:'center'}}>
        //         <Text style={styles.body}>{item.body}</Text>
        //     </View>
        //     </View>
        // )
    }
    // const handleSaveAssignments = async(assignments) => {
    //     console.log("is saving...")
    //     console.log(assignments)
    // };
    // <KeyboardAvoidingView automaticallyAdjustContentInsets={false}
    // behavior={Platform.OS === "ios" ? "padding" : "height"}
    // contentContainerStyle={{ flex: 1 }}
    // style={{
    //    backgroundColor: 'backgroundColor',
    //    flex: 1,
    //    height: '100%',
    // }}>
    return (
        <KeyboardAvoidingView 
            // behavior={Platform.OS === "ios" ? "padding" : "height"} 
            behavior={"padding"} 
            style={{flex:1, marginBottom: 0}} 
            >
            
            <DateTimePicker 
                onClose={() => { setCalendarVisible(!calendarVisible); }}
                modalVisible={calendarVisible} 
                showTimePicker={false}
                onChangeDate={(startDate) =>  {
                    console.log("changed")
                    setSelectedDate(startDate)
                }}
                onSelectDate={() => { 
                    console.log("select"); 
                    setCalendarValue(selectedDate); 
                    setCalendarVisible(!calendarVisible);
                    setScannedAssignments(current =>
                        current.map(obj => {
                          if (obj.id === dueIndex) {
                            return {...obj, dueDate: selectedDate};
                          }
                          return obj;
                        }),
                    );
                }}
            />
            <ScrollView style={{ backgroundColor: '#F7F9FA'}}>
                <Carousel
                    layout="default"
                    ref={isCarousel}
                    data={tmpAssignments}
                    renderItem={CarouselCardItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width}
                    onBeforeSnapToItem={(index) => setIndex(index)}
                    onSnapToItem={(index) => setIndex(index)}
                    useScrollView={false}
                />
            </ScrollView>
            <View>
                {/* <View style={styles.container}>
                    <View style={styles.labelContainer}>
                        <Label text={'Class Syllabi'} />
                    </View>
                    <View style={styles.scoreContainer}>
                        <Text style={[label.smallHeading2,{color:color.primary, textAlign: 'center'}]}></Text>
                    </View>
                </View> */}
                <View style={{ marginLeft: 15, marginBottom: 10}}>
                    <ScrollView horizontal>
                        {syllabus.length > 0 &&
                        syllabus.map((syllabi) => {
                            let isSelected = false;
                            if(syllabi.id == assignmentSyllabi)
                                isSelected = true;
                            return (
                            <GradientItem 
                                isSelected={isSelected}
                                setAssignmentValue={(index, val) => {
                                    // setScannedAssignments(current =>
                                    //     current.map(obj => {
                                    //     if (obj.id === index) {
                                    //         return {...obj, syllabi: val};
                                    //     }
                                    //     return obj;
                                    //     }),
                                    // );
                                    // setSyllabiValue(val)
                                    setAssignmentSyllabi(val)
                                }} 
                                tab={'assignments'}
                                index={0}
                                parentCallback = {(index, val) => {
                                    
                                }}
                                code={syllabi.className}
                                name={syllabi.teacherName}
                                schedule={!syllabi.classSchedule ? '' : syllabi.classSchedule.map(function(data){return data;}).join("|")}
                                selectedBgColor={bgColor[parseInt(syllabi.colorInHex)]}
                                id={syllabi.id}
                            />
                            );
                        })}
                    </ScrollView>
                </View>
            </View>
            <SafeAreaView style={styles.bottomContainer}>
                <TouchableOpacity onPress={() => isCarousel.current?.snapToPrev?.()}>
                    <Image source={require('../../../assets/icons/CaretCircle.png')}
                            resizeMode='contain'
                            style={styles.prevNextImage}/>
                </TouchableOpacity>
                <Text style={[label.smallHeading2, {color: color.primary}]}>
                    {index+1}/{props.assignments.length}
                </Text>
                { index+1 !== props.assignments.length &&
                    <TouchableOpacity onPress={() => {
                        isCarousel.current?.snapToNext?.()
                    }}>
                        <Image source={require('../../../assets/icons/CaretCircle.png')}
                                resizeMode='contain'
                                style={[styles.prevNextImage, {transform: [{ rotate: "180deg" }]}]}/>
                    </TouchableOpacity>
  }{
                    // isSaving ? 
                    //     <View style={{
                    //         width: 50
                    //     }}>
                    //         <ActivityIndicator size="small" color={'#0036A1'} />
                    //     </View>
                    // :
                    <TouchableOpacity style={{ padding: 8}} onPress={() => {
                        if(assignmentSyllabi == 0)
                            Alert.alert("Please assign a syllabi");
                        else {
                            let isValid = true;
                            let invalidDates = [];
                            scannedAssignments.map((assignment, ind) => {
                                if(assignment.included) {
                                    if(!isDateValid(new Date(assignment.dueDate))) {
                                        // isValid = false;
                                        // invalidDates.push(ind+1);
                                    }
                                }
                            })
                            let dateString = "";
                            if(invalidDates.length > 0) {
                                for(let i = 0; i< invalidDates.length; i++) {
                                    dateString += invalidDates[i];
                                    if(i+1 != invalidDates.length)
                                        dateString += ", ";
                                }
                                
                                console.log("[" + dateString + "]");
                                if(invalidDates.length == 1)
                                    dateString = "Page " + dateString + " has an invalid Date";
                                else
                                    dateString = "Pages " + dateString + " have invalid Dates";
                                
                                Alert.alert(dateString);
                            }
                            if(isValid) {
                                handleSaveAssignments(scannedAssignments)
                                setIsSaving(true)
                            }
                        }
                    }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#0036A1'}}>Save</Text>
                    </TouchableOpacity>
                }
                
            </SafeAreaView>
            {/* <Pagination
            dotsLength={props.assignments.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={styles.dotStyle}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.9}
            tappableDots={true}
            /> */}
            
            
            <View style={{
                width: 50,
                position: 'absolute', 
                bottom: 0,
                right: 85,
                zIndex: 9999
                }}>
                {/* <TouchableOpacity style={{width: 50}} onPress={() => {
                        // isCarousel.current?.snapToNext?.()
                        let indexes = deletedIndexes;
                        if(indexes.indexOf(index) < 0)
                            indexes.push(index)
                        setDeletedIndexes( indexes )
                        let tmp = tmpAssignments;
                        tmp.splice(index, 1);
                        console.log(tmp)
                        setTmpAssignments(tmp);
                        // setScannedAssignments(current =>
                        //     current.filter(obj => {
                        //       return obj.id !== index;
                        //     }),
                        // );
                    }}>
                    <Image source={require('../../../assets/icons/CaretClose.png')}
                            resizeMode='contain'
                            style={[styles.removeAssignmentImage]}/>
                </TouchableOpacity> */}
            </View>

            {/* <ConfirmationModal 
                modalVisible={confirmationVisible} 
                confirmationMessage={confirmationMessage}
                onClose={() => setConfirmationVisible(!confirmationVisible)}
                onConfirm={() => handleSubmitSyllabus()}
            /> */}

            <SuccessModal 
                isRemove={false}
                successModalVisible={successModalVisible} 
                successMessage={successMessage}
                headerText={successTitle}
                disabled={closeDisabled}
                onClose={() => {
                    // if()
                    console.log("SUCCESS MDOAL CLOSSSED!!")
                    setSuccessModalVisible(!successModalVisible)
                    setIsSaving(false)
                    navigation.navigate("MainTabScreen", { counter: Math.random()})
                }}
            />
        </KeyboardAvoidingView>
        // <ScrollView>
        //     <View style={{flex:1, marginBottom: 30}}>
        //         {props.assignments.map(res => {
        //             console.log(res)
        //             console.log(Object.keys(res)[0])
        //         return (
        //                 <View>
        //                     <View style={styles.container}>
        //                         <View style={styles.labelContainer}>
        //                             <Label text={res.title} />
        //                         </View>
        //                         <View style={styles.scoreContainer}>
        //                             <Text style={[label.smallHeading2,{color:color.primary, textAlign: 'center'}]}>Syncing Score</Text>
        //                         </View>
        //                     </View>
        //                     <View>
        //                         <RadioButtonGroup items={[res.assignmentTitle]} setValue={(value) => setValue(value)} value={value} />
        //                         <RadioButtonGroup items={[res.assignmentDateEnd]} setValue={(value) => setValue(value)} value={value} />
                                
        //                     </View>
        //                 </View>
        //             );
        //         })}
        //         <View style={styles.fieldContainer}>
        //             <Label text="Note" />
        //             <TextInput 
        //                 multiline
        //                 numberOfLines={8}
        //                 placeholder="Write a note..."
        //                 placeholderTextColor={'#af8811'}
        //                 style={styles.note}
        //                 value={notes}
        //                 onChangeText={(notes) =>  setNotes(notes)}
        //             />
        //         </View>
        //         <View style={styles.fieldContainer}>
        //             <Label text="Attachments" />
        //         </View>
        //         <View style={styles.fieldContainer}>
        //             <Text style={[label.smallHeading,{color: color.primary}]}>No Attachments</Text>
        //         </View>
        //         <View style={styles.fieldContainer}>
        //             <SecondaryButton 
        //                 title="Add File" 
        //                 imgSource={require('../../../assets/icons/Plus.png')} 
        //                 containerStyle={styles.addFileButton} 
        //             />       
        //         </View>
        //         <View style={styles.fieldContainer}>
        //             <DefaultButton title="Save Assignment" onPress={() => {navigation.navigate("MainTabScreen")
        //                                                                     setActiveTab(0)}} />       
        //         </View>
        //     </View>
        // </ScrollView>
    )
}

export default Assignments;