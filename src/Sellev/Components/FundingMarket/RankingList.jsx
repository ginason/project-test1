import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';


// Components

// Styles
import stylesHome from '../../Styles/Components/Home.css';

// Actions

/*
* this.props.title
* this.props.listItem
*/

class RankingList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let listItem = this.props.listItem && this.props.listItem.length > 0 ?
            this.props.listItem.map((item, index) => {
                return (
                    <li key={index}>
                        <div>{/*번호*/}{index + 1}</div>
                        <div>{item.title}</div>
                        <div>{item.name}</div>
                    </li>
                );
            }) : null;
        return (
            <div>
                <div>{this.props.title}</div>
                <div style={{width: '352px', height: '172px', backgroundImage: 'url("' + this.props.listItem[0].bgImage + '")'}}></div>
                <ul>
                    {listItem}
                </ul>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(RankingList));
