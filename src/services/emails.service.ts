/**
 * Service for sending emails using nodemailer.
 *
 * @module services/emails.service
 */

import nodemailer from 'nodemailer';
import config from '../config/config';
import logger from '../config/logger';

/**
 * Nodemailer transport instance configured with SMTP settings.
 */
const transport = nodemailer.createTransport(config.email.smtp);

/* istanbul ignore next */
/**
 * Verifies the connection to the email server if not in test environment.
 */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() =>
      logger.warn(
        'Unable to connect to email server. Make sure you have configured the SMTP options in .env'
      )
    );
}

/**
 * Sends an email.
 *
 * @param {string} to - Recipient email address.
 * @param {string} subject - Subject of the email.
 * @param {string} text - Plain text body of the email.
 * @returns {Promise<void>} - A promise that resolves when the email is sent.
 */
const sendEmail = async (
  to: string,
  subject: string,
  text: string
): Promise<void> => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
};

/**
 * Sends a reset password email.
 *
 * @param {string} to - Recipient email address.
 * @param {string} token - Reset password token.
 * @returns {Promise<void>} - A promise that resolves when the email is sent.
 */
const sendResetPasswordEmail = async (
  to: string,
  token: string
): Promise<void> => {
  const subject = 'Reset password';
  const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Sends an email verification email.
 *
 * @param {string} to - Recipient email address.
 * @param {string} token - Email verification token.
 * @returns {Promise<void>} - A promise that resolves when the email is sent.
 */
const sendVerificationEmail = async (
  to: string,
  token: string
): Promise<void> => {
  const subject = 'Email Verification';
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

export default {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
