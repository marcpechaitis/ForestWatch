import React, { Component } from 'react';
import { Alert, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import {
  Container,
  Header,
  Subtitle,
  Title,
  Card,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';

import { openDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import commonStyles from '../../common/commonStyles';
import params from '../../common/params';
import styles from './styles';

class Home extends Component {
  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func
  };
  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  render() {
    const platform = Platform.OS;
    return (
      <Container style={commonStyles.container}>
        <Header iconRight style={commonStyles.header}>
          {/*
          <Left>
            <Button
              transparent
              onPress={() => Actions.login({ type: ActionConst.RESET })}
            >
              <Icon name="ios-power" />
            </Button>
          </Left>

          <Left style={{ backgroundColor: 'red' }} />   */}
          {platform === 'ios' ? <Left /> : null}
          <Body>
            <Title style={commonStyles.headerText} allowFontScaling={false}>
              {this.props.name ? this.props.name : params.APP_TITLE}
            </Title>
            <Subtitle style={commonStyles.headerText} allowFontScaling={false}>
              {params.APP_SUBTITLE}
            </Subtitle>
          </Body>

          <Right>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon style={commonStyles.headerText} name="md-more" />
            </Button>
          </Right>
        </Header>

        <Content style={commonStyles.content}>
          <Card style={commonStyles.card}>
            <Grid style={styles.grid}>
              {this.props.list.map((item, i) => (
                <Row key={i}>
                  <TouchableOpacity
                    style={styles.row}
                    onPress={() => this.newPage(i)}
                  >
                    <Text style={styles.text}>{item}</Text>
                  </TouchableOpacity>
                </Row>
              ))}
            </Grid>
            <Button
              style={commonStyles.button}
              onPress={() => Alert.alert('Bingo', '')}
            >
              <Text style={commonStyles.buttonText} allowFontScaling={false}>
                Report New Incident
              </Text>
            </Button>
          </Card>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer())
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list
});

export default connect(mapStateToProps, bindAction)(Home);
