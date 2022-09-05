-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- ホスト: mysql
-- 生成日時: 2022 年 9 月 05 日 05:37
-- サーバのバージョン： 8.0.30
-- PHP のバージョン: 8.0.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `myapp`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `categories`
--

CREATE TABLE `categories` (
  `id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `icon_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- テーブルのデータのダンプ `categories`
--

INSERT INTO `categories` (`id`, `name`, `icon_id`) VALUES
('0', 'その他', 4),
('10-275', '牛肉', 1),
('10-276', '豚肉', 1),
('10-277', '鶏肉', 1),
('10-278', 'ひき肉', 1),
('10-66', 'ソーセージ・ウインナー', 1),
('10-67', 'ハム', 1),
('10-68', 'ベーコン', 1),
('10-69', 'その他のお肉', 1),
('11-443', 'たら', 2),
('11-444', '牡蠣', 2),
('11-446', 'その他の魚介', 2),
('11-70', 'サーモン・鮭', 2),
('11-71', 'いわし', 2),
('11-72', 'さば', 2),
('11-73', 'あじ', 2),
('11-74', 'ぶり', 2),
('11-75', 'さんま', 2),
('11-76', '鯛', 2),
('11-77', 'マグロ', 2),
('11-78', 'その他のさかな', 2),
('11-79', 'エビ', 2),
('11-80', 'いか', 2),
('11-81', 'たこ', 2),
('11-82', '貝類', 2),
('11-83', 'かに', 2),
('12-104', 'その他の野菜', 3),
('12-105', 'きのこ', 3),
('12-107', '香味野菜・ハーブ', 3),
('12-447', 'なす', 3),
('12-448', 'かぼちゃ', 3),
('12-449', '大根', 3),
('12-450', 'きゅうり', 3),
('12-452', 'さつまいも', 3),
('12-453', '白菜', 3),
('12-454', 'トマト', 3),
('12-455', 'ごぼう', 3),
('12-456', '小松菜', 3),
('12-457', 'ほうれん草', 3),
('12-458', 'ブロッコリー', 3),
('12-95', 'にんじん', 3),
('12-96', '玉ねぎ', 3),
('12-97', 'じゃがいも', 3),
('12-98', 'キャベツ', 3),
('12-99', 'もやし', 3);

-- --------------------------------------------------------

--
-- テーブルの構造 `foods`
--

CREATE TABLE `foods` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `category_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `place_id` int NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `expiration_date` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `comment` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `icons`
--

CREATE TABLE `icons` (
  `id` int NOT NULL,
  `category` char(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `image_path` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- テーブルのデータのダンプ `icons`
--

INSERT INTO `icons` (`id`, `category`, `image_path`) VALUES
(1, '肉', 'meat.png'),
(2, '魚', 'fish.png'),
(3, '野菜', 'veg.png'),
(4, 'その他', 'other.png');

-- --------------------------------------------------------

--
-- テーブルの構造 `places`
--

CREATE TABLE `places` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- テーブルのデータのダンプ `places`
--

INSERT INTO `places` (`id`, `user_id`, `name`) VALUES
(1, NULL, '');

-- --------------------------------------------------------

--
-- テーブルの構造 `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(256) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(256) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `line_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ref_categories_icon_id` (`icon_id`);

--
-- テーブルのインデックス `foods`
--
ALTER TABLE `foods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ref_foods_place_id` (`place_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `ref_foods_category_id` (`category_id`);

--
-- テーブルのインデックス `icons`
--
ALTER TABLE `icons`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `places`
--
ALTER TABLE `places`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- テーブルのインデックス `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `email_index` (`email`) USING BTREE;

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `foods`
--
ALTER TABLE `foods`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- テーブルの AUTO_INCREMENT `icons`
--
ALTER TABLE `icons`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- テーブルの AUTO_INCREMENT `places`
--
ALTER TABLE `places`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- テーブルの AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- ダンプしたテーブルの制約
--

--
-- テーブルの制約 `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `ref_categories_icon_id` FOREIGN KEY (`icon_id`) REFERENCES `icons` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- テーブルの制約 `foods`
--
ALTER TABLE `foods`
  ADD CONSTRAINT `ref_foods_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `ref_foods_place_id` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`),
  ADD CONSTRAINT `ref_foods_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- テーブルの制約 `places`
--
ALTER TABLE `places`
  ADD CONSTRAINT `ref_places_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
