package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/PiangpornAtWork/sa-66-example/entity"
)

// POST /users
func CreateMaterial(c *gin.Context) {
	var material entity.Material
	var unit entity.Unit

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&material); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", material.Unit_ID).First(&unit); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "teacher not found"})
		return
	}

	// สร้าง User
	u := entity.Material{
		Unit : unit , // ตั้งค่าฟิลด์ LastName
		VideoPath: material.VideoPath,
   // ตั้งค่าฟิลด์ Phone
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}


func GetMaterial(c *gin.Context) {
	var material entity.Material
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM materials WHERE id = ?", id).Find(&material).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": material})
}