import commonColors from '../../common/commonColors';

const React = require('react-native');

const { /* StyleSheet, */ Dimensions } = React;

// const deviceHeight = Dimensions.get('window').height;
const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 5;

export default {
  container: {
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
    // backgroundColor: '#FBFAFA'
    backgroundColor: commonColors.BACKGROUND_COLOR_CARD,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    marginBottom: 30
  }
  /*  shadow: {
    flex: 1,
    width: null,
    height: null
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 1.75,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0
  },
  input: {
    marginBottom: 20
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center'
  }
  */
};
