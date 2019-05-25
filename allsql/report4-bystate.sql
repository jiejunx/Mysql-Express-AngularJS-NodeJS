Select  B.StoreNumber, B.StreetAddress, B.CityName, B.SaleYear as Year, ROUND(SUM(B.Price * B.Quantity),2) AS TotRevenue
FROM(
        SELECT Store.StoreNumber AS StoreNumber, Store.StreetAddress AS StreetAddress, Store.CityName AS CityName, Store.State as State, year(Sell.SellDate) AS SaleYear,  IF(OnSale.SalePrice Is NULL, Product.RetailPrice, OnSale.SalePrice) as Price,
               Sell.Quantity AS Quantity
        From Store
                 INNER JOIN Sell ON Store.StoreNumber = Sell.StoreNumber
                 INNER JOIN Product ON Sell.PID = Product.PID
                 LEFT OUTER JOIN OnSale ON Sell.PID = OnSale.PID AND Sell.SellDate = OnSale.Date
        WHERE State = ?
    ) AS B
GROUP BY B.SaleYear, B.StoreNumber
ORDER BY B.SaleYear ASC, TotRevenue DESC;
