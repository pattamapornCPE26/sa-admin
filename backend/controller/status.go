package controller


import (
	"net/http"

	"github.com/PiangpornAtWork/sa-66-example/entity"
	"github.com/gin-gonic/gin"
)

func GetApprove(c *gin.Context) {
	var status entity.Status
	if err := entity.DB().Raw("SELECT * FROM statuses WHERE id = 1").Scan(&status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": status})
}

func GetDisapprove(c *gin.Context) {
	var status entity.Status
	if err := entity.DB().Raw("SELECT * FROM statuses WHERE id = 2").Scan(&status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": status})
}