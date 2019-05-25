SELECT G.Year, K.quantity, Round(K.reg_qty, 2) AS reg_qty, G.gd_qty
FROM
(SELECT Sell.SellDate, year(SellDate) as Year, SUM(Sell.Quantity) as gd_qty
FROM BelongTo
INNER JOIN Sell ON BelongTo.PID = Sell.PID
WHERE BelongTo.CatName = 'air conditioner' AND month(SellDate) = 2 AND day(SellDate) = 2
GROUP BY Sell.SellDate) as G
INNER JOIN
(SELECT R.Year as Year, SUM(R.reg_date_qty) as quantity, AVG(R.reg_date_qty) as reg_qty
FROM (SELECT SellDate as Date, year(SellDate) as Year, SUM(Quantity) as reg_date_qty
FROM BelongTo
INNER JOIN Sell ON BelongTo.PID = Sell.PID
WHERE BelongTo.CatName = 'air conditioner' GROUP BY Date) as R
GROUP BY R.Year) as K ON G.Year = K.Year
ORDER BY G.Year ASC;
