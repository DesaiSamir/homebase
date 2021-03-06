-- MySQL dump 10.13  Distrib 5.7.21, for macos10.13 (x86_64)
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
-- Table structure for table `expense`
--

DROP TABLE IF EXISTS `expense`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expense` (
  `expenseid` int(11) NOT NULL AUTO_INCREMENT,
  `categoryid` int(11) DEFAULT NULL,
  `isactive` tinyint(1) NOT NULL DEFAULT '1',
  `details` json DEFAULT NULL,
  PRIMARY KEY (`expenseid`),
  UNIQUE KEY `expense_id_UNIQUE` (`expenseid`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense`
--

LOCK TABLES `expense` WRITE;
/*!40000 ALTER TABLE `expense` DISABLE KEYS */;
INSERT INTO `expense` VALUES (1,15,1,'{\"cost\": 17, \"title\": \"BOM: Art Of Productivity\", \"created_at\": \"2018-02-22 16:52:30.000000\", \"updated_at\": \"2018-02-22 16:52:30.000000\", \"expense_date\": \"2018-01-01\"}'),(2,1,1,'{\"cost\": 7, \"title\": \"Philly ECS \", \"created_at\": \"2018-02-22 16:53:16.000000\", \"updated_at\": \"2018-02-22 16:53:16.000000\", \"expense_date\": \"2018-01-02\"}'),(3,17,1,'{\"cost\": 30, \"title\": \"ECS Miles \", \"created_at\": \"2018-02-22 16:53:47.000000\", \"updated_at\": \"2018-02-22 16:53:47.000000\", \"expense_date\": \"2018-01-02\"}'),(4,17,1,'{\"cost\": 130, \"title\": \"Ohri PASE \", \"created_at\": \"2018-02-22 16:55:04.000000\", \"updated_at\": \"2018-02-22 16:55:04.000000\", \"expense_date\": \"2018-01-05\"}'),(5,1,1,'{\"cost\": 7, \"title\": \"Philly ECS \", \"created_at\": \"2018-02-22 16:55:36.000000\", \"updated_at\": \"2018-02-22 16:55:36.000000\", \"expense_date\": \"2018-01-09\"}'),(6,17,1,'{\"cost\": 30, \"title\": \"ECS Miles \", \"created_at\": \"2018-02-22 16:56:01.000000\", \"updated_at\": \"2018-02-22 16:56:01.000000\", \"expense_date\": \"2018-01-09\"}'),(7,17,1,'{\"cost\": 130, \"title\": \"Kumar Team Meeting\", \"created_at\": \"2018-02-22 16:57:16.000000\", \"updated_at\": \"2018-02-22 16:57:16.000000\", \"expense_date\": \"2018-01-14\"}'),(8,16,1,'{\"cost\": 10, \"title\": \"Tip @Marriot\", \"created_at\": \"2018-02-22 16:59:15.000000\", \"updated_at\": \"2018-02-22 16:59:15.000000\", \"expense_date\": \"2018-01-20\"}'),(9,17,1,'{\"cost\": 420, \"title\": \"WC Miles via Harrisburg\", \"created_at\": \"2018-02-22 17:15:32.000000\", \"updated_at\": \"2018-03-01 07:16:42.000000\", \"expense_date\": \"2018-01-19\"}'),(10,14,1,'{\"cost\": 38, \"title\": \"Dinner @ Genghis Grill\", \"created_at\": \"2018-02-22 17:12:18.000000\", \"updated_at\": \"2018-02-22 17:12:18.000000\", \"expense_date\": \"2018-01-21\"}'),(11,1,1,'{\"cost\": 7, \"title\": \"Philly ECS\", \"created_at\": \"2018-02-22 16:59:53.000000\", \"updated_at\": \"2018-02-22 16:59:53.000000\", \"expense_date\": \"2018-01-23\"}'),(12,17,1,'{\"cost\": 30, \"title\": \"ECS Miles\", \"created_at\": \"2018-02-22 17:00:15.000000\", \"updated_at\": \"2018-02-22 17:00:15.000000\", \"expense_date\": \"2018-01-23\"}'),(13,17,1,'{\"cost\": 130, \"title\": \"Sandilya PASE \", \"created_at\": \"2018-02-22 17:01:21.000000\", \"updated_at\": \"2018-02-22 17:01:21.000000\", \"expense_date\": \"2018-01-26\"}'),(14,1,1,'{\"cost\": 7, \"title\": \"Philly ECS \", \"created_at\": \"2018-02-22 17:02:04.000000\", \"updated_at\": \"2018-02-22 17:02:04.000000\", \"expense_date\": \"2018-01-30\"}'),(15,17,1,'{\"cost\": 30, \"title\": \"ECS Miles \", \"created_at\": \"2018-02-22 17:02:33.000000\", \"updated_at\": \"2018-02-22 17:02:33.000000\", \"expense_date\": \"2018-01-30\"}'),(16,14,1,'{\"cost\": 22, \"title\": \"Dinner @ Applebees \", \"created_at\": \"2018-02-22 17:13:11.000000\", \"updated_at\": \"2018-02-22 17:13:11.000000\", \"expense_date\": \"2018-01-30\"}'),(17,15,1,'{\"cost\": 22, \"title\": \"BOM: Everyone communicates but free connects\", \"created_at\": \"2018-02-22 16:58:27.000000\", \"updated_at\": \"2018-02-22 16:58:27.000000\", \"expense_date\": \"2018-02-01\"}'),(18,17,1,'{\"cost\": 130, \"title\": \"Ohri PASE\", \"created_at\": \"2018-02-22 17:04:05.000000\", \"updated_at\": \"2018-02-22 17:04:05.000000\", \"expense_date\": \"2018-02-02\"}'),(19,1,1,'{\"cost\": 7, \"title\": \"Philly ECS \", \"created_at\": \"2018-02-22 17:06:09.000000\", \"updated_at\": \"2018-02-22 17:06:09.000000\", \"expense_date\": \"2018-02-06\"}'),(20,17,1,'{\"cost\": 30, \"title\": \"ECS Miles \", \"created_at\": \"2018-02-22 17:06:28.000000\", \"updated_at\": \"2018-02-22 17:06:28.000000\", \"expense_date\": \"2018-02-06\"}'),(21,17,1,'{\"cost\": 130, \"title\": \"Sandilya PASE \", \"created_at\": \"2018-02-22 17:04:39.000000\", \"updated_at\": \"2018-02-22 17:04:39.000000\", \"expense_date\": \"2018-02-09\"}'),(22,1,1,'{\"cost\": 7, \"title\": \"Philly ECS\", \"created_at\": \"2018-02-22 17:07:04.000000\", \"updated_at\": \"2018-02-22 17:07:04.000000\", \"expense_date\": \"2018-02-13\"}'),(23,17,1,'{\"cost\": 30, \"title\": \"ECS Miles\", \"created_at\": \"2018-02-22 17:07:22.000000\", \"updated_at\": \"2018-02-22 17:07:22.000000\", \"expense_date\": \"2018-02-13\"}'),(24,1,1,'{\"cost\": 40, \"title\": \"BBS: Nanda & Sangeeta\", \"created_at\": \"2018-02-22 17:05:13.000000\", \"updated_at\": \"2018-02-28 14:24:27.000000\", \"expense_date\": \"2018-02-16\"}'),(25,17,1,'{\"cost\": 150, \"title\": \"BBS Miles\", \"created_at\": \"2018-02-22 17:05:33.000000\", \"updated_at\": \"2018-02-22 17:05:33.000000\", \"expense_date\": \"2018-02-17\"}'),(26,1,1,'{\"cost\": 7, \"title\": \"Philly ECS\", \"created_at\": \"2018-02-22 17:07:40.000000\", \"updated_at\": \"2018-02-22 17:07:40.000000\", \"expense_date\": \"2018-02-20\"}'),(27,17,1,'{\"cost\": 30, \"title\": \"ECS Miles \", \"created_at\": \"2018-02-22 17:07:58.000000\", \"updated_at\": \"2018-02-22 17:07:58.000000\", \"expense_date\": \"2018-02-20\"}'),(32,17,1,'{\"cost\": 260, \"title\": \"PASE @ Shukla via Jersey City\", \"created_at\": \"2018-02-27 09:49:15.000000\", \"updated_at\": \"2018-02-27 09:49:15.000000\", \"expense_date\": \"2018-02-23\"}'),(33,1,1,'{\"cost\": 7, \"title\": \"Philly ECS\", \"created_at\": \"2018-02-27 20:06:47.000000\", \"updated_at\": \"2018-02-27 20:06:47.000000\", \"expense_date\": \"2018-02-27\"}'),(34,17,1,'{\"cost\": 30, \"title\": \"ECS Miles\", \"created_at\": \"2018-02-27 20:07:20.000000\", \"updated_at\": \"2018-02-27 20:07:20.000000\", \"expense_date\": \"2018-02-27\"}'),(35,14,1,'{\"cost\": 15, \"title\": \"Dinner@ Chipotle\", \"created_at\": \"2018-02-28 06:56:49.000000\", \"updated_at\": \"2018-02-28 06:56:49.000000\", \"expense_date\": \"2018-02-10\"}'),(36,15,1,'{\"cost\": 16, \"title\": \"BOM: Conquer Life\'s Frontier\", \"created_at\": \"2018-03-01 14:56:09.000000\", \"updated_at\": \"2018-03-01 14:56:25.000000\", \"expense_date\": \"2018-03-01\"}'),(37,15,1,'{\"cost\": 80, \"title\": \"5 - The Business of the 21st Century\", \"created_at\": \"2018-03-02 22:08:28.000000\", \"updated_at\": \"2018-03-02 22:08:28.000000\", \"expense_date\": \"2018-03-01\"}'),(38,14,1,'{\"cost\": 53, \"title\": \"Dinner @ CPK\", \"created_at\": \"2018-03-03 21:21:20.000000\", \"updated_at\": \"2018-03-03 21:23:41.000000\", \"expense_date\": \"2018-03-03\"}'),(39,16,1,'{\"cost\": 8, \"title\": \"Tip@ Restaurant CPK & Pizza Hut\", \"created_at\": \"2018-03-03 21:24:34.000000\", \"updated_at\": \"2018-03-03 21:24:34.000000\", \"expense_date\": \"2018-03-03\"}'),(40,14,1,'{\"cost\": 16, \"title\": \"Pizza hut\", \"created_at\": \"2018-03-03 21:25:04.000000\", \"updated_at\": \"2018-03-03 21:25:04.000000\", \"expense_date\": \"2018-03-03\"}');
/*!40000 ALTER TABLE `expense` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-06 13:12:01
