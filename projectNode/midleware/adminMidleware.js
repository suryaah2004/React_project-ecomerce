export function adminMidleware(req,res,next){
if(req.session.User.role ==='admin'){
     next()
}
else{
return res.status(403).json("only for admin")
}
}