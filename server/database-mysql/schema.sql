-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema petstore
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema petstore
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `petstore` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `petstore` ;

-- -----------------------------------------------------
-- Table `petstore`.`adminanimals`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petstore`.`adminanimals` (
  `animal_id` INT NOT NULL AUTO_INCREMENT,
  `animal_name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `image_url` TEXT NULL DEFAULT NULL,
  `species` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`animal_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `petstore`.`admincategories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petstore`.`admincategories` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE INDEX `category_name` (`category_name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `petstore`.`clientusers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petstore`.`clientusers` (
  `client_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `phone_number` VARCHAR(8) NULL DEFAULT NULL,
  `address` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`client_id`),
  UNIQUE INDEX `username` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `petstore`.`clientorders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petstore`.`clientorders` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `client_id` INT NULL DEFAULT NULL,
  `total_price` DECIMAL(10,2) NOT NULL DEFAULT '0.00',
  `shipping_address` TEXT NULL DEFAULT NULL,
  `status` ENUM('pending', 'shipped', 'delivered') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`),
  INDEX `client_id` (`client_id` ASC) VISIBLE,
  CONSTRAINT `clientorders_ibfk_1`
    FOREIGN KEY (`client_id`)
    REFERENCES `petstore`.`clientusers` (`client_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `petstore`.`adminordersreview`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petstore`.`adminordersreview` (
  `review_id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `status` ENUM('pending', 'shipped', 'delivered') NOT NULL,
  `notes` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  INDEX `order_id` (`order_id` ASC) VISIBLE,
  CONSTRAINT `adminordersreview_ibfk_1`
    FOREIGN KEY (`order_id`)
    REFERENCES `petstore`.`clientorders` (`order_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `petstore`.`adminproducts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petstore`.`adminproducts` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `stock_quantity` INT NOT NULL DEFAULT '0',
  `image_url` TEXT NULL DEFAULT NULL,
  `category_id` INT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`),
  INDEX `category_id` (`category_id` ASC) VISIBLE,
  CONSTRAINT `adminproducts_ibfk_1`
    FOREIGN KEY (`category_id`)
    REFERENCES `petstore`.`admincategories` (`category_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `petstore`.`adminusers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petstore`.`adminusers` (
  `admin_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `petstore`.`clientcart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petstore`.`clientcart` (
  `cart_id` INT NOT NULL AUTO_INCREMENT,
  `client_id` INT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_id`),
  INDEX `client_id` (`client_id` ASC) VISIBLE,
  CONSTRAINT `clientcart_ibfk_1`
    FOREIGN KEY (`client_id`)
    REFERENCES `petstore`.`clientusers` (`client_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `petstore`.`clientcart_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petstore`.`clientcart_items` (
  `cart_item_id` INT NOT NULL AUTO_INCREMENT,
  `cart_id` INT NULL DEFAULT NULL,
  `product_id` INT NULL DEFAULT NULL,
  `quantity` INT NOT NULL DEFAULT '1',
  `totalCost` DECIMAL(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`cart_item_id`),
  INDEX `cart_id` (`cart_id` ASC) VISIBLE,
  INDEX `product_id` (`product_id` ASC) VISIBLE,
  CONSTRAINT `clientcart_items_ibfk_1`
    FOREIGN KEY (`cart_id`)
    REFERENCES `petstore`.`clientcart` (`cart_id`),
  CONSTRAINT `clientcart_items_ibfk_2`
    FOREIGN KEY (`product_id`)
    REFERENCES `petstore`.`adminproducts` (`product_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `petstore`.`clientorder_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petstore`.`clientorder_items` (
  `order_item_id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NULL DEFAULT NULL,
  `product_id` INT NULL DEFAULT NULL,
  `quantity` INT NOT NULL DEFAULT '1',
  `totalCost` DECIMAL(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`order_item_id`),
  INDEX `order_id` (`order_id` ASC) VISIBLE,
  INDEX `product_id` (`product_id` ASC) VISIBLE,
  CONSTRAINT `clientorder_items_ibfk_1`
    FOREIGN KEY (`order_id`)
    REFERENCES `petstore`.`clientorders` (`order_id`),
  CONSTRAINT `clientorder_items_ibfk_2`
    FOREIGN KEY (`product_id`)
    REFERENCES `petstore`.`adminproducts` (`product_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
