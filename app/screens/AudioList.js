import { View, Text } from 'react-native'
import { StyleSheet, Dimensions } from 'react-native'
import React, {Component} from 'react'
import { AudioContext } from '../context/AudioProvider';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RecyclerListView } from 'recyclerlistview';
import { LayoutProvider } from 'recyclerlistview';

export default class AudioList extends Component {
  static contextType = AudioContext;

  layoutProvider = new LayoutProvider((i) => {
    return('audio');
  }, 
    (type, dim) => {
      dim.width = Dimensions.get('window').width;
      dim.height = 70;
    }
  )

  rowRenderer = (type, item) => {
    return(
      <View style={{height: 70, width: '100%', justifyContent: 'center', paddingLeft: 10}}>
        <Text>{item.filename}</Text>
        <Text>{item.duration}</Text>
      </View>
    )
  }

  render() {

    return(
      <AudioContext.Consumer>
        {({dataProvider, })=>{
          return(
            <RecyclerListView 
              dataProvider={dataProvider}
              layoutProvider={this.layoutProvider}
              rowRenderer={this.rowRenderer}
            />
          )
        }}
      </AudioContext.Consumer>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});