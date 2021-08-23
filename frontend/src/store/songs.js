import { csrfFetch } from './csrf';

const STORE_SONGS = 'songs/STORE_SONGS'
const UPDATE_SONG = 'songs/UPDATE_SONG'
const DELETE_SONG = 'songs/DELETE_SONG'

const storeSongs = songs => (
    { type: STORE_SONGS, songs }
)

const updateSong = song => (
    { type: UPDATE_SONG, song }
)

const deleteSong = song => (
    { type: DELETE_SONG, song }
)

export const getSongs = () => async (dispatch) => {
    const res = await csrfFetch('/api/songs')
    if (res.ok) {
        const allSongs = await res.json()
        dispatch(storeSongs(allSongs))
    }
}


export const uploadSong = (song) => async (dispatch) => {
    const formData = new FormData()
    formData.append('song', song)
    const res = await csrfFetch('/api/songs/upload', { method: 'POST', headers: { 'Content-Type': 'multipart/form-data' }, body: formData })
    if (res.ok) {
        const songUrl = await res.json()
        return songUrl
    }
}

export const createNewSong = (data) => async (dispatch) => {
    const res = await csrfFetch('/api/songs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const songs = await res.json();
        dispatch(storeSongs(songs))
    }
}



export const deleteASong = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/songs/${id}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        const song = await res.json()
        dispatch(deleteSong(song))
    }
}

export const createNewComment = (data) => async (dispatch) => {
    const res = await csrfFetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const songs = await res.json();
        dispatch(storeSongs(songs))
    }
}

export const deleteComment = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${id}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        const song = await res.json()
        dispatch(updateSong(song))
    }
}

const initialState = {};

const songsReducer = (state = initialState, action) => {
    const stateCopy = { ...state }

    switch (action.type) {
        case STORE_SONGS:
            const storeState = {}
            action.songs.forEach(song => {
                storeState[song.id] = song
            })
            return storeState;
        case UPDATE_SONG:
            if (stateCopy[action.song.id]) {
                delete stateCopy[action.song.id]
            }
            stateCopy[action.song.id] = action.song
            return stateCopy
        case DELETE_SONG:
            if (stateCopy[action.song.id]) {
                delete stateCopy[action.song.id]
            }
            stateCopy[action.song.id] = action.song
            return stateCopy
        default:
            return state;
    }
}

export default songsReducer;
