const Vehicle = require('../models/vehicle');
const User = require('../models/user');
const SITE_TITLE = 'Online LGU Katipunan Appointment System';
module.exports.doCreate = async (req, res) => {
    try {
        const userId = req.session.login;
        const category = req.body.category;
        const user = await User.findById(userId);
        if (category === 'Motorcycle Vehicles') {
            const type = req.body.typeMotor;
            const data = new Vehicle({
                userId: userId,
                driver: req.body.driver,
                brand: req.body.brand,
                model: req.body.model,
                plateNumber: req.body.plateNumber,
                type: type,
                category: category,
                qty: req.body.qty,
                status: 'available'
            });
            data.save()
                .then((savedData) => {
                    console.log('success', savedData);
                    req.flash('success', 'Creation Success!');
                    if (user.role === 'creator') {
                        return res.redirect('/vehicles');
                    } else {
                        return res.redirect('/dashboard');
                    }
                })
                .catch((error) => {
                    console.error('Error saving data:', error);
                    req.flash('failed', 'Creation failed!');
                    if (user.role === 'creator') {
                        return res.redirect('/vehicles');
                    } else {
                        return res.redirect('/dashboard');
                    }
                });
        } else if (category === 'Heavy Equipment Vehicles') {
            const type = req.body.typeHeavy;
            const data = new Vehicle({
                userId: userId,
                driver: req.body.driver,
                brand: req.body.brand,
                model: req.body.model,
                plateNumber: req.body.plateNumber,
                type: type,
                category: category,
                qty: req.body.qty,
                status: 'available'
            });
            data.save()
                .then((savedData) => {
                    console.log('success', savedData);
                    req.flash('success', 'Creation Success!');
                    if (user.role === 'creator') {
                        return res.redirect('/vehicles');
                    } else {
                        return res.redirect('/dashboard');
                    }
                })
                .catch((error) => {
                    console.error('Error saving data:', error);
                    req.flash('failed', 'Creation failed!');
                    if (user.role === 'creator') {
                        return res.redirect('/vehicles');
                    } else {
                        return res.redirect('/dashboard');
                    }
                });
        } else if (category === 'Military Vehicles') {
            const type = req.body.typeMilitary;
            const data = new Vehicle({
                userId: userId,
                driver: req.body.driver,
                brand: req.body.brand,
                model: req.body.model,
                plateNumber: req.body.plateNumber,
                type: type,
                category: category,
                qty: req.body.qty,
                status: 'available'
            });
            data.save()
                .then((savedData) => {
                    console.log('success', savedData);
                    req.flash('success', 'Creation Success!');
                    if (user.role === 'creator') {
                        return res.redirect('/vehicles');
                    } else {
                        return res.redirect('/dashboard');
                    }
                })
                .catch((error) => {
                    console.error('Error saving data:', error);
                    req.flash('failed', 'Creation failed!');
                    if (user.role === 'creator') {
                        return res.redirect('/vehicles');
                    } else {
                        return res.redirect('/dashboard');
                    }
                });
        } else if (category === '4-Wheel Vehicles') {
            const type = req.body.typeWheel;
            const data = new Vehicle({
                userId: userId,
                driver: req.body.driver,
                brand: req.body.brand,
                model: req.body.model,
                plateNumber: req.body.plateNumber,
                type: type,
                category: category,
                qty: req.body.qty,
                status: 'available'
            });
            data.save()
                .then((savedData) => {
                    console.log('success', savedData);
                    req.flash('success', 'Creation Success!');
                    if (user.role === 'creator') {
                        return res.redirect('/vehicles');
                    } else {
                        return res.redirect('/dashboard');
                    }
                })
                .catch((error) => {
                    console.error('Error saving data:', error);
                    req.flash('failed', 'Creation failed!');
                    if (user.role === 'creator') {
                        return res.redirect('/vehicles');
                    } else {
                        return res.redirect('/dashboard');
                    }
                });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.vehicleUpdate = async (req, res) => {
    try {
        const userId = req.session.login;
        const user = await User.findById(userId);
        if (user) {
            if (user.role === 'admin' || user.role === 'creator') {
                const vehicleId = req.params.id;
                const vehicle = await Vehicle.findById(vehicleId)
                res.render('vehicles_update', {
                    site_title: SITE_TITLE,
                    title: 'Update',
                    user: user,
                    vehicle: vehicle,
                    currentUrl: req.originalUrl
                })
            } else {
                return res.status(404).render('404');
            }
        } else {
            return res.redirect('/')
        }
    } catch (error) {
        console.log('error:', error)
    }
}

module.exports.vehicleDoUpdate = async (req, res) => {
    try {
        const userId = req.session.login;
        const category = req.body.category;
        const vehicleId = req.params.id;
        const user = await User.findById(userId);
        if (category === 'Motorcycle Vehicles') {
            const type = req.body.typeMotor;
            const dataUpdated = {
                driver: req.body.driver,
                brand: req.body.brand,
                model: req.body.model,
                plateNumber: req.body.plateNumber,
                type: type,
                category: category,
            };

            Vehicle.findByIdAndUpdate(vehicleId, dataUpdated, { new: true })
                .then((updatedVehicle) => {
                    console.log('success', updatedVehicle);
                    req.flash('message', 'Update Success!');
                    if (user.role === 'creator') {
                        return res.redirect('/vehicles');
                    } else {
                        return res.redirect('/dashboard');
                    }
                })
                .catch((error) => {
                    console.error('Error updating data:', error);
                    req.flash('message', 'Update failed!');
                    if (user.role === 'creator') {
                        return res.redirect('/vehicles');
                    } else {
                        return res.redirect('/dashboard');
                    }
                });
        } else if (category === 'Heavy Equipment Vehicles') {
            const type = req.body.typeHeavy;
            const dataUpdated = {
                driver: req.body.driver,
                brand: req.body.brand,
                model: req.body.model,
                plateNumber: req.body.plateNumber,
                type: type,
                category: category,
            };

            Vehicle.findByIdAndUpdate(vehicleId, dataUpdated, { new: true })
                .then((updatedVehicle) => {
                    console.log('success', updatedVehicle);
                    req.flash('message', 'Update Success!');
                    if (user.role === 'creator') {
                        return res.redirect('/vehicles');
                    } else {
                        return res.redirect('/dashboard');
                    }
                })
                .catch((error) => {
                    console.error('Error updating data:', error);
                    req.flash('message', 'Update failed!');
                    if (user.role === 'creator') {
                        return res.redirect('/vehicles');
                    } else {
                        return res.redirect('/dashboard');
                    }
                });
        } else if (category === 'Military Vehicles') {
            const type = req.body.typeMilitary;
            const dataUpdated = {
                driver: req.body.driver,
                brand: req.body.brand,
                model: req.body.model,
                plateNumber: req.body.plateNumber,
                type: type,
                category: category,
            };

            Vehicle.findByIdAndUpdate(vehicleId, dataUpdated, { new: true })
                .then((updatedVehicle) => {
                    console.log('success', updatedVehicle);
                    req.flash('message', 'Update Success!');
                    if (user.role === 'creator') {
                        return res.redirect('/vehicles');
                    } else {
                        return res.redirect('/dashboard');
                    }
                })
                .catch((error) => {
                    console.error('Error updating data:', error);
                    req.flash('message', 'Update failed!');
                    if (user.role === 'creator') {
                        return res.redirect('/vehicles');
                    } else {
                        return res.redirect('/dashboard');
                    }
                });
        } else if (category === '4-Wheel Vehicles') {
            const type = req.body.typeWheel;
            const dataUpdated = {
                driver: req.body.driver,
                brand: req.body.brand,
                model: req.body.model,
                plateNumber: req.body.plateNumber,
                type: type,
                category: category,
            };

            Vehicle.findByIdAndUpdate(vehicleId, dataUpdated, { new: true })
                .then((updatedVehicle) => {
                    console.log('success', updatedVehicle);
                    req.flash('message', 'Update Success!');
                    if (user.role === 'creator') {
                        return res.redirect('/vehicles');
                    } else {
                        return res.redirect('/dashboard');
                    }
                })
                .catch((error) => {
                    console.error('Error updating data:', error);
                    req.flash('message', 'Update failed!');
                    if (user.role === 'creator') {
                        return res.redirect('/vehicles');
                    } else {
                        return res.redirect('/dashboard');
                    }
                });
        }
    } catch (error) {
        console.log(error);
    }
}