// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//     try {
//         const authHeader = req.headers.authorization;

//         // Ensure authorization header exists
//         if (!authHeader) {
//             return res.status(401).send({
//                 message: "Authorization header missing",
//                 success: false,
//             });
//         }

//         // Split the token and verify
//         const token = authHeader.split(" ")[1];
//         if (!token) {
//             return res.status(401).send({
//                 message: "Token missing",
//                 success: false,
//             });
//         }

//         const decoded = jwt.verify(token, process.env.jwt_secret);
//         req.user = {id : decoded.user_id}; // Match the key from the login JWT payload
//         console.log("Decoded JWT:", decoded);
//         next();
//     } catch (error) {
//         res.status(401).send({
//             message: "Invalid token",
//             success: false,
//         });
//     }
// };
// const jwt = require("jsonwebtoken");

// module.exports = function (req,res,next){
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         const decoded = jwt.verify(token, process.env.jwt_secret);
//         req.body.userId = decoded.user_id;
        
//         next();
//       } catch (error) {
//         return res.status(401).send({
//           success: false,
//           message: "Invalid or expired token",
//         });
//       }
//     };
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send({
                success: false,
                message: "Authorization header missing",
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Token missing",
            });
        }

        const decoded = jwt.verify(token, process.env.jwt_secret);
        req.body.userId = decoded.user_id;

        next();
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
