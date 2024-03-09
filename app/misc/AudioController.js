//pause audio
export const pause = async (playBackObject) =>{
    try{
        return(await playBackObject.setStatusAsync({shouldPlay: false}));
    }
    catch(e){
        console.log(`Logged error while playing inside the pause helper method.`,e);
    }
}

//play audio
export const play = async (playBackObject, uri) =>{
    try{
        return(await playBackObject.loadAsync({uri}, {shouldPlay: true}));
    }
    catch(e){
        console.log(`Logged error while playing inside the play helper method.`,e);
    }
}

//resume audio
export const resume = async (playBackObject) =>{
    try{
        return(await playBackObject.playAsync());
    }
    catch(e){
        console.log(`Logged error while playing inside the resume helper method.`,e);
    }
}

//play new audio
export const newAudio = async (playBackObject, uri) =>{
    try{
        await playBackObject.stopAsync();
        await playBackObject.unloadAsync();
        return(await play(playBackObject, uri));
    }
    catch(e){
        console.log(`Logged error while playing inside the newAudio helper method.`,e);
    }
}