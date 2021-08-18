import React from 'react';
import './userPage.css';
import { useParams } from 'react-router';

const UserPage = ({ users }) => {
    const { userId } = useParams();
    const user = users.find(user => user.id === +userId)

    return (
        <>
            {user &&
                <div className='user-profile'>
                    <div id='profile-head'>
                        <span>
                            <h2>IMG {user.username}</h2>
                        </span>
                    </div>
                    <span id='tracks'>Tracks</span><span id='playlists'>Playlists</span>
                    <div id='song-playlist-div'>
                        <div id='song-playlist'>
                            <ul>Song 1</ul>
                            <ul>Song 2</ul>
                            <ul>Song 3</ul>
                        </div>
                        <div id='playlists-div'>
                            <ul>Playlist 1</ul>
                            <ul>Playlist 2</ul>
                            <ul>Playlist 3</ul>
                        </div>
                    </div>
                    <div id='comment-div'>
                        <span >Comments:</span>
                        <div id='comments'>
                            <ul>Comment 1</ul>
                            <ul>comment 2</ul>
                            <ul>comment 3</ul>
                            <ul>comment 4</ul>
                            <ul>comment 5</ul>
                            <ul>comment 6</ul>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default UserPage;
