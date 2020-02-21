const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Not Authorized.');
  res.redirect('/');
};

helpers.isAdmin=(req,res,next)=>{
  if(req.user.categoria){
    return next();
  }
  res.redirect('/inicio');
}


module.exports = helpers;
