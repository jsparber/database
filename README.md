database
=========
Project of Basi di Dati 2015


##Create database in a docker
  docker run --name some-mariadb -e MYSQL_ROOT_PASSWORD=mysecretpassword -d mariadb
  To get the server ip address
  docker inspect mariadb | grep IPAddress
##Data Sturct
####Products
| Product ID | Product Name |    Description    |  Add date  | 
| ----- | --------------| ---------------------- | --------- |
|   1   | Mokka         | Coffee making machine  | 2013/12/12 |

######Tag
|   Tag   | List of Products |
|   ---   | ---------------- |
| Coffee  |         1        |
| Mokka   |         1        |
| Morning |      1, 14       |

######Pricing
######Auction
| Product ID | Price |
| ---------- | ----- |
|      11    |  10,5 |

######bids
|     Data        | Product ID | Amount |  User  |
| --------------- | ------ | ---------- | ------ |
| 27/01/2014 13:20|    11  |    12      | Julian |

######instantSell
| Product ID | Price |
| ---------- | ----- |
|      1     |  10,5 |

######Shipping
| Product ID | Carrier | Country | Shipping Cost | Transit Time |
| ---------- | ------- | ------- | ------------- | ------------ |
|      1     |   TNT   |  Italy  |      3.50     |  10-20 Days  |

######Buyer
| Product ID | User | date of purchase |
| ---------- | ---- | ---------------- |
|      1     | Julian |   2014/12/01   |

######Vendor
Maybe its better to set vendor in the product table

|  User  | List of Product|
| ------ | -------------- | 
| Julian |      1, 12     |

####Users
| User |     E-Mail    |      Name     | Adress | Phone |
| ---- | ------------- | ------------- | ------ | ----- |
| Julian | my@email.com| Julian Sparber | Urbino | +3900000000 |

######User Rating
| User | No. of Votes | Rating |
|------|-------|----|
| Julian | 1000 | 100% |
