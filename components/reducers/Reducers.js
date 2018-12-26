export const libraryReducers = () => [
    {
        id: 1,
        library: 'RecyclerListView',
        description: 'Recycler list view library help you populate large data in list with ease and cant hit your performance at all'
    },
    {
        id: 2,
        library: 'React-Redux',
        description: 'React Redux is one of the simplest library to hold apps state in react native, not just for react.js only, it can be used by many of different js framework.'
    },
    {
        id: 3,
        library: 'Redux',
        description: 'Same with React Redux, the main job for redux is to produce data and keep your state save during your application life cycle'
    }
]

export const venues = (state = [], action) => {
    switch(action.type){
        case 'add_new_venue':
        return [...state, action.payload]

        case 'remove_all_venue':
        return []

        default:
        return state
    }
}

export const events = (state = [], action) => {
    switch(action.type){
        case 'add_new_event':
        return [...state, action.payload]

        case 'remove_all_event':
        return []

        default:
        return state
    }
}

export const selectedReducers = (state = [], action) => {
    switch (action.type) {
        case 'select_library':            
            if (state.includes(action.payload)) {
                state.splice(state.indexOf(action.payload), 1)
                return state
            } else{
                return [...state, action.payload]
            }            
    
        default:
            return state
    }
}