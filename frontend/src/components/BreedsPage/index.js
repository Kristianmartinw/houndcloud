import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBreeds } from '../../store/breeds';
import { Route, Link } from "react-router-dom";
import BreedPage from "../BreedPage"
import './breedsPage.css';

const BreedList = () => {
    const dispatch = useDispatch()
    const breeds = useSelector(state => {
        const arr = Object.values(state.breeds)
        return arr;
    })

    useEffect(() => {
        dispatch(getBreeds())
    }, [dispatch])
    return (
        <>
            <Route exact path='/breeds'>
                <div className='breeds-div'>
                    <h1 className='breeds-title'>Breeds</h1>
                    <div className='breeds-container'>
                        <ul>
                            {breeds.map((breed) => <ul key={breed.id}><Link to={`/breeds/${breed.id}`}>{breed.name}</Link></ul>)}
                        </ul>
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
