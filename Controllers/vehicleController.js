const Vehicle = require('../models/vehicle');
const User = require('../models/user');
const SITE_TITLE = 'Online LGU Katipunan Appointment System';
const multer = require('multer');
var fileUpload = require('../middlewares/vehicle-upload-middleware');
module.exports.doCreate = async (req, res) => {
    try {
        var upload = multer({
            storage: fileUpload.files.storage(),
            allowedFile: fileUpload.files.allowedFile
        }).single('image');
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res
                    .status(err.status || 500)
                    .render('500', { err: err });
            } else if (err) {
                console.log('hello', err)
                return res
                    .status(err.status || 500)
                    .render('500', { err: err });
            } else { // If no errors occurred during the file upload, continue to the next step
                try {
                    const userId = req.session.login;
                    const category = req.body.category;
                    const user = await User.findById(userId);
                    const currentDate = new Date();
                    const dateIssued = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()}`;
                    if (category === 'Motorcycle Vehicles') {
                        const type = req.body.typeMotor;
                        if (req.body.condition === 'Serviceable') {
                            const data = new Vehicle({
                                userId: userId,
                                assignPersonel: req.body.assignPersonel,
                                brand: req.body.brand,
                                model: req.body.model,
                                plateNumber: req.body.plateNumber,
                                dateIssued: dateIssued,
                                OrCr: req.body.OrCr,
                                condition: req.body.condition,
                                type: type,
                                category: category,
                                qty: req.body.qty,
                                status: 'available'
                            });
                            let imageUrl = '';
                            if (req.file) {
                                const vehicleNameExist = await Vehicle.find({ imageURL: `/public/upload/vehicles/${req.file.filename}` });
                                if (vehicleNameExist.length > 0) {
                                    console.log('Name Exists');
                                    req.flash('message', 'Please Provide a unique file name!')
                                    return res.redirect('/vehicles');
                                } else {
                                    imageUrl = `/public/upload/vehicles/${req.file.filename}`;
                                }
                            }
                            data.imageURL = imageUrl;
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
                                    return res.status(500).render('500');
                                });
                        } else {
                            const data = new Vehicle({
                                userId: userId,
                                assignPersonel: req.body.assignPersonel,
                                brand: req.body.brand,
                                model: req.body.model,
                                plateNumber: req.body.plateNumber,
                                dateIssued: dateIssued,
                                OrCr: req.body.OrCr,
                                condition: req.body.condition,
                                type: type,
                                category: category,
                                qty: req.body.qty,
                                status: 'not available'
                            });
                            let imageUrl = '';
                            if (req.file) {
                                const vehicleNameExist = await Vehicle.find({ imageURL: `/public/upload/vehicles/${req.file.filename}` });
                                if (vehicleNameExist.length > 0) {
                                    console.log('Name Exists');
                                    req.flash('message', 'Please Provide a unique file name!')
                                    return res.redirect('/vehicles');
                                } else {
                                    imageUrl = `/public/upload/vehicles/${req.file.filename}`;
                                }
                            }
                            data.imageURL = imageUrl;
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
                                    return res.status(500).render('500');
                                });
                        }

                    } else if (category === 'Heavy Equipment Vehicles') {
                        const type = req.body.typeHeavy;
                        if (req.body.condition === 'Serviceable') {
                            const data = new Vehicle({
                                userId: userId,
                                assignPersonel: req.body.assignPersonel,
                                brand: req.body.brand,
                                model: req.body.model,
                                plateNumber: req.body.plateNumber,
                                dateIssued: dateIssued,
                                OrCr: req.body.OrCr,
                                condition: req.body.condition,
                                type: type,
                                category: category,
                                qty: req.body.qty,
                                status: 'available'
                            });
                            let imageUrl = '';
                            if (req.file) {
                                const vehicleNameExist = await Vehicle.find({ imageURL: `/public/upload/vehicles/${req.file.filename}` });
                                if (vehicleNameExist.length > 0) {
                                    console.log('Name Exists');
                                    req.flash('message', 'Please Provide a unique file name!')
                                    return res.redirect('/vehicles');
                                } else {
                                    imageUrl = `/public/upload/vehicles/${req.file.filename}`;
                                }
                            }
                            data.imageURL = imageUrl;
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
                                    return res.status(500).render('500');
                                });
                        } else {
                            const data = new Vehicle({
                                userId: userId,
                                assignPersonel: req.body.assignPersonel,
                                brand: req.body.brand,
                                model: req.body.model,
                                plateNumber: req.body.plateNumber,
                                dateIssued: dateIssued,
                                OrCr: req.body.OrCr,
                                condition: req.body.condition,
                                type: type,
                                category: category,
                                qty: req.body.qty,
                                status: 'not available'
                            });
                            let imageUrl = '';
                            if (req.file) {
                                const vehicleNameExist = await Vehicle.find({ imageURL: `/public/upload/vehicles/${req.file.filename}` });
                                if (vehicleNameExist.length > 0) {
                                    console.log('Name Exists');
                                    req.flash('message', 'Please Provide a unique file name!')
                                    return res.redirect('/vehicles');
                                } else {
                                    imageUrl = `/public/upload/vehicles/${req.file.filename}`;
                                }
                            }
                            data.imageURL = imageUrl;
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
                                    return res.status(500).render('500');
                                });
                        }
                    } else if (category === 'Military Vehicles') {
                        const type = req.body.typeMilitary;
                        if (req.body.condition === 'Serviceable') {
                            const data = new Vehicle({
                                userId: userId,
                                assignPersonel: req.body.assignPersonel,
                                brand: req.body.brand,
                                model: req.body.model,
                                plateNumber: req.body.plateNumber,
                                dateIssued: dateIssued,
                                OrCr: req.body.OrCr,
                                condition: req.body.condition,
                                type: type,
                                category: category,
                                qty: req.body.qty,
                                status: 'available'
                            });
                            let imageUrl = '';
                            if (req.file) {
                                const vehicleNameExist = await Vehicle.find({ imageURL: `/public/upload/vehicles/${req.file.filename}` });
                                if (vehicleNameExist.length > 0) {
                                    console.log('Name Exists');
                                    req.flash('message', 'Please Provide a unique file name!')
                                    return res.redirect('/vehicles');
                                } else {
                                    imageUrl = `/public/upload/vehicles/${req.file.filename}`;
                                }
                            }
                            data.imageURL = imageUrl;
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
                                    return res.status(500).render('500');
                                });
                        } else {
                            const data = new Vehicle({
                                userId: userId,
                                assignPersonel: req.body.assignPersonel,
                                brand: req.body.brand,
                                model: req.body.model,
                                plateNumber: req.body.plateNumber,
                                dateIssued: dateIssued,
                                OrCr: req.body.OrCr,
                                condition: req.body.condition,
                                type: type,
                                category: category,
                                qty: req.body.qty,
                                status: 'not available'
                            });
                            let imageUrl = '';
                            if (req.file) {
                                const vehicleNameExist = await Vehicle.find({ imageURL: `/public/upload/vehicles/${req.file.filename}` });
                                if (vehicleNameExist.length > 0) {
                                    console.log('Name Exists');
                                    req.flash('message', 'Please Provide a unique file name!')
                                    return res.redirect('/vehicles');
                                } else {
                                    imageUrl = `/public/upload/vehicles/${req.file.filename}`;
                                }
                            }
                            data.imageURL = imageUrl;
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
                                    return res.status(500).render('500');
                                });
                        }
                    } else if (category === '4-Wheel Vehicles') {
                        const type = req.body.typeWheel;
                        if (req.body.condition === 'Serviceable') {
                            const data = new Vehicle({
                                userId: userId,
                                assignPersonel: req.body.assignPersonel,
                                brand: req.body.brand,
                                model: req.body.model,
                                plateNumber: req.body.plateNumber,
                                dateIssued: dateIssued,
                                OrCr: req.body.OrCr,
                                condition: req.body.condition,
                                type: type,
                                category: category,
                                qty: req.body.qty,
                                status: 'available'
                            });
                            let imageUrl = '';
                            if (req.file) {
                                const vehicleNameExist = await Vehicle.find({ imageURL: `/public/upload/vehicles/${req.file.filename}` });
                                if (vehicleNameExist.length > 0) {
                                    console.log('Name Exists');
                                    req.flash('message', 'Please Provide a unique file name!')
                                    return res.redirect('/vehicles');
                                } else {
                                    imageUrl = `/public/upload/vehicles/${req.file.filename}`;
                                }
                            }
                            data.imageURL = imageUrl;
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
                                    return res.status(500).render('500');
                                });
                        } else {
                            const data = new Vehicle({
                                userId: userId,
                                assignPersonel: req.body.assignPersonel,
                                brand: req.body.brand,
                                model: req.body.model,
                                plateNumber: req.body.plateNumber,
                                dateIssued: dateIssued,
                                OrCr: req.body.OrCr,
                                condition: req.body.condition,
                                type: type,
                                category: category,
                                qty: req.body.qty,
                                status: 'not available'
                            });
                            let imageUrl = '';
                            if (req.file) {
                                const vehicleNameExist = await Vehicle.find({ imageURL: `/public/upload/vehicles/${req.file.filename}` });
                                if (vehicleNameExist.length > 0) {
                                    console.log('Name Exists');
                                    req.flash('message', 'Please Provide a unique file name!')
                                    return res.redirect('/vehicles');
                                } else {
                                    imageUrl = `/public/upload/vehicles/${req.file.filename}`;
                                }
                            }
                            data.imageURL = imageUrl;
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
                                    return res.status(500).render('500');
                                });
                        }
                    }
                } catch (error) {
                    console.log(error);
                    req.flash('message', 'Error occured in Server.');
                    return res.status(500).render('500');
                }
            }
        });
    } catch (error) {
        console.log('error:', error);
        req.flash('message', 'Error occured in Server.');
        return res.status(500).render('500');
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
                if (userLogin.role === 'member') {
                    return res.redirect('/');
                } else if (userLogin.role === 'admin') {
                    return res.redirect('/admin');
                } else if (userLogin.role === 'creator') {
                    return res.redirect('/vehicles');
                } else {
                    console.log('Unknown role logged in');
                }
            }
        } else {
            return res.redirect('/')
        }
    } catch (error) {
        console.log('error:', error);
        req.flash('message', 'Error occured in Server');
        return res.status(500).render('500');
    }
}

module.exports.vehicleDoUpdate = async (req, res) => {
    try {
        var upload = multer({
            storage: fileUpload.files.storage(),
            allowedFile: fileUpload.files.allowedFile
        }).single('image');
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res
                    .status(err.status || 500)
                    .render('500', { err: err });
            } else if (err) {
                console.log('hello', err)
                return res
                    .status(err.status || 500)
                    .render('500', { err: err });
            } else {
                try {
                    const userId = req.session.login;
                    const category = req.body.category;
                    const vehicleId = req.params.id;
                    const user = await User.findById(userId);
                    const currentDate = new Date();
                    const dateIssued = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()}`;
                    if (category === 'Motorcycle Vehicles') {
                        const type = req.body.typeMotor;
                        if (req.body.condition === 'Serviceable') {
                            const dataUpdated = {
                                assignPersonel: req.body.assignPersonel,
                                brand: req.body.brand,
                                model: req.body.model,
                                plateNumber: req.body.plateNumber,
                                dateIssued: dateIssued,
                                OrCr: req.body.OrCr,
                                condition: req.body.condition,
                                type: type,
                                category: category,
                                status: 'available'
                            };
                            if (req.file) {
                                const vehicleNameExist = await Vehicle.find({ imageURL: `/public/upload/vehicles/${req.file.filename}` });
                                if (vehicleNameExist.length > 0) {
                                    console.log('Name Exists');
                                    req.flash('message', 'Please Provide a unique file name!')
                                    return res.redirect('/vehicles');
                                } else {
                                    imageUrl = `/public/upload/vehicles/${req.file.filename}`;
                                    dataUpdated.imageURL = imageUrl;
                                }
                            }
                            Vehicle.findByIdAndUpdate(vehicleId, dataUpdated, { new: true })
                                .then((updatedVehicle) => {
                                    console.log('success update', updatedVehicle);
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
                                    return res.status(500).render('500');
                                });
                        } else {
                            const dataUpdated = {
                                assignPersonel: req.body.assignPersonel,
                                brand: req.body.brand,
                                model: req.body.model,
                                plateNumber: req.body.plateNumber,
                                dateIssued: dateIssued,
                                OrCr: req.body.OrCr,
                                condition: req.body.condition,
                                type: type,
                                category: category,
                                status: 'not available'
                            };
                            if (req.file) {
                                const vehicleNameExist = await Vehicle.find({ imageURL: `/public/upload/vehicles/${req.file.filename}` });
                                if (vehicleNameExist.length > 0) {
                                    console.log('Name Exists');
                                    req.flash('message', 'Please Provide a unique file name!')
                                    return res.redirect('/vehicles');
                                } else {
                                    imageUrl = `/public/upload/vehicles/${req.file.filename}`;
                                    dataUpdated.imageURL = imageUrl;
                                }
                            }
                            Vehicle.findByIdAndUpdate(vehicleId, dataUpdated, { new: true })
                                .then((updatedVehicle) => {
                                    console.log('success update', updatedVehicle);
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
                                    return res.status(500).render('500');
                                });
                        }
                    } else if (category === 'Heavy Equipment Vehicles') {
                        const type = req.body.typeHeavy;
                        if (req.body.condition === 'Serviceable') {
                            const dataUpdated = {
                                assignPersonel: req.body.assignPersonel,
                                brand: req.body.brand,
                                model: req.body.model,
                                plateNumber: req.body.plateNumber,
                                dateIssued: dateIssued,
                                OrCr: req.body.OrCr,
                                condition: req.body.condition,
                                type: type,
                                category: category,
                                status: 'available'
                            };
                            if (req.file) {
                                const vehicleNameExist = await Vehicle.find({ imageURL: `/public/upload/vehicles/${req.file.filename}` });
                                if (vehicleNameExist.length > 0) {
                                    console.log('Name Exists');
                                    req.flash('message', 'Please Provide a unique file name!')
                                    return res.redirect('/vehicles');
                                } else {
                                    imageUrl = `/public/upload/vehicles/${req.file.filename}`;
                                    dataUpdated.imageURL = imageUrl;
                                }
                            }
                            Vehicle.findByIdAndUpdate(vehicleId, dataUpdated, { new: true })
                                .then((updatedVehicle) => {
                                    console.log('success update', updatedVehicle);
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
                                    return res.status(500).render('500');
                                });
                        } else {
                            const dataUpdated = {
                                assignPersonel: req.body.assignPersonel,
                                brand: req.body.brand,
                                model: req.body.model,
                                plateNumber: req.body.plateNumber,
                                dateIssued: dateIssued,
                                OrCr: req.body.OrCr,
                                condition: req.body.condition,
                                type: type,
                                category: category,
                                status: 'not available'
                            };
                            if (req.file) {
                                const vehicleNameExist = await Vehicle.find({ imageURL: `/public/upload/vehicles/${req.file.filename}` });
                                if (vehicleNameExist.length > 0) {
                                    console.log('Name Exists');
                                    req.flash('message', 'Please Provide a unique file name!')
                                    return res.redirect('/vehicles');
                                } else {
                                    imageUrl = `/public/upload/vehicles/${req.file.filename}`;
                                    dataUpdated.imageURL = imageUrl;
                                }
                            }
                            Vehicle.findByIdAndUpdate(vehicleId, dataUpdated, { new: true })
                                .then((updatedVehicle) => {
                                    console.log('success update', updatedVehicle);
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
                                    return res.status(500).render('500');
                                });
                        }
                    } else if (category === 'Military Vehicles') {
                        const type = req.body.typeMilitary;
                        if (req.body.condition === 'Serviceable') {
                            const dataUpdated = {
                                assignPersonel: req.body.assignPersonel,
                                brand: req.body.brand,
                                model: req.body.model,
                                plateNumber: req.body.plateNumber,
                                dateIssued: dateIssued,
                                OrCr: req.body.OrCr,
                                condition: req.body.condition,
                                type: type,
                                category: category,
                                status: 'available'
                            };
                            if (req.file) {
                                const vehicleNameExist = await Vehicle.find({ imageURL: `/public/upload/vehicles/${req.file.filename}` });
                                if (vehicleNameExist.length > 0) {
                                    console.log('Name Exists');
                                    req.flash('message', 'Please Provide a unique file name!')
                                    return res.redirect('/vehicles');
                                } else {
                                    imageUrl = `/public/upload/vehicles/${req.file.filename}`;
                                    dataUpdated.imageURL = imageUrl;
                                }
                            }
                            Vehicle.findByIdAndUpdate(vehicleId, dataUpdated, { new: true })
                                .then((updatedVehicle) => {
                                    console.log('success update', updatedVehicle);
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
                                    return res.status(500).render('500');
                                });
                        } else {
                            const dataUpdated = {
                                assignPersonel: req.body.assignPersonel,
                                brand: req.body.brand,
                                model: req.body.model,
                                plateNumber: req.body.plateNumber,
                                dateIssued: dateIssued,
                                OrCr: req.body.OrCr,
                                condition: req.body.condition,
                                type: type,
                                category: category,
                                status: 'not available'
                            };
                            if (req.file) {
                                const vehicleNameExist = await Vehicle.find({ imageURL: `/public/upload/vehicles/${req.file.filename}` });
                                if (vehicleNameExist.length > 0) {
                                    console.log('Name Exists');
                                    req.flash('message', 'Please Provide a unique file name!')
                                    return res.redirect('/vehicles');
                                } else {
                                    imageUrl = `/public/upload/vehicles/${req.file.filename}`;
                                    dataUpdated.imageURL = imageUrl;
                                }
                            }
                            Vehicle.findByIdAndUpdate(vehicleId, dataUpdated, { new: true })
                                .then((updatedVehicle) => {
                                    console.log('success update', updatedVehicle);
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
                                    return res.status(500).render('500');
                                });
                        }
                    } else if (category === '4-Wheel Vehicles') {
                        const type = req.body.typeWheel;
                        if (req.body.condition === 'Serviceable') {
                            const dataUpdated = {
                                assignPersonel: req.body.assignPersonel,
                                brand: req.body.brand,
                                model: req.body.model,
                                plateNumber: req.body.plateNumber,
                                dateIssued: dateIssued,
                                OrCr: req.body.OrCr,
                                condition: req.body.condition,
                                type: type,
                                category: category,
                                status: 'available'
                            };
                            if (req.file) {
                                const vehicleNameExist = await Vehicle.find({ imageURL: `/public/upload/vehicles/${req.file.filename}` });
                                if (vehicleNameExist.length > 0) {
                                    console.log('Name Exists');
                                    req.flash('message', 'Please Provide a unique file name!')
                                    return res.redirect('/vehicles');
                                } else {
                                    imageUrl = `/public/upload/vehicles/${req.file.filename}`;
                                    dataUpdated.imageURL = imageUrl;
                                }
                            }
                            Vehicle.findByIdAndUpdate(vehicleId, dataUpdated, { new: true })
                                .then((updatedVehicle) => {
                                    console.log('success update', updatedVehicle);
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
                                    return res.status(500).render('500');
                                });
                        } else {
                            const dataUpdated = {
                                assignPersonel: req.body.assignPersonel,
                                brand: req.body.brand,
                                model: req.body.model,
                                plateNumber: req.body.plateNumber,
                                dateIssued: dateIssued,
                                OrCr: req.body.OrCr,
                                condition: req.body.condition,
                                type: type,
                                category: category,
                                status: 'not available'
                            };
                            if (req.file) {
                                const vehicleNameExist = await Vehicle.find({ imageURL: `/public/upload/vehicles/${req.file.filename}` });
                                if (vehicleNameExist.length > 0) {
                                    console.log('Name Exists');
                                    req.flash('message', 'Please Provide a unique file name!')
                                    return res.redirect('/vehicles');
                                } else {
                                    imageUrl = `/public/upload/vehicles/${req.file.filename}`;
                                    dataUpdated.imageURL = imageUrl;
                                }
                            }
                            Vehicle.findByIdAndUpdate(vehicleId, dataUpdated, { new: true })
                                .then((updatedVehicle) => {
                                    console.log('success update', updatedVehicle);
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
                                    return res.status(500).render('500');
                                });
                        }
                    }
                } catch (error) {
                    console.log(error);
                    req.flash('message', 'Error occured!');
                    return res.status(500).render('500');
                }
            }
        });
    } catch (error) {
        console.log('error:', error);
        req.flash('message', 'Error occured in Server.');
        return res.status(500).render('500');
    }
}

module.exports.vehicleDelete = async (req, res) => {
    const vehicleId = req.body.vehicleId;
    const userId = req.session.login;
    const user = await User.findById(userId);

    if (user.role === 'admin') {
        const vehicleDeleted = await Vehicle.findByIdAndDelete(vehicleId);
        if (vehicleDeleted) {
            req.flash('message', 'Vehicle been Deleted!');
            return res.redirect('/dashboard');
        }
    } else {
        const vehicleDeleted = await Vehicle.findByIdAndDelete(vehicleId);
        if (vehicleDeleted) {
            req.flash('message', 'Vehicle been Deleted!');
            return res.redirect('/vehicles');
        }
    }
}