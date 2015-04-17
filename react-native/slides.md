title: React Native
output: slides.html
theme: sudodoki/reveal-cleaver-theme

-- 
## React Native

My thoughts, ~15hrs in :)

--

## What _is_ React? 

1. learn once, _kind_of_ write everywhere
2. stateful components vs stateful applications
3. command-r :)

--

## What React _is_ Not 

1. _build once_ deploy everywhere
2. one size fits all - games, video, etc
3. PhoneGap 

--

## _Decoupled_ Components

~~~ javascript
var Component = React.createClass({
  render: function() {
    <View>
      {this.props.children}
    </View>
  },
});
~~~

--

## What Are Components?

1. reusable
2. composable
3. testable

--
## Writing react is  _coupling_ components

~~~ javascript
var Screen = React.createClass({
  
  callback: function(value) {
    // text input value
  },

  render: function() {
    <Component>
      <TextInput
        onEndEditing={this.callback}
      />
    </Component>
  },
});
~~~

--
## Rendering

1. _NOT_ a webview
2. build view in background using *JavascriptCore*
3. apply a diff to the currently visible view eg: **git**

--
## Components are State Views

~~~javascript
<Text>{this.state.textLabel}</Text>
~~~

State dictates when a view is _rerendered_

~~~ javascript
React.CreateClass({
  getInitialState: function() {
    return {
      textLabel: "Text Label",
    };
  },

  changeText: function(text) {
    this.setState({textLabel: text});//forces a re-render
  },

  render: function() {
    return (
      <Text>{this.state.textLabel}</Text>
    );
  },
});
~~~

--
## Getting Started

React comes with an easy way of bootstrapping apps.

~~~ bash 
$ npm install -g react-native-cli
~~~

~~~ bash
$ react-native init Example
~~~

~~~ bash
$ vim Example/index.ios.js
~~~

--
## Swift + Cocoapods + React

Can also bootstrap via Cocoapods

~~~ ruby
target 'Locent' do
  pod 'React', :git => 'https://github.com/facebook/react-native.git', :tag => 'v0.3.11'
  pod 'React/RCTText', :git => 'https://github.com/facebook/react-native.git', :tag => 'v0.3.11'
end
~~~

~~~ go
// bootstrap parent view
let reactURL = NSURL(string: "http://localhost:8081/index.ios.bundle")

let rootView = RCTRootView(bundleURL: reactURL, moduleName: "Example",  
  launchOptions: nil)

controller.view.addSubview(rootView)
rootView.frame = UIScreen.mainScreen().bounds
~~~


--
## Resources

https://facebook.github.io/react-native/

https://github.com/enaqx/awesome-react

--
## A Few Closing thoughts

1. react-native is early 
2. a lot of libraries _only_ a few weeks in
3. spend some time getting comfortable with the source code
4. understand state and 2 way data
5. _alot_ of react web is applicable / good starting point

