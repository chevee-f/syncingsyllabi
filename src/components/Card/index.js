import 'react-native-gesture-handler';
import React from 'react';
import { Button, Text, View, StyleSheet, Animated, I18nManager } from 'react-native';
import { Swipeable, RectButton, FlatList } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const renderLeftActions = (progress, dragX) => {
  const trans = dragX.interpolate({
    inputRange: [0, 50, 100, 101],
    outputRange: [-20, 0, 0, 1],
  });
  return (
    <View style={{ width: 96, height: 106, marginTop: 10, }}>
      <RectButton style={styles.leftAction}>
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

const renderRightAction = (text, color, x, progress) => {
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [x, 0],
  });
  const pressHandler = () => {
  //   this.close();
    alert(text);
  };
  return (
    <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
      <RectButton
        style={[styles.rightAction, { backgroundColor: color }]}
        onPress={pressHandler}>
        <Text style={styles.actionText}>{text}</Text>
      </RectButton>
    </Animated.View>
  );
};

const renderRightActions = progress => (
  <View style={{ width: 192, height: 106, marginTop: 10, flexDirection: I18nManager.isRTL? 'row-reverse' : 'row' }}>
    {renderRightAction('Done', '#70C862', 192, progress)}
    {renderRightAction('Edit', '#FDC830', 128, progress)}
    
  </View>
);

const Row = ({ item }) => (
  <RectButton style={styles.rectButton} onPress={() => alert(item.class)}>
    <View style={{
      width: 10,
      backgroundColor: 'red',
      position: 'absolute',
      top: 0,
      bottom: 0
    }} />
    <Text style={styles.fromText}>{item.class}</Text>
    <View
      style={{
        borderBottomColor: '#E6EAF2',
        borderBottomWidth: 1,
      }}
    />
    <Text style={styles.dateText}>
      {item.due}
    </Text>
  </RectButton>
);

const SwipeableRow = ({ item, index }) => {
  return (   
      <Swipeable
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}>
          <Row item={item} />
      </Swipeable>
  );
};

const Card = ({data}) => {
    return (
      <View style={{ flex:1,alignItems:'center',justifyContent:'center', width: '100%' }}>
        <FlatList
            style={{width: '100%'}}
            data={data}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item, index }) => (
            <SwipeableRow item={item} index={index} />
            )}
            keyExtractor={(item, index) => `message ${index}`}
        />
      </View>
    )
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
    color: 'red',
    fontWeight: 'bold',
    paddingLeft: 27,
    paddingTop: 16,
    paddingBottom: 16
  },
});

export default Card;