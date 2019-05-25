Select Product .MfgrName, Product .PID, Product .ProductName,
       NewBelongTo.CatNames, Product .RetailPrice
FROM Product
         INNER JOIN
     (SELECT PID,
             GROUP_CONCAT(CatName) AS CatNames
      FROM BelongTo
      GROUP BY PID) AS NewBelongTo
     ON NewBelongTo.PID = Product .PID
WHERE Product .MfgrName = ?
ORDER BY Product .RetailPrice DESC;