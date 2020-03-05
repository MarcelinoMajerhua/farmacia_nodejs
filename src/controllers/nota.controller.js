const notaCtrl = {};
const Nota = require('../models/Nota')
notaCtrl.addNote = async(req, res) => {
  const {titulo,contenido} = req.body;
  const redactor = req.user.nombre;
  const newNota = new Nota({titulo,contenido,redactor});
  await newNota.save();
  res.redirect("/inicio");

};

notaCtrl.deleteNote=async(req,res)=>{
  const id = req.params.id;
  await Nota.deleteOne({_id:id});
  res.redirect("/inicio");
}
module.exports = notaCtrl;
