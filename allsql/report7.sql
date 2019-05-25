SELECT
  Year,
  SUM(IF(POP_FLAG = 'Small', TotalRevenue/CityNumber, 0)) AS Annual_Revenue_Small,
  SUM(IF(POP_FLAG = 'Medium', TotalRevenue/CityNumber, 0)) AS Annual_Revenue_Medium,
  SUM(IF(POP_FLAG = 'Large', TotalRevenue/CityNumber, 0)) AS Annual_Revenue_Large,
  SUM(IF(POP_FLAG = 'Extra Large', TotalRevenue/CityNumber, 0)) AS Annual_Revenue_ExtraLarge
FROM
(
  SELECT INTER.Year AS Year,
  INTER.POP_FLAG AS POP_FLAG,
  SUM(INTER.Revenue) AS TotalRevenue,
  COUNT(distinct(INTER.CityNameAndState)) AS CityNumber
  FROM
    (SELECT
    year(Sell.SellDate) AS Year,
    CASE
      WHEN City.Population < 3700000 THEN 'Small'
      WHEN City.Population >= 3700000 AND City.Population < 6700000 THEN 'Medium'
      WHEN City.Population >= 6700000 AND City.Population < 9000000 THEN 'Large'
      WHEN City.Population >= 9000000 THEN 'Extra Large'
    END AS POP_FLAG,
    Concat(City.CityName, City.State) AS CityNameAndState,
    IF(OnSale.SalePrice IS Null, Product.RetailPrice * Sell.Quantity, OnSale.SalePrice * Sell.Quantity) AS Revenue
    FROM City
    INNER JOIN Store on City.CityName = Store.CityName AND City.State = Store.State
    INNER JOIN Sell on Store.StoreNumber = Sell.StoreNumber
    INNER JOIN Product on Sell.PID = Product.PID
    LEFT OUTER JOIN OnSale on Sell.SellDate = OnSale.Date AND Sell.PID = OnSale.PID) AS INTER
    GROUP BY Year, POP_FLAG
) AS T
GROUP BY Year;