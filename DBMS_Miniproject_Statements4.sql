-- DBMS_Miniproject.sql
--  SOURCE D:\Programming\DBMS_Miniproject.sql;

-- Creation
Create database DBMS_MINI_PROJ;
Use DBMS_MINI_PROJ;

Create table Customers(C_id INT PRIMARY KEY AUTO_INCREMENT, C_name varchar(30), C_mob varchar(15) UNIQUE NOT NULL, C_adr varchar(30));

Create table Orders(O_id INT PRIMARY KEY AUTO_INCREMENT, C_id INT, O_total DECIMAL(10,2) default 0, O_discount DECIMAL(10,2) default 0, O_status ENUM("Cancelled", "In Progress", "Completed") Default "In Progress", O_date DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(C_id) References Customers(C_id) ON DELETE CASCADE);

Create table Payments(P_id INT PRIMARY KEY AUTO_INCREMENT, O_id INT, P_status ENUM("Cancelled", "In Progress", "Completed") Default "In Progress", P_mode ENUM("Cash","Card","UPI") Default "Cash" ,P_charge DECIMAL(10,2) DEFAULT 0, P_value DECIMAL(10,2) DEFAULT 0, FOREIGN KEY(O_id) references Orders(O_id) ON DELETE CASCADE);

Create table Categories(Cat_id INT PRIMARY KEY AUTO_INCREMENT, Cat_name varchar(50), Cat_det text);

Create table Items(I_id INT PRIMARY KEY AUTO_INCREMENT, Cat_id INT, I_price DECIMAL(10,2) Default 0, I_brand varchar(50), I_size ENUM("XXS", "XS", "S", "M", "L", "XL", "XXL"), I_sex ENUM("Male","Female","Unisex"), I_stock INT default 0,  FOREIGN KEY(Cat_id) references Categories(Cat_id));

Create table Includes(O_id INT, I_id INT, In_qty INT DEFAULT 0, In_cost DECIMAL(10,2) DEFAULT 0,FOREIGN KEY(O_id) references Orders(O_id) ON DELETE CASCADE, FOREIGN KEY(I_id) references Items(I_id));

Create table Suppliers(S_id INT PRIMARY KEY AUTO_INCREMENT, S_name varchar(50), S_det varchar(100));

Create table SupplierOrders(SO_id INT PRIMARY KEY, S_id INT, I_id INT, SO_qty INT DEFAULT 0, SO_cost DECIMAL(10,2) DEFAULT 0, SO_status ENUM("Cancelled", "In Progress", "Completed") Default "In Progress", SO_date DATETIME DEFAULT CURRENT_TIMESTAMP,  FOREIGN KEY(S_id) references Suppliers(S_id), FOREIGN KEY(I_id) references Items(I_id));

-- Triggers

Delimiter //
create trigger auto_cost_calc
Before Insert on Includes
For Each Row
Begin
SET NEW.In_cost = NEW.In_qty * (Select I_price from Items as I where NEW.I_id = I.I_id);
END;
//
Delimiter ;

Delimiter //
create trigger auto_total_calc
After Insert on Includes
For Each Row
Begin
Update Orders
Set O_total = O_total + NEW.In_cost
WHERE Orders.O_id = NEW.O_id;
END    
//
Delimiter ;


Delimiter //
create trigger P_auto_create
After Insert on Orders
For Each Row
Begin
Insert into Payments(O_id) values(NEW.O_id);
END;
//
Delimiter ;

Delimiter //
create trigger I_stock_dec
After Insert on Includes
For Each Row
Begin
Update Items
SET I_stock = I_stock - NEW.In_qty;	
End;
//
Delimiter ;

Delimiter //
create trigger I_stock_error
Before Insert on Includes
For Each Row
Begin
Declare stock INT;
select I_stock INTO stock from Items as I where I.I_id = NEW.I_id;
IF stock < NEW.In_qty THEN
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Insufficient Stock';
END IF;
End;
//
Delimiter ;

Delimiter //
create trigger End_Order
After Update ON Payments
FOR EACH ROW
BEGIN
DECLARE st VARCHAR(15);
select P_status into st from payments where NEW.P_id = P_id;

IF st != "In Progress" THEN
Update Orders
SET O_status = st 
where O_id = NEW.O_id;
END IF;
END;
//
Delimiter ;


Delimiter //
create trigger O_reopen_error
Before Insert on Includes
For Each Row
Begin
Declare st varchar(15);
select O_status INTO st from Orders where O_id = NEW.O_id;
IF st != 'In Progress' THEN
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Order is Closed. Create New Order.';
END IF;
End;
//
Delimiter ;

Delimiter //
create trigger O_reopen_error_2
Before Update on Orders
For Each Row
Begin
Declare st varchar(15);
select O_status INTO st from Orders where O_id = NEW.O_id;
IF st != 'In Progress' THEN
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Order is Closed.';
END IF;
End;
//
Delimiter ;

Delimiter //
create trigger P_total
After Update on Orders
For Each Row
Begin
Update Payments
SET P_value = NEW.O_total*(1+P_charge/100)
WHERE Payments.O_id = NEW.O_id;
END;
//
Delimiter ;


-- PL/SQL

Delimiter //
Create Procedure Pay(IN mode VARCHAR(15), IN P_O_id INT, IN st varchar(15))
Begin
Update Payments
SET P_mode = mode where O_id = P_O_id;
IF st = 'Completed' THEN
Update Payments
SET P_status = st 
where O_id = P_O_id;
ELSE
Update Payments
SET P_status = 'Cancelled'
where O_id = P_O_id;
END IF;
END;
//
Delimiter ;


Delimiter //
Create Procedure AddOrder( IN Cust_mob varchar(15), OUT Or_id INT)
BEGIN
Declare Cust_id INT;
SELECT C_id into Cust_id from Customers where Cust_mob = C_mob;
IF Cust_id IS NOT NULL THEN
Insert Into Orders(C_id) Values(Cust_id);
Select O_id into Or_id from Orders where C_id = Cust_id and O_status = 'In Progress';
ELSE
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Customer Not Found. Create Customer First.';
END IF;
END;
//
Delimiter ;


Delimiter //
Create Procedure AddCustomer(IN Name Varchar(30), IN Mobile Varchar(15), In Address Varchar(59))
BEGIN
Insert Into Customers(C_name,C_mob, C_adr) values(Name, Mobile, Address);
END;
//
Delimiter ;









