import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { selectCollectionIsLoaded } from '../../redux/shop/shop.selectors'
import withSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionPage from "./collection.component"

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectCollectionIsLoaded(state)
})

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  withSpinner
)(CollectionPage)

export default CollectionPageContainer