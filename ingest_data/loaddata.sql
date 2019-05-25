-- Please check if the local infile function is permitted in your database
-- You can check it using:
-- SHOW VARIABLES LIKE 'local_infile';
-- If local_infile is OFF, just set:
-- SET GLOBAL local_infile = 1;

-- Don't forget to change the path in the local infile path
-- Mine is '/Users/Mac/Downloads/LoadData'

LOAD DATA LOCAL INFILE '/Users/Mac/Downloads/LoadData/Stores.csv'
INTO TABLE City
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(@StoreNumber, @PhoneNumber, @StreetAddress, CityName,  State,
Population,  @managerfirstname,  @managerlastname, @ManagerName, @Email);


LOAD DATA LOCAL INFILE '/Users/Mac/Downloads/LoadData/Stores.csv'
INTO TABLE Store
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(StoreNumber, PhoneNumber, StreetAddress, CityName,  State,
@Population,  @managerfirstname,  @managerlastname, @ManagerName, @Email);

LOAD DATA LOCAL INFILE '/Users/Mac/Downloads/LoadData/Stores.csv'
INTO TABLE ActiveManager
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(@StoreNumber, @PhoneNumber, @StreetAddress, @CityName,  @State,
@Population,  @managerfirstname,  @managerlastname, ManagerName, Email);

DELETE FROM ActiveManager WHERE Email = '';

LOAD DATA LOCAL INFILE '/Users/Mac/Downloads/LoadData/Stores.csv'
INTO TABLE Assign
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(StoreNumber, @PhoneNumber, @StreetAddress, @CityName,  @State,
@Population,  @managerfirstname,  @managerlastname, @ManagerName, ActiveManagerEmail);

LOAD DATA LOCAL INFILE '/Users/Mac/Downloads/LoadData/Products.csv'
INTO TABLE Manufacturer
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(@PID, MfgrName, @ProductName, @CatName, @RetailPrice, MaxDiscount);

LOAD DATA LOCAL INFILE '/Users/Mac/Downloads/LoadData/Products.csv'
INTO TABLE Category
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(@PID, @MfgrName, @ProductName, CatName, @RetailPrice, @MaxDiscount);

LOAD DATA LOCAL INFILE '/Users/Mac/Downloads/LoadData/Products.csv'
INTO TABLE Product
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(PID, MfgrName, ProductName, @CatName, RetailPrice, @MaxDiscount);

LOAD DATA LOCAL INFILE '/Users/Mac/Downloads/LoadData/Products.csv'
INTO TABLE BelongTo
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(PID, @MfgrName, @ProductName, CatName, @RetailPrice, @MaxDiscount);

LOAD DATA LOCAL INFILE '/Users/Mac/Downloads/LoadData/Sales.csv'
INTO TABLE Day
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(@StoreNumber, @PID, Date, @Quantity);

LOAD DATA LOCAL INFILE '/Users/Mac/Downloads/LoadData/Sales.csv'
INTO TABLE Sell
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(StoreNumber, PID, SellDate, Quantity);

LOAD DATA LOCAL INFILE '/Users/Mac/Downloads/LoadData/SalePrices.csv'
INTO TABLE Onsale
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(PID, Date, SalePrice);

LOAD DATA LOCAL INFILE '/Users/Mac/Downloads/LoadData/Holidays.csv'
INTO TABLE Holiday
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(Date, HolidayName);


