import React from 'react';
import { connect } from 'react-redux';

// import custom component
import OwlCarousel from '../features/owl-carousel';
import ActivitiesList from './activity/activities-list';

// import Services & Settings
import { getTopRatingProducts } from '../../services'
import { addToCart, toggleWishlist, showQuickViewModal } from "../../actions";

// import Slider Settings
import { productSlider } from "../settings";
import { Link } from 'react-router-dom';

function TrendyCollection ( props ) {
    const { addToCart, toggleWishlist, showQuickViewModal } = props;

    let products = props.products;
    products = products.slice( 35, 40 );

    return (
        <div className="row">
            <div className="col-12 mb-3">
                <div className="activity-filter">
                    <ul>
                        <li>
                            <Link to="/#">
                                <i className="act-icon active">
                                    <i className="all"></i>
                                </i>
                                <h4>
                                    All
                                </h4>
                            </Link>
                        </li>
                        <li>
                            <Link to="/#">
                                <i className="act-icon">
                                    <i className="run"></i>
                                </i>
                                <h4>
                                    Run
                                </h4>
                            </Link>
                        </li>
                        <li>
                            <Link to="/#">
                                <i className="act-icon">
                                    <i className="cycle"></i>
                                </i>
                                <h4>
                                    Cycle
                                </h4>
                            </Link>
                        </li>
                        <li>
                            <Link to="/#">
                                <i className="act-icon">
                                    <i className="swim"></i>
                                </i>
                                <h4>
                                    Swim
                                </h4>
                            </Link>
                        </li>
                        <li>
                            <Link to="/#">
                                <i className="act-icon">
                                    <i className="yoga"></i>
                                </i>
                                <h4>
                                    Yoga
                                </h4>
                            </Link>
                        </li>
                        <li>
                            <Link to="/#">
                                <i className="act-icon">
                                    <i className="dance"></i>
                                </i>
                                <h4>
                                    Dance
                                </h4>
                            </Link>
                        </li>
                        <li>
                            <Link to="/#">
                                <i className="act-icon">
                                    <i className="zumba"></i>
                                </i>
                                <h4>
                                    Zumba
                                </h4>
                            </Link>
                        </li>
                        <li>
                            <Link to="/#">
                                <i className="act-icon">
                                    <i className="boxing"></i>
                                </i>
                                <h4>
                                    Boxing
                                </h4>
                            </Link>
                        </li>
                        <li>
                            <Link to="/#">
                                <i className="act-icon">
                                    <i className="gym"></i>
                                </i>
                                <h4>
                                    Gym
                                </h4>
                            </Link>
                        </li>
                        <li>
                            <Link to="/#">
                                <i className="act-icon">
                                    <i className="more"></i>
                                </i>
                                <h4>
                                    More
                                </h4>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <OwlCarousel adClass="owl-simple carousel-equal-height carousel-with-shadow" carouselOptions={ productSlider } >
                { getTopRatingProducts( products ).map( ( product, index ) =>
                    <ActivitiesList
                        key={ `best_${index}` }
                        product={ product }
                        onAddToCart={ addToCart }
                        onToggleWishlist={ toggleWishlist }
                        showQuickView={ showQuickViewModal }
                    />
                ) }
            </OwlCarousel>
        </div>
    )
}

const mapStateToProps = ( state, props ) => {
    return {
        products: state.data.products ? state.data.products : []
    }
}

export default connect( mapStateToProps, { addToCart, toggleWishlist, showQuickViewModal } )( TrendyCollection );