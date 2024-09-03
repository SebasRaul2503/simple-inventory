CREATE DATABASE SimpleInventory;
GO

USE SimpleInventory;
GO

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('INVENTORY') and o.name = 'FK_INVENTOR_REFERENCE_PRODUCT')
alter table INVENTORY
   drop constraint FK_INVENTOR_REFERENCE_PRODUCT
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('"TRANSACTION"') and o.name = 'FK_TRANSACT_REFERENCE_PRODUCT')
alter table "TRANSACTION"
   drop constraint FK_TRANSACT_REFERENCE_PRODUCT
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('"TRANSACTION"') and o.name = 'FK_TRANSACT_REFERENCE_USER')
alter table "TRANSACTION"
   drop constraint FK_TRANSACT_REFERENCE_USER
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('USERPRIVILEGES') and o.name = 'FK_USERPRIV_REFERENCE_USER')
alter table USERPRIVILEGES
   drop constraint FK_USERPRIV_REFERENCE_USER
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('USERPRIVILEGES') and o.name = 'FK_USERPRIV_REFERENCE_USERROLE')
alter table USERPRIVILEGES
   drop constraint FK_USERPRIV_REFERENCE_USERROLE
go

if exists (select 1
            from  sysobjects
           where  id = object_id('INVENTORY')
            and   type = 'U')
   drop table INVENTORY
go

if exists (select 1
            from  sysobjects
           where  id = object_id('PRODUCT')
            and   type = 'U')
   drop table PRODUCT
go

if exists (select 1
            from  sysobjects
           where  id = object_id('"TRANSACTION"')
            and   type = 'U')
   drop table "TRANSACTION"
go

if exists (select 1
            from  sysobjects
           where  id = object_id('"USER"')
            and   type = 'U')
   drop table "USER"
go

if exists (select 1
            from  sysobjects
           where  id = object_id('USERPRIVILEGES')
            and   type = 'U')
   drop table USERPRIVILEGES
go

if exists (select 1
            from  sysobjects
           where  id = object_id('USERROLE')
            and   type = 'U')
   drop table USERROLE
go

/*==============================================================*/
/* Table: INVENTORY                                             */
/*==============================================================*/
create table INVENTORY (
   INVENTORYID          bigint               identity,
   PRODUCTID            bigint               null,
   QUANTITYAVAILABLE    bigint               null,
   MINSTOCKLEVEL        bigint               null,
   MAXSTOCKLEVEL        bigint               null,
   constraint PK_INVENTORY primary key (INVENTORYID)
)
go

/*==============================================================*/
/* Table: PRODUCT                                               */
/*==============================================================*/
create table PRODUCT (
   PRODUCTID            bigint               identity,
   PRODUCTCODE          nvarchar(100)        null,
   BARCODE              nvarchar(100)        null,
   PRODUCTNAME          nvarchar(500)        null,
   PRODUCTDESCRIPTION   nvarchar(2000)       null,
   PRODUCTCATEGORY      nvarchar(150)        null,
   constraint PK_PRODUCT primary key (PRODUCTID)
)
go

/*==============================================================*/
/* Table: "TRANSACTION"                                         */
/*==============================================================*/
create table "TRANSACTION" (
   TRANSACTIONID        bigint               identity,
   PRODUCTID            bigint               null,
   USERID               bigint               null,
   TRANSACTIONTYPE      nvarchar(100)        null,
   TRANSACTIONQUANTITY  int                  null,
   TRANSACTIONDATE      date                 null,
   constraint PK_TRANSACTION primary key (TRANSACTIONID)
)
go

/*==============================================================*/
/* Table: "USER"                                                */
/*==============================================================*/
create table "USER" (
   USERID               bigint               identity,
   USERNAME             nvarchar(64)         unique,
   USERPASSWORD         nvarchar(200)        null,
   constraint PK_USER primary key (USERID)
)
go

/*==============================================================*/
/* Table: USERPRIVILEGES                                        */
/*==============================================================*/
create table USERPRIVILEGES (
   USERPRIVILEGEID      bigint               identity,
   USERID               bigint               null,
   ROLEID               int                  null,
   constraint PK_USERPRIVILEGES primary key (USERPRIVILEGEID)
)
go

/*==============================================================*/
/* Table: USERROLE                                              */
/*==============================================================*/
create table USERROLE (
   ROLEID               int                  identity,
   ROLENAME             nvarchar(100)        null,
   CANADDPRODUCT        bit                  null,
   CANEDITPRODUCT       bit                  null,
   CANDELETEPRODUCT     bit                  null,
   CANVIEWINVENTORY     bit                  null,
   CANEDITINVENTORY     bit                  null,
   CANVIEWREPORTS       bit                  null,
   CANMODIFYUSERS       bit                  null,
   constraint PK_USERROLE primary key (ROLEID)
)
go

alter table INVENTORY
   add constraint FK_INVENTOR_REFERENCE_PRODUCT foreign key (PRODUCTID)
      references PRODUCT (PRODUCTID)
go

alter table "TRANSACTION"
   add constraint FK_TRANSACT_REFERENCE_PRODUCT foreign key (PRODUCTID)
      references PRODUCT (PRODUCTID)
go

alter table "TRANSACTION"
   add constraint FK_TRANSACT_REFERENCE_USER foreign key (USERID)
      references "USER" (USERID)
go

alter table USERPRIVILEGES
   add constraint FK_USERPRIV_REFERENCE_USER foreign key (USERID)
      references "USER" (USERID)
go

alter table USERPRIVILEGES
   add constraint FK_USERPRIV_REFERENCE_USERROLE foreign key (ROLEID)
      references USERROLE (ROLEID)
go
