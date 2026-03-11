export const initialStore = () => {
    const savedFavorites = localStorage.getItem("favorites");
    return {
        people: [],
        vehicles: [],
        planets: [],
        favorites: savedFavorites ? JSON.parse(savedFavorites) : [],
    }
}

export default function storeReducer(store, action = {}) {
    switch (action.type) {

        case 'set_people':
            return { ...store, people: action.payload }

        case 'set_vehicles':
            return { ...store, vehicles: action.payload }

        case 'set_planets':
            return { ...store, planets: action.payload }

        case 'add_favorite': {
            const alreadyIn = store.favorites.some(
                (fav) => fav.uid === action.payload.uid && fav.type === action.payload.type
            )
            if (alreadyIn) return store
            const newFavorites = [...store.favorites, action.payload]
            localStorage.setItem("favorites", JSON.stringify(newFavorites))
            return { ...store, favorites: newFavorites }
        }

        case 'remove_favorite': {
            const newFavorites = store.favorites.filter(
                (fav) => !(fav.uid === action.payload.uid && fav.type === action.payload.type)
            )
            localStorage.setItem("favorites", JSON.stringify(newFavorites))
            return { ...store, favorites: newFavorites }
        }

        default:
            throw Error('Unknown action: ' + action.type)
    }
}
