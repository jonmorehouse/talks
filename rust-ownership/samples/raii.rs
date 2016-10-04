fn main() {
    let var: Box<i32> = Box::new(5i32);
    {
        // take ownership of memory
        let scoped_var = var;
    }

    // var and its data no longer exists
    println!("{}", var);
}
