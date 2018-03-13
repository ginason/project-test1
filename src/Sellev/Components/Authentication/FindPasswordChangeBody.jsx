import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components

// Styles
import styles from '../../Styles/App.css';
import stylesAuth from '../../Styles/Components/Authentication.css';

// Actions
import * as ActionAuth from '../../Data/Authentification/actions';


class LoginView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            passwordRe: '',

            warnPasswordNotValid: false,
            warnPasswordRetype: false,
        }

        this.changePassword = this.changePassword.bind(this);
    }
    changePassword() {
        this.setState({
            warnPasswordNotValid: false,
            warnPasswordRetype: false, // 6자리 인증번호가 틀립니다
        });
        // 비밀번호 포맷이 맞는가?
        if (this.state.password == null || this.state.password.length < 6 || this.state.password.length > 20) {
            this.setState({ warnPasswordNotValid: true });
        }
        // 비밀번호 재입력했는가?
        if (this.state.passwordRe != this.state.password) {
            this.setState({ warnPasswordRetype: true });
        }
        setTimeout(() => {
            if ( this.state.warnPasswordNotValid
                || this.state.warnPasswordRetype
            ) {
                return;
            }
            alert('비밀번호 변경 성공');
            // // 비밀번호 변경 시작
            // this.props.dispatch(ActionAuth.changePassword({
            //     password: this.state.password,
            // })).then((response) => {
            //     console.log(response);
            // }).catch((err) => {
            //     alert('비밀번호 변경이 실패하였습니다. \n잠시 후, 다시 시도해주세요.');
            // });
        }, 100);
    }
    render() {
        return (
            <div className={stylesAuth.changeBody}>
                <div className={stylesAuth.bodyTitle}>비밀번호 재설정</div>
                <div className={styles.formGroup}>
                    <div className={styles.formRow}>
                        <div className={styles.formInputName}>새 비밀번호</div>
                        <input className={styles.formInputWithVerify} type={'password'} value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} placeholder={'비밀번호는 6~18문자로 구성해주세요.'} />
                    </div>
                    { this.state.warnPasswordNotValid ? <div className={styles.formInputWarn}>비밀번호는 6자 이상, 30자 미만, 영문/숫자 조합입니다.</div> : null }
                    <div className={styles.formRow}>
                        <div className={styles.formInputName}>새 비밀번호확인</div>
                        <input className={styles.formInputWithVerify} type={'password'} value={this.state.passwordRe} onChange={(e) => this.setState({ passwordRe: e.target.value })} placeholder={'새 비밀번호를 다시 입력해주세요.'} />
                    </div>
                    { this.state.warnPasswordRetype ? <div className={styles.formInputWarn}>비밀번호 재입력이 틀렸습니다.</div> : null }
                </div>
                <div>
                    <div className={stylesAuth.authBtn} onClick={this.changePassword}>비밀번호 변경</div>
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(LoginView));
