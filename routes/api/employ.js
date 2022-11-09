const express = require('express')
const router = express.Router();
const path = require('path');
// const data = {};
// data.employees = require('../../model/employees.json')
const employeesController = require('../../controllers/employeesController')
const tokenGateway = require('../../middleware/verifyTokens')
const verifyRoles = require('../../middleware/verifyRoles')
const ROLE_LIST = require('../../config/role_list')

router.route('/')
    .get(tokenGateway, employeesController.employeesData)
    .post(tokenGateway,verifyRoles(ROLE_LIST.Admin,ROLE_LIST.Editor),employeesController.createEmployee)
    .put(tokenGateway,verifyRoles(ROLE_LIST.Admin,ROLE_LIST.Editor),employeesController.updateEmployee)
    .delete(tokenGateway,verifyRoles(ROLE_LIST.Admin),employeesController.deleteEmployee);

    router.route('/:id')
        .get(employeesController.getEmployee)









module.exports = router