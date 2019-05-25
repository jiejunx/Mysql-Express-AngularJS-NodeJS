SELECT PID, ProductName, Avg_RetailPrice, Total_Quantity, Total_DiscountQuantity, ROUND(Actual_revenue,1) AS Actual_revenue , ROUND(Pred_revenue, 1) AS Pred_revenue,
ROUND(Diff, 1) AS Diff FROM
(Select M.PID AS PID, M.ProductName AS ProductName, AVG(M.RetailPrice) AS Avg_RetailPrice, SUM(M.Quantity) AS Total_Quantity, SUM(M.DiscountQuantity) AS Total_DiscountQuantity,
SUM(M.Price * M.Quantity) AS Actual_revenue ,
SUM(M.RetailPrice * M.Predicted_Quantity) AS Pred_revenue,
(SUM(M.Price*M.Quantity) - SUM(M.RetailPrice * M.Predicted_Quantity)) AS Diff
FROM (SELECT Product.PID, Product.ProductName, Sell.Quantity, Product.RetailPrice,
IF(SalePrice Is NULL, RetailPrice, SalePrice) as Price,
IF(SalePrice Is NULL, Quantity, Quantity*0.75) as Predicted_Quantity,
IF(SalePrice Is NULL, 0, Quantity) as DiscountQuantity
FROM Sell
INNER JOIN Product ON Product.PID = Sell.PID
INNER JOIN BelongTo ON Product.PID = BelongTo.PID
LEFT OUTER JOIN OnSale ON Sell.SellDate = OnSale.Date AND Sell.PID = OnSale.PID
WHERE BelongTo.CatName = 'GPS') AS M
GROUP BY M.PID) AS N
WHERE ABS(Diff) > 5000
ORDER BY Diff DESC;
