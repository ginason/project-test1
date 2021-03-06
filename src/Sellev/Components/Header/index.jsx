import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

//Component
import GlobalMenu from './GlobalMenu';
import GlobalUserMenu from './GlobalUserMenu';
import UserBox from '../../Common/UserBox';

// Styles
import styles from '../../Styles/Components/Header.css';

// Actions
import * as ActionAuth from '../../Data/Authentification/actions';

const mql = window.matchMedia('(min-width: 768px)');

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            dropDownOpen: false,
            userMenuOpen: false,
            mediaQuery: !mql.matches,
            userProfile: {
                name: '김제니',
                imgUrl: 'Sellev/assets/img/img_user.png',
                coin: '1,000',
                point: '200',
            },
        };
        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleUserMenu = this.handleUserMenu.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        mql.addListener(this.handleChange);
    }
    handleChange() {
        this.setState({
            mql: mql,
        });
        if (this.state.mql.matches) {
            this.setState({
                mediaQuery: false,
            });
        } else {
            this.setState({
                mediaQuery: true,
            });
        }
    }
    handleDropdown() {
        this.setState({
            dropDownOpen: !this.state.dropDownOpen,
        });
    }
    handleUserMenu() {
        this.setState({
            userMenuOpen: !this.state.userMenuOpen,
        });
    }
    render() {
        return (
            <div>
                <div className={styles.headerContainer}>
                    <div className={styles.headerBox}>
                        <div className={styles.leftBox}>
                            <div className={styles.headerLogo + ' ' + (this.state.mediaQuery ? styles.logoBlack : styles.logoWhite)} />
                            <div className={styles.toggleIcon} onClick={this.handleDropdown}>
                                <div />
                            </div>
                            <ul className={(this.state.dropDownOpen ? styles.toggleMenu : styles.leftList)}>
                                <li><Link to={'/'}>Home</Link></li>
                                <li><Link to={'/hashtag'}>해시태그</Link></li>
                                <li><Link to={'/fundingmarket'}>펀딩&마켓</Link></li>
                                <li><Link to={'/video'}>동영상</Link></li>
                                <li><Link to={'/myhome'}>마이홈</Link></li>
                            </ul>
                        </div>
                        <div className={styles.rightBox}>
                            <ul className={styles.rightList}>
                                <li><div className={(this.state.mediaQuery ? styles.searchBlack : styles.searchWhite)} /></li>
                                <li><div className={(this.state.mediaQuery ? styles.notifyBlack : styles.notifyWhite)} /></li>
                                <li onClick={this.handleUserMenu}><UserBox imgUrl={this.state.userProfile.imgUrl} /></li>
                            </ul>
                            {/*<div className={styles.iconBox}>*/}
                            {/*<div onClick={this.handleUserMenu}><UserBox imgUrl={this.state.userProfile.imgUrl} /></div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
                { this.state.dropDownOpen ? <GlobalMenu /> : null }
                {
                    this.state.userMenuOpen ?
                        <GlobalUserMenu
                            imgUrl={this.state.userProfile.imgUrl}
                            name={this.state.userProfile.name}
                            coin={this.state.userProfile.coin}
                            point={this.state.userProfile.point}
                        />
                        : null
                }
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(Header));

