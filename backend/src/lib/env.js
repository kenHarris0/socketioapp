import "dotenv/config"

export const ENV={
    PORT:process.env.PORT,
NODE_ENV:process.env.NODE_ENV,
MONGO_URI:process.env.MONGO_URI,
JWT_SECRET:process.env.JWT_SECRET,
SMTP_USER:process.env.SMTP_USER,
SMTP_PASS:process.env.SMTP_PASS,
SMTP_MAIL:process.env.SMTP_MAIL,
CLIENT_URL:process.env.CLIENT_URL,
}