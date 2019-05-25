SELECT count(StoreNumber) AS count_store FROM Store;
SELECT COUNT(PID) AS count_pid FROM PRODUCT; SELECT count(MfgrName) AS count_mfgr FROM Manufacturer;
SELECT count(Email) AS count_manager FROM (SELECT Email FROM ActiveManager UNION SELECT Email FROM InactiveManager) AS M