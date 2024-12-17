--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."OrderStatus" AS ENUM (
    'PENDING',
    'COMPLETED',
    'CANCELLED'
);


ALTER TYPE public."OrderStatus" OWNER TO postgres;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Order" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "totalAmount" numeric(65,30) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status public."OrderStatus" DEFAULT 'PENDING'::public."OrderStatus" NOT NULL
);


ALTER TABLE public."Order" OWNER TO postgres;

--
-- Name: OrderItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OrderItem" (
    id text NOT NULL,
    "orderId" text NOT NULL,
    "productId" text NOT NULL,
    quantity integer NOT NULL,
    "totalPrice" numeric(65,30) NOT NULL
);


ALTER TABLE public."OrderItem" OWNER TO postgres;

--
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    id text NOT NULL,
    "imageUrl" text NOT NULL,
    "netWeight" integer NOT NULL,
    name text NOT NULL,
    price numeric(65,30) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    type text NOT NULL
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    username text NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Order" (id, "userId", "shippingAddress", "totalAmount", "createdAt", status) FROM stdin;
cm4rg9qr20000o3tosa8x6mne	cm4r1wvif0000o3t8p9wf5ta4	123 Street, City, Country	1538.000000000000000000000000000000	2024-12-16 19:50:54.638	PENDING
cm4rge5bq0000o3lopr7kejs9	cm4r1wvif0000o3t8p9wf5ta4	123 Street, City, Country	1538.000000000000000000000000000000	2024-12-16 19:54:20.15	PENDING
cm4rgyp2a0000o3ngw23mgvp3	cm4r1wvif0000o3t8p9wf5ta4	123 Street, City, Country	1538.000000000000000000000000000000	2024-12-16 20:10:18.85	PENDING
cm4rh2ku60000o3yozfxdtvam	cm4r1wvif0000o3t8p9wf5ta4	sdfgsdfgsdfg	4689.000000000000000000000000000000	2024-12-16 20:13:19.999	PENDING
cm4rh32hs0007o3yooqmy2r1d	cm4r1wvif0000o3t8p9wf5ta4	8678768	4689.000000000000000000000000000000	2024-12-16 20:13:42.881	PENDING
cm4rh4q2k000eo3yowqys3w3g	cm4r1wvif0000o3t8p9wf5ta4	dfghdfgh fgdh dfgh 	4689.000000000000000000000000000000	2024-12-16 20:15:00.092	PENDING
cm4rh4vnz000lo3yok4o3s93u	cm4r1wvif0000o3t8p9wf5ta4	ghddfghdfghdfgh dfgh fgdh dfg 	4689.000000000000000000000000000000	2024-12-16 20:15:07.343	PENDING
cm4rh68ub000so3yoqod8mgw3	cm4r1wvif0000o3t8p9wf5ta4	gbghj fghj fgh jfghj 	4689.000000000000000000000000000000	2024-12-16 20:16:11.075	PENDING
cm4rg7zfo0000o3xcndcgma3z	cm4r1wvif0000o3t8p9wf5ta4	123 Street, City, Country	100.500000000000000000000000000000	2024-12-16 19:49:32.581	COMPLETED
\.


--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrderItem" (id, "orderId", "productId", quantity, "totalPrice") FROM stdin;
cm4rg7zfo0002o3xcdm4crgtf	cm4rg7zfo0000o3xcndcgma3z	cm4r52evn0002o344uz55m7ye	2	998.000000000000000000000000000000
cm4rg7zfo0003o3xcycnvouk0	cm4rg7zfo0000o3xcndcgma3z	cm4r54cx00003o344oio6frz3	1	540.000000000000000000000000000000
cm4rg9qr20002o3tohkgf14qt	cm4rg9qr20000o3tosa8x6mne	cm4r52evn0002o344uz55m7ye	2	998.000000000000000000000000000000
cm4rg9qr20003o3tov8v61ufj	cm4rg9qr20000o3tosa8x6mne	cm4r54cx00003o344oio6frz3	1	540.000000000000000000000000000000
cm4rge5bq0002o3lolnpu59of	cm4rge5bq0000o3lopr7kejs9	cm4r52evn0002o344uz55m7ye	2	998.000000000000000000000000000000
cm4rge5bq0003o3lo0zd370od	cm4rge5bq0000o3lopr7kejs9	cm4r54cx00003o344oio6frz3	1	540.000000000000000000000000000000
cm4rgyp2a0002o3ng5btld0g7	cm4rgyp2a0000o3ngw23mgvp3	cm4r52evn0002o344uz55m7ye	2	998.000000000000000000000000000000
cm4rgyp2a0003o3ngtm8gmht6	cm4rgyp2a0000o3ngw23mgvp3	cm4r54cx00003o344oio6frz3	1	540.000000000000000000000000000000
cm4rh2ku70002o3yof2ncdnyi	cm4rh2ku60000o3yozfxdtvam	cm4r52evn0002o344uz55m7ye	1	499.000000000000000000000000000000
cm4rh2ku70003o3yocfwmii0m	cm4rh2ku60000o3yozfxdtvam	cm4r3d0b30000o344s41xw0ky	1	1450.000000000000000000000000000000
cm4rh2ku70004o3yoo5jlcfv6	cm4rh2ku60000o3yozfxdtvam	cm4r54cx00003o344oio6frz3	1	540.000000000000000000000000000000
cm4rh2ku70005o3yonb9mdns1	cm4rh2ku60000o3yozfxdtvam	cm4r54y5g0004o344tqh5srzo	3	570.000000000000000000000000000000
cm4rh2ku70006o3yol5ifk1eq	cm4rh2ku60000o3yozfxdtvam	cm4r52evn0001o344oigqb8ih	1	1630.000000000000000000000000000000
cm4rh32hs0009o3yojw5c69ew	cm4rh32hs0007o3yooqmy2r1d	cm4r52evn0002o344uz55m7ye	1	499.000000000000000000000000000000
cm4rh32hs000ao3yocdxq7ntf	cm4rh32hs0007o3yooqmy2r1d	cm4r3d0b30000o344s41xw0ky	1	1450.000000000000000000000000000000
cm4rh32hs000bo3yovxvqp4sg	cm4rh32hs0007o3yooqmy2r1d	cm4r54cx00003o344oio6frz3	1	540.000000000000000000000000000000
cm4rh32hs000co3yobiwrpu8i	cm4rh32hs0007o3yooqmy2r1d	cm4r54y5g0004o344tqh5srzo	3	570.000000000000000000000000000000
cm4rh32hs000do3yovt0lnakc	cm4rh32hs0007o3yooqmy2r1d	cm4r52evn0001o344oigqb8ih	1	1630.000000000000000000000000000000
cm4rh4q2k000go3yowujs72rg	cm4rh4q2k000eo3yowqys3w3g	cm4r52evn0002o344uz55m7ye	1	499.000000000000000000000000000000
cm4rh4q2k000ho3yo7306p5un	cm4rh4q2k000eo3yowqys3w3g	cm4r3d0b30000o344s41xw0ky	1	1450.000000000000000000000000000000
cm4rh4q2k000io3yo0156mcip	cm4rh4q2k000eo3yowqys3w3g	cm4r54cx00003o344oio6frz3	1	540.000000000000000000000000000000
cm4rh4q2k000jo3yoknk2nizf	cm4rh4q2k000eo3yowqys3w3g	cm4r54y5g0004o344tqh5srzo	3	570.000000000000000000000000000000
cm4rh4q2k000ko3yo7791sxur	cm4rh4q2k000eo3yowqys3w3g	cm4r52evn0001o344oigqb8ih	1	1630.000000000000000000000000000000
cm4rh4vnz000no3yo30c39md0	cm4rh4vnz000lo3yok4o3s93u	cm4r52evn0002o344uz55m7ye	1	499.000000000000000000000000000000
cm4rh4vnz000oo3yoxbxeff74	cm4rh4vnz000lo3yok4o3s93u	cm4r3d0b30000o344s41xw0ky	1	1450.000000000000000000000000000000
cm4rh4vnz000po3yodkvd37ms	cm4rh4vnz000lo3yok4o3s93u	cm4r54cx00003o344oio6frz3	1	540.000000000000000000000000000000
cm4rh4vnz000qo3yobylntwz4	cm4rh4vnz000lo3yok4o3s93u	cm4r54y5g0004o344tqh5srzo	3	570.000000000000000000000000000000
cm4rh4vnz000ro3yoewnybgzl	cm4rh4vnz000lo3yok4o3s93u	cm4r52evn0001o344oigqb8ih	1	1630.000000000000000000000000000000
cm4rh68ub000uo3yohvz8nb0j	cm4rh68ub000so3yoqod8mgw3	cm4r52evn0002o344uz55m7ye	1	499.000000000000000000000000000000
cm4rh68ub000vo3yoimtk6bsy	cm4rh68ub000so3yoqod8mgw3	cm4r3d0b30000o344s41xw0ky	1	1450.000000000000000000000000000000
cm4rh68ub000wo3yo54z88ryz	cm4rh68ub000so3yoqod8mgw3	cm4r54cx00003o344oio6frz3	1	540.000000000000000000000000000000
cm4rh68ub000xo3youl444vc7	cm4rh68ub000so3yoqod8mgw3	cm4r54y5g0004o344tqh5srzo	3	570.000000000000000000000000000000
cm4rh68ub000yo3yotyn0bcxg	cm4rh68ub000so3yoqod8mgw3	cm4r52evn0001o344oigqb8ih	1	1630.000000000000000000000000000000
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (id, "imageUrl", "netWeight", name, price, "createdAt", "updatedAt", type) FROM stdin;
cm4r52evn0001o344oigqb8ih	https://www.coffee-butik.ru/upload/iblock/12e/12ea44c74008e059e89d840b956ce6ff.jpg	1000	Lavazza Pronto Crem	1630.000000000000000000000000000000	2024-12-16 14:37:16.883	2024-12-16 14:34:03.106	В зернах
cm4r52evn0002o344uz55m7ye	https://www.coffee-butik.ru/upload/iblock/399/65w4io5uvbj7oyarjk14cc2173go6z5s.png	227	Bushido Black Katana	499.000000000000000000000000000000	2024-12-16 14:37:16.883	2024-12-16 14:34:07.681	В зернах
cm4r3d0b30000o344s41xw0ky	https://www.coffee-butik.ru/upload/iblock/0a2/73xlhotjux1eytnool5hc8mp21jhdsy1.jpg	1000	Lavazza Qualita Oro	1450.000000000000000000000000000000	2024-12-16 13:49:31.983	2024-12-16 14:37:16.883	В зернах
cm4r54cx00003o344oio6frz3	https://www.coffee-butik.ru/upload/iblock/96e/ggad74hfqo1mctp9th1ga9kqmb5zcw1n.jpg	540	EGOISTE Grand Cru	540.000000000000000000000000000000	2024-12-16 14:38:47.652	2024-12-16 14:38:28.362	Молотый
cm4r54y5g0004o344tqh5srzo	https://www.coffee-butik.ru/upload/iblock/9b3/p7p85bl8qqjjet3sdnd1a1ozidgnt0ip.png	250	Paulig Mokka	190.000000000000000000000000000000	2024-12-16 14:39:15.172	2024-12-16 14:38:50.127	Молотый
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, password, username, role, "createdAt", "updatedAt") FROM stdin;
cm4r1wvif0000o3t8p9wf5ta4	lettonchannel@gmail.com	$2b$10$QUbdVRA3dSpJPBZJ5VaZXO0kHScdd0OYUjiqjyu9QfKfQ0VdWxn4m	Letton	USER	2024-12-16 13:08:59.655	2024-12-16 13:08:59.655
\.


--
-- Name: OrderItem OrderItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: OrderItem OrderItem_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OrderItem OrderItem_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Order Order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

