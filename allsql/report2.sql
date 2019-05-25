Select BelongTo.CatName, COUNT(BelongTo.PID) AS Prod_count, COUNT(DISTINCT (Product.MfgrName)) AS Mf_count,
ROUND(AVG(Product.RetailPrice),2) AS Average_Price
FROM BelongTo
INNER JOIN Category ON Category.CatName = BelongTo.CatName
INNER JOIN Product ON BelongTo.PID = Product.PID
GROUP BY BelongTo.CatName
ORDER BY BelongTo.CatName;