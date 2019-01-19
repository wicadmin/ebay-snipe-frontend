[![Build Status](https://travis-ci.org/Helvio88/ebay-snipe-frontend.svg?branch=master)](https://travis-ci.org/Helvio88/ebay-snipe-frontend/#)
eBay Snipe FrontEnd
==================

This project is a FrontEnd to consume [eBay Snipe Server][1].

Pre Requisites
--------------

1. Install [eBay Snipe Server][1]:
```bash
docker run -d -p 3647:3647 \
-e 'EBAY_USERNAME=<your_username>' -e 'EBAY_PASSWORD=<your_password>' \
ruippeixotog/ebay-snipe-server:0.2-SNAPSHOT
```

2. Install Angular CLI:
```bash
npm install -g @angular/cli
```

3. Clone this project:
```bash
git clone https://github.com/Helvio88
```

4. Compile this project:
```bash
cd ebay-snipe-frontend
ng build --prod
```

5. Copy dist files to your web folder and set permissions:
```bash
cp dist/ebay /var/www/ebay -R
chown www-data:www-data /var/www/ebay -R
```

NginX Configuration
-------------------

Only relevant part is displayed. For more information, visit [NginX][2]

```
	root /var/www/ebay/;
	index index.html;

	location /auction {
		proxy_pass http://127.0.0.1:3647/auction;
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	}

	location /snipes {
		proxy_pass http://127.0.0.1:3647/snipes;
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	}
```
[1]: https://github.com/ruippeixotog/ebay-snipe-server
[2]: https://www.nginx.com/
