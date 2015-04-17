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

1. build once deploy everywhere
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


