/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  TextInput,
  View,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },

  input: {
    width: 200,
    height: 50,
    top: 100,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
  }

});

var Component = React.createClass({
  render: function() {
    return (
        <View
          style={styles.container} 
        > 
        {this.props.children}
        </View>
    );
  },
});

var App = React.createClass({
  callback: function(text) {
    console.log(text);
  },

  render: function() {
    return (
        <Component>
          <TextInput
            style={styles.input}
            callback={this.callback}
            onEndEditing={(event) => this.props.callback(event.nativeEvent.text)} 
            placeholder="Text Input"
          />
        </Component>
    );
  },
});

AppRegistry.registerComponent('Example', () => App);
