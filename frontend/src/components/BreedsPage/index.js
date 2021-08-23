import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route } from "react-router-dom";
import BreedPage from "../BreedPage"
import './breedsPage.css';



const BreedList = ({ setCurrentlyPlaying }) => {
    const [selectBreed, setBreed] = useState(false)

    const breeds = useSelector(state => {
        const arr = Object.values(state.breeds)
        return arr;
    })
    const selectedBreed = breeds.find(breed => breed.name === selectBreed)

    return (
        <>
            <Route exact path='/breeds'>
                <div className='breeds-div'>
                    {selectBreed ?
                        <div>
                            <div className='breedName'>{selectedBreed.name}</div>
                            <div className='breedsSongsContainers'>
                                {selectedBreed.Songs.map(song => <div className='breedsSongsList' tabIndex={song.id} id={song.id} key={song.id}><span onClick={e => setCurrentlyPlaying(song.songUrl)}>▶</span> {song.name}</div>)}
                            </div>
                        </div>
                        : <div className='selectBreed'>Select a Breed</div>
                    }
                    <div className='breeds-container'>
                        <div>
                            {breeds.map(breed => <div className='dogImg' id={breed.name} onClick={e => setBreed(e.currentTarget.id)} key={breed.id}><img className='breedsImg' alt="breeds" tabIndex={breed.breedImg} src={breed.breedImg}></img></div>)}
                        </div>
                    </div>
                </div>
            </Route>
            <Route path='/breeds/:breedId'>
                <BreedPage breeds={breeds} />
            </Route>
        </>
    )
}

export default BreedList
