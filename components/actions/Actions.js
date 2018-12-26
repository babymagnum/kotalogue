//make variabel that return func
export const selectLibrary = (libraryID) => {
    return {
        type: 'select_library',
        payload: libraryID
    }
}

export const addNewLibrary = (newLibrary) => {
    return{
        type: 'add_new_library',
        payload: newLibrary
    }
}

export const addNewEvent = (newEvent) => {
    return{
        type: 'add_new_event',
        payload: newEvent
    }
}

export const addNewVenue = (newVenue) =>{
    return{
        type: 'add_new_venue',
        payload: newVenue
    }
}

export const removeAllVenue = () => {
    return{
        type: 'remove_all_venue',
        payload: ''
    }
}

export const removeAllEvent = () => {
    return{
        type: 'remove_all_event',
        payload: ''
    }
}