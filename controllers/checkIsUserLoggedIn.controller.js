const checkIsUserLoggedIn = (req, res) => {
    try {
        const user = req.user
        if(!user) return res.status(404).json({message:"User Not LoggedIn",isLoggedIn:false})
        return res.status(200).json({message:"user loggedin", isLoggedIn:true})
    } catch (error) {
        console.log("checking loggedinuser error : ",error.message)
        return res.status(500).json({message:"server error"})
    }
}

export default checkIsUserLoggedIn