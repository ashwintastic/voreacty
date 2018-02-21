import { GlobalErrorMessages} from '../config/messages'
var Video1 = require('twilio-video');
class TwilioDeviseCheck {

  isDeviseCompatible(){
    var localTracksPromise1 =  Video1.createLocalTracks();
   return  localTracksPromise1.then(function(tracks) {
      let isCompatible = true;
      let mediaAccess = 'none';
       for(let i in tracks){
         tracks[i].mediaStreamTrack.stop();
       }
     if(tracks.length < 2){
        isCompatible = false;
        if(tracks.length == 0){
          mediaAccess = GlobalErrorMessages['bothMediaNotAccessible']
        }

        if(tracks[0].kind == 'audio'){
          mediaAccess = GlobalErrorMessages['videoMediaNotAccessible']
        }

        else{
          mediaAccess = GlobalErrorMessages['audioMediaNotAccessible']
        }
      }
      return {isCompatible: isCompatible,  missingMedia: mediaAccess}
    }).catch(function(err){
      return {isCompatible: false,  missingMedia: GlobalErrorMessages['twilioDeviseCheckError'] }
    })
  }
}
export default new TwilioDeviseCheck