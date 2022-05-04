import 'react-native-gesture-handler';
import React from 'react';
import { Button, Text, View, StyleSheet, Animated, I18nManager, Image, TouchableOpacity } from 'react-native';
import { Swipeable, RectButton, FlatList } from 'react-native-gesture-handler';
import Moment from 'moment';

import Icon from 'react-native-vector-icons/MaterialIcons';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const tomorrow = Moment().add(1, 'days');
const Card = ({data, ...props}) => {
  const renderLeftActions = (progress, item) => {
    return (
      <View style={{ width: 96, height: 106, marginTop: 10, }}>
        <RectButton style={styles.leftAction}
          onPress={() => removePressHandler(item)}>
          <Animated.Text
            style={[
              styles.actionText
            ]}
            >
            Remove
          </Animated.Text>
        </RectButton>
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
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={() => editCardData(item)}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderCompleteRightAction = (item, text, color, progress) => {
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={() => completeCardData(item)}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
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
    if(item.notes === '') {
      return <></>;
    } 
    return <TouchableOpacity onPress={() => props.toggleAttachments(item.notes)} style={{ position: 'absolute', right: 15, top: 18, height: 20, width: 20}}>
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

    return <RectButton style={styles.rectButton} onPress={() => {
      // props.cardD(item);
    }}>
      <View style={{
        width: 8,
        backgroundColor: 'red',
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
  
  // console.log(data.length);
  if(data.length > 0) {
    return (
      <View style={{ 
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
        width: '100%' }}>
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

const styles = StyleSheet.create({
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