package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/PiangpornAtWork/sa-66-example/entity"
)

// POST /users
func CreateUnit(c *gin.Context) {
	var unit entity.Unit
	var course entity.Course

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&unit); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", unit.Course_ID).First(&course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "unit not found"})
		return
	}

	// สร้าง User
	u := entity.Unit{
		Course : course ,         // โยงความสัมพันธ์กับ Entity Gender
		Name: unit.Name, // ตั้งค่าฟิลด์ FirstName
		Order:  unit.Order,  // ตั้งค่าฟิลด์ LastName
   // ตั้งค่าฟิลด์ Phone
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}


func GetUnit(c *gin.Context) {
	var unit entity.Unit
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM units WHERE id = ?", id).Find(&unit).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	// if err := entity.DB().Preload("Gender").Raw("SELECT * FROM users WHERE id = ?", id).Find(&user).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	c.JSON(http.StatusOK, gin.H{"data": unit})
}