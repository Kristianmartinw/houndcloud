import React from 'react';
import './homePage.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const breeds = useSelector(state =>
        state.breeds
    )

    const breedsArr = Object.values(breeds)

    const multiplier = 1000;
    const maxNum = breedsArr.length * multiplier - 1;

    const randomNum = Math.random() * maxNum;
    const randomInd = Math.floor(randomNum / multiplier)

    const randomBreed = breedsArr[randomInd]
    console.log('CHECK ----->', randomBreed?.Songs)

    return (
        <>
            {
                <div className='home-page'>
                    <div className='top-banner'>
                        <span>Banner Image</span>
                    </div>
                    <h5 className='message'>Message to either ask a new user to sign up or to discover music</h5>
                    <h4 id='h1-thing'>Have you checked out {randomBreed?.name}? If not how about listening to some tracks below.</h4>
                    <span id='shuffle'>Shuffle</span>
                    <div className='random-songs'>
                        <ul className='home-songlist'>{randomBreed?.Songs.map(song => <li key={song.id}><Link to={`/songs/${song.id}`}>{song.name}</Link></li>)}</ul>
                    </div>
                </div>
            }
        </>
    )
}

export default HomePage;
