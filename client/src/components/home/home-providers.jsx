import React from 'react';
import { connect } from 'react-redux';

// import custom component
import OwlCarousel from '../features/owl-carousel';
import ProvidersList from './provider/providers-list';

// import Services & Settings
import { getTopRatingProducts } from '../../services'
import { addToCart, toggleWishlist, showQuickViewModal } from "../../actions";

// import Slider Settings
import { productSlider } from "../settings";
import { Link } from 'react-router-dom';

function TrendyCollection ( props ) {
    const { addToCart, toggleWishlist, showQuickViewModal } = props;

    let products = props.products;
    products = products.slice( 41, 45 );

    return (
            <OwlCarousel adClass="owl-simple carousel-equal-height carousel-with-shadow" carouselOptions={ productSlider } >
                { getTopRatingProducts( products ).map( ( product, index ) =>
                    <ProvidersList
                        key={ `best_${index}` }
                        product={ product }
                        onAddToCart={ addToCart }
                        onToggleWishlist={ toggleWishlist }
                        showQuickView={ showQuickViewModal }
                    />
                ) }
            </OwlCarousel>
    )
}

const mapStateToProps = ( state, props ) => {
    return {
        products: state.data.products ? state.data.products : []
    }
}

export default connect( mapStateToProps, { addToCart, toggleWishlist, showQuickViewModal } )( TrendyCollection );