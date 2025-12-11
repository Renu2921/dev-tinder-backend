export const requests=async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    res
      .status(200)
      .send({
        success: true,
        message: user.firstName + " sends you a connection request! ",
      });
  } catch (error) {
    res.status(404).send({ success: false, message: error.message });
  }
}