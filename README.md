# Food Hub Ordering System

This is our System Analysis and Design and Software Engineering project.

## About The System
This is an ordering system for small food businesses. 

## Features of the System (Client Side)

### Create an Account

The user can create an account by providing his/her name, date of birth, mobile number, username and password.

![Sign Up](https://user-images.githubusercontent.com/63532775/210089120-60092dd0-56e3-4f61-889d-916eff50bd37.gif)

### Log In

The user can also log in to his/her created account by providing the username and password. After the user successfully logins 
to his/her account, the system will directly go to the **Todays Menu** page.

![Login](https://user-images.githubusercontent.com/63532775/210089364-5f4c6359-0d4c-4ae8-99c9-26b4c78b363e.gif)

### Item/Food Info

The user can choose the food that he/she wish to order and can increase/decrease the quantity, and lastly he/she can also add it to the cart/bag.

![Showing Item Info and Adding to Bag](https://user-images.githubusercontent.com/63532775/210089832-d275a224-7bf0-48c7-8d72-9662798f7f70.gif)

### View Cart

The user can also modify his/her cart by deleting existing item or modify food's quantity. 

![Cart](https://user-images.githubusercontent.com/63532775/210090044-1b17c673-2bcc-4779-b831-4b801b27431c.gif)

### Checkout

The user can also checkout his/her order by providing mode of payment such as **Pickup** or **Cash-on-Delivery**, address if the mode of payment is **C.O.D** and time of delivery or pickup.

![Placing and Checkout (2)](https://user-images.githubusercontent.com/63532775/210090646-728b60c5-1959-443b-b5db-bc2a75958639.gif)

### Your Orders 

The user can view all of his/her **pending**, **preparing**, **To Received**, **Received**, and **Cancelled** orders. The user can cancel the order when it is still on **Pending** stage. In the example below, the account does not have more orders.

 ![Your Orders](https://user-images.githubusercontent.com/63532775/210090904-901b06e0-f725-4614-82e1-d4b285d4f1c0.gif)

### Editing Profile

The user can edit his/her username, add profile picture, mobile number, and password.

![Profile Editing](https://user-images.githubusercontent.com/63532775/210093711-8e31b6b8-d5e7-4ae4-9328-119627d916d9.gif)

### Deleting Profile

The user can delete his/her profile by providing the given key of the system.

![Deleting Profile](https://user-images.githubusercontent.com/63532775/210094893-ca63045c-635e-4c3e-9bbf-b546406bae1d.gif)

## Features of the System (Admin Side)

### Log In

The login for the admin is seperated in our system. As you can see, there are **four** tabs that the admin can access.

![Admin Login](https://user-images.githubusercontent.com/63532775/210124800-c5fcaf84-cd99-404f-bf0f-ea5635a061cd.gif)

### View Users Info

![Admin Users](https://user-images.githubusercontent.com/63532775/210124817-47b5eb07-3b54-4fd0-b18d-5ef18679d59c.png)

### View Menu

The admin can also modify existing menu by adding, editing the name, price and availability, and by deleting.

![Admin Menu](https://user-images.githubusercontent.com/63532775/210124953-d7f90026-3605-47e9-93ab-42963fdac1c0.gif)

### View Orders

On the admin side, it can also edit the status of the order. The admin can set it as **preparing** and **to received**. The admin can also view all the orders in different statuses.

![Admin Orders](https://user-images.githubusercontent.com/63532775/210125010-141e78be-6dbb-4b8a-90f6-dcf773ec91d9.gif)

### View Summary

The admin can also know total number of menus and total number of orders for today. It can also provide total sales for each month for every year.

![Admin Summary](https://user-images.githubusercontent.com/63532775/210125083-410aa765-a1cb-4c04-a396-c5c61925da1b.gif)

## Databse Schemas

### Users Table
```
CREATE TABLE Users (
  id_number varchar(500) not null,
  given_name varchar(50) not null,
  middle_name varchar(50) not null,
  last_name varchar(50) not null,
  birthday DATE not null,
  age int not null,
  sex varchar(12),
  username varchar(8) not null,
  password varchar(150) not null,
  mobile_number varchar(12),
  profile_image_path varchar(50),
  primary key(id_number)
);
```

### Menu Table
```
CREATE TABLE Menu (
   menu_id varchar(100),
   menu varchar(50) not null,
   menu_price decimal(30, 10),
   image_path varchar(1000),
   status varchar(30),
   primary key (menu_id)
);
```

### Transactions
```
CREATE TABLE TRANSACTIONS (
   id_number varchar(500),
   menu_id varchar(100),
   menu varchar(50),
   order_time time(0),
   location varchar(1000),
   payment_method boolean,
   total_price decimal(30, 10),
   status varchar(30),
   foreign key (id_number) references users(id_number) ON DELETE CASCADE ON UPDATE CASCADE,
   foreign key (menu_id) references menu(menu_id) ON DELETE CASCADE ON UPDATE CASCADE
);
```

### Orders
```
CREATE TABLE Orders (
   id_number VARCHAR(500),
   order_id VARCHAR(200),
   order_date DATE,
   items JSON,
   order_details JSON,
   status VARCHAR(30),
   PRIMARY KEY (order_id),
   FOREIGN KEY (id_number) REFERENCES users(id_number)
);
```

### Cart
```
CREATE TABLE Cart (
   id_number varchar(500),
   menu_id varchar(100),
   quantity int,
   foreign key (id_number) references users(id_number) ON DELETE CASCADE ON UPDATE CASCADE,
   foreign key (menu_id) references menu(menu_id) ON DELETE CASCADE ON UPDATE CASCADE
);
```

### Admin
```
CREATE TABLE Admin (
   username VARCHAR(100),
   password VARCHAR(100)
);
```
