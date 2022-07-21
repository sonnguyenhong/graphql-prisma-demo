const jwt = require('jsonwebtoken');
const APP_SECRET = 'GraphQL-is-aw3some';

// function generateToken(user, secretSignature, tokenLife) {
//     return new Promise((resolve, reject) => {
//         const userData = {
//             id: user.id,
//             name: user.name,
//             email: user.email
//         }

//         jwt.sign(
//             {
//                 data: userData
//             },
//             secretSignature,
//             {
//                 algorithm: "HS256",
//                 expiresIn: tokenLife,
//             },
//             (error, token) => {
//                 if(error) {
//                     return reject(error)
//                 }
//                 resolve(token)
//             }
//         )
//     })
// }

// function verifyToken(token, secretKey) {
//     return new Promise((resolve, reject) => {
//         jwt.verify(token, secretKey, (error, decoded) => {
//             if(error) {
//                 return reject(error)
//             } 
//             resolve(decoded)
//         })
//     })
// }

function getTokenPayload(token) {
    console.log(jwt.verify(token, APP_SECRET))
    return jwt.verify(token, APP_SECRET);
}

function getUserId(req, authToken) {
    if (req) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace('Bearer ', '');
            if (!token) {
                throw new Error('No token found');
            }
            const { userId } = getTokenPayload(token);
            return userId;
        }
    } else if (authToken) {
        const { userId } = getTokenPayload(authToken);
        return userId;
    }

    throw new Error('Not authenticated');
}

module.exports = {
    APP_SECRET,
    getUserId,
    // generateToken,
    // verifyToken
};