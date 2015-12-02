--------------------------
-- create tables

-- list of users that signed in with oauth (email&name)
CREATE TABLE public.users
(
  id serial NOT NULL,
  email varchar NOT NULL,
  name varchar NOT NULL,
  created_at timestamp without time zone NOT NULL default current_timestamp,
  CONSTRAINT users_pkey_id PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.users
  OWNER TO cellularcoverage;

  
-- table for measurements made by users
-- INSERT updates to mapdata via a trigger
CREATE TABLE measurements
(
  id serial NOT NULL,
  latitude double precision,
  longitude double precision,
  quality double precision,
  created_at timestamp without time zone NOT NULL default current_timestamp,
  CONSTRAINT measurements_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.measurements
  OWNER TO cellularcoverage;  

-- table to relate measurements to the users that created them
CREATE TABLE public.measurement2user
(
  userid serial NOT NULL references public.users(id),
  measurementid serial NOT NULL references public.measurements(id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.measurement2user
  OWNER TO cellularcoverage;


  
-- table representing the geospatial data used by geoserver
CREATE TABLE public.mapdata
(
  gid SERIAL PRIMARY KEY,
  -- bin bigint,
  the_geom geometry(Polygon,4326), -- geometry
  quality FLOAT, -- average quality
  samples INTEGER -- amount of samples
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.mapdata
  OWNER TO cellularcoverage;



--------------------------
-- trigger stuff
-- updates mapdata when a measurement is added
CREATE OR REPLACE FUNCTION test_function()
  RETURNS trigger AS
$BODY$
DECLARE
    lon INTEGER;
    lat INTEGER;
    geostr varchar;
    geodat geometry(Polygon,4326);

    outrow RECORD;
BEGIN
  IF (TG_TABLE_NAME = 'measurements') THEN
    IF(TG_OP = 'INSERT') THEN
      -- get first corner of rectangle
      lon = FLOOR(NEW.longitude);
      lat = FLOOR(NEW.latitude);
      -- prepare geometry string from lon/lat
      geostr = format('SRID=4326;POLYGON((
        %1$s %2$s, 
        %1$s %4$s, 
        %3$s %4$s, 
        %3$s %2$s, 
        %1$s %2$s))',
        lon,  lat,  
        lon+1,  lat+1);
      geodat = GeomFromEWKT(geostr);
      
      RAISE NOTICE 'TRIGGER called on % with %/%', TG_TABLE_NAME, lon, lat;
      RAISE NOTICE 'geometry: %',geostr;
      
      -- check if there is already some data
      SELECT * INTO outrow FROM mapdata WHERE the_geom = geodat;
      IF NOT FOUND THEN -- does not exist, create
        RAISE NOTICE 'not found, creating';
        INSERT INTO mapdata(the_geom, quality,     samples) 
                  VALUES(geodat,   NEW.quality, 1);
      ELSE -- exists, udpate
        RAISE NOTICE 'found, updating';
        UPDATE mapdata SET 
          quality = (outrow.quality*outrow.samples+NEW.quality)/(outrow.samples+1),
          samples = (outrow.samples+1)
          WHERE gid = outrow.gid;      
      END IF;
      
      
      RETURN NEW;
    END IF;
  END IF;
 
  RETURN null; -- updates are ignored
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION test_function()
  OWNER TO cellularcoverage;
--------------------------
-- bind function to measurements as trigger
CREATE TRIGGER test_trigger
BEFORE INSERT OR UPDATE
ON measurements
FOR EACH ROW
EXECUTE PROCEDURE test_function();

-- test inserts
insert into measurements(longitude, latitude, quality) values (23.3, 65.42, 8);
insert into measurements(longitude, latitude, quality) values (24.7, 65.12, 5);
