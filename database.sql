-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: autoservice
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `call_back`
--

DROP TABLE IF EXISTS `call_back`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `call_back` (
  `id_call_back` int NOT NULL AUTO_INCREMENT,
  `client_name` varchar(45) NOT NULL,
  `client_phone` varchar(45) NOT NULL,
  PRIMARY KEY (`id_call_back`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `call_back`
--

LOCK TABLES `call_back` WRITE;
/*!40000 ALTER TABLE `call_back` DISABLE KEYS */;
INSERT INTO `call_back` VALUES (6,'Магомед','(111) 999-22-23'),(7,'Иван','(123) 444-55-66'),(8,'Пётр','(988) 567-12-34'),(9,'Максим','(973) 527-28-00'),(10,'Влад','(900) 278-89-18'),(11,'Кирилл','(123) 783-48-29');
/*!40000 ALTER TABLE `call_back` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car` (
  `id_car` int NOT NULL AUTO_INCREMENT,
  `id_client` int NOT NULL,
  `carName` varchar(45) NOT NULL,
  `carModel` varchar(45) NOT NULL,
  `regNumber` varchar(45) NOT NULL,
  `year` year NOT NULL,
  PRIMARY KEY (`id_car`),
  KEY `id_client_idx` (`id_client`),
  CONSTRAINT `id_client` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` VALUES (1,8,'Ford','Focus','A 000 TY 198',2015),(3,8,'LADA','Priora','T 783 YA 15',2010),(6,1,'BMW','M3','A 111 AA 06',2015),(8,6,'Honda','Civic','T 287 AO 99',2013),(9,2,'Audi','R8','T 777 EY 78',2018);
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `id_client` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `patronymic` varchar(45) DEFAULT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `type` enum('client','admin') NOT NULL,
  PRIMARY KEY (`id_client`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (1,'Магомед','Чемурзиев','Алиханович','(999) 535-25-20','m-chemurziev@ya.ru','MagaMaga','client'),(2,'Глеб','Разницын',NULL,'(222) 222-22-22','gleb@gmail.com','12345678','client'),(3,'Вадим','Евтеев','Александрович','(111) 111-11-11','vadim@gmail.com','qwerty123','client'),(6,'Владислав','Корсунов','Андреевич','(888) 888-85-55','kors@mail.com','88888888','client'),(8,'Name','LastName','Father','(478) 946-55-66','test1@gmail.com','00000000','client'),(9,'Админ','Админов','Админович','(999) 155-33-12','admin@admin.ru','123admin','admin');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract`
--

DROP TABLE IF EXISTS `contract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract` (
  `id_contract` int NOT NULL AUTO_INCREMENT,
  `id_entry_contract` int NOT NULL,
  `id_work_contract` int NOT NULL,
  `employee` varchar(45) NOT NULL,
  `dateStart` date NOT NULL,
  `dateEnd` date DEFAULT NULL,
  `price` float DEFAULT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`id_contract`),
  KEY `id_entry_contract_idx` (`id_entry_contract`),
  KEY `id_work_contract_idx` (`id_work_contract`),
  CONSTRAINT `id_entry_contract` FOREIGN KEY (`id_entry_contract`) REFERENCES `entry` (`id_entry`),
  CONSTRAINT `id_work_contract` FOREIGN KEY (`id_work_contract`) REFERENCES `work` (`id_work`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract`
--

LOCK TABLES `contract` WRITE;
/*!40000 ALTER TABLE `contract` DISABLE KEYS */;
INSERT INTO `contract` VALUES (1,3,3,'Иванов А.Е.','2020-05-18',NULL,NULL,'Выполняется'),(2,4,1,'Петров В.А.','2020-05-18','2020-05-25',1500,'Выполнено');
/*!40000 ALTER TABLE `contract` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entry`
--

DROP TABLE IF EXISTS `entry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entry` (
  `id_entry` int NOT NULL AUTO_INCREMENT,
  `id_client_entry` int NOT NULL,
  `carName_entry` varchar(45) NOT NULL,
  `carModel_entry` varchar(45) NOT NULL,
  `reg_number` varchar(45) NOT NULL,
  `year_car` year NOT NULL,
  `date_entry` date NOT NULL,
  PRIMARY KEY (`id_entry`),
  KEY `id_client_idx` (`id_client_entry`),
  CONSTRAINT `id_client_entry` FOREIGN KEY (`id_client_entry`) REFERENCES `client` (`id_client`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entry`
--

LOCK TABLES `entry` WRITE;
/*!40000 ALTER TABLE `entry` DISABLE KEYS */;
INSERT INTO `entry` VALUES (1,6,'Honda','Civic','T 287 AO 99',2013,'2020-05-17'),(2,2,'BMW','M3','H 256 TA 46',2010,'2020-05-15'),(3,1,'BMW','M3','A 111 AA 06',2015,'2020-05-18'),(4,1,'Mercedes','GLE','B 182 AO 178',2014,'2020-05-18'),(5,3,'LADA','Priora','B 728 AA 67',2019,'2020-05-19'),(6,6,'BMW','M5','M 231 MM 123',2016,'2020-05-24'),(7,6,'LADA','2114','A 838 OA 74',2008,'2020-05-21'),(8,2,'Mercedes','GLE','C 283 AT 88',2018,'2020-05-14'),(9,2,'LADA','Priora','E 235 CT 38',2020,'2020-05-16'),(12,1,'Toyota','Camry','T 222 ET 29',2018,'2020-05-20');
/*!40000 ALTER TABLE `entry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entry_no_auth`
--

DROP TABLE IF EXISTS `entry_no_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entry_no_auth` (
  `id_entry_no_auth` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `carName` varchar(45) NOT NULL,
  `carModel` varchar(45) NOT NULL,
  `reg_number` varchar(45) NOT NULL,
  `year_manufact` year NOT NULL,
  `phone` varchar(15) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id_entry_no_auth`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entry_no_auth`
--

LOCK TABLES `entry_no_auth` WRITE;
/*!40000 ALTER TABLE `entry_no_auth` DISABLE KEYS */;
INSERT INTO `entry_no_auth` VALUES (1,'Иван','Иванов','Aston Martin','Focus','A 666 TT 06',2017,'(454) 598-88-88','2020-05-11'),(2,'Петр','Петров','LADA','Priora','H 234 TT 29',2010,'(959) 416-15-64','2020-05-19'),(3,'Евгений','Зайцев','Ford','Focus','E 521 TT 172',2014,'(975) 145-26-66','2020-05-19');
/*!40000 ALTER TABLE `entry_no_auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work`
--

DROP TABLE IF EXISTS `work`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work` (
  `id_work` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` varchar(45) NOT NULL,
  `timeFrame` varchar(45) NOT NULL,
  PRIMARY KEY (`id_work`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work`
--

LOCK TABLES `work` WRITE;
/*!40000 ALTER TABLE `work` DISABLE KEYS */;
INSERT INTO `work` VALUES (1,'Ремонт тормозной системы','от 300 до 3000','до 2 недель'),(3,'Ремонт подвески','от 450 до 2000','до 3 недель'),(4,'Ремонт трансмиссии','от 1000 до 40000','от 2 недель до 3 месяцев'),(5,'Развал-схождение','от 1000 до 5000','в течении недели'),(6,'Ремонт двигателя','от 1000 до 30000','от 1 недели до 3 месяцев');
/*!40000 ALTER TABLE `work` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-18 20:00:30
