import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { Button, Text, View, StyleSheet, Animated, I18nManager, Image, TouchableOpacity } from 'react-native';
import { Swipeable, RectButton, FlatList } from 'react-native-gesture-handler';
import Moment from 'moment';
import MenuIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import label from '../../styles/label'
import color from '../../styles/colors'
import {Context as AuthContext} from '../../components/Context/AuthContext';
import { Dimensions } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';

import Icon from 'react-native-vector-icons/MaterialIcons';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const tomorrow = Moment().add(1, 'days');
const Card = ({data, ...props}) => {
  const { state } = useContext(AuthContext);
  const [sortValue, setSortValue] = React.useState('id');
  const [isFocus, setIsFocus] = React.useState(false);

  const sortData = [
    { label: 'Class', value: 'id' },
    { label: 'Due Date', value: 'assignmentDateEnd' },
    { label: 'Title', value: 'assignmentTitle' },
  ];
  
  const renderLeftActions = (progress, item) => {
    return (
      <View style={{ width: 96, height: 106, marginTop: 10 }}>
        <TouchableOpacity style={styles.leftAction}
          onPress={() => removePressHandler(item)}>
          <Animated.Text
            style={[
              styles.actionText
            ]}
            >
            Remove
          </Animated.Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSortItems = (item) => {
    return (
      <View style={{ padding: 15}}>
        <Text style={{ color: '#0036A1', fontWeight: 'bold'}}>{item.label}</Text>
      </View>
    );
  };

  const removePressHandler = (item) => {
    props.showRemoveModal(item, 'Remove this Assignment?', 'remove');
  }

  const editCardData = (item) => {
    props.editCardData(item);
  };

  const completeCardData = (item) => {
    props.showRemoveModal(item, 'Complete this Assignment?', 'complete');
  };
  
  const renderRightAction = (item, text, color, progress) => {
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
        <TouchableOpacity
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={() => editCardData(item)}>
          <Text style={styles.actionText}>{text}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderCompleteRightAction = (item, text, color, progress) => {
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
        <TouchableOpacity
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={() => completeCardData(item)}>
          <Text style={styles.actionText}>{text}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  
  const renderRightActions = (progress, item) => (
    <View style={{ width: 192, height: 106, marginTop: 10, flexDirection: I18nManager.isRTL? 'row-reverse' : 'row' }}>
      {renderCompleteRightAction(item, 'Done', '#70C862', progress)}
      {renderRightAction(item, 'Edit', '#FDC830', progress)}
    </View>
  );
  
  const showNoteIcon = (item) => {
    if(item.notes === '' && item.attachment === '') {
      return <></>;
    } 
    return <TouchableOpacity onPress={() => props.toggleAttachments(item)} style={{ position: 'absolute', right: 15, top: 18, height: 20, width: 20}}>
      <Image 
              source={require('../../assets/icons/NoteBlank.png')}
              resizeMode='contain'
              style={{ width: 20, height: 20 }}
            />
            </TouchableOpacity>;
  }

  const Row = ({ item }) => {
    let dueColor = "#1B325F";
    if(new Date(item.assignmentDateEnd) <= new Date()) {
      dueColor = "#E54C29";
    }
    let color = '#000';
    for (let syllabi of props.syllabus) {
      if (syllabi.id == item.syllabusId) {
        color = props.bgColor[syllabi.colorInHex][1]
      }
    }

    return <RectButton style={styles.rectButton} onPress={() => {
      // props.cardD(item);
    }}>
      <View style={{
        width: 8,
        backgroundColor: color,
        position: 'absolute',
        top: 0,
        bottom: 0
      }} />
      <Text style={styles.fromText}>{item.assignmentTitle}</Text>
      <View
        style={{
          borderBottomColor: '#E6EAF2',
          borderBottomWidth: 1,
        }}
      />
      <Text style={[styles.dateText, {color: dueColor}]}>
        {Moment(item.assignmentDateEnd).format("MM/DD/YYYY") === Moment(tomorrow).format("MM/DD/YYYY") ?
               'Due Tomorrow ' + Moment(item.assignmentDateEnd).format("MM-DD-YYYY | h:mm a") : Moment(item.assignmentDateEnd).format("MM-DD-YYYY | h:mm a")}
      </Text>

      {showNoteIcon(item)}
      
    </RectButton>;
  };

  const handleSortAssignment = async(sort, showAll = false) => {
      const SortByName = (a, b) => {
          var aName = a[sort].toString().toLowerCase();
          var bName = b[sort].toString().toLowerCase(); 
          return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
      }

      let currentDate = Moment(props.selectedDate).format("YYYY-MM-DD");
      let newArr = props.markedDatesArray;
      if(!showAll) {
          for(let i = 0; i < newArr.length; i++) {
              if(currentDate === newArr[i].date) {
                  newArr[i].data.sort(SortByName);
              }
          }
      } else {
          props.allDatesArray.sort(SortByName);
      }
  }
  
  const SwipeableRow = ({ props, item, index }) => {
    // console.log(item)
    return (   
        <Swipeable
        friction={2}
        leftThreshold={30}
        rightThreshold={40}
        index={index}
        renderLeftActions={(progress) => renderLeftActions(progress, item)}
        renderRightActions={(progress) => renderRightActions(progress, item)}>
            <Row item={item} props={props} />
        </Swipeable>
    );
  };

  const renderSort = () => {
    if(props.page != 'calendar') {
      return <View style={styles.sortContainer}>
        <Text style={{position: 'absolute', top: 18, left: 20, color: '#A6BEED', fontWeight: 'bold'}}>Sort by</Text>
        <Dropdown
          renderItem={renderSortItems}
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          containerStyle={{marginTop: -40, marginLeft: 100, borderWidth: 1, borderRadius: 13}}
          data={sortData}
          labelField="label"
          valueField="value"
          value={sortValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            handleSortAssignment(item.value, props.isShowAll);
            setSortValue(item.value);
            setIsFocus(false);
          }}
          maxHeight={150}
        />
      </View>;
    } else {
      return null;
    }
  }
  
  if(data.length > 0) {
    return (
      <View style={{ 
        flex: 1,
        width: '100%' }}>
        {
          props.page === 'home' ?
          <View style={styles.header}>
            <Text style={[label.boldSmallHeading2,{color:state.isDarkTheme === 'true' ? color.default : color.primary}]}>Assignments</Text>
            <MenuIcon 
                name="dots-vertical"
                color={state.isDarkTheme === 'true' ? color.default : color.primary}
                size={28}
            />
          </View>
          : 
          renderSort()
        }
        <FlatList
            style={{width: '100%'}}
            data={data}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item, index }) => (
            <SwipeableRow props={props} item={item} index={index} />
            )}
            keyExtractor={(item, index) => `message ${index}`}
        />
      </View>
    );
  }
  else {
    return (
      <View style={{ 
        flex: 1,
        alignItems: 'center', 
        marginTop: 50, 
        width: '100%' }}>
        <Text style={{ color: '#959595'}}>No Assignments</Text>
      </View>
    );
  } 
}

var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  sortContainer: {
  },
  dropdown: {
    height: 50,
    paddingHorizontal: 20,
    width: 150,
    marginTop: 20
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0036A1'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  header:{
    flexDirection:'row',
    width:width * 0.89,
    justifyContent:'space-between',
    alignSelf:'center',
    alignItems:'center',
    marginTop:15,
    marginBottom:5
  },
  leftAction: {
    flex: 1,
    backgroundColor: '#E54C29',
    justifyContent: 'center',
    alignItems: 'center',
    height: 106
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    height: 106,
  },
  rectButton: {
    flex: 1,
    height: 106,
    paddingHorizontal: 10,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: 10,
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth
  },
  fromText: {
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    paddingLeft: 27,
    paddingTop: 16,
    paddingBottom: 16
  },
  messageText: {
    color: '#999',
    backgroundColor: 'transparent',
  },
  dateText: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    paddingLeft: 27,
    paddingTop: 16,
    paddingBottom: 16
  },
});

export default Card;