exports.sendtoken = (employe, statusCode, res) => {
    const token = employe.getjwttoken();

    const options = {
        exipres: new Date(Date.now),
        httpOnly: true,
        // secure: true
    };

    res
    .status(statusCode)
    .cookie("token", token, options)
    .json({success: true, id: employe._id, token});
}