import * as firebase from 'firebase';

export const setStories = () => (dispatch, getState) => {
	let stories = firebase.database().ref('stories')
  const activeFrequency = getState().frequencies.active

  stories.orderByChild('frequency').equalTo(activeFrequency).on('value', function(snapshot){
    dispatch({
	  	type: 'SET_STORIES',
	  	stories: snapshot.val()
	  })
  });
}

export const createStory = (content) => (dispatch, getState) => {
	const uid = getState().user.uid
  const activeFrequency = getState().frequencies.active
	const timestamp = Math.round(new Date() / 1);
	let newStoryRef = firebase.database().ref().child(`stories`).push();
  const key = newStoryRef.key
  let storyData = {
    id: key,
    creator: uid,
    timestamp: timestamp,
    content: content,
    frequency: activeFrequency
  }
  newStoryRef.set(storyData, function(err){
  	console.log(err)
  });

  dispatch({
    type: 'SET_ACTIVE_STORY',
    key
  })
}

export const setActiveStory = (id) => (dispatch) => {
  dispatch({
    type: 'SET_ACTIVE_STORY',
    id
  })
}