import React from 'react';
import './breedPage.css';
import { useParams } from 'react-router';

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
                        <ul className='song'>(IMG) [Song Title 1] Wave: -wwWwwWwwwwwWwwWw-</ul>
                        <ul className='song'>(IMG) [Song Title 2] Wave: -wwwwwWWWWwwwWWww-</ul>
                        <ul className='song'>(IMG) [Song Title 3] Wave: -WWwwwWWwwWWWwwwW-</ul>
                    </div>
                </div>
            }
        </>
    )
}

export default BreedPage;
