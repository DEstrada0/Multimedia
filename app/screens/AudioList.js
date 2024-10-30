import React, { Component } from 'react'; 
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { AudioContext } from '../context/AudioProvider';
import { RecyclerListView, LayoutProvider } from 'recyclerlistview';
import AudioListItem from '../components/AuidioListItem';

export class AudioList extends Component {
    static contextType = AudioContext;

    constructor(props) {
        super(props);

        this.layoutProvider = new LayoutProvider(
            (i) => 'audio', 
            (type, dim) => {
                switch (type) {
                    case 'audio':
                        dim.width = Dimensions.get('window').width;
                        dim.height = 70;
                        break;
                    default:
                        dim.width = 0;
                        dim.height = 0;
                }
            }
        );
    }

    rowRenderer = (type, item) => {
        
        return <AudioListItem title={item.filename} duration={item.duration} />
    }

    render() {
        return (
            <AudioContext.Consumer>
                {({ dataProvider }) => (
                    <View style={{ flex: 1 }}> 
                        <RecyclerListView 
                            dataProvider={dataProvider} 
                            layoutProvider={this.layoutProvider} 
                            rowRenderer={this.rowRenderer} 
                        />
                    </View>
                )}
            </AudioContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default AudioList;
