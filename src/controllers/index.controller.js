const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
  res.render('index');
};


indexCtrl.renderInicio=(req,res)=>{
  res.render("general/inicio",{user:req.user});
};

module.exports = indexCtrl;
