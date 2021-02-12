import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { findIndex, safeContent } from '../../../utils';

function ActivitiesList(props) {
    const { product, isWishlist, onAddToCart, onToggleWishlist, type = 1 } = props;

    function addToCartHandler() {
        if (0 !== product.stock)
            onAddToCart(product, 1);
    }

    function wishlistHandler() {
        if (isWishlist) {
            window.location = '/shop/wishlist';
        } else {
            onToggleWishlist(product, isWishlist);
        }
    }

    return (
        product ?
            <div className={`product demo21 ${0 === product.stock ? 'product-disabled' : ''}`}>
                <figure className="">
                    {product.new ? <span className="product-label label-new">New</span> : ''}
                    {product.top ? <span className="product-label label-top">Top</span> : ''}
                    {product.discount ? <span className="product-label label-sale">Sale</span> : ''}
                    {product.stock === 0 ? <span className="product-label label-out">Out Of Stock</span> : ''}

                    <Link to={`${process.env.PUBLIC_URL}/product/default/${product.id}`}>
                        <LazyLoadImage
                            alt="product"
                            src={`${process.env.PUBLIC_URL}/${product.pictures[0]}`}
                            threshold={100}
                        />

                        {product.pictures[1] ?
                            <LazyLoadImage
                                alt="product"
                                src={`${process.env.PUBLIC_URL}/${product.pictures[1]}`}
                                threshold={100}
                                wrapperClassName="product-image-hover product-image"
                            />
                            : ''
                        }
                    </Link>
                </figure>

                <div className="product-body">
                    <h3 className="product-title">
                        <Link to={`${process.env.PUBLIC_URL}/product/default/7`} >{product.name}</Link>
                    </h3>
                    <div className="product-content ellipsis-text-3">
                        <p>
                            {product.shortDesc}
                        </p>
                    </div>
                    <div className="ratings-container">
                        <button className="btn-product">
                            <span>Register</span>
                        </button>
                    </div>
                    <div className="ratings-container">
                        <div className="row">
                            <div className="col-6">
                                <p>
                                    {product.fromDate} - {product.endDate}
                                </p>
                                
                            </div>
                            <div className="col-6">
                                <p>
                                    {product.startTime} - {product.endTime}
                                </p>
                                {/* <div className="ratings">
                                    <div className="ratings-val" style={{ width: product.ratings * 20 + '%' }}></div>
                                </div>
                                <span className="ratings-text">( {product.reviews} Reviews )</span> */}
                            </div>
                            <div className="col-6">
                                {/* {
                                    0 < product.discount ?
                                        <div className="product-price">
                                            <span className="new-price">${product.salePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                            <span className="old-price">${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                        </div> :

                                        <div className="product-price">${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                } */}
                                <p>
                                    &#8377;{product.price} - &#8377;{product.salePrice} (incl. GST)
                                </p>
                            </div>
                            <div className="col-6 text-right">
                                <Link to={`${process.env.PUBLIC_URL}/product/default/${product.id}`}>
                                    Veiw More..
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="product-action">
                        {
                            type === 1 ?
                                <button className={`btn-addtolist ${isWishlist ? 'wishlisted' : ''}`} onClick={wishlistHandler}>
                                    <span dangerouslySetInnerHTML={safeContent(isWishlist ? "&nbsp;go to wishlist" : "&nbsp;add to wishlist")}></span>
                                </button>
                                : ""
                        }
                    </div>
                    {
                        type === 2 ?
                            <button className={`btn-addtolist ${isWishlist ? 'wishlisted' : ''}`} onClick={wishlistHandler}>
                                <span dangerouslySetInnerHTML={safeContent(isWishlist ? "&nbsp;go to wishlist" : "&nbsp;add to wishlist")}></span>
                            </button>
                            : ""
                    }
                </div>
            </div>
            : ''
    );
}

function mapStateToProps(state, ownprops) {
    return {
        isWishlist: (findIndex(state.wishlist.list, item => item.id === ownprops.product.id) !== -1) ? true : false
    };
}

export default connect(mapStateToProps)(ActivitiesList);