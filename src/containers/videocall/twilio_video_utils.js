//import callApi from '../../helper/callapi.js';
//import {dispatch} from 'redux';
// import configureStore from '../../store/configureStore';
// const store = configureStore();

var Video = require('twilio-video');
export var activeRoom1;
export var previewTracks;
export var mediaAccess;
//var identity;

// export function setIdentityValue(identityFromServer) {
//     identity = identityFromServer;
// }
//export var roomName;
//export const test="abc"
// Attach the Tracks to the DOM.
export function attachTracks(tracks, container) {
  console.log("attachTracks container ");
  console.log(container);
  tracks.forEach(function(track) {
    container.appendChild(track.attach());
  });
}

// Attach the Participant's Tracks to the DOM.
export function attachParticipantTracks(participant, container) {
	console.log("Participants Track")
  var tracks = Array.from(participant.tracks.values());
  attachTracks(tracks, container);
}

// Detach the Tracks from the DOM.
export function detachTracks(tracks) {
  tracks.forEach(function(track) {
    track.detach().forEach(function(detachedElement) {
      detachedElement.remove();
    });
  });
}

// Detach the Participant's Tracks from the DOM.
export function detachParticipantTracks(participant) {
  var tracks = Array.from(participant.tracks.values());
  detachTracks(tracks);
}

// function makeid() {
//   var text = "";
//   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//   for (var i = 0; i < 5; i++)
//     text += possible.charAt(Math.floor(Math.random() * possible.length));

//   return text;
// }

//console.log(makeid());
// Check for WebRTC
if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
  //alert('WebRTC is not available in your browser.');
}

// When we are about to transition away from this page, disconnect
// from the room, if joined.
window.addEventListener('beforeunload', leaveRoomIfJoined);
//identity = makeid();
//alert("identity > "+identity );
//identity = 'alice'
// Obtain a token from the server in order to connect to the Room.
// $.getJSON('/token', function(data) {
//   identity = data.identity;
//   document.getElementById('room-controls').style.display = 'block';

//   // Bind button to join Room.
//   document.getElementById('button-join').onclick = function() {
//     roomName = document.getElementById('room-name').value;
//     if (!roomName) {
//       alert('Please enter a room name.');
//       return;
//     }

//     log("Joining room '" + roomName + "'...");
//     var connectOptions = {
//       name: roomName,
//       logLevel: 'debug'
//     };

//     if (previewTracks) {
//       connectOptions.tracks = previewTracks;
//     }

//     // Join the Room with the token from the server and the
//     // LocalParticipant's Tracks.
//     Video.connect(data.token, connectOptions).then(roomJoined, function(error) {
//       log('Could not connect to Twilio: ' + error.message);
//     });
//   };

//   // Bind button to leave Room.
//   document.getElementById('button-leave').onclick = function() {
//     log('Leaving room...');
//     activeRoom1.disconnect();
//   };
// });


// Successfully connected!
// export function roomJoined(room) {
//   //alert("Hi"+room)
//   console.log(JSON.stringify(room));
//   //identity = "TestUser1"
//   //alert("Joined as '" + identity + "'");

//   window.room = activeRoom1 = room;

//   console.log("***************");
//   console.log(activeRoom1);
//   console.log("***************");

//   //alert(activeRoom1);
//   alert("Joined as '" + identity + "'");

//   store.dispatch({'type':'CHECK_DISPATCH', 'payload':'test'})

//   log("Joined as '" + identity + "'");
//   //document.getElementById('button-join').style.display = 'none';
//   //document.getElementById('button-leave').style.display = 'inline';

//   // Attach LocalParticipant's Tracks, if not already attached.
//   var previewContainer = document.getElementById('local-media');

//   //console.log("Manoj out: '" + previewContainer + "'");

//   if (!previewContainer.querySelector('video')) {
//   	//log("Manoj: '" + previewContainer + "'");
//     attachParticipantTracks(room.localParticipant, previewContainer);
//   }

//   // Attach the Tracks of the Room's Participants.
//   room.participants.forEach(function(participant) {

//   	//alert("Already in Room: '" + participant.identity + "'");

//     log("Already in Room: '" + participant.identity + "'");
//     var previewContainer = document.getElementById('remote-media');
//     attachParticipantTracks(participant, previewContainer);
//   });

//   // When a Participant joins the Room, log the event.
//   room.on('participantConnected', function(participant) {

//   	alert("Joining PARTICIPANT: '" + participant.identity + "'");
//     log("Joining: '" + participant.identity + "'");
//   });

//   // When a Participant adds a Track, attach it to the DOM.
//   room.on('trackAdded', function(track, participant) {
//   	//alert(participant.identity + " added track: " + track.kind);
//     log(participant.identity + " added track: " + track.kind);
//     var previewContainer = document.getElementById('remote-media');
//     attachTracks([track], previewContainer);
//   });

//   // When a Participant removes a Track, detach it from the DOM.
//   room.on('trackRemoved', function(track, participant) {
//     log(participant.identity + " removed track: " + track.kind);
//     detachTracks([track]);
//   });

//   // When a Participant leaves the Room, detach its Tracks.
//   room.on('participantDisconnected', function(participant) {
//     log("Participant '" + participant.identity + "' left the room");
//     alert("Participant '" + participant.identity + "' left the room");
//     detachParticipantTracks(participant);
//   });

//   // Once the LocalParticipant leaves the room, detach the Tracks
//   // of all Participants, including that of the LocalParticipant.
//   room.on('disconnected', function() {
//     log('Left');
//     //alert(room.localParticipant);

//     alert('left')
//     if (previewTracks) {
//       previewTracks.forEach(function(track) {
//         track.stop();
//       });
//     }
//     detachParticipantTracks(room.localParticipant);
//     room.participants.forEach(detachParticipantTracks);
//     activeRoom1 = null;
//     //document.getElementById('button-join').style.display = 'inline';
//     //document.getElementById('button-leave').style.display = 'none';
//   });


//   // document.getElementById('button-leave').onclick = function() {
//   //   alert('Leaving room...');
//   //   activeRoom1.disconnect();
//   // };
// }


// Activity log.
export function log(message) {
  var logDiv = document.getElementById('log');
  logDiv.innerHTML += '<p>&gt;&nbsp;' + message + '</p>';
  logDiv.scrollTop = logDiv.scrollHeight;
}

// Preview LocalParticipant's Tracks.
//document.getElementById('button-preview').onClick = function() {
export function launchPreview(){	
  //alert('launch')
  var localTracksPromise = previewTracks
    ? Promise.resolve(previewTracks)
    : Video.createLocalTracks();

  return localTracksPromise.then(function(tracks) {
  	//alert("In localTracksPromise")
  	// console.log("MyTracks");
   //  console.log(tracks);
   //  console.log(tracks.length);
    if(tracks.length<2){
      console.log("Inside")
      console.log(tracks[0].kind);
      if(tracks.length == 0){
        mediaAccess = 'both'
      }
      if(tracks[0].kind == 'audio'){
        mediaAccess = 'video';
      }
      else{
        mediaAccess = 'audio'
      }
      //alert("mediaAccess in js "+mediaAccess)
      return mediaAccess;
    }

    window.previewTracks = previewTracks = tracks;
    var previewContainer = document.getElementById('local-media');
    if (!previewContainer.querySelector('video')) {
      attachTracks(tracks, previewContainer);
    }
  }, function(error) {
    //alert("Preview failed")
    return 'both'
    console.error('Unable to access local media', error);
    log('Unable to access Camera and Microphone');
  });
//};
}

// Leave Room.
function leaveRoomIfJoined() {
  alert('leaveRoomIfJoined')
  if (activeRoom1) {
    activeRoom1.disconnect();
  }
}