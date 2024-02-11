const Vehicle = require('../models/vehicle');

module.exports.doCreate = (req, res) => {
    try {
        const userId = req.session.login;
        const category = req.body.category;
        if (category === 'Motorcycle Vehicles') {
            const type = req.body.typeMotor;
                const data = new Vehicle({
                    userId:userId,
                    driver: req.body.driver,
                    brand: req.body.brand,
                    model: req.body.model,
                    plateNumber: req.body.plateNumber,
                    type: type,
                    category: category,
                    qty: req.body.qty,
                    status: 'available'
                });
                data.save().then(() => {
                    console.log('success', data)
                    req.flash('success', 'Creation Success!')
                    return res.redirect('/vehicles');
                }, () => {
                    console.log('failed', data)
                    req.flash('failed', 'Creation failed!')
                    return res.redirect('/vehicles');
                });
        } else if (category === 'Heavy Equipment Vehicles') {
            const type = req.body.typeHeavy;
                const data = new Vehicle({
                    userId:userId,
                    driver: req.body.driver,
                    brand: req.body.brand,
                    model: req.body.model,
                    plateNumber: req.body.plateNumber,
                    type: type,
                    category: category,
                    qty: req.body.qty,
                    status: 'available'
                });
                data.save().then(() => {
                    console.log('success', data)
                    req.flash('success', 'Creation Success!')
                    return res.redirect('/vehicles');
                }, () => {
                    console.log('failed', data)
                    req.flash('failed', 'Creation failed!')
                    return res.redirect('/vehicles');
                });
        } else if(category === 'Military Vehicles') {
            const type = req.body.typeMilitary;
            const data = new Vehicle({
                userId:userId,
                driver: req.body.driver,
                brand: req.body.brand,
                model: req.body.model,
                plateNumber: req.body.plateNumber,
                type: type,
                category: category,
                qty: req.body.qty,
                status: 'available'
            });
            data.save().then(() => {
                console.log('success', data)
                req.flash('success', 'Creation Success!')
                return res.redirect('/vehicles');
            }, () => {
                console.log('failed', data)
                req.flash('failed', 'Creation failed!')
                return res.redirect('/vehicles');
            });
        } else if(category === '4-Wheel Vehicles') {
            const type = req.body.typeWheel;
            const data = new Vehicle({
                userId:userId,
                driver: req.body.driver,
                brand: req.body.brand,
                model: req.body.model,
                plateNumber: req.body.plateNumber,
                type: type,
                category: category,
                qty: req.body.qty,
                status: 'available'
            });
            data.save().then(() => {
                console.log('success', data)
                req.flash('success', 'Creation Success!')
                return res.redirect('/vehicles');
            }, () => {
                console.log('failed', data)
                req.flash('failed', 'Creation failed!')
                return res.redirect('/vehicles');
            });
        }
    } catch (error) {
        console.log(error);
    }
}
