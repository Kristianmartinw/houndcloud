import { csrfFetch } from "./csrf";

const LOAD_USERS = 'users/LOAD_USERS'
const UPDATE_USER = 'users/UPDATE_USER'

const loadUsers = (users) => ({
    type: LOAD_USERS,
    users
})

const updateUser = (user) => ({
    type: UPDATE_USER,
    user
})

export const getUsers = () => async (dispatch) => {
    const res = await fetch('/api/users');

    if (res.ok) {
        const users = await res.json();
        dispatch(loadUsers(users))
    }
}

export const createNewPlaylist = (data) => async (dispatch) => {
    const res = await csrfFetch('/api/playlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const updatedUser = await res.json();
        dispatch(updateUser(updatedUser))
    }
}

export const deletePlaylist = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists/${id}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        const users = await res.json()
        dispatch(loadUsers(users))
    }
}

export const addSongToPlaylist = data => async (dispatch) => {
    const response = await csrfFetch('/api/playlists/addSong', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const playlists = await response.json();
        dispatch(loadUsers(playlists))
    }
}

export const removeSongFromPlaylist = data => async (dispatch) => {
    const response = await csrfFetch(`/api/playlists/${data.playlistId}/${data.songId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const playlists = await response.json();
        dispatch(loadUsers(playlists))
    }
}

const initialState = {}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USERS:
            const newState = {}
            action.users.forEach(user => {
                newState[user.id] = user
            })
            return newState
        case UPDATE_USER:
            return { ...state, [action.user.id]: { ...state[action.user.id], ...action.user } }
        default:
            return state
    }
}

export default usersReducer
