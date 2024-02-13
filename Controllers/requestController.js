const fs = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');
const puppeteerConfig = require('../puppeteer.config.cjs');
const ejs = require('ejs');
const reqForm = require('../models/request');
const User = require('../models/user');
const Vehicle = require('../models/vehicle')
const nodemailer = require('nodemailer');
module.exports.index = async (req, res) => {
    try {
        if (!req.session.login) {
            return res.redirect('/login');
        }
        let selectedVehicleIds;
        if (Array.isArray(req.body.selectedVehicle)) {
            selectedVehicleIds = req.body.selectedVehicle;
        } else {
            // If req.body.selectedVehicle is not an array, convert it to an array with a single element
            selectedVehicleIds = [req.body.selectedVehicle];
        }

        const AllSelectedVehicles = selectedVehicleIds.map(vehicleId => ({
            vehicleId: vehicleId,
            qty: req.body.qty[vehicleId]
        }));
        console.log('Selected Vehicle IDs:', AllSelectedVehicles);
        const noVehicleSelected = AllSelectedVehicles.some(vehicle => vehicle.vehicleId === undefined || vehicle.qty === undefined);
        const user = await User.findById(req.session.login);
        if (noVehicleSelected) {
            if (user.role === 'member') {
                console.log('No Vehicle Selected');
                req.flash('message', 'No Vehicles Available')
                return res.render('/');
            } else {
                console.log('No Vehicle Selected');
                req.flash('message', 'No Vehicles Available')
                return res.render('/dashboard');
            }
        }
        const currentDate = new Date();
        const formattedDate = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()}`;
        const formData = new reqForm({
            userId: user._id,
            address: req.body.address,
            selectedVehicle: AllSelectedVehicles,
            city: req.body.city,
            event: req.body.event,
            dateCreated: formattedDate,
            requestorName: req.body.requestorName,
            status: 'pending',
        });

        const savedRequest = await formData.save();

        const templatePath = path.join(__dirname, '../views/pdf/pdf-template.ejs');
        const templateContent = await fs.readFile(templatePath, 'utf-8');
        const html = ejs.render(templateContent, { formData, selectedVehicles: AllSelectedVehicles });
        const createdBy = user._id.toString();
        const savedRequestIdString = savedRequest._id.toString();
        const savedRequestNameString = savedRequest.requestorName.toString();
        const formURL = `public/upload/pdf/${createdBy}/${savedRequestNameString}`;
        const outputFolderPath = path.resolve(__dirname, '../public/upload/pdf/', createdBy, savedRequestNameString);
        try {
            await fs.mkdir(outputFolderPath, { recursive: true });
            console.log('Directory created successfully');
        } catch (error) {
            console.error('Error creating directory:', error);
            return res.status(500).send('Error creating directory');
        }
        const outputPath = path.join(outputFolderPath, `${savedRequestIdString}.pdf`);

        const chromeExecutablePath = './node_modules/@puppeteer/browser/src/browser-data/chrome';
        console.log('Chrome executable path:', chromeExecutablePath);
        try {
            const browser = await puppeteer.launch({
                ...puppeteerConfig,
                args: [
                    "--disable-setuid-sandbox",
                    "--no-sandbox",
                    "--single-process",
                    "--no-zygote",
                ],
                headless: true
            });

            const page = await browser.newPage();
            await page.setContent(html);
            await page.pdf({
                path: outputPath,
                format: 'A4',
                printBackground: true,
            });

            await browser.close();
            console.log('PDF generated successfully');
            savedRequest.formURL = formURL;
            await savedRequest.save();
            req.flash('success', 'Creation Success!');
            //start
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'emonawong22@gmail.com',
                    pass: 'nouv heik zbln qkhf',
                },
            });

            // Function to send email
            const sendEmail = async (from, to, subject, htmlContent, outputPath) => {
                try {
                    const pdfBuffer = fs.readFile(outputPath);

                    // Convert the PDF buffer to base64
                    const pdfBase64 = pdfBuffer.toString('base64');

                    // Construct the data URI for the inline PDF attachment
                    const pdfDataUri = `data:application/pdf;base64,${pdfBase64}`;
                    const mailOptions = {
                        from,
                        to,
                        subject,
                        html: htmlContent,
                        attachments: [
                            {
                                filename: `${savedRequest._id}.pdf`,
                                content: pdfDataUri,
                                encoding: 'base64',
                                contentType: 'application/pdf',
                                path: outputPath
                            },
                        ],
                    };
                    const info = await transporter.sendMail(mailOptions);
                    console.log('Email sent:', info.response);
                } catch (error) {
                    console.error('Error sending email:', error);
                    throw new Error('Failed to send email');
                }
            };
            const Link = `https://lguk-online.onrender.com/vehicles`;
            const emailContent = `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <p style="color: #000; font-size:18px;">Requested By: <strong>${user.fullname}</strong> (${user.assign})</p>
                <p style="color: #000;">Requestor Name: <strong>${savedRequest.requestorName}</strong></p>
                <p>Go to <a href="${Link}" >Dashboard</a> </p>
            </div>
        `;

            sendEmail(
                `lguk-online.onrender.com <${user.email}>`,
                `jeybanmoras23@gmail.com`,
                'Request Form',
                emailContent,
                outputPath
            );
            //end
            if (user.role === 'member') {
            return res.status(200).redirect('/');
            }else {
            return res.status(200).redirect('/dashboard');
            }
        } catch (error) {
            console.error('Error launching browser:', error);
        }
    } catch (error) {
        console.error('Internal Server Error:', error);
        return res.status(500).send('Internal Server Error');
    }
};
