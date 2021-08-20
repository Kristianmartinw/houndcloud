import React from 'react';
import './breedPage.css';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const BreedPage = ({ breeds }) => {
    const { breedId } = useParams();
    const breed = breeds.find(breed => breed.id === +breedId)

    return (
        <>
            {breed &&
                <div className='breed-page'>
                    <h2>{breed.name}</h2>
                    <div className='breedImg'>
                        <span>Breed Image</span>
                    </div>
                    <h5 className='song-list'>List of songs this breed has:</h5>
                    <div className='breed-songs'>
                        <ul className='breedspage-songlist'>{breed.Songs.map(song => <li key={song.id}><Link to={`/songs/${song.id}`}>{song.name}</Link></li>)}</ul>
                    </div>
                </div>
            }
        </>
    )
}

export default BreedPage;
