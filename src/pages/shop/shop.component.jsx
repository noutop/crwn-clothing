import React from 'react'
import { Route } from 'react-router-dom'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'
import withSpinner from '../../components/with-spinner/with-spinner.component'
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import {connect} from 'react-redux'
import { updateCollections } from '../../redux/shop/shop.actions'

const CollectionOverviewWithSpinner = withSpinner(CollectionsOverview)
const CollectionPageWithSpinner = withSpinner(CollectionPage)

class ShopPage extends React.Component {

  state = {
    loading: true
  }

  unsubscribeFromSnapshot = null

  componentDidMount() {
    const {updateCollections} = this.props
    const collectionsRef = collection(firestore, 'collections')

    // THIS ALSO WORKS BUT IS 7 LEVELS NESTED -> CHANGING collectionsMap
    // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-95914/databases/(default)/documents/collections')
    //   .then(response => response.json())
    //   .then(collections => console.log(collections))

    getDocs(collectionsRef)
      .then(snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
        updateCollections(collectionsMap)
        this.setState({loading: false})
      })

    // this.unsubscribeFromSnapshot = onSnapshot(collectionsRef, async (snapshot) => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
    //   updateCollections(collectionsMap)
    //   this.setState({loading: false})
    // })
  }

  render(){
    const {match} = this.props
    const {loading} = this.state
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} 
          render={(props) => 
            <CollectionOverviewWithSpinner isLoading={loading} {...props} 
          />} 
        />
        <Route 
          path={`${match.path}/:collectionId`} 
          render={(props) => 
            <CollectionPageWithSpinner isLoading={loading} {...props} 
          />}
        />
      </div>
    )
  } 
}  

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage)