const LOAD_BREEDS = 'breeds/LOAD_BREEDS'

const loadBreeds = (breeds) => ({
    type: LOAD_BREEDS,
    breeds
})

export const getBreeds = () => async (dispatch) => {
    const res = await fetch('/api/breeds');

    if (res.ok) {
        const breeds = await res.json();
        dispatch(loadBreeds(breeds))
    }
}

const initialState = {}

const breedsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BREEDS:
            const newState = {}
            action.breeds.forEach(breed => {
                newState[breed.id] = breed
            })
            return newState
        default:
            return state
    }

}

export default breedsReducer
