module.exports.checkToken = (req, res, next) => {
    const token = req.headers['x-token'];
    if (token !== process.env.TOKEN) {
        return res.status(401).json({ message: 'Please authorize' })
    }
    next();
}

module.exports.giveToken = (req, res, next) => {
    const token = process.env.TOKEN;
    res.setHeader('x-token', token);
    next();
}