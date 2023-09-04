-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema petstore
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema petstore
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `petstore` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema petstore
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema petstore
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `petstore` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `petstore` ;







-- -----------------------------------------------------
-- Table `petstore`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petstore`.`products` (
  `idproduct` INT NOT NULL AUTO_INCREMENT,
  `image` VARCHAR(255) ,
  `name` VARCHAR(255) NOT NULL,
  `category` VARCHAR(255) NOT NULL,
  `price` INT NOT NULL,
  `stock` INT NOT NULL,
  PRIMARY KEY (`idproduct`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `petstore`.`clients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petstore`.`clients` (
  `idclient` INT NOT NULL AUTO_INCREMENT,
  `fullname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(255) NOT NULL,
  `shipping` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idclient`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `petstore`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petstore`.`cart` (
  `idcart` INT NOT NULL AUTO_INCREMENT,
  `p_name` VARCHAR(255) NOT NULL,
  `quantity` INT NOT NULL,
  `cost` INT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `products_idproduct` INT NOT NULL,
  `clients_idclient` INT NOT NULL,
  PRIMARY KEY (`idcart`, `products_idproduct`, `clients_idclient`),
  INDEX `fk_cart_products_idx` (`products_idproduct` ASC) VISIBLE,
  INDEX `fk_cart_clients1_idx` (`clients_idclient` ASC) VISIBLE,
  CONSTRAINT `fk_cart_products`
    FOREIGN KEY (`products_idproduct`)
    REFERENCES `petstore`.`products` (`idproduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cart_clients1`
    FOREIGN KEY (`clients_idclient`)
    REFERENCES `petstore`.`clients` (`idclient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `petstore`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petstore`.`orders` (
  `idorder` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `client` VARCHAR(255) NOT NULL,
  `t_cost` INT NOT NULL,
  `state` VARCHAR(255) NULL,
  `cart_idcart` INT NOT NULL,
  `cart_products_idproduct` INT NOT NULL,
  `cart_clients_idclient` INT NOT NULL,
  PRIMARY KEY (`idorder`, `cart_idcart`, `cart_products_idproduct`, `cart_clients_idclient`),
  INDEX `fk_orders_cart1_idx` (`cart_idcart` ASC, `cart_products_idproduct` ASC, `cart_clients_idclient` ASC) VISIBLE,
  CONSTRAINT `fk_orders_cart1`
    FOREIGN KEY (`cart_idcart` , `cart_products_idproduct` , `cart_clients_idclient`)
    REFERENCES `petstore`.`cart` (`idcart` , `products_idproduct` , `clients_idclient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `petstore` ;

-- -----------------------------------------------------
-- Table `petstore`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petstore`.`admin` (
  `idadmin` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
 
  PRIMARY KEY (`idadmin`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
