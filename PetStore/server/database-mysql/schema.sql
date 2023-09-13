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
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `petstore`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petstore`.`cart` (
  `idcart` INT NOT NULL AUTO_INCREMENT,
  `clients_idclient` INT NOT NULL,
  PRIMARY KEY (`idcart`, `clients_idclient`),
  INDEX `fk_cart_clients_idx` (`clients_idclient` ASC) VISIBLE,
  CONSTRAINT `fk_cart_clients`
    FOREIGN KEY (`clients_idclient`)
    REFERENCES `petstore`.`clients` (`idclient`)
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
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `petstore`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petstore`.`products` (
  `idproduct` INT NOT NULL AUTO_INCREMENT,
  `image` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `category` VARCHAR(255) NOT NULL,
  `price` INT NOT NULL,
  `stock` INT NOT NULL,
  PRIMARY KEY (`idproduct`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `petstore`.`cp`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petstore`.`cp` (
  `p_image` VARCHAR(255) NOT NULL,
  `p_name` VARCHAR(255) NOT NULL,
  `quantity` INT NOT NULL,
  `cost` INT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cart_idcart` INT NOT NULL,
  `cart_clients_idclient` INT NOT NULL,
  `products_idproduct` INT NOT NULL,
  PRIMARY KEY (`cart_idcart`, `cart_clients_idclient`, `products_idproduct`),
  INDEX `fk_cp_products1_idx` (`products_idproduct` ASC) VISIBLE,
  CONSTRAINT `fk_cp_cart`
    FOREIGN KEY (`cart_idcart` , `cart_clients_idclient`)
    REFERENCES `petstore`.`cart` (`idcart` , `clients_idclient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cp_products1`
    FOREIGN KEY (`products_idproduct`)
    REFERENCES `petstore`.`products` (`idproduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `petstore`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petstore`.`orders` (
  `idorder` INT NOT NULL AUTO_INCREMENT,
  `client` VARCHAR(225) NOT NULL,
  `phone` VARCHAR(255) NOT NULL,
  `shipping` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `detail` VARCHAR(255) NOT NULL,
  `t_cost` INT NOT NULL,
  `state` VARCHAR(255) NULL,
  `cp_cart_idcart` INT NOT NULL,
  `cp_cart_clients_idclient` INT NOT NULL,
  `cp_products_idproduct` INT NOT NULL,
  PRIMARY KEY (`idorder`, `cp_cart_idcart`, `cp_cart_clients_idclient`, `cp_products_idproduct`),
  INDEX `fk_orders_cp1_idx` (`cp_cart_idcart` ASC, `cp_cart_clients_idclient` ASC, `cp_products_idproduct` ASC) VISIBLE,
  CONSTRAINT `fk_orders_cp1`
    FOREIGN KEY (`cp_cart_idcart` , `cp_cart_clients_idclient` , `cp_products_idproduct`)
    REFERENCES `petstore`.`cp` (`cart_idcart` , `cart_clients_idclient` , `products_idproduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
