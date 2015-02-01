-- ----------------------------------------------------------------
-- Table Setup
-- ----------------------------------------------------------------
USE `angel`;

TRUNCATE TABLE `user`;
INSERT INTO `user` (`facebook`, `nickname`, `gender`, `point`) VALUES
	('FacebookToken1', 'TestAngel1', 'M', 0),
	('FacebookToken2', 'TestAngel2', 'F', 0),
	('FacebookToken3', 'TestAngel3', 'M', 0);

TRUNCATE TABLE `post`;
INSERT INTO `post` (`category`, `writer`, `title`, `contents`) VALUES
	('solace', 'TestAngel1', 'I am so sad 1', 'blah \nblbh \nblah...'),
	('solace', 'TestAngel2', 'I am so sad 2', 'blah \nblbh \nblah...'),
	('solace', 'TestAngel3', 'I am so sad 3', 'blah \nblbh \nblah...'),
	('solace', 'TestAngel4', 'I am so sad 4', 'blah \nblbh \nblah...'),
	('solace', 'TestAngel5', 'I am so sad 5', 'blah \nblbh \nblah...'),
	('solace', 'TestAngel1', 'I am so sad 6', 'blah \nblbh \nblah...'),
	('solace', 'TestAngel2', 'I am so sad 7', 'blah \nblbh \nblah...'),
	('solace', 'TestAngel3', 'I am so sad 8', 'blah \nblbh \nblah...'),
	('solace', 'TestAngel4', 'I am so sad 9', 'blah \nblbh \nblah...'),
	('solace', 'TestAngel5', 'I am so sad 0', 'blah \nblbh \nblah...'),

	('praise', 'TestAngel1', 'I am so hot 1', 'blah \nblbh \nblah...'),
	('praise', 'TestAngel2', 'I am so hot 2', 'blah \nblbh \nblah...'),
	('praise', 'TestAngel3', 'I am so hot 3', 'blah \nblbh \nblah...'),

	('letter', 'God', 'Letter 1', 'blah \nblbh \nblah...'),
	('letter', 'God', 'Letter 2', 'blah \nblbh \nblah...'),
	('letter', 'God', 'Letter 3', 'blah \nblbh \nblah...');

-- state field: 0(acceptable and not validated) 1(accepted) 2(outdated) 3(canceled) 4(denied)
TRUNCATE TABLE `reply`;
INSERT INTO `reply` (`post_id`, `writer`, `contents`) VALUES
	(1, 'TestAngel2', 'Cheer up!'),
	(1, 'TestAngel3', 'You will be fine.'),
	(1, 'TestAngel4', 'You will be fine 2.'),
	(1, 'TestAngel5', 'You will be fine 3.'),
	(3, 'TestAngel3', '힘내세요!'),
	(11, 'TestAngel2', 'So Hot!'),
	(11, 'TestAngel3', 'So Cool!');
