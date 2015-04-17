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
  Text,
  View,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(150, 150, 150, 0.8)',
  },

  input: {
    width: 200,
    height: 50,
    top: 100,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
  },

  label: {
    width: 200,
    top: 80,
    height: 20,
    alignSelf: 'center',
    fontSize: 20,
  },
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
  getInitialState: function() {
    return {
      label: "label"
    };
  },

  callback: function(text) {
    this.setState({label: text});
  },

  render: function() {

    return (
        <Component>
          <Text style={styles.label}>{this.state.label}</Text>
          <TextInput
            style={styles.input}
            onEndEditing={(event) => this.callback(event.nativeEvent.text)} 
            placeholder="Text Input"
          />
        </Component>
    );
  },
});

AppRegistry.registerComponent('Example', () => App);
