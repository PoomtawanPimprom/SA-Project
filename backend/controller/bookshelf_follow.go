package controller

import (
	"net/http"
	"github.com/Chinnapatz/ProjectSA/entity"
	"github.com/gin-gonic/gin"
)

//GET bookshelf/follow/:ID
func CreateFollow(c *gin.Context) {
	var member entity.Member
	var cartoon entity.Cartoon
	idMember := c.Param("memberID")
	idCartoon := c.Param("cartoonID")

	if tx := entity.DB().Where("id=?", idCartoon).Find(&cartoon); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cartoon not found"})
		return
	}
	if tx := entity.DB().Where("id=?", idMember).Find(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}
	f := entity.Follow{
		MemberID:  &member.ID,
		CartoonID: &cartoon.ID,
	}
	if err := entity.DB().Create(&f).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": f})
}

// GET bookshelf/follow/:id
func GetCartoonFollowByID(c *gin.Context) {
	var follow []entity.Follow
	var cartoons []entity.Cartoon

	idMember := c.Param("ID")

	if err := entity.DB().Raw("SELECT * FROM follows WHERE member_id = ?", idMember).Scan(&follow).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	for _, cartoon := range follow {
		var singleCartoon entity.Cartoon
		if err := entity.DB().Raw("SELECT * FROM cartoons WHERE id = ?", cartoon.CartoonID).Scan(&singleCartoon).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		cartoons = append(cartoons, singleCartoon)
	}
	c.JSON(http.StatusOK, gin.H{"data": cartoons})
}

// GET bookshelf/followsCheck/:memberID/:cartoonID
func CheckCartoonFollowByID(c *gin.Context) {
	var follow entity.Follow
	idMember := c.Param("memberID")
	idCartoon := c.Param("cartoonID")
	result := entity.DB().Raw("SELECT * FROM follows WHERE cartoon_id = ? AND member_id = ? ", idCartoon, idMember).Scan(&follow)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบข้อมูล"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": follow})
}

// DELETE /bookshelf/follows/:memberID/:cartoonID
func DeleteFollow(c *gin.Context) {
	idMember := c.Param("memberID")
	idCartoon := c.Param("cartoonID")

	if tx := entity.DB().Exec("DELETE FROM follows WHERE member_id = ? AND cartoon_id = ?", idMember, idCartoon); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": idMember})
}


