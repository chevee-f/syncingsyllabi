import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { Swipeable, FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/EvilIcons';
import label from '../../../styles/label'
import color from '../../../styles/colors'
import styles from './styles'
import Moment from 'moment';

const CardItem = ({
  data,
  ...props
}) => {
  const tomorrow = Moment().add(1, 'days');

const renderLeftAction = (action, imgSrc, id) => {
    return (
        <TouchableOpacity style={[styles.action,{backgroundColor: action === 'Delete' ? color.error : color.archive }]}
                          onPress={() => onclick(action,id)}>
          <Image 
              source={imgSrc}
              resizeMode='contain'
              style={styles.icon}
          />
        </TouchableOpacity>
    );
  };

const onclick = (action,id) => {
    props.onClickAction(action,id);
}

const renderRightAction = (action, imgSrc, id) => {
    return (
        <TouchableOpacity style={[styles.action,{backgroundColor: action === 'Complete' ? color.green : color.warning }]}
                          onPress={() => onclick(action,id)}>
          <Image 
              source={imgSrc}
              resizeMode='contain'
              style={styles.icon}
          />
        </TouchableOpacity>
    );
};

const renderLeftActions = (id) => (
  <View style={styles.actionContainer}>
      {renderLeftAction('Delete', require('../../../assets/icons/X.png'), id)}
      {renderLeftAction('Archive', require('../../../assets/icons/Archive.png'), id)}
  </View>
);

const renderRightActions = (id) => (
    <View style={styles.actionContainer}>
        {renderRightAction('Complete', require('../../../assets/icons/checkIcon.png'), id)}
        {renderRightAction('Edit', require('../../../assets/icons/NotePencil.png'), id)}
    </View>
);
  
const Row = ({ item }) => (
    <View style={styles.container}>
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 16, backgroundColor: 'transparent', 
    paddingBottom: 10,}}>{item.goalTitle.length > 25 ? item.goalTitle.slice(0, 25) + '...' : item.goalTitle} | {item.goalTypeName}</Text>
      </View>
        <Text style={label.smallHeading}>
          {item.goalDescription.length > 48 ? item.goalDescription.slice(0, 48) + '...' : item.goalDescription}
        </Text>
        {/* <Text style={label.extraSmallHeading2}>
        </Text> */}
        <View style={styles.horizontalLine} />
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <Icon name="clock" size={28} />
            <Text style={[label.boldExtraSmallHeading, {color: Moment(item.goalDateEnd).format("MM/DD/YYYY") === Moment(tomorrow).format("MM/DD/YYYY") ? color.error : '#000', 
                                                        marginLeft: 5}]}>
              {Moment(item.goalDateEnd).format("MM/DD/YYYY") === Moment(tomorrow).format("MM/DD/YYYY") ?
               'Due Tomorrow' : Moment(item.goalDateEnd).format("MM/DD/YYYY")
              }
            </Text>
        </View>
    </View>
);

const SwipeableRow = ({ item, index }) => {
  console.log(item)
    return (   
        <Swipeable
          friction={2}
          leftThreshold={30}
          rightThreshold={40}
          renderLeftActions={() => renderLeftActions(item.id)}
          renderRightActions={() => renderRightActions(item.id)}>
              <Row item={item} />
        </Swipeable>
    );
};

  return (
    <View>
      <FlatList
          data={data}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item, index }) => (<SwipeableRow item={item} index={index} />)}
      />
    </View>
  )
}


export default CardItem;
