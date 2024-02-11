const indexController = require('../Controllers/indexController');
const requestController = require('../Controllers/requestController');
const loginController = require('../Controllers/loginController');
const vehicleController = require('../Controllers/vehicleController');
const creatorController = require('../Controllers/creatorController');
const adminController = require('../Controllers/adminController');
const profileController =require('../Controllers/profileController')
module.exports = function(app){

    app.get('/', indexController.index);
    app.get('/requests', indexController.requests);
    app.post('/submit', requestController.index);
    app.get('/login', loginController.index);
    app.post('/login', loginController.submit);
    app.post('/logout', loginController.logout);
    app.post('/create/vehicle', vehicleController.doCreate)
    app.get('/vehicles',creatorController.index);
    app.post('/vehicles/approval',creatorController.approve);
    app.post('/vehicles/remove', creatorController.remove);
    app.get('/inventory', creatorController.inventory);
    //admin
    app.get('/admin', adminController.index);
    app.get('/dashboard', adminController.dashboard);
    app.post('/admin/approve', adminController.approve);
    //edit
    app.get('/user/:id', adminController.userEdit);
    app.post('/user/:id', adminController.userDoEdit);
    app.post('/dashboard/user/delete', adminController.userDel);
    //profileedit
    app.get('/profile', profileController.userEdit);
    app.post('/profile/edit', profileController.userDoEdit);
    //Utilities
    app.get('/alert', (req,res) => {
        res.render('alert')
    });
    app.get('/form', (req,res) => {
        res.render('form', {
            site_title: 'hello',
            title: 'title'
        })
    });
    
    
   
}