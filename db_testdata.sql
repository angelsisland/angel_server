-- ----------------------------------------------------------------
-- Table Setup
-- ----------------------------------------------------------------
USE `angel`;

TRUNCATE TABLE `user`;
INSERT INTO `user` (`facebook_id`, `nickname`, `gender`, `point`) VALUES
	('1', 'TestAngel1', 'M', 150),
	('2', 'TestAngel2', 'F', 0),
	('3', 'TestAngel3', 'M', 0);

TRUNCATE TABLE `post`;
INSERT INTO `post` (`category`, `facebook_id`, `writer`, `title`, `contents`) VALUES
	('solace', '1', 'TestAngel1', 'I am so sad 1', 'blah \nblbh \nblah...'),
	('solace', '2', 'TestAngel2', 'I am so sad 2', 'blah \nblbh \nblah...'),
	('solace', '3', 'TestAngel3', 'I am so sad 3', 'blah \nblbh \nblah...'),
	('solace', '4', 'TestAngel4', 'I am so sad 4', 'blah \nblbh \nblah...'),
	('solace', '5', 'TestAngel5', 'I am so sad 5', 'blah \nblbh \nblah...'),
	('solace', '1', 'TestAngel1', 'I am so sad 6', 'blah \nblbh \nblah...'),
	('solace', '2', 'TestAngel2', 'I am so sad 7', 'blah \nblbh \nblah...'),
	('solace', '3', 'TestAngel3', 'I am so sad 8', 'blah \nblbh \nblah...'),
	('solace', '4', 'TestAngel4', 'I am so sad 9', 'blah \nblbh \nblah...'),
	('solace', '5', 'TestAngel5', 'I am so sad 0', 'blah \nblbh \nblah...'),

	('praise', '1', 'TestAngel1', 'I am so hot 1', 'blah \nblbh \nblah...'),
	('praise', '2', 'TestAngel2', 'I am so hot 2', 'blah \nblbh \nblah...'),
	('praise', '3', 'TestAngel3', 'I am so hot 3', 'blah \nblbh \nblah...'),

	('letter', 'God', 'TestAngel', 'Letter 1', 'blah \nblbh \nblah...'),
	('letter', 'God', 'TestAngel', 'Letter 2', 'blah \nblbh \nblah...'),
	('letter', 'God', 'TestAngel', 'Letter 3', 'blah \nblbh \nblah...');

-- state field: 0(acceptable and not validated) 1(accepted) 2(outdated) 3(canceled) 4(denied)
TRUNCATE TABLE `reply`;
INSERT INTO `reply` (`post_id`, `facebook_id`, `writer`, `contents`) VALUES
	(1, '2', 'TestAngel2', 'Cheer up!'),
	(1, '3', 'TestAngel3', 'You will be fine.'),
	(1, '4', 'TestAngel4', 'You will be fine 2.'),
	(1, '5', 'TestAngel5', 'You will be fine 3.'),
	(3, '3', 'TestAngel3', '힘내세요!'),
	(11, '2', 'TestAngel2', 'So Hot!'),
	(11, '3', 'TestAngel3', 'So Cool!');
