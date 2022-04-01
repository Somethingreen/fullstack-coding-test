CREATE TABLE IF NOT EXISTS `product_type` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `name` (`name`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `customer` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(100) NOT NULL COLLATE 'latin1_swedish_ci',
	`contact_number` VARCHAR(20) NOT NULL COLLATE 'latin1_swedish_ci',
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `contact_number` (`contact_number`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `product` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`product_type_id` INT(10) UNSIGNED NOT NULL,
	`customer_id` INT(10) UNSIGNED NOT NULL,
	`delivery_status` ENUM('PENDING','ORDERED','SHIPPED','CANCELLED') NOT NULL DEFAULT 'PENDING' COLLATE 'latin1_swedish_ci',
	`delivery_address` TEXT NOT NULL COLLATE 'latin1_swedish_ci',
	`estimated_delivery_date` DATE NOT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `FK__product_type` (`product_type_id`) USING BTREE,
	INDEX `FK__customer` (`customer_id`) USING BTREE,
	CONSTRAINT `FK__customer` FOREIGN KEY (`customer_id`) REFERENCES `xendit`.`customer` (`id`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	CONSTRAINT `FK__product_type` FOREIGN KEY (`product_type_id`) REFERENCES `xendit`.`product_type` (`id`) ON UPDATE RESTRICT ON DELETE RESTRICT
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB;
