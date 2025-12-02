import { transporter } from "./nodemailer.transporter.js";


const sendOTPEmail = async (otp, toEmail) => {
    try {
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: toEmail,
            subject: "Your OTP Code",
            html: `
                <p>Your OTP For Email Verification</p>
                <h2>${otp}</h2>
                <p>This OTP is valid for 2 minutes.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.log("Error sending email:", error.message);
        return false;
    }
};

export default sendOTPEmail
