-- CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
-- CREATE USER IF NOT EXISTS gatechUser@localhost IDENTIFIED BY 'gatech123';

DROP DATABASE IF EXISTS `cs6400_spring19`; 
SET default_storage_engine=InnoDB;
SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE DATABASE IF NOT EXISTS cs6400_spring19
    DEFAULT CHARACTER SET utf8mb4 
    DEFAULT COLLATE utf8mb4_unicode_ci;
USE cs6400_spring19;

-- GRANT SELECT, INSERT, UPDATE, DELETE, FILE ON *.* TO 'gatechUser'@'localhost';
-- GRANT ALL PRIVILEGES ON `gatechuser`.* TO 'gatechUser'@'localhost';
-- GRANT ALL PRIVILEGES ON `cs6400_fa17_team001`.* TO 'gatechUser'@'localhost';
-- FLUSH PRIVILEGES;

-- Tables 

CREATE TABLE City (
	CityName varchar(50) NOT NULL,
	State varchar(60) NOT NULL,
	Population int(11) NOT NULL,
	PRIMARY KEY(CityName, State),
	CHECK (Population >= 0)
);


CREATE TABLE Store (
	StoreNumber varchar(150) NOT NULL,
	PhoneNumber varchar(50) NOT NULL,
	StreetAddress varchar(200) NOT NULL,
	CityName varchar(50) NOT NULL,
	State varchar(60) NOT NULL,
	PRIMARY KEY(StoreNumber),
	FOREIGN KEY(CityName, State) REFERENCES City(CityName, State)
);


CREATE TABLE ActiveManager (
    	Email VARCHAR(200) NOT NULL,
    	ManagerName VARCHAR(100) NOT NULL,
    	PRIMARY KEY (Email)
);

CREATE TABLE Assign (
	StoreNumber varchar(150) NOT NULL,
	ActiveManagerEmail varchar(200) NOT NULL,
	PRIMARY KEY(StoreNumber, ActiveManagerEmail),
	FOREIGN KEY(StoreNumber) REFERENCES Store(StoreNumber),
FOREIGN KEY(ActiveManagerEmail) REFERENCES ActiveManager(Email)
);

CREATE TABLE InactiveManager (
    Email VARCHAR(200) NOT NULL,
    ManagerName VARCHAR(100) NOT NULL,
    PRIMARY KEY (Email)
);



CREATE TABLE Manufacturer (
MfgrName VARCHAR(100) NOT NULL,
MaxDiscount FLOAT NOT NULL,
PRIMARY KEY (MfgrName),
CHECK (MaxDiscount<=0.9 AND MaxDiscount>=0)
);


CREATE TABLE Product (
	PID VARCHAR(150) NOT NULL,
	MfgrName VARCHAR(100) NOT NULL,
	ProductName VARCHAR(100) NOT NULL,
	RetailPrice FLOAT NOT NULL,
	PRIMARY KEY (PID),
	FOREIGN KEY (MfgrName) REFERENCES Manufacturer(MfgrName),
	CHECK (RetailPrice >= 0)
);



CREATE TABLE Day (
	Date DATE NOT NULL,
	PRIMARY KEY(Date)
);


CREATE TABLE Sell (
StoreNumber VARCHAR(150) NOT NULL,
SellDate DATE NOT NULL,
PID VARCHAR(150) NOT NULL,
Quantity int NOT NULL,
PRIMARY KEY(StoreNumber, SellDate, PID),
FOREIGN KEY (StoreNumber) REFERENCES Store(StoreNumber),
FOREIGN KEY (SellDate) REFERENCES Day(Date),
FOREIGN KEY (PID) REFERENCES Product(PID), 
CHECK (Quantity >= 0)
);

CREATE TABLE Category (
	CatName varchar(100) NOT NULL,
	PRIMARY KEY(CatName)
);


CREATE TABLE Holiday (
	Date DATE NOT NULL,
	HolidayName varchar(50) NOT NULL,
	PRIMARY KEY(Date),
	FOREIGN KEY (Date) REFERENCES Day(Date)
);

CREATE TABLE BelongTo (
	PID varchar(150) NOT NULL,
	CatName varchar(100) NOT NULL,
	PRIMARY KEY(PID, CatName),
	FOREIGN KEY (PID) REFERENCES Product(PID),
	FOREIGN KEY(CatName) REFERENCES Category(CatName)
);

CREATE TABLE OnSale (
	Date DATE NOT NULL,
	PID VARCHAR(150) NOT NULL,
	SalePrice FLOAT NOT NULL,
	PRIMARY KEY(Date, PID),
	FOREIGN KEY(Date) REFERENCES Day(Date),
	FOREIGN KEY (PID) REFERENCES Product(PID),
	CHECK (SalePrice >= 0)
);