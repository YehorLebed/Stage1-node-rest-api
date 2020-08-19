module.exports.checkToken = (req, res, next) => {
    const token = req.header['X-Token'];
    if (token !== process.env.TOKEN) {
        return res.status(401), json({ message: 'Please authorize' })
    }
    next();
}

module.exports.giveToken = (req, res, next) => {
    const token = process.env.TOKEN;
    res.setHeader('X-Token', token);
    next();
}