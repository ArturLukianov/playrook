package main

import (
	"playrook/pkg/core"
	"playrook/pkg/handlers"
	"playrook/pkg/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {
	db, err := gorm.Open(sqlite.Open("db.sqlite"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Auto migrate the models
	db.AutoMigrate(&models.Playbook{})
	core.SetDB(db)

	router := gin.Default()

	config := cors.DefaultConfig()
	config.AllowAllOrigins = true

	router.Use(cors.New(config))

	// Playbook routes
	router.GET("/playbooks", handlers.ListPlaybooks)
	router.GET("/playbook/:id", handlers.GetPlaybook)
	router.PUT("/playbook/:id", handlers.UpdatePlaybook)
	router.POST("/playbook", handlers.CreatePlaybook)

	router.Run() // listen and serve on 0.0.0.0:8080
}
