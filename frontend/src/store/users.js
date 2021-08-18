const LOAD_USERS = 'users/LOAD_USERS'

const loadUsers = (users) => ({
    type: LOAD_USERS,
    users
})

export const getUsers = () => async (dispatch) => {
    const res = await fetch('/api/users');

    if (res.ok) {
        const users = await res.json();
        dispatch(loadUsers(users))
    }
}

const initialState = {}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USERS:
            const newState = {}
            action.users.forEach(user => {
                newState[user.id] = user
            })
            return newState
        default:
            return state
    }

}

export default usersReducer
