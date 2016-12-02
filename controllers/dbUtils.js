// History of patient
var clinicalHistory = require("../models/ClinicalHistory");

// Data about medical center (name, location, ...)
var medicalCenter = require("../models/MedicalCenter");

// User of application
var User = require("../models/User");

// Medic of application
var Medic = require("../models/Medic");

// User of application
var User = require("../models/User");

function addUser(body, res){
    User.findOne({identification: body.identification}, function(err, user){
        var out = {status: "", message: "", existUser: false, data: {}, userRegistered: false};
        if(err){
            out.status = "error";
            out.message = "Error buscando el usuario";
        }else{
            out.status = "success";
            if(user){
                out.message = "Este usuario ya está registrado en la aplicación";
                out.data = user;
                out.existUser = true;
            }else{

                var newUser = new User({
                    identification: body.identification,
                    names: body.username,
                    lastnames: body.lastname,
                    password: body.password,
                    email: body.email,
                    age: body.age,
                    civil_state: body.civil_state,
                    sex: body.sex,
                    occupation: body.occupation,
                    phone: body.phone
                });

                newUser.save(function(err){
                    if(err){
                        out.status = "error";
                        out.message = "Error registrando usuario";
                    }else{
                        out.status = "success";
                        out.message = "Usuario registrado exitosamente";
                        out.userRegistered = true;
                    }
                });
            }
        }
        res.send(out);
    });
}

function addMedic(body, res){
    Medic.findOne({identification: body.identification}, function(err, user){
        var out = {status: "", message: "", existUser: false, data: {}, userRegistered: false};
        if(err){
            out.status = "error";
            out.message = "Error buscando el usuario";
        }else{
            out.status = "success";
            if(user){
                out.message = "Este médico ya está registrado en la aplicación";
                out.data = user;
                out.existUser = true;
            }else{

                var newUser = new Medic({
                    identification: body.identification,
                    names: body.username,
                    lastnames: body.lastname,
                    password: body.password,
                    email: body.email,
                    professionalId: body.professionalId,
                    medicalcenter: body.center,
                    age: body.age,
                    civil_state: body.civil_state,
                    sex: body.sex,
                    occupation: body.occupation,
                    phone: body.phone
                });

                newUser.save(function(err){
                    if(err){
                        out.status = "error";
                        out.message = "Error registrando usuario";
                    }else{
                        out.status = "success";
                        out.message = "Médico registrado exitosamente";
                        out.userRegistered = true;
                    }
                });
            }
        }
        res.send(out);
    });
}

function cleanMedicsData(medics){
    medics.map(function(item){
        item.professionalId = null;
        item.password = null;
    });

    return medics;
}

function saveDataHistory(id, data, res, out){
    data.patient = id;
    data.date = new Date().getTime();
    var newClinicalHistory = new clinicalHistory(data);
    newClinicalHistory.save().then(
        function(his){
            out.status = "success";
            out.message = "Consulta almacenada correctamente";
            res.send(out);
        },
        function(err){
            out.message = "Error guardando la historia";
            res.send(out);
        }
    );
}


// Register User in App
module.exports.registerUser = function(req, res){
    var out = {status: "error", message: "", existUser: false, data: {}, userRegistered: false};
    var body = req.body;
    console.log("DATA REGISTER");
    console.log(body);
    User.findOne({identification: body.identification}, function(err, user){
        console.log("INUSER");
        console.log(user);
        if(user){
            out.message = "El usuario con la identificación " + body.identification + " ya está registrado.";
            out.userRegistered = true;
            res.send(out);
        }else{
            Medic.findOne({identification: body.identification}, function(err, medic){
                console.log("INMEDIC");
                console.log(medic);
                if(medic){
                    out.message = "El usuario con la identificación " + body.identification + " ya está registrado.";
                    out.userRegistered = true;
                    res.send(out);
                }else{
                    if(body.typeUser=="medic"){
                        addMedic(body, res);
                    }else if(body.typeUser=="patient"){
                        addUser(body, res);
                    }
                }
            });
        }
    });
};

module.exports.loginUser = function(req, res){
    var out = {status: "error", message: "", data: {}};
    var body = req.body;
    
    User.findOne(body, function(err, user){
        if(err){
            out.message = "Error buscando en usuarios";
            res.send(out);
        }else{
            if(user){
                out.status = "success";
                user.password = null;
                out.typeUser = "patient";
                out.data = user;
                console.log("user");
                console.log(user);
                res.send(out);
            }else{
                Medic.findOne(body, function(err, medic){
                    if(err){
                        out.message = "Error buscando en médicos";
                    }else{
                        if(medic){
                            out.status = "success";
                            medic.password = null;
                            out.typeUser = "medic";
                            out.data = medic;
                            console.log("medic");
                            console.log(medic);
                        }else{
                            out.message = "No se ha encontrado algún usuario con estas credenciales";
                        }
                    }
                    res.send(out);
                });
            }
        }
    });
};

module.exports.getMedics = function(req, res){
    var out = {status: "error", message: "", data: null};
    medicalCenter.find({}, function(err, centers){
        if(err){
            out.message = "No hay centros médicos registrados.";
        }else{
            out.status = "success";
            out.data = {centers: centers};     
        }
        res.send(out);
    });
};

module.exports.checkUser = function(req, res){
    var out = {status: "error", message: "", data: null, exist: false};

    if(!req.body){
        out.message = "Credenciales inválidas";
        res.send(out);
    }else{
        if(!req.body.identification){
            out.message = "Problemas de identificación";
            res.send(out);
        }else{
            User.findOne({identification: req.body.identification}, function(err, user){
                if(err){
                    out.message = "Problemas buscando el usuario";
                    res.send(out);
                }else{
                    if(user){
                        out.status = "success";
                        user.password = null;
                        user._id = null;

                        out.data = user;
                        out.exist = true;
                        res.send(out);
                    }else{
                        Medic.findOne({identification: req.body.identification}, function(err, medic){
                            if(err){
                                out.message = "Problemas buscando el usuario";
                                res.send(out);
                            }else{
                                if(medic){
                                    out.message = `La identificación ${req.body.identification} pertenece al médico ${medic.names}`;
                                    res.send(out);
                                }else{
                                    out.status = "success";
                                    res.send(out);
                                }
                            }
                        });
                    }
                }
            });
        }
    }
};


module.exports.createNewHistory = function(req, res){
    /*console.log("NEW HISTORY");
    console.log(req.body);
    res.send({msg: "TES NEW HISTORY"});*/

    var out = {status: "error", message: "", data: null};

    if(!req.body){

    }else{
        if(req.body.existPatient){
            User.findOne({identification: req.body.identification}, function(err, user){
                if(err){
                    out.message = "Error verificando la existencia del paciente";
                    res.send(out);
                }else{
                    if(!user){
                        out.message = "Vaya, algo ha fallado";
                        res.send(out);
                    }else{
                        saveDataHistory(user._id, req.body.dataHistory, res, out);
                    }
                }
            });
        }else{
            var newPatient = new User(req.body.newPatient);
            newPatient.save().then(
                function(pat){
                    saveDataHistory(pat._id, req.body.dataHistory, res, out);
                },
                function(err){
                    out.message = "Error guardando el nuevo paciente";
                    res.send(out);
                }
            );
        }
    }
};


module.exports.getHistoryByPatient = function(req, res){
    console.log("History By Patient");
    console.log(req.params);

    var out = {status: "error", message: "", data: null};

    if(!req.params.identification){
        out.message = "Credenciales inválidas";
        res.send(out);
    }else{
        User.findOne({identification: req.params.identification}, function(err, user){
            if(err){
                out.message = "Error buscando el paciente";
                res.send(out);
            }else{
                if(!user){
                    out.message = "Usuario no encontrado. Imposible obtener historias";
                    res.send(out);
                }else{
                    clinicalHistory.find({patient: user._id}).populate("patient medic medicalcenter").exec(function(err, hs){
                        if(err){
                            out.message = "Error buscando historias clínicas para la identificación " + req.params.identification;
                            res.send(out); 
                        }else{
                            out.status = "success";
                            if(hs.length>0){
                                hs.map(function(item, index){
                                    item.patient.password = null;
                                    item.medic.password = null;
                                    item.patient._id = null;
                                    item.medic._id = null;
                                });
                            }
                            out.data = hs.reverse();
                            res.send(out);
                        }
                    });
                }
            }
        });
    }
};