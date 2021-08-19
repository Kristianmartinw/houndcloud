import React from 'react';
import './homePage.css';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const breeds = useSelector(state =>
        state.breeds
    )
    const breedsArr = Object.values(breeds)
    const randomInd = Math.floor(Math.random() * breedsArr.length)
    const randomBreed = breedsArr[randomInd]
    console.log(randomInd)

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
                        <ul className='song'>(IMG) [Song Title 1] Wave: -wwWwwWwwwwwWwwWw-</ul>
                        <ul className='song'>(IMG) [Song Title 2] Wave: -wwwwwWWWWwwwWWww-</ul>
                        <ul className='song'>(IMG) [Song Title 3] Wave: -WWwwwWWwwWWWwwwW-</ul>
                    </div>
                </div>
            }
        </>
    )
}

export default HomePage;
