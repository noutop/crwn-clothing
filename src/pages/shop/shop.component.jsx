import React from 'react'
import { Route } from 'react-router-dom'
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'
import withSpinner from '../../components/with-spinner/with-spinner.component'
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions'
import { selectIsCollectionFetching, selectCollectionIsLoaded } from '../../redux/shop/shop.selectors'

const CollectionOverviewWithSpinner = withSpinner(CollectionsOverview)
const CollectionPageWithSpinner = withSpinner(CollectionPage)

class ShopPage extends React.Component {

  componentDidMount() {
    const {fetchCollectionsStartAsync} = this.props

    fetchCollectionsStartAsync()

    // THIS ALSO WORKS BUT IS 7 LEVELS NESTED -> CHANGING collectionsMap
    // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-95914/databases/(default)/documents/collections')
    //   .then(response => response.json())
    //   .then(collections => console.log(collections))

    //MOVED TO REDUX!
    // getDocs(collectionsRef)
    //   .then(snapshot => {
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
    //     updateCollections(collectionsMap)
    //     this.setState({loading: false})
    //   })

    // this.unsubscribeFromSnapshot = onSnapshot(collectionsRef, async (snapshot) => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
    //   updateCollections(collectionsMap)
    //   this.setState({loading: false})
    // })
  }

  render(){
    const {match, isCollectionFetching, isCollectionLoaded} = this.props
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} 
          render={(props) => 
            <CollectionOverviewWithSpinner isLoading={isCollectionFetching} {...props} 
          />} 
        />
        <Route 
          path={`${match.path}/:collectionId`} 
          render={(props) => 
            <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props} 
          />}
        />
      </div>
    )
  } 
} 

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionLoaded: selectCollectionIsLoaded
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)