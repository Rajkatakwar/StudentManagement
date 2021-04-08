create database StudentManagement;

create table Divisions(ID smallint IDENTITY(1,1) PRIMARY KEY,
					   Name varchar(50) not null)

create table Students(ID int IDENTITY(1,1) PRIMARY KEY,
					  RollNumber smallint not null,
					  Fullname varchar(50) not null,
					  Attendance int not null,
					  DivisionId smallint not null references Divisions (ID),
					  Standard varchar(3) not null,
					  GPA Decimal not null,
					  DateOfBirth date not null,
					  IsActive bit not null)

Insert into Divisions values('D')
select * from Students
update Divisions set Name = 'C' where ID = 3
Insert into Students values(25,'Raj Katakwar',1,3,'VI',9.10,'19-Oct-1998',0)

alter table students alter column standard varchar(4) not null

truncate table students