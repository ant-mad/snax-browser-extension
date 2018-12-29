import PropTypes from "prop-types";
import React, { Component } from "react";

import { NotificationActions } from "src/store/notifications/NotificationActions";
import { ReduxContainer } from "src/utils/redux/ReduxContainer";
import { TransactionSelectors } from "src/store/transaction/TransactionSelectors";
import { WalletActions } from "src/store/wallet/WalletActions";
import { WalletSelectors } from "src/store/wallet/WalletSelectors";

import {
  ButtonLink,
  Button,
  ButtonRow,
  Content,
  Row,
  Screen,
  ScreenTitle,
  TextFieldLabel,
  TextFieldMultiline,
  TextFieldWrapper,
  Anchor,
  SecondaryInfoBox
} from "../components";
import { ClipboardCopier } from "../services/misc/ClipboardCopier";

@ReduxContainer(
  [WalletSelectors, TransactionSelectors],
  [WalletActions, NotificationActions]
)
class ImportRoute extends Component {
  static propTypes = {
    spawnErrorNotification: PropTypes.func.isRequired,
    tryCreateWalletByMnemonic: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  @Inject(ClipboardCopier) clipboardCopier;

  state = {
    mnemonic: ""
  };

  render() {
    return (
      <Screen>
        <ScreenTitle>Import wallet</ScreenTitle>
        <Content spread centerY>
          <Row>
            <TextFieldWrapper>
              <TextFieldLabel>Secret phrase</TextFieldLabel>
              <TextFieldMultiline
                type="text"
                placeholder="Enter your 12 word secret phrase to unlock wallet"
                onChange={this.handleMnemonicChange}
                rows={3}
              />
            </TextFieldWrapper>
          </Row>
        </Content>
        <ButtonRow>
          <Button
            onClick={this.handleContinueClick}
            disabled={!this.isMnemonicValid()}
            spread
          >
            Continue
          </Button>
          <SecondaryInfoBox>
            <Anchor colorScheme="flat" spread to="/">
              Back
            </Anchor>
          </SecondaryInfoBox>
        </ButtonRow>
      </Screen>
    );
  }

  handleMnemonicChange = e => {
    this.setState({
      mnemonic: e.target.value
    });
  };

  handleContinueClick = async e => {
    e.preventDefault();

    if (this.isMnemonicValid()) {
      const result = await this.props.tryCreateWalletByMnemonic(
        this.state.mnemonic
      );
      if (result.isCreationSucceed) {
        this.props.setConfirmed();
        this.clipboardCopier.clear();
        const redirectUrl = this.props.isCurrentTransactionActive
          ? "/transaction-sign-request"
          : "/wallet";
        this.props.history.push(redirectUrl);
      } else {
        this.props.spawnErrorNotification("Recovering failed");
      }
    }
  };

  isMnemonicValid() {
    return (
      this.state.mnemonic &&
      this.state.mnemonic
        .split(" ")
        .reduce(
          (count, word) =>
            /^[a-zA-Z0-9]+$/.test(word) ? count + 1 : -Infinity,
          0
        ) === 12
    );
  }
}

export default ImportRoute;
