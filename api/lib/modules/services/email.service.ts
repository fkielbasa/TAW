import e from 'express';
import nodemailer from 'nodemailer';

export class EmailService {
    private transporter: nodemailer.Transporter;
    private email: string = 'filpawkub@gmail.com';

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.poczta.onet.pl',
            port: 465,
            secure: true, 
            auth: {
                user: this.email,
                pass: '***' 
            }
        });
    }

    public async sendPasswordChangeEmail(to: string, newPassword: string): Promise<void> {
        try {
            const mailOptions: nodemailer.SendMailOptions = {
                from: this.email, 
                to, 
                subject: 'Zmiana hasła', 
                text: `Twoje hasło: ${newPassword}` 
            };

            await this.transporter.sendMail(mailOptions);
            console.log('Email został wysłany pomyślnie.');
        } catch (error) {
            console.error('Wystąpił błąd podczas wysyłania emaila:', error);
            throw new Error('Wystąpił błąd podczas wysyłania emaila.');
        }
    }
}


