CREATE SEQUENCE IF NOT EXISTS auths_id_seq;
CREATE SEQUENCE IF NOT EXISTS blogs_id_seq;

CREATE FUNCTION PUBLIC.timestamp_on_create()
  RETURNS TRIGGER
  LANGUAGE 'plpgsql'
  COST 100
  VOLATILE NOT LEAKPROOF
AS $BODY$ BEGIN
  NEW.created_at := CURRENT_TIMESTAMP;
  RETURN NEW;
END; $BODY$;

CREATE FUNCTION PUBLIC.timestamp_on_modify()
  RETURNS TRIGGER
  LANGUAGE 'plpgsql'
  COST 100
  VOLATILE NOT LEAKPROOF
AS $BODY$ BEGIN
  NEW.modified_at := CURRENT_TIMESTAMP;
  RETURN NEW;
END; $BODY$;

CREATE FUNCTION row_version_on_modify()
  RETURNS TRIGGER
  LANGUAGE 'plpgsql'
  COST 100
  VOLATILE NOT LEAKPROOF
AS $BODY$ BEGIN
  NEW._v := NEW._v + 1;
  RETURN NEW;
END; $BODY$;


CREATE TYPE "USER_TYPE" AS ENUM ('admin', 'user');


CREATE TABLE IF NOT EXISTS auths (
  _id INTEGER GENERATED ALWAYS AS IDENTITY,
  email VARCHAR (100) COLLATE pg_catalog."default" NOT NULL,
  "password" VARCHAR (1024) COLLATE pg_catalog."default" NOT NULL,
  first_name VARCHAR (100) COLLATE pg_catalog."default" NOT NULL,
  last_name VARCHAR (100) COLLATE pg_catalog."default" NOT NULL,
  phone VARCHAR (100) COLLATE pg_catalog."default" NOT NULL,
  user_type "USER_TYPE" NULL,
  created_at DATE NOT NULL,
  modified_at DATE NOT NULL,
  _v INTEGER DEFAULT 1 NOT NULL,
  CONSTRAINT auths_pkey PRIMARY KEY (_id),
  CONSTRAINT email_key UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS blogs (
  _id INTEGER GENERATED ALWAYS AS IDENTITY,
  content TEXT COLLATE pg_catalog."default" NOT NULL,
  auth_id INTEGER NOT NULL,
  created_at DATE NOT NULL,
  modified_at DATE NOT NULL,
  _v INTEGER DEFAULT 1 NOT NULL,
  CONSTRAINT blogs_pkey PRIMARY KEY (_id),
  CONSTRAINT blogs_auth_id_fkey FOREIGN KEY (auth_id)
    REFERENCES PUBLIC.auths (_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
);


CREATE TRIGGER auths_timestamp_on_create
  BEFORE INSERT
  ON PUBLIC.auths
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.timestamp_on_create();

CREATE TRIGGER auths_timestamp_on_modify
  BEFORE INSERT OR UPDATE
  ON PUBLIC.auths
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.timestamp_on_modify();

CREATE TRIGGER auths_row_version_on_modify
  BEFORE UPDATE
  ON PUBLIC.auths
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.row_version_on_modify();

CREATE TRIGGER blogs_timestamp_on_create
  BEFORE INSERT
  ON PUBLIC.blogs
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.timestamp_on_create();

CREATE TRIGGER blogs_timestamp_on_modify
  BEFORE INSERT OR UPDATE
  ON PUBLIC.blogs
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.timestamp_on_modify();

CREATE TRIGGER blogs_row_version_on_modify
  BEFORE UPDATE
  ON PUBLIC.blogs
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.row_version_on_modify();
