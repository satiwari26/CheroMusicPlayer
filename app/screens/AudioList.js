import { View, Text } from 'react-native'
import { StyleSheet, Dimensions } from 'react-native'
import React, {Component} from 'react'
import { AudioContext } from '../context/AudioProvider';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RecyclerListView } from 'recyclerlistview';
import { LayoutProvider } from 'recyclerlistview';
import AudioListItem from '../components/AudioListItem';
import color from '../misc/color';

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
      <AudioListItem title={item.filename} duration={item.duration} onPressOptions= {()=>{console.log(`option pressed for ${item.filename}`)}}/>
    )
  }

  render() {

    return(
      <AudioContext.Consumer>
        {({dataProvider, })=>{
          return(
            <View style={styles.container}>
              <RecyclerListView 
                style={{ width: '100%', height: '100%' }}
                dataProvider={dataProvider}
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
              />
            </View>
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
    justifyContent: 'center',
    backgroundColor: color.primaryDarkBlue,
  }
});