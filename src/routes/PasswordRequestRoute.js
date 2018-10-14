import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {NotificationActions} from 'src/store/notifications/NotificationActions';
import {WalletActions} from 'src/store/wallet/WalletActions';
import {ReduxContainer} from 'src/utils/redux/ReduxContainer';

import {
  ButtonLink,
  ButtonRow,
  Content,
  Row,
  Screen,
  ScreenTitle,
  TextFieldWrapper, PasswordField,
} from '../components';

@ReduxContainer(null, [WalletActions, NotificationActions])
class PasswordRequestRoute extends Component {
  
  static propTypes = {
    spawnErrorNotification: PropTypes.func.isRequired,
    tryExtractWalletFromStorage: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };
  
  state = {
    isPasswordVisible: false,
    password: '',
  };
  
  render() {
    return (
      <Screen>
        <ScreenTitle>Open wallet</ScreenTitle>
        <Content spread centerY>
          <Row>
            <TextFieldWrapper>
              <PasswordField onChange={this.handlePasswordChange}/>
            </TextFieldWrapper>
          </Row>
        </Content>
        <ButtonRow>
          <ButtonLink onClick={this.handleOpenWalletClick} disabled={!this.isPasswordValid()} spread to="/wallet">
            Open wallet
          </ButtonLink>

          <ButtonLink colorScheme="flat" spread to="/">
            Cancel
          </ButtonLink>
        </ButtonRow>
      </Screen>
    );
  }
  
  handlePasswordButtonClick = () => {
    this.setState({
      isPasswordVisible: !this.state.isPasswordVisible,
    });
  };
  
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  
  handleOpenWalletClick = async (e) => {
    e.preventDefault();
    
    if (this.isPasswordValid()) {
        const result = await this.props.tryExtractWalletFromStorage(this.state.password);
        
        if (!result.isExtractionSucceed) {
          this.props.spawnErrorNotification('Cannot decrypt wallet, please check your password');
        } else {
          this.props.history.push('/wallet');
        }
    }
  };
  
  isPasswordValid() {
    return !!this.state.password;
  }
}

export default PasswordRequestRoute;