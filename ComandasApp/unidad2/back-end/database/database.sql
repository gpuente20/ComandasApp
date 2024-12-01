
DROP TABLE IF EXISTS `Mesero`;
Create Table `Mesero`
(
	`idMesero` int not null AUTO_INCREMENT,
	`nombre` varchar(50) not null,
    `apellido` varchar(50) not null,
    constraint pk_idMesero Primary Key(idMesero)
);

Insert Into Platillos(idMesero,nombre, apellido)values('1','Juan','Perez')
Insert Into Platillos(idMesero,nombre, apellido)values('2','Luis','Mendoza')
Insert Into Platillos(idMesero,nombre, apellido)values('3','Diego','Aguilar')

DROP TABLE IF EXISTS `Comanda`;	
Create Table Comanda	
(
	`idComanda` int not null,   
	`idMesero` int not null,
    `formaPago` varchar(50) null,
    `propina` float null,
    `total` float null,
    constraint pk_idComanda Primary Key(idComanda),
    Constraint fk_idMesero Foreign Key(idMesero)References Mesero(idMesero) On Delete Cascade
);
/* DROP TABLE IF EXISTS `Mesero`;
Create Table `Mesero`
(
	`idMesero` int not null AUTO_INCREMENT,
	`nombre` varchar(50) not null,
    constraint pk_nombreMesero Primary Key(nombre)
);

DROP TABLE IF EXISTS `Comanda`;	
Create Table Comanda	
(
	`idComanda` int not null,   
	`nombre` varchar(50) not null,
    `formaPago` varchar(50) null,
    `propina` float null,
    `total` float null,
    constraint pk_idComanda Primary Key(idComanda),
    Constraint fk_nombreMesero Foreign Key(nombre)References Mesero(nombre) On Delete Cascade
); */

DROP TABLE IF EXISTS `Platillos`;
Create Table Platillos(
    `idPlatillo` int AUTO_INCREMENT,
    `Nombre` varchar(50) null,
    `Descripcion` varchar(100) null,
    `Costo` float null,
    constraint pk_idPlatillo Primary Key(idPlatillo)
);

DROP TABLE IF EXISTS `Bebidas`;
Create Table Bebidas(
    `idBebida` int AUTO_INCREMENT,
    `Nombre` varchar(50) null,
    `Descripcion` varchar(100) null,
    `Costo` float null,
    constraint pk_idBebida Primary Key(idBebida)
);

DROP TABLE IF EXISTS `Paquete`;
Create Table Paquete(
    `idPaquete` int AUTO_INCREMENT,
    `Nombre` varchar(50) null,
    `Descripcion` varchar(100) null,
    `Costo` float null,
    constraint pk_idPaquete Primary Key(idPaquete)
);

Insert Into Platillos(Nombre,Costo, Descripcion)values('Pozole','90','Plato de Pozole de res rojo')
Insert Into Platillos(Nombre,Costo, Descripcion)values('Chilaquiles','60','Plato de Chilaquiles verdes')
Insert Into Bebidas(Nombre,Costo, Descripcion)values('Limonada','35', 'Limonada de 150ml')
Insert Into Bebidas(Nombre,Costo, Descripcion)values('Narangada','35', 'Narangada de 150ml')
Insert Into Paquete(Nombre,Costo, Descripcion)values('Paquete 1','250', 'Paquete de 2 guisados y 1 bebida')
Insert Into Paquete(Nombre,Costo, Descripcion)values('Paquete 2','350', 'Paquete de 3 guisados y 2 bebida')

seqcomandaCREATE SEQUENCE seqComanda 
START WITH 1;seqcomanda  
INCREMENT BY 1;
SELECT 'seqComanda.nextval' from dual
SELECT NEXT VALUE FOR seqcomanda AS Secuencia;

--Relacion de la Comanda y Platillos 
DROP TABLE IF EXISTS `ComandaPlatillos`;	
Create Table ComandaPlatillos(
    `idPlatillo` int not null,
    `idComanda` int not null,
    `cantidad` float not null,
    Constraint fk_idPlatillo Foreign Key(idPlatillo)References Platillos(idPlatillo) On Delete Cascade,
    Constraint fk_idComanda Foreign Key(idComanda)References Comanda(idComanda) On Delete Cascade
);

--Relacion de la Comanda y Bebidas
DROP TABLE IF EXISTS `ComandaBebidas`;	
Create Table ComandaBebidas(
    `idBebida` int not null,
    `idComanda` int not null,
    `cantidad` float not null,
    Constraint fk_idBebida Foreign Key(idBebida)References Bebidas(idBebida) On Delete Cascade,
    Constraint fk_idComanda_bebidas Foreign Key(idComanda)References Comanda(idComanda) On Delete Cascade
);

--Relacion de la Comanda y Paquetes
DROP TABLE IF EXISTS `ComandaPaquete`;
Create Table ComandaPaquete(
    `idPaquete` int not null,
    `idComanda` int not null,
    `cantidad` float not null,
    Constraint fk_idPaquete Foreign Key(idPaquete)References Paquete(idPaquete) On Delete Cascade,
    Constraint fk_idComanda_paquete Foreign Key(idComanda)References Comanda(idComanda) On Delete Cascade
);



Select SUM(Costo) from (
    select Costo * Cantidad from Comanda
    inner join ComandaPlatillos on idComanda = idComanda
    inner join platillos on idPlatillo = idPlatillo
    union all
    select Costo * Cantidad from comanda
    inner join ComandaBebidas on idComanda = idComanda
    inner join Bebidas on idBebida = idBebida
    union all
    select Costo * Cantidad from comanda
    inner join ComandaPaquete on idComanda = idComanda
    inner join Paquete on idPaquete = idPaquete
)


/* Create Table Grupo
(
	cveGru char(7) not null,
	nomGru varchar(50) not null,
	constraint pk_cveGru Primary Key(cveGru)
)

Create Table Alumno
(
	cveAlu char(4) not null,        --pk
	nomAlu varchar(100) not null,
	edaAlu tinyint not null,
	cveGru char(7) not null,        --fk

	Constraint pk_cveAlu Primary Key(cveAlu),
	Constraint fk_cveGru Foreign Key(cveGru)References Grupo(cveGru) On Delete Cascade
) */
