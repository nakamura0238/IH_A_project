# IH_A_project

U22-2022

## 開発方法

1. .env ファイルの設定
   - .env.local をコピペし、.env ファイルを作成。プロキシの設定を行う
   - services/app/.env.local をコピペし、.env ファイルを作成
1. docker-compose の実行
	- 自宅版
		```
		docker-compose up -d
		```
	- 学校版
		```
		docker-compose -f docker-compose-proxy.yml up -d
		```

## 各種 URL

- web: localhost:3000/~~~
- app: localhost:3001/api/v1/~~~
- phpmyadmin: localhost:3307
