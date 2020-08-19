var express = require("express");
var router = express.Router();

const {
  getAllActiveStaff,
  createStaffMember,
  updateStaffMember,
  removeStaffMember,
} = require("../db/staffQueries");

/* GET all staff */
router.get("/", async function (req, res, next) {
  const allStaff = await getAllActiveStaff();
  res.send(allStaff);
});

/* Create staff member */
router.post("/", async function (req, res, next) {
  console.log(req.body.newStaffMember);

  try {
    const savedStaffMemebr = await createStaffMember(req.body.newStaffMember);
    console.log("Saved staff member", savedStaffMemebr);
    res.send(savedStaffMemebr);
  } catch (error) {
    console.log("error in route get /staff/", error);
    res.status(500);
    res.send(error.message);
  }
});

/* Update staff member */
router.put("/:staffId", async function (req, res, next) {
  console.log("update", req.body.updatedStaffMember);
  const updatedStaffMemebr = await updateStaffMember(
    req.body.updatedStaffMember
  );
  console.log("Updated staff member", updatedStaffMemebr);
  res.send(updatedStaffMemebr);
});

/* remove staff member */
router.put("/remove/:staffId", async function (req, res, next) {
  console.log("remove", req.body.removedStaffMember);
  const removedStaffMemebr = await removeStaffMember(
    req.body.removedStaffMember
  );
  console.log("remoeved staff member", removedStaffMemebr);
  res.send(removedStaffMemebr);
});

module.exports = router;
