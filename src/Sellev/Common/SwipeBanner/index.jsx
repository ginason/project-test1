import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Slider from 'react-slick';

// Components
import BannerItem from './BannerItem';

// Styles
import styles from './SwipeBanner.css';


/*
* this.props.listItem
*/
class SwipeBanner extends React.Component {
    render() {
        let bannerListBox = this.props.listItem.map((list, key) => {
            return (
                <BannerItem bgImage={list.imgURL} title={list.title} artist={list.artist} key={key} />
            );
        });
        return (
            <Slider>
                {bannerListBox}
            </Slider>
        );
    }
}
export default connect()(withRouter(SwipeBanner));
