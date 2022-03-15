var DataTypes = require("sequelize").DataTypes;
var _Airline = require("./Airline");
var _Assigned_Clinic_Area = require("./Assigned_Clinic_Area");
var _Assigned_Module = require("./Assigned_Module");
var _Clinic_Area = require("./Clinic_Area");
var _Contractor = require("./Contractor");
var _Contractor_Flight = require("./Contractor_Flight");
var _Contractor_Project = require("./Contractor_Project");
var _EMR = require("./EMR");
var _Flight = require("./Flight");
var _Hospital = require("./Hospital");
var _Module = require("./Module");
var _Preferred_Module = require("./Preferred_Module");
var _Project = require("./Project");
var _Rental_Car_Company = require("./Rental_Car_Company");
var _Rental_car = require("./Rental_car");
var _accountType = require("./accountType");
var _login = require("./login");

function initModels(sequelize) {
  var Airline = _Airline(sequelize, DataTypes);
  var Assigned_Clinic_Area = _Assigned_Clinic_Area(sequelize, DataTypes);
  var Assigned_Module = _Assigned_Module(sequelize, DataTypes);
  var Clinic_Area = _Clinic_Area(sequelize, DataTypes);
  var Contractor = _Contractor(sequelize, DataTypes);
  var Contractor_Flight = _Contractor_Flight(sequelize, DataTypes);
  var Contractor_Project = _Contractor_Project(sequelize, DataTypes);
  var EMR = _EMR(sequelize, DataTypes);
  var Flight = _Flight(sequelize, DataTypes);
  var Hospital = _Hospital(sequelize, DataTypes);
  var Module = _Module(sequelize, DataTypes);
  var Preferred_Module = _Preferred_Module(sequelize, DataTypes);
  var Project = _Project(sequelize, DataTypes);
  var Rental_Car_Company = _Rental_Car_Company(sequelize, DataTypes);
  var Rental_car = _Rental_car(sequelize, DataTypes);
  var accountType = _accountType(sequelize, DataTypes);
  var login = _login(sequelize, DataTypes);

  Clinic_Area.belongsToMany(Contractor, { as: 'contractorID_Contractors', through: Assigned_Clinic_Area, foreignKey: "clinicID", otherKey: "contractorID" });
  Contractor.belongsToMany(Clinic_Area, { as: 'clinicID_Clinic_Areas', through: Assigned_Clinic_Area, foreignKey: "contractorID", otherKey: "clinicID" });
  Contractor.belongsToMany(Flight, { as: 'flightID_Flights', through: Contractor_Flight, foreignKey: "contractorID", otherKey: "flightID" });
  Contractor.belongsToMany(Module, { as: 'moduleID_Modules', through: Assigned_Module, foreignKey: "contractorID", otherKey: "moduleID" });
  Contractor.belongsToMany(Module, { as: 'moduleID_Module_Preferred_Modules', through: Preferred_Module, foreignKey: "contractorID", otherKey: "moduleID" });
  Contractor.belongsToMany(Project, { as: 'projectID_Projects', through: Contractor_Project, foreignKey: "contractorID", otherKey: "projectID" });
  Contractor.belongsToMany(Rental_Car_Company, { as: 'rentalCompanyID_Rental_Car_Companies', through: Rental_car, foreignKey: "contractorID", otherKey: "rentalCompanyID" });
  Flight.belongsToMany(Contractor, { as: 'contractorID_Contractor_Contractor_Flights', through: Contractor_Flight, foreignKey: "flightID", otherKey: "contractorID" });
  Module.belongsToMany(Contractor, { as: 'contractorID_Contractor_Assigned_Modules', through: Assigned_Module, foreignKey: "moduleID", otherKey: "contractorID" });
  Module.belongsToMany(Contractor, { as: 'contractorID_Contractor_Preferred_Modules', through: Preferred_Module, foreignKey: "moduleID", otherKey: "contractorID" });
  Project.belongsToMany(Contractor, { as: 'contractorID_Contractor_Contractor_Projects', through: Contractor_Project, foreignKey: "projectID", otherKey: "contractorID" });
  Rental_Car_Company.belongsToMany(Contractor, { as: 'contractorID_Contractor_Rental_cars', through: Rental_car, foreignKey: "rentalCompanyID", otherKey: "contractorID" });
  Flight.belongsTo(Airline, { as: "airline", foreignKey: "airlineID"});
  Airline.hasMany(Flight, { as: "Flights", foreignKey: "airlineID"});
  Assigned_Clinic_Area.belongsTo(Clinic_Area, { as: "clinic", foreignKey: "clinicID"});
  Clinic_Area.hasMany(Assigned_Clinic_Area, { as: "Assigned_Clinic_Areas", foreignKey: "clinicID"});
  Assigned_Clinic_Area.belongsTo(Contractor, { as: "contractor", foreignKey: "contractorID"});
  Contractor.hasMany(Assigned_Clinic_Area, { as: "Assigned_Clinic_Areas", foreignKey: "contractorID"});
  Assigned_Module.belongsTo(Contractor, { as: "contractor", foreignKey: "contractorID"});
  Contractor.hasMany(Assigned_Module, { as: "Assigned_Modules", foreignKey: "contractorID"});
  Contractor_Flight.belongsTo(Contractor, { as: "contractor", foreignKey: "contractorID"});
  Contractor.hasMany(Contractor_Flight, { as: "Contractor_Flights", foreignKey: "contractorID"});
  Contractor_Project.belongsTo(Contractor, { as: "contractor", foreignKey: "contractorID"});
  Contractor.hasMany(Contractor_Project, { as: "Contractor_Projects", foreignKey: "contractorID"});
  Preferred_Module.belongsTo(Contractor, { as: "contractor", foreignKey: "contractorID"});
  Contractor.hasMany(Preferred_Module, { as: "Preferred_Modules", foreignKey: "contractorID"});
  Rental_car.belongsTo(Contractor, { as: "contractor", foreignKey: "contractorID"});
  Contractor.hasMany(Rental_car, { as: "Rental_cars", foreignKey: "contractorID"});
  Module.belongsTo(EMR, { as: "emr", foreignKey: "emrID"});
  EMR.hasMany(Module, { as: "Modules", foreignKey: "emrID"});
  Contractor_Flight.belongsTo(Flight, { as: "flight", foreignKey: "flightID"});
  Flight.hasMany(Contractor_Flight, { as: "Contractor_Flights", foreignKey: "flightID"});
  Clinic_Area.belongsTo(Hospital, { as: "hospital", foreignKey: "hospitalID"});
  Hospital.hasMany(Clinic_Area, { as: "Clinic_Areas", foreignKey: "hospitalID"});
  Project.belongsTo(Hospital, { as: "hospital", foreignKey: "hospitalID"});
  Hospital.hasMany(Project, { as: "Projects", foreignKey: "hospitalID"});
  Assigned_Module.belongsTo(Module, { as: "module", foreignKey: "moduleID"});
  Module.hasMany(Assigned_Module, { as: "Assigned_Modules", foreignKey: "moduleID"});
  Preferred_Module.belongsTo(Module, { as: "module", foreignKey: "moduleID"});
  Module.hasMany(Preferred_Module, { as: "Preferred_Modules", foreignKey: "moduleID"});
  Contractor_Project.belongsTo(Project, { as: "project", foreignKey: "projectID"});
  Project.hasMany(Contractor_Project, { as: "Contractor_Projects", foreignKey: "projectID"});
  Rental_car.belongsTo(Rental_Car_Company, { as: "rentalCompany", foreignKey: "rentalCompanyID"});
  Rental_Car_Company.hasMany(Rental_car, { as: "Rental_cars", foreignKey: "rentalCompanyID"});
  login.belongsTo(accountType, { as: "accountType", foreignKey: "accountTypeId"});
  accountType.hasMany(login, { as: "logins", foreignKey: "accountTypeId"});

  return {
    Airline,
    Assigned_Clinic_Area,
    Assigned_Module,
    Clinic_Area,
    Contractor,
    Contractor_Flight,
    Contractor_Project,
    EMR,
    Flight,
    Hospital,
    Module,
    Preferred_Module,
    Project,
    Rental_Car_Company,
    Rental_car,
    accountType,
    login,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
