SELECT MfgrName, COUNT(PID) AS Total_Pid, AVG(RetailPrice) AS
                               Average_Price, MIN(RetailPrice) AS Min_Price, MAX(RetailPrice) AS
                               Max_Price
FROM Product
GROUP BY MfgrName
ORDER BY Average_Price DESC LIMIT 100;