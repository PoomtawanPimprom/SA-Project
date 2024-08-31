package controller

import (
	"net/http"
	"github.com/Chinnapatz/ProjectSA/entity"
	"github.com/gin-gonic/gin"
)

func CheckPaymentEP(c *gin.Context) {
	var PaymentEP entity.PaymentEpisode
	idMember := c.Param("member_ID")
	idE := c.Param("ID_E")
	result := entity.DB().Raw("SELECT * FROM payment_episodes WHERE episodes_id = ? AND member_id = ? ", idE, idMember).Scan(&PaymentEP)
	// ตรวจสอบว่ามี error หรือไม่
	if result.Error != nil {
		// มี error ในการดึงข้อมูล
		c.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
		return
	}
	// ไม่มี error แสดงว่าข้อมูลถูกดึงมาสำเร็จ
	// ตรวจสอบว่ามีข้อมูลหรือไม่
	if result.RowsAffected == 0 {
		// ไม่พบข้อมูล
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบข้อมูล"})
		return
	}
	// มีข้อมูล ส่งข้อมูลที่ได้กลับไป
	c.JSON(http.StatusOK, gin.H{"data": PaymentEP})
}

// GET /package/:id/:id
func UpdatePaymentEp(c *gin.Context) {
	var cartoonCoin entity.Episodes
	var member entity.Member

	idMember := c.Param("member_ID")
	idE := c.Param("ID_E")

	// ค้นหา user ด้วย id
	if err := entity.DB().Raw("SELECT * FROM members WHERE id = ?", idMember).Scan(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Raw("SELECT * FROM episodes WHERE id = ?", idE).Scan(&cartoonCoin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Add Coins from the Package to the existing Coins of the Member
	if member.Coins < cartoonCoin.Price {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ยอดเหรียญไม่เพียงพอ"})
		return
	}
	member.Coins -= cartoonCoin.Price

	// Update the Member with the new Coins value
	if err := entity.DB().Model(&member).Update("Coins", member.Coins).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	payment := entity.PaymentEpisode{
		MemberID:   &member.ID,
		EpisodesID: &cartoonCoin.ID,
	}

	if err := entity.DB().Create(&payment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payment})

}
