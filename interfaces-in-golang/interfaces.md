# 9 Bits About Interfaces in Go

## Everything is an interface{}

```go
package main

type Nothing struct{}

func somethingFromNothing(nothing interface{}) {
  // do something with any type!
}

func main() {
  somethingFromNothing(Nothing{})
  somethingFromNothing(nil)
  somethingFromNothing("")

  var emptyInterface interface{}
  somethingFromNothing(emptyInterface)
}
```

## Interfaces are _kind of_ just type signatures

```go
package main

type Buzz interface {
  getTitle() string
}

type ListicleBuzz struct{}

func (l ListicleBuzz) getTitle() string {
  return "listicle"
}

type ArticleBuzz struct{}

func (a ArticleBuzz) getTitle() string {
  return "article"
}

func main() {}
```

## Interfaces allow for static, yet dynamic types

**Python** lets you do this:
```python
def print_title(buzz):
  print buzz.title()


print_title(None)
```

And in **go**:

```go
package main

type Buzz interface {
  getTitle() string
}

func printBuzz(buzz Buzz) {}

type ImplementsBuzz struct{}

func (b ImplementsBuzz) getTitle() string {
  return "title"
}

func main() {
  printBuzz(ImplementsBuzz{})
  printBuzz("regular string")
}
```

This _doesn't_ work! :fire: :fire: :fire: :fire:
```bash
./main.go:17: cannot use "regular string" (type string) as type Buzz in argument to printBuzz:
        string does not implement Buzz (missing getTitle method)
```

[compile-time duck-typing](http://blog.carbonfive.com/2012/09/23/structural-typing-compile-time-duck-typing/)

## Interfaces and Dependency Injection go hand in hand :two_men_holding_hands:

```go
package main

import (
  "github.com/gocql/gocql"
)

type CassandraSession interface {
  Query(string, ...interface{}) *gocql.Query
}

type App struct {
  db CassandraSession
}

func (a App) doSomething() {
  a.db.Query("table", "query")
}

func main() {
  cluster := gocql.NewCluster("localhost")
  session, _ := cluster.CreateSession()
  defer session.Close()

  app := App{
    db: session,
  }
  app.doSomething()
}
```

## Bring your own dependencies (for testing)

```go
package main

import (
  "github.com/gocql/gocql"
  "testing"
)

type StubDB struct {
  t *testing.T
}

func (db StubDB) Query(table string, args ...interface{}) *gocql.Query {
  db.t.Logf("stubbed query called!")
  return nil
}

func TestAppQueries(t *testing.T) {
  db := StubDB{t}
  app := App{
    db: db,
  }

  app.doSomething()
}
```


## What is an interface? (in 2 words)


```go
package main

import (
  "fmt"
  "reflect"
)

type Interface interface {
  method()
}

type InterfaceImplementer struct{}

func (i InterfaceImplementer) method() { /* nothing */ }

func main() {
  var implementer Interface = InterfaceImplementer{}
  implementer.InterfaceData()
  value := reflect.ValueOf(implementer)
  fmt.Println(value.InterfaceData())
}
```

* http://research.swtch.com/interfaces

## Interfaces are _implicit_ 

"Duck Typing" in Rust with traits:
```rust
struct Circle {
    x: f64,
    y: f64,
}

trait HasArea {
    fn area(&self) -> f64;
}

impl HasArea for Circle {
    fn area(&self) -> f64 {
        // stuff
    }
}
```

"Duck Typing" in Go with interfaces:
```go
package main

import "fmt"

type ImplementsStringer struct{}

func (i ImplementsStringer) String() string {
  return "stringer"
}

func main() {
  fmt.Println(ImplementsStringer{})
}
```

**Go** uses dynamic-dispatch with interfaces where as Rust lets you choose dynamic or static dispatch. [Rust Traits vs Go Interfaces](http://programmers.stackexchange.com/a/247313)

## Interfaces can be embedded

```go
package main

type DB interface {
  Connect()
  Disconnect()
  Query()
}

type App struct {
  db DB
}

func (a App) doSomething() {
  a.db.Query()
}

func main() {}
```


```go
package main

import (
  "testing"
)

type StubDB struct {
  t *testing.T
  DB
}

func (db StubDB) Query() {
  db.t.Log("query method was called as expected")
}

func TestAppQueries(t *testing.T) {
  // we only care about testing the `query` method!!!
  db := StubDB{t: t}
  app := App{db}
  app.doSomething()
}
```

This is useful for testing, but also can cause runtime crashes. This [reddit](https://www.reddit.com/r/golang/comments/2eyppz/why_dont_interfaces_give_compile_time_safety/) is worth the read!

## Type Switches + Interfaces 

```go
package main

import "fmt"

type Interface interface {
  something()
}

type A struct{}

func (a A) something() {}

type B struct{}

func (b B) something() {}

func main() {
  var anything Interface = A{}
  switch anything.(type) {
  case A:
    fmt.Println("type: A")
  case B:
    fmt.Println("type: B")
  case nil:
    fmt.Println("type: nil")
  default:
    fmt.Println("default")
  }
}
```

