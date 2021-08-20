import React, { useState } from 'react';
import './userPage.css';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux'


const UserPage = ({ users }) => {
    const [tracks, setTracks] = useState(false)
    const [playlists, setPlaylists] = useState(false)
    const [selectSong, setSelectSong] = useState(false)
    const { userId } = useParams();

    const songs = Object.values(useSelector(state => state.songs))


    const user = users.find(user => user.id === +userId)
    const handleToggle = (e) => {
        if (e.target.id === 'tracks') {
            setPlaylists(false)
            setTracks(true)
        } else {
            setTracks(false)
            setPlaylists(true)
        }
    }

    return (
        <>
            {user &&
                <div className='user-profile'>
                    <div id='profile-head'>
                        <span>
                            <h2>IMG {user.username}</h2>
                        </span>
                    </div>
                    <span id='tracks' onClick={handleToggle}>Tracks</span><span id='playlists' onClick={handleToggle}>Playlists</span>
                    <div id='song-playlist-div'>
                        {tracks && (<div id='song-playlist'>
                            <ul className='user-songlist'>{user.Songs.map(song => <li id={song.id} onClick={e => setSelectSong(e.target.id)} key={song.id}>{song.name}</li>)}</ul>
                        </div>)}
                        {playlists && (<div id='playlists-div'>
                            <ul className='user-playlist'>{user.Playlists.map(playlist => <li key={playlist.id}>{playlist.name}</li>)}</ul>
                        </div>)}
                    </div>
                    <div id='comment-div'>
                        <span >Comments:</span>
                        {selectSong && <div id='comments'>
                            <ul className='comments'>{songs.find(song => song.id === +selectSong).Comments.map(comment => <li key={comment.id}>{comment.comment}   - {comment.User.username}</li>)}</ul>
                        </div>}
                    </div>
                </div>
            }
        </>
    )
}

export default UserPage;
