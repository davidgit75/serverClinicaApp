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
                    reviewer: null
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

module.exports.isUserInMedicalCenter = function(user, callback){};