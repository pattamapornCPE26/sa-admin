package entity

import (
	"time"

	
	"gorm.io/gorm"
)

// "golang.org/x/text/number"
type Teacher struct{
	gorm.Model
	FirstName string `gorm:"not null"` 
	LastName string  `gorm:"not null"` 
	Email    string `gorm:"uniqueIndex"`
	Password string `gorm:"not null"` 
	Phone string	`gorm:"not null"` 
	Infomation string
	Background_Pic string
	Profile_Pic string

	Course []Course `gorm:"foreignKey:Teacher_ID"`
}

type Course struct {
	gorm.Model

	Name string			`gorm:"not null"` 
	Description string	`gorm:"not null"` 
	Image string 		`gorm:"type:longtext"`

	CreateTime time.Time
	Teacher_ID *uint
	Teacher Teacher `gorm:"foreignKey:Teacher_ID"`

	Category_ID *uint
	Category Category `gorm:"foreignKey:Category_ID"`

	Unit []Unit `gorm:"foreignKey:Course_ID"`
	Approve_Course []Approve_Course `gorm:"foreignKey:Course_ID"`
}

type Unit struct {
	gorm.Model
	
	Name string	`gorm:"not null"` 
	Order int32 `gorm:"not null"`
	Description string 
	
	Course_ID *uint
	Course Course `gorm:"foreignKey:Course_ID"`
	
	Material []Material `gorm:"foreignKey:Unit_ID"`
	
}

type Category struct {
	gorm.Model

	Name string
	Course []Course `gorm:"foreignKey:Category_ID"`
}

type Material struct {
	gorm.Model

	VideoPath string `gorm:"not null"` 
		
	Unit_ID *uint
	Unit Unit `gorm:"foreignKey:Unit_ID"`
					
}

type Admin struct{
	gorm.Model

	FirstName string
	LastName string 
	Email    string `gorm:"uniqueIndex"`
	Password string
	Phone string

	Approve_Course []Approve_Course `gorm:"foreignKey:Admin_ID"`
}

type Approve_Course struct {
	gorm.Model

	Time_Approve time.Time
	Description string

	Admin_ID *uint
	Admin Admin `gorm:"foreignKey:Admin_ID"`

	Course_ID *uint
	Course Course `gorm:"foreignKey:Course_ID"`

	Status_ID *uint
	Status Status `gorm:"foreignKey:Status_ID"`

	Enrollment []Enrollment `gorm:"foreignKey:Approve_Course_ID"`
}

type Status struct {
	gorm.Model

	Name string
	Approve_Course []Approve_Course `gorm:"foreignKey:Status_ID"`
}

type Enrollment struct {
	gorm.Model

	EnrollTime time.Time

	Student_ID *uint
	Student Student `gorm:"foreignKey:Student_ID"`

	Approve_Course_ID *uint
	Approve_Course Approve_Course `gorm:"foreignKey:Approve_Course_ID"`
}

type Student struct{
	gorm.Model
	FirstName string `gorm:"not null"` 
	LastName string  `gorm:"not null"` 
	Email    string `gorm:"uniqueIndex"`
	Password string `gorm:"not null"` 
	Phone string	`gorm:"not null"` 
	Infomation string
	Background_Pic string
	Profile_Pic string

	Enrollment []Enrollment `gorm:"foreignKey:Student_ID"`
}