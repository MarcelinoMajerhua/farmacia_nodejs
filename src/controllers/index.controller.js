const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
  res.render('index');
};

indexCtrl.renderAbout = (req, res) => {
  res.render('about');
};

indexCtrl.renderInicio=(req,res)=>{
  res.render("general/inicio");
};

module.exports = indexCtrl;