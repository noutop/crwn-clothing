import ShopActionTypes from "./shop.types";
import { collection, getDocs } from 'firebase/firestore'
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'


export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
})

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionsRef = collection(firestore, 'collections')
    dispatch(fetchCollectionsStart())

    getDocs(collectionsRef)
      .then(snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
        dispatch(fetchCollectionsSuccess(collectionsMap))
        this.setState({ loading: false })
      })
      .catch(error => dispatch(fetchCollectionsFailure(error.message)))
  }
}

