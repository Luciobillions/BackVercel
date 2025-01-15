import jwt from "jsonwebtoken";


export function verifyToken(token){
try {
    const decoded = jwt.verify(token, "secret") //escribirlo bien porque se pudre todo 
    return decoded
} catch (error) {
    throw new Error("Token invalidate")
}
}