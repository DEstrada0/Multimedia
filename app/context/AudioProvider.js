import React, {Component, createContext} from 'react';
import { View, Text, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';

export const AudioContext = createContext();
export default class AudioProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioFiles: [],
            permissionError: false,
            dataProvider: new DataProvider((r1, r2) => r1 !== r2)
        }
       }

       permissionAllert = () => {
            Alert.alert('Permission Required', "This app need to read audio files!", 
                [{ text: 'I am ready', 
                    onPress: () => this.getPermission()
                },{
                text: 'Cancel',
                onPress: () => this.permissionAllert()
                    
                }]);
            
            }
                
    getAudioFiles = async () => {
        const {dataProvider, audioFiles}= this.state;
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio', 
        })
        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio', 
            first: media.totalCount,
        })

        this.setState({...this.state,
            dataProvider: dataProvider.cloneWithRows([
                ...audioFiles, 
                ...media.assets]),
             audioFiles: [...audioFiles, ...media.assets]});
        
        

    }


    getPermission = async () => {
        // {
        //     "canAskAgain": true,
        //     "expires": "never",
        //     "granted": false,
        //     "status": "undetermined",
        // }

         const permission = await MediaLibrary.requestPermissionsAsync();
         if (permission.granted) {
            this.getAudioFiles();
            //  this.loadAudio();
         }

         if (!permission.canAskAgain && !permission.granted) {
            this.setState({...this.state, permissionError: true});
            ;}

         if (!permission.granted && permission.canAskAgain) {
           const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();
           if (status === 'denied ' && canAskAgain) {
            // the permission is denied and can ask again
                this.permissionAllert();
           }
           if (status === 'granted' ) {
            this.getAudioFiles();
                //all the audiop files
           }
           if (status === 'denied ' && !canAskAgain) {
            // display a error to the user
            this.setState({...this.state, permissionError: true});
           }
          

        }
    }
    componentDidMount(){
        this.getPermission()
    }
    

    // loadAudio = async () => {
    //     const audioFiles = [
    //         {
    //             id: '1',
    //             url: require('../assets/audio1.mp3'),
    //             title: 'Audio One',
    //             artist: 'Artist One'
    //         },
    //         {
    //             id: '2',
    //             url: require('../assets/audio2.mp3'),
    //             title: 'Audio Two',
    //             artist: 'Artist Two'
    //         },
    //         {
    //             id: '3',
    //             url: require('../assets/audio3.mp3'),
    //             title: 'Audio Three',
    //             artist: 'Artist Three'
    //         },
    //     ];
    //     this.setState({audioFiles});
    // }

    // componentDidMount() {
    //     this.loadAudio();
    // }

    render() {
        const {dataProvider, audioFiles, permissionError} = this.state;
        if (permissionError) return <View style={{
            
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
            
        }}>
            <Text style={{fontSize: 25, textAlign:"center", color:'red'}}>It looks like you denied the permission for the app. You can't use the app without the permission.</Text>
        </View>
        return (
            <AudioContext.Provider value={{audioFiles, dataProvider}}>
                {this.props.children}
            </AudioContext.Provider>
        )
    }
}


// export default AudioProvider;