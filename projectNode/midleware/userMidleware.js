export function userMiddleware(req,res,next){
  if(req.session.User){
     next()
  }else{
    return res.json('please login/register')
  }
}