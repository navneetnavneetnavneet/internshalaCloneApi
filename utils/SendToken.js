exports.sendtoken = (employe, statusCode, res) => {
  const token = employe.getjwttoken();

  const options = {
    exipres: new Date(Date.now),
    httpOnly: true,
    secure: true,
    sameSite: "None",
    // httpOnly: Client-side JavaScript ko cookie access nahi kar sakta.
    // secure: Cookie sirf HTTPS connection par hi bheji ja sakti hai.
    // sameSite: 'None' : Cookie third-party contexts mein bhi bheji ja sakti hai.
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, id: employe._id, token });
};
