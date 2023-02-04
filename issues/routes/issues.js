const express=require("express");
const router=express.Router();
const issueController=require("../controllers/issuesController");
const imageController=require("../controllers/imagesController");

router.post("/create-issue",issueController.createNewIssue);
router.get("/all-issues",issueController.getAllIssues);
router.post("/my-issues",issueController.getIssuesByUser);
router.get("/Issue",issueController.getIssueById);
router.put("/update-issue",issueController.updateIssue);
router.put("/edit-issue",issueController.editIssue);
router.delete("/delete-issue",issueController.deleteIssue);
router.post("/upload", imageController.uploadFiles);
router.get("/files", imageController.getListFiles);
router.get("/files/:name", imageController.download);

module.exports=router;