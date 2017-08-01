-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 01, 2017 at 12:26 AM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `visitour`
--

use visitour;

-- --------------------------------------------------------

--
-- Table structure for table `establishment`
--

CREATE TABLE `establishment` (
  `establishment_id` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `longitude` varchar(50) NOT NULL,
  `latitude` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `establishment`
--

INSERT INTO `establishment` (`establishment_id`, `name`, `longitude`, `latitude`, `type`) VALUES
(1223546, 'Resorts World', '14.5186', '121.0198', 'Resort'),
(1223547, 'City of Dreams', '14.5238', '120.9927', 'Resorts and Casino ');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `group_id` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL,
  `privacy_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`group_id`, `name`, `location`, `privacy_type`) VALUES
(125463, 'Visitour', 'Dasmarinas, Cavite', 'Private'),
(125464, 'DUn tayo', 'Imus, Cavite', 'Private');

-- --------------------------------------------------------

--
-- Table structure for table `group_events`
--

CREATE TABLE `group_events` (
  `GE_ID` varchar(200) NOT NULL,
  `group_ID` varchar(200) NOT NULL,
  `start_date` varchar(200) NOT NULL,
  `event_name` varchar(200) NOT NULL,
  `location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `group_events`
--

INSERT INTO `group_events` (`GE_ID`, `group_ID`, `start_date`, `event_name`, `location`) VALUES
('123446', '125464', 'July 12 2017', 'Dinner', 'Resorts World Manila'),
('123456', '125463', 'July 32 2017', 'Graduation', 'City Hall');

-- --------------------------------------------------------

--
-- Table structure for table `user_account`
--

CREATE TABLE `user_account` (
  `user_id` varchar(100) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `mobile` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_account`
--

INSERT INTO `user_account` (`user_id`, `last_name`, `first_name`, `middle_name`, `email`, `address`, `mobile`) VALUES
(10000114232, 'Garcia', 'Juan Miguel', 'Casta', '0nameless5@gmail.com', 'Canal', '+63-920-8545-199'),
(10000144232, 'Nablo', 'Allanise', 'dikoalam', 'allanisenablo@gmail.com ', 'General Trias, Cavite', '+63-936-8808-499');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `establishment`
--
ALTER TABLE `establishment`
  ADD PRIMARY KEY (`establishment_id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_id`);

--
-- Indexes for table `group_events`
--
ALTER TABLE `group_events`
  ADD PRIMARY KEY (`GE_ID`),
  ADD UNIQUE KEY `group_ID` (`group_ID`);

--
-- Indexes for table `user_account`
--
ALTER TABLE `user_account`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125465;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
