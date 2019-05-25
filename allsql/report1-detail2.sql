Select MfgrName, COUNT(PID) AS Total_Pid, AVG(RetailPrice) AS
                               Average_Price, MIN(RetailPrice) AS Min_Price, MAX(RetailPrice) AS
                               Max_Price
FROM Product
WHERE MfgrName = ?;