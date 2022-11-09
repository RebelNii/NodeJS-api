const data = {};
const Employees = require('../model/employee')


const employeesData = async (req,res)=>{
    const employees =  await Employees.find();
    if(!employees) return res.status(204).json({'message': "No Employees data available"})
    res.json(employees)
}

const createEmployee = async (req,res)=>{
    if(!req.body?.firstname && !req.body?.lastname){
        return res.status(400).json({'message': "Body parameter needed"})
    }

    try{
        const result = await Employees.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: 20
        });
        res.status(201).json(result)
    }catch(err){
        console.log(err)
    }
};

const updateEmployee = async (req,res)=>{
    if(!req.body.id){
        return res.status(204).json({'message': "Incorrect ID"})
    };

    const employee = await Employees.findOne({__id: req.body.id}).exec();
    if(!employee) return res.status(404).json({"message": "Employee not found"})
    if(req.body?.firstname) employee.firstname = req.body.firstname
    if(req.body?.lastname) employee.lastname = req.body.lastname
    const result = await employee.save()
    res.json(result)
};

const deleteEmployee = async (req,res)=>{
    if(!req.body.id){
        return res.status(204).json({'message': "Incorrect ID"})
    };
    const employee = await Employees.findOne({__id: req.body.id}).exec();
    if(!employee) return res.status(404).json({"message": "Employee not found"})
    const result = await employee.deleteOne({__id: req.body.id})
    res.json(result)
}

const getEmployee = async (req,res)=>{
    if(!req.params.id){
        return res.status(204).json({'message': "Incorrect ID"})
    };
    const employee = await Employees.findOne({__id: req.params.id}).exec();
    if(!employee) return res.status(404).json({"message": "Employee not found"})
    res.json(employee)
}

module.exports = {
    employeesData, createEmployee, updateEmployee, deleteEmployee, getEmployee
}