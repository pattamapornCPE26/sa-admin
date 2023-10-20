package main

import (
	"github.com/PiangpornAtWork/sa-66-example/controller"
	"github.com/PiangpornAtWork/sa-66-example/entity"
	"github.com/gin-gonic/gin"
)

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	
	//Get content/:id
	r.GET("/content/:id",  controller.GetContentCourse)

	// Post Approve
	r.POST("/Approve", controller.CreateApprove)

	// show course
	r.GET("/courses", controller.GetAllCourse)
	
	// show course/:id
	r.GET("/course/:id", controller.GetCourseByID)
	
	r.GET("/courseReq", controller.GetCourseByIDwantName)

	r.GET("/teachers/:id", controller.GetTeacher)
	r.GET("/teachers", controller.ListTeachers)

	// get approved, disapproved
	r.GET("/approved", controller.GetApprove)
	r.GET("/disapproved", controller.GetDisapprove)

	r.GET("/courseApproved", controller.GetCourseApproved)

	r.PATCH("/statusAp/:id", controller.UpdateStatusApprove)
	r.PATCH("/statusDis", controller.UpdateStatusDisapprove)
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
