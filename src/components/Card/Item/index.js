import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { Swipeable, FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/EvilIcons';
import label from '../../../styles/label'
import color from '../../../styles/colors'
import styles from './styles'

const renderLeftAction = (action, imgSrc) => {
    return (
        <TouchableOpacity style={[styles.action,{backgroundColor: action === 'delete' ? color.error : color.archive }]}>
          <Image 
              source={imgSrc}
              resizeMode='contain'
              style={styles.icon}
          />
        </TouchableOpacity>
    );
  };
  
const renderRightAction = (action, imgSrc) => {
    return (
        <TouchableOpacity style={[styles.action,{backgroundColor: action === 'done' ? color.green : color.warning }]}>
          <Image 
              source={imgSrc}
              resizeMode='contain'
              style={styles.icon}
          />
        </TouchableOpacity>
    );
};

const renderLeftActions = () => (
  <View style={styles.actionContainer}>
      {renderLeftAction('delete', require('../../../assets/icons/X.png'))}
      {renderLeftAction('archive', require('../../../assets/icons/Archive.png'))}
  </View>
);

const renderRightActions = () => (
    <View style={styles.actionContainer}>
        {renderRightAction('done', require('../../../assets/icons/checkIcon.png'))}
        {renderRightAction('edit', require('../../../assets/icons/NotePencil.png'))}
    </View>
);
  
const Row = ({ item }) => (
    <View style={styles.container}>
        <Text style={label.boldSmallHeading2}>
          {item.class}
        </Text>
        <Text style={label.extraSmallHeading2}>
          {item.term}
        </Text>
        <View style={styles.horizontalLine} />
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <Icon name="clock" size={28} />
            <Text style={[label.boldExtraSmallHeading, {color: color.error, marginLeft: 5}]}>
              {item.due}
            </Text>
        </View>
    </View>
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

const CardItem = ({data}) => {
    return (
        <View>
          <FlatList
              data={data}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item, index }) => (
                                                  <SwipeableRow item={item} index={index} />
                                               )}
          />
        </View>
      )
};

export default CardItem;
