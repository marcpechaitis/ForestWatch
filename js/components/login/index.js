import React, { Component } from 'react';
import { Alert, Image, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

import styles, { IMAGE_HEIGHT } from './styles';
import commonStyles from '../../common/commonStyles';
import logo from '../../../images/logo.png';
import { setUser } from '../../actions/user';

class Login extends Component {
  static propTypes = {
    setUser: React.PropTypes.func,
    navigateTo: React.PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      isUsernameValid: false,
      isUsernameError: false,
      isPasswordValid: false,
      isPasswordError: false
    };
  }

  componentWillMount() {}

  componentWillUnmount() {}

  setUser(name) {
    this.props.setUser(name);
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  async pressSignIn() {
    // Alert.alert('Bingo', '');

    await this.checkForValues();
    if (this.state.isUsernameValid && this.state.isPasswordValid) {
      // this.goHome();
      this.setUser(this.state.name);
      Actions.home();
    }
  }
  checkForValues() {
    if (this.state.name) {
      this.setState({ isUsernameValid: true });
      this.setState({ isUsernameError: false });
      if (this.state.password) {
        this.setState({ isPasswordValid: true });
        this.setState({ isPasswordError: false });
      } else {
        this.setState({ isPasswordValid: false });
        this.setState({ isPasswordError: true });
      }
    } else {
      this.setState({ isUsernameValid: false });
      this.setState({ isUsernameError: true });
    }
  }

  goHome() {
    if (this.state.isUsernameValid && this.state.isPasswordValid) {
      // Do the Login
      Actions.home();
    }
  }

  render() {
    // let isUsernameValid = false;
    // let isPasswordValid = false;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image source={logo} style={[styles.logo, { height: IMAGE_HEIGHT }]} />
        <Item
          success={this.state.isUsernameValid ? true : null}
          error={this.state.isUsernameError ? true : null}
        >
          <Icon name="person" />
          <Input
            ref={c => {
              this.usernameInput = c;
            }}
            autoCapitalize="none"
            autoCorrect={false}
            blurOnSubmit={false}
            placeholder={
              this.state.isUsernameError ? 'Username Required' : 'Username'
            }
            onChangeText={name => this.setState({ name })}
            onSubmitEditing={() => this.passwordInput._root.focus()}
            returnKeyType="next"
            //           keyboardType="email-address"
          />
          <Icon name="checkmark-circle" />
        </Item>
        <Item
          success={this.state.isPasswordValid ? true : null}
          error={this.state.isPasswordError ? true : null}
          style={{ marginBottom: 24 }}
        >
          <Icon name="unlock" />
          <Input
            ref={c => {
              this.passwordInput = c;
            }}
            placeholder={
              this.state.isPasswordError ? 'Password Required' : 'Password'
            }
            secureTextEntry
            onChangeText={password => this.setState({ password })}
            returnKeyType="done"
          />
          <Icon name="checkmark-circle" />
        </Item>

        <Button
          style={commonStyles.button}
          onPress={() => {
            this.pressSignIn();
            this.goHome();
          }}
        >
          <Text style={commonStyles.buttonText} allowFontScaling={false}>
            Sign In
          </Text>
        </Button>
      </KeyboardAvoidingView>
    );
  }
}

function bindActions(dispatch) {
  return {
    setUser: name => dispatch(setUser(name))
  };
}

export default connect(null, bindActions)(Login);
