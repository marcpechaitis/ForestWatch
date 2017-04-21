import React, { Component } from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  Card,
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from 'native-base';

import { openDrawer } from '../../actions/drawer';
import commonStyles from '../../common/commonStyles';
import params from '../../common/params';
// import styles from './styles';
// import theme from '../../themes/base-theme';

const pageTitle = 'About Us';

class About extends Component {
  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func
  };
  render() {
    const platform = Platform.OS;
    return (
      <Container style={commonStyles.container}>
        <Header style={commonStyles.header}>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon style={commonStyles.headerText} name="ios-arrow-back" />
              {platform === 'ios'
                ? null
                : <Title style={commonStyles.headerTextAndroid}>
                    {pageTitle}
                  </Title>}

            </Button>
          </Left>
          {platform === 'ios'
            ? <Body style={commonStyles.headerBody}>
                <Title style={commonStyles.headerText} allowFontScaling={false}>
                  {pageTitle}
                </Title>
              </Body>
            : null}
          {platform === 'ios' ? <Right /> : null}
        </Header>

        <Content style={commonStyles.content}>
          <Card style={commonStyles.card}>
            <Text style={commonStyles.text}>
              {params.ABOUT_US}
            </Text>
          </Card>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer())
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list
});

export default connect(mapStateToProps, bindAction)(About);
