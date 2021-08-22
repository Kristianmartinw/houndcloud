import React from 'react';
import './homePage.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const HomePage = ({ setCurrentlyPlaying }) => {
    const sessionUser = useSelector(state => state.session.user);

    const breeds = useSelector(state =>
        state.breeds
    )

    const breedsArr = Object.values(breeds)

    const multiplier = 1000;
    const maxNum = breedsArr.length * multiplier - 1;

    const randomNum = Math.random() * maxNum;
    const randomInd = Math.floor(randomNum / multiplier)

    const randomBreed = breedsArr[randomInd]

    return (
        <>
            {
                <div className='home-page'>
                    <div className='top-banner'>
                        <span><img className='banner' src='https://hound-cloud.s3.us-west-1.amazonaws.com/1629522656571.jpg'></img></span>
                    </div>
                    {sessionUser ?
                        <>
                            <h1 className='loggedInMessage'>Welcome Back, {sessionUser.username}. </h1>
                            <h5 className='forPositioning'></h5>
                        </> :

                        <>
                            <h3 className='loggedOutMessage1'>New to HoundCloud? </h3>
                            <h5 className='loggedOutMessage2'>How about signing up <Link className='signupRedirect' to='/signup'>here</Link> so you can get started on uploading your own tracks and more.</h5>
                        </>
                    }
                    <h4 id='h1-thing'>Have you checked out {randomBreed?.name}? If not how about listening to some tracks below.</h4>
                    <span id='shuffle'>Shuffle</span>
                    <div className='random-songs'>
                        <div>{randomBreed?.Songs.map(song => <div className='home-songlist' tabindex={song.id} key={song.id}>
                            <span onClick={e => setCurrentlyPlaying(song.songUrl)}>▶</span> {song.name}</div>)}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default HomePage;
