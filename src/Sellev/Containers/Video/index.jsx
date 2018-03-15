import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components

import VideoHome from "../../Components/Video";
import VideoDetail from "../../Components/Video/Detail";

// Styles
import stylesVideo from '../../Styles/Containers/Video.css';

// Actions


class VideoView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={stylesVideo.videoContainer}>
                <Route path={'/video'} exact={true} strict={false} component={VideoHome} />
                <Route path={'/video/detail'} exact={true} strict={false} component={VideoDetail} />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(VideoView));