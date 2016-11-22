// History of patient
var clinicalHistory = require("../models/ClinicalHistory");

// Data about medical center (name, location, ...)
var medicalCenter = require("../models/MedicalCenter");

// User of application
var User = require("../models/User");

// Medic of application
var Medic = require("../models/Medic");

// User (patient) of medical center 
var userMedicalCenter = require("../models/UserMedicalCenter");

// User of application
var User = require("../models/User");

function addUser(body, callback){
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
                    reviewer: body.reviewer
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
        callback(out);
    });
}

function addMedic(body, callback){
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
                    professionalId: body.professionalId
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
        callback(out);
    });
}

function cleanMedicsData(medics){
    medics.map(function(item){
        item.professionalId = null;
        item.password = null;
    });

    return medics;
}


// Register User in App
module.exports.registerUser = function(body, callback){
    var out = {status: "error", message: "", existUser: false, data: {}, userRegistered: false};
    User.findOne({identification: body.identification}, function(err, user){
        console.log("INUSER");
        console.log(user);
        if(user){
            out.message = "El usuario con la identificación " + body.identification + " ya está registrado.";
            out.userRegistered = true;
            callback(out);
        }else{
            Medic.findOne({identification: body.identification}, function(err, medic){
                console.log("INMEDIC");
                console.log(medic);
                if(medic){
                    out.message = "El usuario con la identificación " + body.identification + " ya está registrado.";
                    out.userRegistered = true;
                    callback(out);
                }else{
                    if(body.typeUser=="medic"){
                        addMedic(body, callback);
                    }else if(body.typeUser=="patient"){
                        addUser(body, callback);
                    }
                }
            });
        }
    });
};

module.exports.loginUser = function(body, callback){
    var out = {status: "error", message: "", data: {}};
    User.findOne(body, function(err, user){
        if(err){
            out.message = "Error buscando en usuarios";
            callback(out);
        }else{
            if(user){
                out.status = "success";
                user.password = null;
                out.typeUser = "patient";
                out.data = user;
                callback(out);
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
                        }else{
                            out.message = "No se ha encontrado algún usuario con estas credenciales";
                        }
                    }
                    callback(out);
                });
            }
        }
    });
};

module.exports.getMedics = function(callback){
    Medic.find({}, function(err, medics){
        var out = {status: "error", message: "", data: []};
        if(err){
            out.message = "Error buscando los médicos";
        }else{
            if(medics.length<=0){
                out.message = "No hay médicos registrados. debe seleccionar uno para poder registrarse";
            }else{
                out.status = "success";
                out.data = cleanMedicsData(medics);
            }
        }
        callback(out);
    });
};