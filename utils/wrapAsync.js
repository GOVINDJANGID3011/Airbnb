module.exports=function wrapAsync(fn){
                    return (req,res,next)=>{
                        fn(req,res,next).catch((err)=>next(err));
                    }
                }

// basically what this code does:- if we use this wrapAsync function to wrap an controller function than we don't need to use try catch block in that controller function and if error occurs in that function it will be caught here and passed to next middleware function.which is error handling middleware in our case.and it will show error page with error message.
// but in some controllers we still need to use try catch block because in those controllers we have some code which we want to execute only if there is no error in the try block.and if there is error we want to show flash message and redirect to some other page or that same page means we don't want to go that error page because that is not good user experience.so in those cases we still need to use try catch block in those controllers.



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