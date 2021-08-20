import { csrfFetch } from './csrf';

const STORE_SONGS = 'songs/STORE_SONGS'

const storeSongs = songs => (
    { type: STORE_SONGS, songs }
)

export const getSongs = () => async (dispatch) => {
    const res = await csrfFetch('/api/songs')
    if (res.ok) {
        const allSongs = await res.json()
        dispatch(storeSongs(allSongs))
    }
}


export const uploadSongs = (song) => async (dispatch) => {
    const formData = new FormData()
    formData.append('song', song)
    const res = await csrfFetch('/api/songs', { method: 'POST', headers: { 'Content-Type': 'multipart/form-data' }, body: formData })
    if (res.ok) {
        const newSong = await res.json()
        console.log('Created Song: ', newSong)
    }
}

const initialState = {};

const songsReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_SONGS:
            const storeState = {}
            action.songs.forEach(song => {
                storeState[song.id] = song
            })
            return storeState;
        default:
            return state;
    }
}

export default songsReducer;
