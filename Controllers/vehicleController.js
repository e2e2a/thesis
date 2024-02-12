const Vehicle = require('../models/vehicle');
const User = require('../models/user');

module.exports.doCreate =async (req, res) => {
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
