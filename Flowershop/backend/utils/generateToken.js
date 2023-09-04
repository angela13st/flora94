import jwt from "jsonwebtoken";

const SECRET_KEY='angela'

const generateToken = (id) => {
    return jwt.sign({id}, SECRET_KEY, {
        expiresIn: '330d',
    })
}

export default generateToken;