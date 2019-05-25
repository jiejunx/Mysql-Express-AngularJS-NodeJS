SELECT DISTINCT Store.StoreNumber, Store.StreetAddress, Store.CityName, Store.State, ActiveManager.ManagerName, Assign.ActiveManagerEmail
FROM BelongTo
INNER JOIN Product ON BelongTo.PID = Product.PID
INNER JOIN
(SELECT Sell.StoreNumber, year(SellDate) AS year, month(SellDate) AS month,
PID, Quantity FROM Sell) as Sell
ON Product.PID = Sell.PID
INNER JOIN Store ON Sell.StoreNumber = Store.StoreNumber
INNER JOIN Assign ON Store.StoreNumber = Assign.StoreNumber
INNER JOIN ActiveManager ON Assign.ActiveManagerEmail
= ActiveManager.Email
WHERE CatName = ? AND State = ? AND year = ? AND month = ?
ORDER BY Store.StoreNumber ASC;