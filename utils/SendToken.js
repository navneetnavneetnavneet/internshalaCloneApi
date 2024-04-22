exports.sendtoken = (student, statusCode, res) => {
    const token = student.getjwttoken();

    const options = {
        exipres: new Date(Date.now),
        httpOnly: true,
        // secure: true
    };

    res
    .status(statusCode)
    .cookie("token", token, options)
    .json({success: true, id: student._id, token});
}