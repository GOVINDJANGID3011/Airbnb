module.exports=function wrapAsync(fn){
                    return (req,res,next)=>{
                        fn(req,res,next).catch((err)=>next(err));
                    }
                }




// //by chatgpt
// module.exports = function wrapAsync(fn) {
//     return (req, res, next) => {
//         // Ensure that `fn` is a valid function and handle async correctly
//         Promise.resolve(fn(req, res, next))
//             .catch(next);  // Pass any errors to the error handler
//     };
// };
