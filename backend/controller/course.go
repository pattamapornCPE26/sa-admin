package controller

import (
	"net/http"
	"time"

	"github.com/PiangpornAtWork/sa-66-example/entity"
	"github.com/gin-gonic/gin"
)

// GET /course
func GetAllCourse(c *gin.Context) {
	var courses []entity.Course
	if err := entity.DB().Raw("SELECT * FROM courses").Scan(&courses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": courses})
}

type courseTeacher struct {
   ID          uint
   Name        string
   Description string
   Image       string
   Category    string
   Teacher_ID  uint
   FirstName   string
   Time_Approve	 time.Time
   StatusName string
}

type courseContent struct {
	ID          uint
	Name        string
	Description string
	VideoPath	string
}


// GET /course/:id
func GetCourseByID(c *gin.Context) {
	var course entity.Course
	// var course []courseTeacher
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM courses WHERE id = ?", id).Find(&course).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": course})
}



func GetDeacription(c *gin.Context) {
	var material []entity.Material
	if err := entity.DB().Raw("SELECT * FROM materials").Find(&material).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": material})
}

func GetCourseByIDwantName(c *gin.Context) {
	var course []courseTeacher
	if err := entity.DB().Raw("SELECT courses.id, courses.name, teachers.first_name " +
	"FROM teachers INNER JOIN courses " +
	"ON teachers.id = courses.teacher_id ").Find(&course).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": course})
}

func GetCourseApproved(c *gin.Context) {
	var courses []courseTeacher
	if err := entity.DB().Raw("SELECT courses.name, teachers.first_name, statuses.name AS StatusName, approve_courses.Time_Approve FROM " +
	"teachers INNER JOIN courses INNER JOIN approve_courses INNER JOIN statuses " +
	"ON teachers.id = courses.teacher_id " +
	"AND courses.id  = approve_courses.course_id " +
	"AND statuses.id = approve_courses.status_id " + 
	"WHERE approve_courses.status_id = 1 " + 
	"OR approve_courses.status_id = 2").Scan(&courses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": courses})
}

func GetContentCourse(c *gin.Context) {
	var course []courseContent
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT courses.id,units.name,materials.video_path, units.description "+
	"FROM courses INNER JOIN teachers INNER JOIN units INNER JOIN materials "+
	"ON courses.teacher_id = teachers.id AND courses.id = units.course_id AND materials.unit_id = units.id "+
	"WHERE courses.id = ?", id).Find(&course).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": course})
}

// var course []courseTeacher
// 	if err := entity.DB().Raw("SELECT courses.id, courses.name, teachers.first_name " +
// 	"FROM teachers INNER JOIN courses INNER JOIN approve_courses " +
// 	"ON teachers.id = courses.teacher_id " + 
// 	"AND courses.id = approve_courses.course_id " +
// 	"WHERE approve_courses.status_id IS NULL").Find(&course).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": course})