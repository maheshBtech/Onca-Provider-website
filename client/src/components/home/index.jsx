import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

// import Custom Components
import OwlCarousel from '../features/owl-carousel';
import NewsletterModal from '../features/modal/newsletter-modal';
import ServiceBox from '../features/service';
import QuickView from '../features/product/common/quickview-two';
import VideoBannerFour from '../features/video-banner/video-banner-four';

// import Home Components
import IntroSlide from './intro-slide';
import Banner from './banner';
import HomeActivities from './home-activities';
import HomeProviders from './home-providers';
import SpecialCollection from './special-collection';
import CatBanner from './cat-banner';
import NewCollection from './new-collection';
import CTA from './cta-section';
import FAQ from './faq-section';
import Instagram from './instagram';

// import Slider Settings
import { introSlider } from '../settings';

// import Data & Style
import _data from '../../mock_data/data';
import style from './style.scss';

import { showModal } from '../../actions';

export default function HomePage (props) {
    const { showModal } = props;
    useEffect( () => {
        document.getElementById( "menu-home" ).classList.add( "active" );

        style.use();

        return ( () => {
            document.getElementById( "menu-home" ).classList.remove( "active" );
            style.unuse();
        } )
    }, [] )

    return (
        <>
            <Helmet>
                <title>Jayanagar Jaguars</title>
            </Helmet>
            <div className="main">
                <div className="intro-slider-container">
                    <OwlCarousel adClass="intro-slider owl-theme owl-light owl-nav-inside" carouselOptions={ introSlider }>
                        {
                            _data.introBanners.map( ( item, index ) =>
                                <IntroSlide data={ item } key={ index } />
                            )
                        }
                    </OwlCarousel>

                    <span className="slider-loader"></span>
                </div>

                {/* <div className="container banner-container">
                    {
                        _data.banner.slice( 0, 3 ).map( ( item, index ) =>
                            <div className="col-12 col-sm-10 col-md-8 col-lg-4 col-pd1" key={ `banner_group ${index}` }>
                                <Banner data={ item } />
                            </div>
                        )
                    }
                </div> */}
                {/* Activities Filter and Tiles */}
                <div className="activity-section">
                    <div className="heading">
                        <h2 className="title text-center">ACTIVITIES</h2>
                    </div>
                    <div className="container">
                        <HomeActivities />
                    </div>
                </div>

                {/* Provider Filter and Tiles */}
                <div className="provider-section">
                    <div className="heading">
                        <h2 className="title text-center">Providers</h2>
                    </div>
                    <div className="container">
                        <HomeProviders />
                    </div>
                </div>

                {/* Video */}
                    <VideoBannerFour
                        title="Deal Banner"
                        subTitle="New Video"
                        content="Lorem ipsum dolor sit amet, consecte adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis."
                        image={ `assets/images/video/img2.png` }
                        showModal={ showModal }
                    />

                <SpecialCollection />

                <div className="container category-banner">
                    <div className="row">
                        {
                            _data.banner.slice( 3, 7 ).map( ( item, index ) => {
                                return (
                                    <div className="col-lg-3 col-md-6 col-sm-6" key={ `cat_banner_${index}` }>
                                        <CatBanner data={ item } />
                                    </div>
                                )
                            } )
                        }
                    </div>
                </div>
                <div className="provider-section">
                    <FAQ />
                </div>

                <NewCollection />

                <div className="container newsletter">
                    <CTA />
                </div>

                <ServiceBox
                    iconAdClass="text-dark"
                    adClass=""
                />

                <Instagram />
            </div>

            <NewsletterModal />

            <QuickView />
        </>
    );
}