export const profile=async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send({ success: true, data: user,message: "Login user profile found successfully",});
  } catch (error) {
    res.status(404).send({ success: false, message: "Profile not found!" });
  }
}