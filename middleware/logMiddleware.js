module.exports = (res, req, next) => {
    console.log(
        (Date.now()).toString(),
        res.method,
        res.url,
        res.headers["user-agent"]
    );
    next();
}