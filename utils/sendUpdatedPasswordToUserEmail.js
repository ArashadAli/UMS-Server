import { transporter } from "./nodemailer.transporter.js"

const sendUpdatedPasswordToUserEmail = async (password, toEmail) => {
    try {
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: toEmail,
            subject: "Your New Password",
            html: `
                <p>Your New Password For Login</p>
                <h2>${password}</h2>
                <p>Please Change It...</p>
            `
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.log("Error sending email:", error.message);
        return false;
    }
}

export default sendUpdatedPasswordToUserEmail