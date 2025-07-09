package models

import "gorm.io/gorm"

type Playbook struct {
	gorm.Model
	Id      int    `json:"id" gorm:"primaryKey"`
	Name    string `json:"name"`
	Data    string `json:"data"`
	RawData string `json:"rawData"`
}
