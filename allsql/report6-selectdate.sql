SELECT T.CatName, T.State, T.Qty
FROM
(SELECT BelongTo.CatName, Store.State, SUM(Sell.Quantity) as Qty
FROM BelongTo
INNER JOIN Product ON BelongTo.PID = Product.PID
INNER JOIN
(SELECT Sell.StoreNumber, year(SellDate) AS year, month(SellDate) AS month,
PID, Quantity FROM Sell) as Sell
ON Product.PID = Sell.PID
INNER JOIN Store ON Sell.StoreNumber = Store.StoreNumber
WHERE month = ? AND year = ?
GROUP BY CatName, State) AS T
INNER JOIN
(SELECT Temp.CatName as CatName, MAX(Temp.Qty) as max_q FROM
(SELECT BelongTo.CatName, Store.State, SUM(Sell.Quantity) as Qty
FROM BelongTo
INNER JOIN Product ON BelongTo.PID = Product.PID
INNER JOIN
(SELECT Sell.StoreNumber, year(SellDate) AS year, month(SellDate) AS month,
PID, Quantity FROM Sell) as Sell
 ON Product.PID = Sell.PID
INNER JOIN Store ON Sell.StoreNumber = Store.StoreNumber
WHERE month = ? AND year = ?
GROUP BY CatName, State) AS Temp
GROUP BY CatName) AS Temp2
ON T.CatName = Temp2.CatName AND T.Qty = Temp2.max_q
ORDER BY T.CatName ASC;
