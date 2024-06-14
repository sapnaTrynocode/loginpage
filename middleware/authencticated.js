import jwt from 'jsonwebtoken';

export const checkUserAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1];

            const { data } = jwt.verify(token, process.env.SECRETKEY);
            req.info = data;
            next();
        } catch (error) {
            console.error(error);
            res.status(401).send({ status: false, message: "Unauthorzed User" });
        }
    } else {
        res.status(401).send({ status: false, message: 'Unauthorized User, no Token' });
    }
};




