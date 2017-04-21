import React, { Component } from 'react';
import { Alert, Animated, Keyboard, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import {
  //  Container,
  // Content,
  Button,
  Item,
  Input,
  // Button,
  Icon,
  // View,
  Text
} from 'native-base';
import { Actions } from 'react-native-router-flux';

import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from './styles';
import commonStyles from '../../common/commonStyles';
import logo from '../../../images/logo.png';
import { setUser } from '../../actions/user';

// const background = require('../../../images/shadow.png');

class Login extends Component {
  static propTypes = {
    setUser: React.PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: ''
    };
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  setUser(name) {
    this.props.setUser(name);
  }

  keyboardWillShow = event => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT_SMALL
    }).start();
  };

  keyboardWillHide = event => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT
    }).start();
  };

  render() {
    const isValid = null;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Animated.Image
          source={logo}
          style={[styles.logo, { height: this.imageHeight }]}
        />
        <Item success={isValid ? true : null} error={isValid ? null : true}>
          {/*  <Item success> */}
          <Icon name="person" />
          <Input
            ref={c => {
              this.usernameInput = c;
            }}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Username or Email"
            onChangeText={name => this.setState({ name })}
            onSubmitEditing={() => this.passwordInput._root.focus()}
            returnKeyType="next"
            keyboardType="email-address"
          />
          <Icon name="checkmark-circle" />
        </Item>
        <Item style={{ marginBottom: 24 }}>
          <Icon name="unlock" />
          <Input
            ref={c => {
              this.passwordInput = c;
            }}
            placeholder="Password"
            secureTextEntry
            onChangeText={password => this.setState({ password })}
            returnKeyType="go"
          />
        </Item>

        <Button
          style={commonStyles.button}
          onPress={() => Alert.alert('Bingo', '')}
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
