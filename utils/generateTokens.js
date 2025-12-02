import { generateAccessToken, generateRefreshToken } from "./generateAccessAndRefreshToken.js"

const generateTokens = async (userdetail) => {
    const accessToken = await generateAccessToken(userdetail);
    const refreshToken = await generateRefreshToken(userdetail.email)
    return {accessToken, refreshToken}
}

export default generateTokens