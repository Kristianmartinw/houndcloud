import React from 'react';
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
                    <div className='breed-songs'>
                        <span>List of songs this breed has:</span>
                        <li>Example 1</li>
                        <li>Example 2</li>
                        <li>Example 3</li>
                    </div>
                </div>
            }
        </>
    )
}

export default BreedPage;
