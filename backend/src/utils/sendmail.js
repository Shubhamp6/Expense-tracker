const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();

sgMail.setApiKey(process.env.API_KEY);

const sendmail = (options) => {
	const msg = {
		from: process.env.EMAIL,
		to: options.email,
		subject: options.subject,
		text: options.message,
	};

	sgMail
		.send(msg)
		.then(() => {
			console.log("Email sent");
		})
		.catch((error) => {
			console.error(error);
		});
};

module.exports = sendmail;
