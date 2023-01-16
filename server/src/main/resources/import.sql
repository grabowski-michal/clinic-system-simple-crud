INSERT INTO Specialization(name, description) VALUES('Oculist', 'Eye doctor')
INSERT INTO Specialization(name, description) VALUES('Dentist', 'Teeth doctor')
INSERT INTO Specialization(name, description) VALUES('Laryngologist', 'Ear doctor')
INSERT INTO Specialization(name, description) VALUES('Dermatologist', 'Skin doctor')
INSERT INTO Specialization(name, description) VALUES('Cardiologist', 'Heart doctor')
INSERT INTO Specialization(name, description) VALUES('Neurologist', 'Neural reactions doctor')
INSERT INTO Specialization(name, description) VALUES('Psychiatrist', 'Head doctor')

INSERT INTO Address(street, city, state, country, postal_code) VALUES('ul. Kolorowa 123', 'Kraków', 'małopolskie', 'Polska', '30-123');
INSERT INTO Address(street, city, state, country, postal_code) VALUES('ul. Antrycytowa 45', 'Skarżysko-Kamienna', 'świętokrzyskie', 'Polska', '87-567');
INSERT INTO Address(street, city, state, country, postal_code) VALUES('ul. Ametystowa Franciszka 67', 'Olsztyn', 'warmińsko-mazurskie', 'Polska', '56-345');
INSERT INTO Address(street, city, state, country, postal_code) VALUES('ul. Onyksowa 89', 'Lublin', 'lubelskie', 'Polska', '20-437');
INSERT INTO Address(street, city, state, country, postal_code) VALUES('ul. Topazowa 51', 'Radom', 'mazowieckie', 'Polska', '08-638');
INSERT INTO Address(street, city, state, country, postal_code) VALUES('ul. Szmaragdowa 70', 'Wałbrzych', 'dolnośląskie', 'Polska', '77-632');

INSERT INTO Doctor(first_name, last_name, phone, email, id_card, department, birth_date, description, address_id) VALUES ('Piotr', 'Nowogrodzki', '+48743527250', 'p.nowogrodzki@gmail.com', 'PTR526210', 'General Health', STR_TO_DATE('25-04-1976','%d-%m-%Y'), '', 1);
INSERT INTO Doctor(first_name, last_name, phone, email, id_card, department, birth_date, description, address_id) VALUES ('Barbara', 'Tonieradzka', '+48357634426', 'b.tonieradzka@yahoo.com', 'BRT626847', 'Dental', STR_TO_DATE('05-07-1988','%d-%m-%Y'), '', 2);
INSERT INTO Doctor(first_name, last_name, phone, email, id_card, department, birth_date, description, address_id) VALUES ('Anna', 'Zarucka', '+48501938526', 'a.zarucka@interia.pl', 'ZRC131459', 'Cardiology', STR_TO_DATE('29-11-1969','%d-%m-%Y'), '', 3);
INSERT INTO Doctor(first_name, last_name, phone, email, id_card, department, birth_date, description, address_id) VALUES ('Bolesław', 'Alegorski', '818093156', 'b.alegorski@nfz.pl', 'ALG512567', 'Medical Research', STR_TO_DATE('13-06-1974','%d-%m-%Y'), '', 4);
INSERT INTO Doctor(first_name, last_name, phone, email, id_card, department, birth_date, description, address_id) VALUES ('Robert', 'Niesławny', '+48915751420', 'r.nieslawny@gmail.com', 'NSL418968', 'General Health', STR_TO_DATE('11-08-1959','%d-%m-%Y'), '', 5);
INSERT INTO Doctor(first_name, last_name, phone, email, id_card, department, birth_date, description, address_id) VALUES ('Ewa', 'Diehl', '513149785', 'e.diehl@nfz.pl', 'EDH113935', 'Medical Research', STR_TO_DATE('17-01-1978','%d-%m-%Y'), '', 6);

INSERT INTO doctor_specialization(doctor_id, specialization_id) VALUES(1, 1);
INSERT INTO doctor_specialization(doctor_id, specialization_id) VALUES(2, 2);
INSERT INTO doctor_specialization(doctor_id, specialization_id) VALUES(3, 5);
INSERT INTO doctor_specialization(doctor_id, specialization_id) VALUES(4, 4);
INSERT INTO doctor_specialization(doctor_id, specialization_id) VALUES(5, 3);
INSERT INTO doctor_specialization(doctor_id, specialization_id) VALUES(6, 6);

/* Test user */
INSERT INTO Address(street, city, state, country, postal_code) VALUES('ul. Trawiasta 14/34', 'Bochnia', 'małopolskie', 'Polska', '34-123');
INSERT INTO User(birth_date, email, first_name, id_card, last_name, password, phone, username, address_id) VALUES (STR_TO_DATE('14-01-2005','%d-%m-%Y'), 'traczynski@gmail.com', 'Teodor', 'ABC123456', 'Raczyński', '$2a$10$Uk6TjowzYIjKZEhmfQD2s.ewaLaaDNvUPKKwBIs5E18F1cixLhhGG', '123456789', 'Traczynski1', 7);
