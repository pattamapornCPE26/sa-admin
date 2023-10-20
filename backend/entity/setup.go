package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-66.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	// Migrate the schema
	database.AutoMigrate(
		&Admin{},
		&Approve_Course{},
		&Course{},
		&Enrollment{},
		&Material{},
		&Student{},
		&Teacher{},
		&Unit{},
		&Status{},
	)

	

	// initialStatusValue := []Status{
	// 	{Name: "approved"},
	// 	{Name: "unapproved"},
	// }

	// database.Create(&initialStatusValue)
	
	db = database

}
