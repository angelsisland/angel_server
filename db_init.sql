-- ----------------------------------------------------------------
-- DB and User Setup
-- ----------------------------------------------------------------
DROP DATABASE IF EXISTS `angel`;
CREATE DATABASE `angel` DEFAULT CHARACTER SET utf8;

USE `mysql`;
DELETE FROM `user` WHERE User='angel';
DELETE FROM `db` WHERE User='angel';
FLUSH PRIVILEGES;

CREATE USER 'angel'@'%' IDENTIFIED BY 'next1234';
CREATE USER 'angel'@'localhost' IDENTIFIED BY 'next1234';
GRANT ALL PRIVILEGES ON `angel`.* TO 'angel'@'%';
GRANT ALL PRIVILEGES ON `angel`.* TO 'angel'@'localhost';
FLUSH PRIVILEGES;


-- ----------------------------------------------------------------
-- Table Setup
-- ----------------------------------------------------------------
USE `angel`;
DROP TABLE IF EXISTS `user`;
-- Table `user`
CREATE TABLE `user` (
	`facebook_id` VARCHAR(64) NOT NULL,
	`nickname` VARCHAR(64) NOT NULL,
	`point` INTEGER NOT NULL,
	PRIMARY KEY(`facebook_id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

USE `angel`;
DROP TABLE IF EXISTS `post`;
-- Table `post`
CREATE TABLE `post` (
	`id` INTEGER NOT NULL AUTO_INCREMENT,
	`category` VARCHAR(16) NOT NULL,
	`facebook_id` VARCHAR(64) NOT NULL,
	`writer` VARCHAR(64) NOT NULL,
	`title` VARCHAR(64) NOT NULL,
	`contents` TEXT NOT NULL,
	`photo` TEXT DEFAULT NULL,
	PRIMARY KEY(`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

USE `angel`;
DROP TABLE IF EXISTS `reply`;
-- Table `reply`
CREATE TABLE `reply` (
	`id` INTEGER NOT NULL AUTO_INCREMENT,
	`post_id` INTEGER NOT NULL,
	`facebook_id` VARCHAR(64) NOT NULL,
	`writer` VARCHAR(64) NOT NULL,
	`contents` TEXT NOT NULL,
	PRIMARY KEY(`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

