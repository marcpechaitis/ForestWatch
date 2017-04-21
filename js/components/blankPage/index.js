import React, { Component } from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body
} from 'native-base';

import { openDrawer } from '../../actions/drawer';
import commonStyles from '../../common/commonStyles';
import styles from './styles';

const pageTitle = 'Blank Page';
class BlankPage extends Component {
  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string)
    //  openDrawer: React.PropTypes.func
  };
  render() {
    const { props: { name, index, list } } = this;
    const platform = Platform.OS;

    return (
      <Container style={styles.container}>
        <Header style={commonStyles.header}>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon style={commonStyles.headerText} name="ios-arrow-back" />
              {platform === 'ios'
                ? null
                : <Title style={commonStyles.headerTextAndroid}>
                    {name ? this.props.name : pageTitle}
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

        <Content padder>
          <Text>
            {!isNaN(index) ? list[index] : 'Create Something Awesome . . .'}
          </Text>
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

export default connect(mapStateToProps, bindAction)(BlankPage);
