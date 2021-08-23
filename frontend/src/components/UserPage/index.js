import React, { useState } from 'react';
import './userPage.css';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { addSongToPlaylist, createNewPlaylist, deletePlaylist, getUsers } from '../../store/users';
import { createNewComment, deleteComment, deleteASong, uploadSong, createNewSong } from '../../store/songs';

const UserPage = ({ setCurrentlyPlaying }) => {
    const sessionUser = useSelector(state => state.session.user);
    const { userId } = useParams();
    const users = Object.values(useSelector(state => state.users))
    const user = users?.find(user => user.id === +userId)
    const authorized = user?.id === sessionUser?.id

    const [tracks, setTracks] = useState(false)
    const [playlists, setPlaylists] = useState(false)
    const [comment, setComment] = useState('')
    const [file, setFile] = useState(null)
    const [breedId, setBreedId] = useState(false)
    const [selectSong, setSelectSong] = useState(false)
    const [uploadForm, setUploadForm] = useState(false)
    const [removeSong, setRemoveSong] = useState(false)
    const [addToForm, setAddToForm] = useState(false)
    const [uploadConfirm, setUploadConfirm] = useState('')
    const [selectPlaylist, setSelectPlaylist] = useState('')
    const [playlistName, setPlaylistName] = useState('')
    const [createPlaylist, setCreatePlaylist] = useState(false)
    const [removePlaylist, setRemovePlaylist] = useState(false)
    const [createComment, setCreateComment] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState('')
    const [removeComment, setRemoveComment] = useState(false)
    const dispatch = useDispatch()

    const songs = Object.values(useSelector(state => state.songs))
    const selectedSong = songs.find(song => (song.id === +selectSong))
    const userSong = +selectedSong?.userId === +sessionUser?.id
    const breeds = Object.values(useSelector(state => state.breeds))

    const handleToggle = (e) => {
        if (e.target.id === 'tracks') {
            setPlaylists(false)
            setTracks(true)
        } else {
            setTracks(false)
            setPlaylists(true)
        }
    }

    const hasCommented = selectedSong?.Comments.find(comment => comment.userId === sessionUser?.id)


    const handleUploadSubmit = async e => {
        e.preventDefault();
        const songUrl = await dispatch(uploadSong(file))
        const audioEl = document.createElement('audio')
        audioEl.src = songUrl
        audioEl.addEventListener('loadeddata', async () => {
            const length = Math.floor(+audioEl.duration)
            const data = {
                userId: sessionUser?.id,
                name: uploadConfirm,
                length,
                songUrl: songUrl,
                songImg: '/placeholder',
                breedId
            }
            await dispatch(createNewSong(data))
            dispatch(getUsers())
            setUploadForm(false)
        })
    }

    const handleAddToForm = id => {
        setAddToForm(addToForm ? false : true)
        setSelectSong(id)
    }

    const addToPlaylistSubmit = e => {
        e.preventDefault()
        const payload = {
            playlistId: +selectPlaylist,
            songId: +selectSong
        }
        dispatch(addSongToPlaylist(payload))
        setAddToForm(false)
    }

    const handlePlaylistSubmit = e => {
        e.preventDefault();

        const data = {
            userId: sessionUser?.id,
            name: playlistName,
        }
        dispatch(createNewPlaylist(data))
        setPlaylistName('')
        setCreatePlaylist(false)
    }

    const handleCommentSubmit = e => {
        e.preventDefault();

        const data = {
            userId: sessionUser?.id,
            comment: comment,
            songId: selectedSong?.id
        }
        dispatch(createNewComment(data))
        setComment('')
        setCreateComment(false)
    }

    const handleDeleteSubmit = e => {
        e.preventDefault();
        if (deleteConfirm.toLowerCase() !== 'yes') {
            alert('Deletion not confirmed.')
        } else {
            dispatch(deletePlaylist(selectPlaylist))
        }
        setRemovePlaylist(false)
    }

    const handleDeleteSubmitCom = e => {
        e.preventDefault();
        if (deleteConfirm.toLowerCase() !== 'yes') {
            alert('Deletion not confirmed.')
        } else {
            const comment = selectedSong.Comments.find(comment => comment.userId === sessionUser?.id)
            dispatch(deleteComment(comment.id))
        }
        setRemoveComment(false)

    }

    const handleDeleteSong = e => {
        e.preventDefault();
        if (deleteConfirm.toLowerCase() !== 'yes') {
            alert('Deletion not confirmed.')
        } else {
            dispatch(deleteASong(selectSong))
        }
        setRemoveSong(false)
    }

    return (
        <>
            {user &&
                <div className='user-profile'>
                    <div id='profile-head'>
                        <img className='userPic' src='https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg'></img>
                        <span className='userUsername'>{user.username}</span>
                    </div>
                    <span id='tracks' onClick={handleToggle}>Tracks</span>
                    <span id='playlists' onClick={handleToggle}>Playlists</span>
                    <div id='song-playlist-div'>
                        {tracks &&
                            <div id='song-playlist'>
                                <div>
                                    {user.Songs.map(song => <div className='user-songlist' onClick={e => setSelectSong(song.id)} tabIndex={song.id} id={song.id} key={song.id}>
                                        <span onClick={e => setCurrentlyPlaying(song.songUrl)}>▶</span> {song.name}
                                        <span onClick={e => handleAddToForm(song.id)} id={song.id} className='moveToPlaylist'>➕</span>{addToForm && selectSong === song.id ? (<div>
                                            <form onSubmit={addToPlaylistSubmit}>
                                                <select value={selectPlaylist} onChange={e => setSelectPlaylist(e.target.value)}>
                                                    <option disabled required value=''>Select playlist to move to:</option>
                                                    {user.Playlists.map(playlist => <option className='dropdown-playlist' key={playlist.id} value={playlist.id}>{playlist.name}</option>)}
                                                </select>
                                                <button>Submit</button>
                                                <button onClick={e => setAddToForm(false)}>Cancel</button>
                                            </form></div>) : (<></>)}</div>)}
                                </div>
                            </div>
                        }
                        {playlists &&
                            <div id='playlists-div'>
                                <div>
                                    {user.Playlists.map(playlist => <div className='user-playlist' tabIndex={playlist.id} id={playlist.id} onClick={e => setSelectPlaylist(e.target.id)} key={playlist.id}> ▶ {playlist.name}</div>)}
                                </div>
                            </div>
                        }
                    </div>

                    {tracks && authorized &&
                        <>
                            <span className='uploadTrack' onClick={e => setUploadForm(true)} >Upload Track</span>
                            {uploadForm &&
                                < div >
                                    <form onSubmit={handleUploadSubmit}>
                                        <input value={uploadConfirm} onChange={e => setUploadConfirm(e.target.value)} placeholder='Enter name for song' required></input>
                                        <input type='file' onChange={e => setFile(e.target.files[0])} required />
                                        <select value={breedId} onChange={e => setBreedId(e.target.value)}>
                                            <option value={false}>Choose a breed:</option>
                                            {breeds?.map(breed => <option key={breed.id} value={breed.id}>{breed.name}</option>)}
                                        </select>
                                        <button>Upload</button>
                                    </form>

                                    <button onClick={e => setUploadForm(false)}>Cancel</button>
                                </div>
                            }
                            {selectSong &&
                                <>
                                    <span className='deleteTrack' onClick={e => setRemoveSong(true)} > Delete Track</span>

                                    {removeSong &&
                                        <div>
                                            <form onSubmit={handleDeleteSong}>
                                                <input value={deleteConfirm} onChange={e => setDeleteConfirm(e.target.value)} placeholder='Enter "Yes" to confirm'></input>
                                                <button>Submit</button>
                                            </form>
                                            <button onClick={e => setRemoveSong(false)}>Cancel</button>
                                        </div>
                                    }
                                </>
                            }
                        </>
                    }

                    {playlists && authorized &&
                        <>
                            <span className='createPlaylist' onClick={e => setCreatePlaylist(true)}>Create Playlist</span>
                            {createPlaylist &&
                                <>
                                    <div>
                                        <form onSubmit={handlePlaylistSubmit}>
                                            <input value={playlistName} onChange={e => setPlaylistName(e.target.value)} placeholder='Enter Playlist name here'></input>
                                            <button>Submit</button>
                                        </form>
                                        <button onClick={e => setCreatePlaylist(false)}>Cancel</button>
                                    </div>
                                </>
                            }
                            {selectPlaylist &&
                                <>
                                    <span className='deletePlaylist' onClick={e => setRemovePlaylist(true)} > Delete Playlist</span>
                                    {removePlaylist &&
                                        <div>
                                            <form onSubmit={handleDeleteSubmit}>
                                                <input value={deleteConfirm} onChange={e => setDeleteConfirm(e.target.value)} placeholder='Enter "Yes" to confirm'></input>
                                                <button>Submit</button>
                                            </form>
                                            <button onClick={e => setRemovePlaylist(false)}>Cancel</button>
                                        </div>
                                    }
                                </>
                            }
                        </>
                    }
                    <div id='comment-div'>
                        <span className='commentBox'>Comments:</span>
                        <div className='comments-box'>
                            {selectSong &&
                                <div id='comments'>
                                    <div className='comments'>{songs.find(song => song.id === +selectSong).Comments.map(comment => <div key={comment.id}><Link to={`/users/${comment.User.id}`}>
                                        <span className='commentingUser'>{comment.User.username}</span></Link>: <span className='commentedText'>"{comment.comment}"</span></div>)}
                                    </div>
                                </div>
                            }
                        </div>
                        {selectSong && sessionUser && !userSong &&
                            <>
                                {!hasCommented &&
                                    < span className='createComment' onClick={e => setCreateComment(true)}> Create Comment</span>
                                }
                                {createComment &&
                                    <>
                                        <div>
                                            <form onSubmit={handleCommentSubmit}>
                                                <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder='Enter your comment here' />
                                                <button>Submit</button>
                                            </form>
                                            <button onClick={e => setCreateComment(false)}>Cancel</button>
                                        </div>
                                    </>
                                }
                                {hasCommented &&
                                    <span className='deleteComment' onClick={e => setRemoveComment(true)}>Delete Comment</span>
                                }
                                {removeComment &&
                                    <div>
                                        <form onSubmit={handleDeleteSubmitCom}>
                                            <input value={deleteConfirm} onChange={e => setDeleteConfirm(e.target.value)} placeholder='Enter "Yes" to confirm'></input>
                                            <button>Submit</button>
                                        </form>
                                        <button onClick={e => setRemoveComment(false)}>Cancel</button>
                                    </div>

                                }
                            </>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default UserPage;
