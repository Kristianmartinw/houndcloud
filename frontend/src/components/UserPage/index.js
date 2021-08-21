import React, { useState } from 'react';
import './userPage.css';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';


const UserPage = ({ users }) => {
    const sessionUser = useSelector(state => state.session.user);
    const { userId } = useParams();
    const user = users.find(user => user.id === +userId)
    const authorized = user?.id === sessionUser?.id

    const [tracks, setTracks] = useState(false)
    const [playlists, setPlaylists] = useState(false)
    const [selectSong, setSelectSong] = useState(false)

    const songs = Object.values(useSelector(state => state.songs))
    const selectedSong = songs.find(song => (song.id === +selectSong))
    const userSong = +selectedSong?.userId === +sessionUser?.id

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
                            <div className='user-songlist'>{user.Songs.map(song => <div id={song.id} onClick={e => setSelectSong(e.target.id)} key={song.id}> ▶ {song.name}</div>)}</div>
                        </div>)}

                        {playlists && (<div id='playlists-div'>
                            <div className='user-playlist'>{user.Playlists.map(playlist => <div key={playlist.id}> ▶ {playlist.name}</div>)}</div>
                        </div>)}
                    </div>
                    {tracks && authorized && <span className='uploadTrack'>Upload Track</span>

                    }
                    {playlists && authorized && <span className='createPlaylist'>Create Playlist</span>

                    }
                    <div id='comment-div'>
                        <span className='commentBox'>Comments:</span>
                        <div className='comments-box'>
                            {selectSong && <div id='comments'>
                                <div className='comments'>{songs.find(song => song.id === +selectSong).Comments.map(comment => <div key={comment.id}><Link to={`/users/${comment.User.id}`}><span className='commentingUser'>{comment.User.username}</span></Link>: <span className='commentedText'>"{comment.comment}"</span></div>)}</div>
                            </div>}
                        </div>
                        {selectSong && sessionUser && !userSong && <span className='createComment'> Create Comment</span>}
                    </div>
                </div>
            }
        </>
    )
}

export default UserPage;
