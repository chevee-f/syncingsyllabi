import { StyleSheet, Dimensions, Platform } from "react-native"
import color from '../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    modal:{
        justifyContent: 'center', 
        alignItems:'center'
    },
    modalContainer:{
        backgroundColor: '#f2f1f6', 
        alignItems: 'center',
        borderRadius: 16,
        width: width * 0.93,
        padding:30
    },
    buttonContainer:{
        flexDirection: 'row',
        width: width * 0.84,
        justifyContent: 'space-between',
        marginTop: 30
    },
    button:{
        width: width * 0.4,
        height: height * 0.055
    },
    time:{
        color: '#a7a6ab',
        marginBottom: 10
    },
    timeContainer: {
        width: width * 0.8, 
        backgroundColor:'#fff',
        paddingHorizontal: 10,
        borderRadius: 10
    },
    timeSubContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical: 10
    },
    timeLabel:{
        alignSelf: 'center',
        color: color.primary
    },
    timeValueContainer:{
        backgroundColor:'#dbdbdc73',
        padding:8, 
        borderRadius: 7
    },
    dateTimePickerHeader:{
        width: width * 0.78,
        paddingHorizontal: 16,
        paddingVertical:10,
        alignItems: 'flex-end',
        marginTop: 5,
        borderColor: '#c9c8cd4f',
        borderBottomWidth: 1
    },
    addContainer:{
        width: width * 0.8,
        paddingVertical:10,
        alignItems: 'flex-end',
        marginTop: 8
    },
    addButton:{
        width: width * 0.3, 
        height: height * 0.045, 
        borderRadius:8
    },
    weekPicker:{
        width: width * 0.8,
        marginTop: -20
    },
    emptyContainer:{
        alignSelf:'center',
        justifyContent:'center',
        height: height * 0.17
    },
    icon:{
        width: 28,
        height: 28
    },
    actionContainer:{
        width: 60, 
        height: 70,
        flexDirection: 'row',
    },
    action:{
        width: 60, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    row:{
        backgroundColor:'#fff',
        paddingVertical:10,
        borderBottomWidth:1,
        borderColor:'#c9c8cd4f',
        height:70,
        justifyContent:'center',
        paddingLeft: 10
    },
    flatListContainer:{
        justifyContent:'center',
        height: height * 0.17
    }
})