import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import firebase from "../firebase/firebaseConfig.js";

const db = getFirestore(firebase);

/*@desc create data
 * @access public
 */

export const createData = async (req, res) => {
  try {
    const data = req.body;
    const resData = await addDoc(collection(db, "course"), data);
    res
      .status(200)
      .send({ key: resData._key, msg: "course created successfully" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

/*@desc read data
 * @access public
 */
export const readData = async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "course"));
    const courseArray = [];

    if (querySnapshot.empty) {
      res.status(400).send("No students found");
    } else {
      querySnapshot.forEach((doc) => {
        const student = {
          id: doc.id,
          name: doc.data().name,
        };
        courseArray.push(student);
      });

      res.status(200).send(courseArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

/*@desc update data
 * @access public
 */
export const updateData = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const course = doc(db, "course", id);
    await updateDoc(course, data);
    res.status(200).send("course updated successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

/*@desc delete data
 * @access public
 */
export const deleteData = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, "course", id));
    res.status(200).send("product deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
