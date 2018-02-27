CREATE DATABASE  IF NOT EXISTS `homebase` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `homebase`;
-- MySQL dump 10.13  Distrib 5.7.20, for osx10.11 (x86_64)
--
-- Host: 108.52.189.121    Database: homebase
-- ------------------------------------------------------
-- Server version	5.7.21-1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary table structure for view `sum_category`
--

DROP TABLE IF EXISTS `sum_category`;
/*!50001 DROP VIEW IF EXISTS `sum_category`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `sum_category` AS SELECT 
 1 AS `Category`,
 1 AS `Total`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `sum_category_by_year`
--

DROP TABLE IF EXISTS `sum_category_by_year`;
/*!50001 DROP VIEW IF EXISTS `sum_category_by_year`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `sum_category_by_year` AS SELECT 
 1 AS `Year`,
 1 AS `Category`,
 1 AS `Total`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `category_view`
--

DROP TABLE IF EXISTS `category_view`;
/*!50001 DROP VIEW IF EXISTS `category_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `category_view` AS SELECT 
 1 AS `categoryid`,
 1 AS `Category`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `expense_view`
--

DROP TABLE IF EXISTS `expense_view`;
/*!50001 DROP VIEW IF EXISTS `expense_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `expense_view` AS SELECT 
 1 AS `expenseid`,
 1 AS `Date`,
 1 AS `Title`,
 1 AS `Category`,
 1 AS `Cost`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `sum_category_by_month`
--

DROP TABLE IF EXISTS `sum_category_by_month`;
/*!50001 DROP VIEW IF EXISTS `sum_category_by_month`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `sum_category_by_month` AS SELECT 
 1 AS `Year`,
 1 AS `Month`,
 1 AS `Category`,
 1 AS `Total`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `sum_category`
--

/*!50001 DROP VIEW IF EXISTS `sum_category`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `sum_category` AS select `c`.`category` AS `Category`,sum(json_unquote(json_extract(`e`.`details`,'$.cost'))) AS `Total` from (`expense` `e` join `category` `c` on((`c`.`categoryid` = `e`.`categoryid`))) where (`e`.`isactive` = 1) group by `c`.`category` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `sum_category_by_year`
--

/*!50001 DROP VIEW IF EXISTS `sum_category_by_year`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `sum_category_by_year` AS select year(json_unquote(json_extract(`e`.`details`,'$.expense_date'))) AS `Year`,`c`.`category` AS `Category`,sum(json_unquote(json_extract(`e`.`details`,'$.cost'))) AS `Total` from (`expense` `e` join `category` `c` on((`c`.`categoryid` = `e`.`categoryid`))) where (`e`.`isactive` = 1) group by year(json_unquote(json_extract(`e`.`details`,'$.expense_date'))),`c`.`category` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `category_view`
--

/*!50001 DROP VIEW IF EXISTS `category_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `category_view` AS select `c`.`categoryid` AS `categoryid`,`c`.`category` AS `Category` from `category` `c` where (`c`.`isactive` = 1) order by `c`.`category` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `expense_view`
--

/*!50001 DROP VIEW IF EXISTS `expense_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `expense_view` AS select `e`.`expenseid` AS `expenseid`,json_unquote(json_extract(`e`.`details`,'$.expense_date')) AS `Date`,json_unquote(json_extract(`e`.`details`,'$.title')) AS `Title`,`c`.`category` AS `Category`,json_unquote(json_extract(`e`.`details`,'$.cost')) AS `Cost` from (`expense` `e` join `category` `c` on((`c`.`categoryid` = `e`.`categoryid`))) where (`e`.`isactive` = 1) order by json_unquote(json_extract(`e`.`details`,'$.expense_date')) desc,json_unquote(json_extract(`e`.`details`,'$.title')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `sum_category_by_month`
--

/*!50001 DROP VIEW IF EXISTS `sum_category_by_month`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `sum_category_by_month` AS select year(json_unquote(json_extract(`e`.`details`,'$.expense_date'))) AS `Year`,month(json_unquote(json_extract(`e`.`details`,'$.expense_date'))) AS `Month`,`c`.`category` AS `Category`,sum(json_unquote(json_extract(`e`.`details`,'$.cost'))) AS `Total` from (`expense` `e` join `category` `c` on((`c`.`categoryid` = `e`.`categoryid`))) where (`e`.`isactive` = 1) group by year(json_unquote(json_extract(`e`.`details`,'$.expense_date'))),month(json_unquote(json_extract(`e`.`details`,'$.expense_date'))),`c`.`category` order by `Year` desc,`Month` desc,`c`.`category` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Dumping routines for database 'homebase'
--
/*!50003 DROP PROCEDURE IF EXISTS `usp_edit_table_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_edit_table_data`(`json_text` JSON)
BEGIN
	
    DECLARE `tableName` TEXT DEFAULT JSON_UNQUOTE(JSON_EXTRACT(`json_text`, '$.tableName'));
	DECLARE `tableData` TEXT DEFAULT JSON_EXTRACT(`json_text`, CONCAT('$.',`tableName`));
    
    IF (`tableName` = 'expenseTable')
    THEN
    
		SET @expenseid = JSON_UNQUOTE(JSON_EXTRACT(`tableData`, '$.expenseid'));
		SET @categoryid = JSON_UNQUOTE(JSON_EXTRACT(`tableData`, '$.categoryid'));
		SET @isactive = 	JSON_UNQUOTE(JSON_EXTRACT(`tableData`, '$.isactive'));
        
        SET `tableData` = JSON_REMOVE(`tableData`, '$.expenseid');
        SET `tableData` = JSON_REMOVE(`tableData`, '$.categoryid');
        SET `tableData` = JSON_REMOVE(`tableData`, '$.isactive');
        
        IF (@expenseid = 0)
        THEN
			SET `tableData` = JSON_INSERT(`tableData`,'$.created_at', now(),'$.updated_at', now());
            INSERT INTO `homebase`.`expense` (`categoryid`, `isactive`, `details`)
            SELECT @categoryid, @isactive, `tableData`;
            
		ELSE
        
			SELECT `details` INTO @existingBlob FROM `homebase`.`expense` WHERE `expenseid` = @expenseid;
            
			SET @existingBlob = JSON_REPLACE(@existingBlob
												,'$.updated_at', 		now()
                                                ,'$.cost', 					COALESCE(JSON_EXTRACT(`tableData`, '$.cost')					, JSON_EXTRACT(@existingBlob, '$.cost'))
                                                ,'$.title', 					COALESCE(JSON_EXTRACT(`tableData`, '$.title') 					, JSON_EXTRACT(@existingBlob, '$.title'))
                                                ,'$.categoryid', 		COALESCE(@categoryid															, JSON_EXTRACT(@existingBlob, '$.categoryid'))
                                                ,'$.isactive', 				COALESCE(@isactive																, JSON_EXTRACT(@existingBlob, '$.isactive'))
                                                ,'$.expense_date', 	COALESCE(JSON_EXTRACT(`tableData`, '$.expense_date')	, JSON_EXTRACT(@existingBlob, '$.expense_date'))
                                                );
            
            SET `tableData` = @existingBlob;
            
            UPDATE `homebase`.`expense`
            SET `categoryid` = @categoryid,
					`isactive` = @isactive,
                    `details` = `tableData`
			WHERE `expenseid` = @expenseid;
            
		END IF;
                
	ELSEIF (`tableName` = 'categoryTable')
    THEN
		
        SET @categoryid = JSON_UNQUOTE(JSON_EXTRACT(`tableData`, '$.categoryid'));
		SET @isactive = 	JSON_UNQUOTE(JSON_EXTRACT(`tableData`, '$.isactive'));
        SET @category = 	JSON_UNQUOTE(JSON_EXTRACT(`tableData`, '$.category'));
        
        IF (@categoryid = 0)
        THEN
			
            INSERT INTO `homebase`.`category` (`category`, `isactive`, `created_at`, `updated_at`)
            VALUES (@category, @isactive, now(), now());
            
        ELSE
			            
            UPDATE `homebase`.`category`
            SET `category` = @category,
					`isactive` = @isactive,
					`updated_at` = now()
			WHERE `categoryid` = @categoryid;
            
        END IF;
    
    END IF;
 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_update_table` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_update_table`(
  table_name VARCHAR(50),
  key_column VARCHAR(100),
  key_value VARCHAR(10),
  isactive VARCHAR(1)
)
BEGIN
	SET @query = CONCAT('UPDATE ', table_name, ' SET isactive = ', isactive, ' WHERE ', key_column, ' IN (', key_value, ')');
    #SELECT @query;
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-27 16:05:35
