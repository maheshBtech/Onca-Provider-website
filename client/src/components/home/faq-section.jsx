import React from 'react';

// import Custom Components
import Accordion from '../features/accordion/accordion';
import Card from '../features/accordion/card';

export default function FAQ() {
    return (
        <div className="container align-items-center">
            <div className="heading">
                <h2 className="title text-center">FREQUENTLY ASKED QUESTIONS</h2>
                    <div className="newsletter pt-2 pb-2">
                        <form action="#">
                            <div className="input-group">
                                <input type="email" className="news" placeholder="Ask a question" aria-label="Email Adress" required />

                                <div className="input-group-append">
                                    <button className="btn btn-subscribe" type="submit"><i className="icon-search"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                
                <div className="row">
                    <div className="col-md-6">
                        <Accordion adClass="accordion-rounded">
                            <Card title="Cras ornare tristique elit." expanded="true" adClass="card-box card-sm bg-light">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                        </Card>
                            <Card title="Vivamus vestibulum ntulla" adClass="card-box card-sm bg-light">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                        </Card>
                            <Card title="Praesent placerat risus" adClass="card-box card-sm bg-light">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                        </Card>
                        </Accordion>
                    </div>

                    <div className="col-md-6">
                        <Accordion adClass="accordion-rounded accordion-plus">
                            <Card title="Cras ornare tristique elit." expanded="true" adClass="card-box card-sm bg-white">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                        </Card>
                            <Card title="Vivamus vestibulum ntulla" adClass="card-box card-sm bg-white">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                        </Card>
                            <Card title="Praesent placerat risus" adClass="card-box card-sm bg-white">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                        </Card>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    )
}