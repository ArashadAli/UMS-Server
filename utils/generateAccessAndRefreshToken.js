import jwt from 'jsonwebtoken'

const generateAccessToken = (userdatail) => {
    return jwt.sign(
        {
            user_id:userdatail._id,
            email:userdatail.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

const generateRefreshToken = (email) => {
    return jwt.sign(
        {
            email
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export {generateAccessToken,generateRefreshToken}