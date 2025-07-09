package handlers

import (
	"encoding/json"
	"playrook/pkg/core"
	"playrook/pkg/models"

	"github.com/gin-gonic/gin"
)

type PlaybookInfo struct {
	Name string `json:"name"`
	Id   int    `json:"id"`
}

type PlaybookData struct {
	Name      string              `json:"name"`
	StartNode string              `json:"start_node"`
	Nodes     map[string]NodeData `json:"nodes"`
}

type NodeData struct {
	Name        string            `json:"name"`
	Description string            `json:"description"`
	Next        map[string]string `json:"next"`
}

type UpdatePlaybookInput struct {
	Data    PlaybookData `json:"data"`
	RawData string       `json:"raw_data"`
}

type GetPlaybookOutput struct {
	Data    PlaybookData `json:"data"`
	RawData string       `json:"raw_data"`
}

func ListPlaybooks(c *gin.Context) {
	// Stub for now
	var playbooksInfo []PlaybookInfo
	var playbooks []*models.Playbook
	core.GetDB().Find(&playbooks)

	for _, playbook := range playbooks {
		playbooksInfo = append(playbooksInfo, PlaybookInfo{Name: playbook.Name, Id: playbook.Id})
	}

	if playbooksInfo == nil {
		playbooksInfo = []PlaybookInfo{}
	}

	c.JSON(200, gin.H{
		"data": playbooksInfo,
	})
}

func CreatePlaybook(c *gin.Context) {
	// Create playbook - name should be empty, id should be set by database
	playbook := &models.Playbook{}
	playbook.Name = "New playbook"

	core.GetDB().Create(playbook)

	c.JSON(200, gin.H{
		"data": "ok",
	})
}

func GetPlaybook(c *gin.Context) {
	var playbook *models.Playbook
	id, found := c.Params.Get("id")
	if !found {
		c.JSON(400, gin.H{"error": "missing id parameter"})
		return
	}

	core.GetDB().First(&playbook, id)
	if playbook == nil {
		c.JSON(404, gin.H{"error": "playbook not found"})
		return
	}

	var playbookData PlaybookData
	json.Unmarshal([]byte(playbook.Data), &playbookData)

	c.JSON(200, gin.H{
		"data": GetPlaybookOutput{
			Data:    playbookData,
			RawData: playbook.RawData,
		},
	})
}

func UpdatePlaybook(c *gin.Context) {
	id, found := c.Params.Get("id")
	if !found {
		c.JSON(400, gin.H{"error": "missing id parameter"})
		return
	}

	var playbook *models.Playbook
	core.GetDB().First(&playbook, id)
	if playbook == nil {
		c.JSON(404, gin.H{"error": "playbook not found"})
		return
	}

	// var playbookData PlaybookData
	var input UpdatePlaybookInput
	if err := c.BindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	var playbookData = input.Data

	jsonBytes, err := json.Marshal(playbookData)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	playbook.Data = string(jsonBytes)
	playbook.Name = playbookData.Name
	playbook.RawData = input.RawData
	core.GetDB().Save(playbook)
}

// Add this function to the handlers package
func DeletePlaybook(c *gin.Context) {
	id, found := c.Params.Get("id")
	if !found {
		c.JSON(400, gin.H{"error": "missing id parameter"})
		return
	}

	var playbook models.Playbook
	result := core.GetDB().First(&playbook, id)
	if result.Error != nil {
		c.JSON(404, gin.H{"error": "playbook not found"})
		return
	}

	// Delete the playbook from the database
	if err := core.GetDB().Delete(&playbook).Error; err != nil {
		c.JSON(500, gin.H{"error": "failed to delete playbook: " + err.Error()})
		return
	}

	c.JSON(200, gin.H{
		"data": "playbook deleted successfully",
	})
}
