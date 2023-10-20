package controller

import (
	"net/http"
	"time"

	"github.com/PiangpornAtWork/sa-66-example/entity"
	"github.com/gin-gonic/gin"
)

// POST /approveCourse
func CreateApprove(c *gin.Context) {
	var approvedCourse entity.Approve_Course
	var admin entity.Admin
	var course entity.Course

	if err := c.ShouldBindJSON(&approvedCourse); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//ใส่ข้อมูล Admin
	if tx := entity.DB().Where("id = 1").First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	//ใส่ข้อมูล course
	if tx := entity.DB().Where("id = ?", approvedCourse.Course_ID).First(&course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}
	// สร้าง Approve
	a := entity.Approve_Course{
		Admin:  admin,
		Course: course,
		// Status_ID: nil,
	}
	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": a})
}

func UpdateStatusApprove(c *gin.Context) {
	id := c.Param("id")
	var approve entity.Approve_Course

	// ค้นหา approve_course ด้วย course_id เท่ากับ id (ที่ได้จาก URL)
	if tx := entity.DB().Where(" course_id = ?", id).First(&approve); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "CourseAP not found"})
		return
	}

	CurrentTime := time.Now()
	approve.Time_Approve = CurrentTime //update เวลา


	// อัปเดต status_id ของ approve_course ที่มี course_id เท่ากับ id (ที่ได้จาก URL) เป็น 1
	if err := entity.DB().Model(&approve).Where("course_id = ?", id).Update("status_id", 1).Update("time_approve", approve.Time_Approve).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": approve})
}


func UpdateStatusDisapprove(c *gin.Context) {
	var approve entity.Approve_Course

	var input struct {
		Description string
		Course_ID   uint
		Time_Approve time.Time
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา approve_course ด้วย id
	if tx := entity.DB().Where("course_id = ?", input.Course_ID).First(&approve); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
		return
	}

	CurrentTime := time.Now()
	approve.Description = input.Description
	approve.Time_Approve = CurrentTime //update เวลา

	// อัปเดต Status_ID ของ approve_course ที่มี course_id เท่ากับ id (ที่ได้จาก URL) เป็น 1
	if err := entity.DB().Model(&approve).Where("course_id = ?", input.Course_ID).Update("status_id", 2).Update("description", approve.Description).Update("time_approve", approve.Time_Approve).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": approve})
}






// update if click approve
// func UpdateApproveCourse(c *gin.Context) {
// 	id := c.Param("id") // รับค่า id จาก URL

// 	var input struct {
// 		Status_ID   *uint
// 		Description string
// 	}

// 	// แปลง JSON request body เป็นตัวแปร input
// 	if err := c.ShouldBindJSON(&input); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	var approve entity.Approve_Course

// 	// ค้นหา student ด้วย id
// 	if tx := entity.DB().Where("id = ?", id).First(&approve); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
// 		return
// 	}

// 	// อัปเดตข้อมูลของ student ด้วยค่าใหม่
// 	approve.Status_ID = input.Status_ID
// 	approve.Description = input.Description

// 	// บันทึกการอัปเดต
// 	if err := entity.DB().Model(&approve).Where("id = ?", id).Updates(&approve).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": approve})
// }
