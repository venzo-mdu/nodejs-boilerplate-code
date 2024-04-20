import Users from "../models/user.js";
import { uid } from "uid";
import { userValidationSchema } from "../validation/userValidation.js"
import { emailVerification } from "../utilities/email/email.js";

/*@desc create data 
* @access public
*/
export const createData = async (req, res) => {
  try {
    //input validation
    const { error, value } = userValidationSchema.validate(req.body);
    if (error) {
      console.error("Validation error:", error.details);
      return res.status(400).json({ message: "Validation error" });
    }
    const { username, email } = value;
    const userId = uid(); // Generate a unique user ID
    const createUser = await Users.create({
      user_id: userId,
      username: username,
      email: email
    });
    res.status(201).json(createUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/*@desc read data 
* @access public
*/
export const readData = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error reading users:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/*@desc update data 
* @access public
*/
export const updateData = async (req, res) => {
  try {
    //input validation
    const { error, value } = userValidationSchema.validate(req.body);
    if (error) {
      console.error("Validation error:", error.details);
      return res.status(400).json({ message: "Validation error" });
    }
    const { id } = req.params;
    const { username, email } = value;
    const updatedUser = await Users.findByIdAndUpdate(
      id,
      { username: username, email: email },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/*@desc delete data 
* @access public
*/
export const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await Users.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/*
 * @desc sample send email method, 
 * integrate inside the respective api's
 * @access Public
 */
export const sendEmail = async (req, res) => {
  try {
    let email = "*******@gmail.com" // user email to send email
    const sendEmail = await emailVerification(email);
    if (sendEmail) {
      res.send({
        message: "Email sent successfully",
      });
    } else {
      res.status(500).json({ message: "Error Occured, while sending email" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to send email" });
  }
}