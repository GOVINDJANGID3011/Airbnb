module.exports=function wrapAsync(fn){
                    return (req,res,next)=>{
                        fn(req,res,next).catch((err)=>next(err));
                    }
                }
// This function takes an async function as an argument and returns a new function that wraps the original function in a try-catch block.
// If the original function throws an error, the error is caught and passed to the next middleware function.
// This is useful for handling errors in async functions in Express.js applications.
// The wrapAsync function is a higher-order function that takes an async function as an argument and returns a new function.
// The new function takes three arguments: req, res, and next.
// It calls the original async function with these arguments and catches any errors that are thrown.
// If an error is caught, it is passed to the next middleware function using the next function.
// This allows you to handle errors in a consistent way across your application.
// The wrapAsync function is typically used in Express.js applications to handle errors in async middleware functions.
// It is a common pattern to use this function to wrap async functions in order to avoid having to write try-catch blocks in every async function.
// This function is useful for handling errors in async functions in Express.js applications.
// It is a common pattern to use this function to wrap async functions in order to avoid having to write try-catch blocks in every async function.
// It is a higher-order function that takes an async function as an argument and returns a new function that wraps the original function in a try-catch block.
// This allows you to handle errors in a consistent way across your application.
// The wrapAsync function is typically used in Express.js applications to handle errors in async middleware functions.
// It is a common pattern to use this function to wrap async functions in order to avoid having to write try-catch blocks in every async function.