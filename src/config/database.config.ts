import { registerAs } from "@nestjs/config"

export default registerAs('database', () => ({
    type: process.env["DB_TYPE"] as any,
    url: process.env["DB_CONNECTION_URL"]
}))