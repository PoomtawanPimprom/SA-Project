package controller

import (
	"net/http"

	"github.com/Chinnapatz/ProjectSA/entity"
	"github.com/gin-gonic/gin"
)

func CreateRating(c *gin.Context) {
	var member entity.Member
	var cartoon entity.Cartoon
	idMember := c.Param("mem4RatingID")
	idCartoon := c.Param("toon4RatingID")
	if tx := entity.DB().Where("id=?", idCartoon).Find(&cartoon); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cartoon not found"})
		return
	}
	if tx := entity.DB().Where("id=?", idMember).Find(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}
	f := entity.Rating{
		MemberID:  &member.ID,
		CartoonID: &cartoon.ID,
	}
	if err := entity.DB().Create(&f).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": f})
}
func CheckCartoonRatingByID(c *gin.Context) {
	var rating entity.Rating
	idMember := c.Param("mem4RatingID")
	idCartoon := c.Param("toon4RatingID")
	result := entity.DB().Raw("SELECT * FROM ratings WHERE cartoon_id = ? AND member_id = ? ", idCartoon, idMember).Scan(&rating)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบข้อมูล"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rating})
}

// DELETE /bookshelf/follows/:memberID/:cartoonID
func DeleteRating(c *gin.Context) {
	idMember := c.Param("mem4RatingID")
	idCartoon := c.Param("toon4RatingID")

	if tx := entity.DB().Exec("DELETE FROM ratings WHERE member_id = ? AND cartoon_id = ?", idMember, idCartoon); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": idMember})
}








func GetCartoonRating1stID(c *gin.Context) {
	var ratings entity.Rating
	if err := entity.DB().Raw("SELECT cartoon_id FROM ratings GROUP BY cartoon_id HAVING COUNT(*) > 0 ORDER BY COUNT(*) DESC LIMIT 1 OFFSET 0").Find(&ratings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ratings})
}
func GetCartoonRating2ndID(c *gin.Context) {
	var ratings entity.Rating
	if err := entity.DB().Raw("SELECT cartoon_id FROM ratings GROUP BY cartoon_id HAVING COUNT(*) > 0 ORDER BY COUNT(*) DESC LIMIT 1 OFFSET 1").Find(&ratings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ratings})
}
func GetCartoonRating3thID(c *gin.Context) {
	var ratings entity.Rating
	if err := entity.DB().Raw("SELECT cartoon_id FROM ratings GROUP BY cartoon_id HAVING COUNT(*) > 0 ORDER BY COUNT(*) DESC LIMIT 1 OFFSET 2").Find(&ratings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ratings})
}
