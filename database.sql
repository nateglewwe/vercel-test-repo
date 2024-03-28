-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "gear_list" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (128) NOT NULL,
	"feature_1" VARCHAR (128),
	"feature_2" VARCHAR (128),
	"feature_3" VARCHAR (128),
	"feature_4" VARCHAR (128),
	"feature_5" VARCHAR (128),
	"feature_6" VARCHAR (128),
	"feature_7" VARCHAR (128),
	"feature_8" VARCHAR (128),
	"note_1" VARCHAR (128),
	"note_2" VARCHAR (128),
	"note_3" VARCHAR (128),
	"note_4" VARCHAR (128),
	"note_5" VARCHAR (128),
	"note_6" VARCHAR (128),
	"note_7" VARCHAR (128),
	"note_8" VARCHAR (128),
	"photo" VARCHAR (1000),
	"user_id" integer REFERENCES "user"
	);

CREATE TABLE "event_list" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (128) NOT NULL,
	"dates" DATERANGE NOT NULL,
	"detail_1" VARCHAR (128),
	"detail_2" VARCHAR (128),
	"detail_3" VARCHAR (128),
	"detail_4" VARCHAR (128),
	"detail_5" VARCHAR (128),
	"detail_6" VARCHAR (128),
	"detail_7" VARCHAR (128),
	"detail_8" VARCHAR (128),
	"contact_1" VARCHAR (128),
	"contact_2" VARCHAR (128),
	"gear_1_id" integer REFERENCES "gear_list",
	"gear_2_id" integer REFERENCES "gear_list",
	"gear_3_id" integer REFERENCES "gear_list",
	"gear_4_id" integer REFERENCES "gear_list",
	"gear_5_id" integer REFERENCES "gear_list",
	"gear_6_id" integer REFERENCES "gear_list",
	"gear_7_id" integer REFERENCES "gear_list",
	"gear_8_id" integer REFERENCES "gear_list",
	"user_id" integer REFERENCES "user"
	);

-- Test data for gear_list table
INSERT INTO "gear_list"
("name",
"feature_1","feature_2","feature_3","feature_4","feature_5","feature_6","feature_7","feature_8",
"note_1","note_2","note_3","note_4","note_5","note_6","note_7","note_8",
"photo",
"user_id")
VALUES
('Behringer X32',
'32 XLR inputs','6 TRS 1/4” inputs', '16 XLR outputs', '4 effects racks', null, null, null, null,
'Ch 9 thumbnail screen needs repair', null, null, null, null, null, null, null,
null,
1)
('QSC K12.2 Speakers (Pair)',
'Powered','2 XLR inputs', '1 1/8” input', '3 XLR outputs', null, null, null, null,
null, null, null, null, null, null, null, null,
null,
1)
('Midas MR18',
'16 XLR inputs','2 TRS inputs', '8 XLR outputs', 'Network port', null, null, null, null,
'Use with Wi-Fi router', 'Can be rack mounted', 'Include IEC cable', null, null, null, null, null,
null,
1)
('Shure Beta 58A Mic',
'Handheld Dynamic Mic','Supercardioid polar pattern', '50Hz-16kHz Frequency Response', null, null, null, null, null,
'DO NOT DROP THE MIC!', null, null, null, null, null, null, null,
null,
1);

--Test data for events_list table
INSERT INTO "event_list"
(name,
dates,
detail_1, detail_2, detail_3, detail_4, detail_5, detail_6, detail_7, detail_8,
contact_1, contact_2,
gear_1_id, gear_2_id, gear_3_id, gear_4_id, gear_5_id, gear_6_id, gear_7_id, gear_8_id,
user_id)
VALUES
('Tony and Sydney Wedding',
'[2024-06-01, 2024-06-02]',
'2pm arrival', 'Setup by 4pm', 'Mics for MC and Pastor', 'Client provides playlist', null, null, null, null,
'tony@gmail.com', null,
 2, 3, null, null, null, null, null, null,
 1)
 
('Skylark Opera Pop-Up Concert',
'[2024-07-07, 2024-07-07]',
'1pm arrival', 'Setup by 2pm', 'Four singers this time', 'Keyboard into mixer', null, null, null, null,
'angie@gmail.com', null,
 4, 3, null, null, null, null, null, null,
 2)
 
 ('SOAR Arts Finding Nemo Jr',
'[2024-02-10, 2024-02-18]',
'Load-in Friday evening', 'Demo mics for kids', 'Tech all day Sunday', 'Just keep swimming!', null, null, null, null,
'terry@gmail.com', null,
 2, 3, null, null, null, null, null, null,
 2)
 
 ('Greg borrows my speakers',
'[2024-08-01, 2024-08-01]',
'Remember IEC cables', 'He has everything else', null, null, null, null, null, null,
'greg@gmail.com', null,
3, null, null, null, null, null, null, null,
1);

--Add event_id column to gear_list table, after creating the event_list table because this references it
ALTER TABLE "gear_list"
ADD COLUMN "event_id" integer REFERENCES "event_list";

