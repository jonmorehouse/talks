ownership.rs:4:9: 4:10 error: use of moved value: `a` [E0382]
ownership.rs:4     let c = a;
                                                                                          ^
ownership.rs:4:9: 4:10 help: run `rustc --explain E0382` to see a detailed explanation
ownership.rs:3:9: 3:10 note: `a` moved here because it has type `Box<i32>`, which is moved by default
ownership.rs:3     let b = a;
                                                                                          ^
ownership.rs:3:9: 3:10 help: if you would like to borrow the value instead, use a `ref` binding as shown:
ownership.rs:      let ref b = a;
error: aborting due to previous error
