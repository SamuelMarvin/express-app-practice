DROP TABLE IF EXISTS family;

CREATE TABLE family (
    id serial PRIMARY KEY,
    name text NOT NULL,
    age integer NOT NULL
);

INSERT INTO family(name, age) VALUES('stephen', 60);
INSERT INTO family(name, age) VALUES('samuel', 23);
INSERT INTO family(name, age) VALUES('jonathan', 22);
INSERT INTO family(name, age) VALUES('karen', 58);
INSERT INTO family(name, age) VALUES('joshua', 24);