const isAdmin = (req, res, next) => {
    try {
        const user = req.user
        if(!user) return res.status(404).json({message:"User Not Found"})
        if(user.role != "admin") return res.status(401).json({message:"UnAuthorized Request"})
        return next()
    } catch (error) {
        return res.status(500).json({message:"server error"})
    }
}

export default isAdmin