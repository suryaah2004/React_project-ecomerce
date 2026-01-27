import Schemaa from '../model/schemaModel.js'

export const getUsers = async (req, res) => {
  try {
    const Users = await Schemaa.find({});
    return res.status(200).json({
      success: true,
      message: "All users",
      Users,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

//update userStatus

export const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Schemaa.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.isActive = !user.isActive;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `User ${user.isActive ? "Enabled" : "Disabled"} successfully`,
      isActive: user.isActive,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};



//getSingle user

export const getSingleUser=async(req,res)=>{
    try{
        const userId=req.session.user?.id;
        if(!userId){
    return res.status(401).json({message:"please login"})
        }
        const user=await Schemaa.findById(userId).select('password')
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        res.status(200).json({user})
}
catch(error){
    console.error('getSingleUser error',error)
    res.status(500).json({message:"server error",error:error.message})
}
}
