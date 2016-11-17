// History of patient
var clinicalHistory = require("../models/ClinicalHistory");

// Data about medical center (name, location, ...)
var medicalCenter = require("../models/MedicalCenter");

// User of application
var User = require("../models/User");

// User (patient) of medical center 
var userMedicalCenter = require("../models/UserMedicalCenter");

// check if user is in app database
module.exports.isUserInApp = function(body, callback){
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
                    email: body.email,
                    type: body.typeUser
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
};

module.exports.isUserInMedicalCenter = function(user, callback){};