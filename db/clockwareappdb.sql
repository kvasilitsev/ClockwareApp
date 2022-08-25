PGDMP         9                z           clockwise_db     14.0 (Ubuntu 14.0-1.pgdg20.04+1)     14.0 (Ubuntu 14.0-1.pgdg20.04+1) 2    7           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            8           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            9           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            :           1262    16384    clockwise_db    DATABASE     a   CREATE DATABASE clockwise_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE clockwise_db;
                postgres    false            �            1259    16394    cities    TABLE     G   CREATE TABLE public.cities (
    id integer NOT NULL,
    name text
);
    DROP TABLE public.cities;
       public         heap    postgres    false            �            1259    16397    cities_UniqueID_seq    SEQUENCE     �   ALTER TABLE public.cities ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."cities_UniqueID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    211            �            1259    16467    clocks    TABLE     n   CREATE TABLE public.clocks (
    id integer NOT NULL,
    size text,
    repair_duration interval NOT NULL
);
    DROP TABLE public.clocks;
       public         heap    postgres    false            �            1259    24747    clocks_id_seq    SEQUENCE     �   ALTER TABLE public.clocks ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.clocks_id_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �            1259    16385    masters    TABLE     \   CREATE TABLE public.masters (
    id integer NOT NULL,
    name text,
    rating integer
);
    DROP TABLE public.masters;
       public         heap    postgres    false            �            1259    16388    master_UniqueID_seq    SEQUENCE     �   ALTER TABLE public.masters ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."master_UniqueID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    209            �            1259    24721    masters_cities    TABLE     l   CREATE TABLE public.masters_cities (
    id integer NOT NULL,
    master_id integer,
    city_id integer
);
 "   DROP TABLE public.masters_cities;
       public         heap    postgres    false            �            1259    24738    masters_cities_id_seq    SEQUENCE     �   ALTER TABLE public.masters_cities ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.masters_cities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    16403    orders    TABLE     �   CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer,
    master_id integer,
    city_id integer,
    clock_id integer,
    booking_date_time timestamp without time zone NOT NULL,
    repair_duration interval NOT NULL
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    16406    orders_UniqueID_seq    SEQUENCE     �   ALTER TABLE public.orders ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."orders_UniqueID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    213            �            1259    16412    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    name text,
    email text NOT NULL,
    admin boolean,
    password character varying
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    24749    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 0
    MAXVALUE 100000
    CACHE 1
);
            public          postgres    false    215            +          0    16394    cities 
   TABLE DATA           *   COPY public.cities (id, name) FROM stdin;
    public          postgres    false    211   �6       0          0    16467    clocks 
   TABLE DATA           ;   COPY public.clocks (id, size, repair_duration) FROM stdin;
    public          postgres    false    216   �6       )          0    16385    masters 
   TABLE DATA           3   COPY public.masters (id, name, rating) FROM stdin;
    public          postgres    false    209   7       1          0    24721    masters_cities 
   TABLE DATA           @   COPY public.masters_cities (id, master_id, city_id) FROM stdin;
    public          postgres    false    217   �7       -          0    16403    orders 
   TABLE DATA           o   COPY public.orders (id, user_id, master_id, city_id, clock_id, booking_date_time, repair_duration) FROM stdin;
    public          postgres    false    213   �7       /          0    16412    users 
   TABLE DATA           A   COPY public.users (id, name, email, admin, password) FROM stdin;
    public          postgres    false    215   8       ;           0    0    cities_UniqueID_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."cities_UniqueID_seq"', 25, true);
          public          postgres    false    212            <           0    0    clocks_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.clocks_id_seq', 14, true);
          public          postgres    false    219            =           0    0    master_UniqueID_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."master_UniqueID_seq"', 95, true);
          public          postgres    false    210            >           0    0    masters_cities_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.masters_cities_id_seq', 9, true);
          public          postgres    false    218            ?           0    0    orders_UniqueID_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."orders_UniqueID_seq"', 25, true);
          public          postgres    false    214            @           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 5, true);
          public          postgres    false    220            �           2606    16420    cities cities_id_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_id_pkey PRIMARY KEY (id);
 ?   ALTER TABLE ONLY public.cities DROP CONSTRAINT cities_id_pkey;
       public            postgres    false    211            �           2606    16560    cities cityname_uc 
   CONSTRAINT     M   ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cityname_uc UNIQUE (name);
 <   ALTER TABLE ONLY public.cities DROP CONSTRAINT cityname_uc;
       public            postgres    false    211            �           2606    16471    clocks clocks_id_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.clocks
    ADD CONSTRAINT clocks_id_pkey PRIMARY KEY (id);
 ?   ALTER TABLE ONLY public.clocks DROP CONSTRAINT clocks_id_pkey;
       public            postgres    false    216            �           2606    24708    clocks clocksize_uc 
   CONSTRAINT     N   ALTER TABLE ONLY public.clocks
    ADD CONSTRAINT clocksize_uc UNIQUE (size);
 =   ALTER TABLE ONLY public.clocks DROP CONSTRAINT clocksize_uc;
       public            postgres    false    216            �           2606    24744    masters_cities master_city_uk 
   CONSTRAINT     f   ALTER TABLE ONLY public.masters_cities
    ADD CONSTRAINT master_city_uk UNIQUE (master_id, city_id);
 G   ALTER TABLE ONLY public.masters_cities DROP CONSTRAINT master_city_uk;
       public            postgres    false    217    217            ~           2606    24746    masters master_uk 
   CONSTRAINT     L   ALTER TABLE ONLY public.masters
    ADD CONSTRAINT master_uk UNIQUE (name);
 ;   ALTER TABLE ONLY public.masters DROP CONSTRAINT master_uk;
       public            postgres    false    209            �           2606    16418    masters masters_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.masters
    ADD CONSTRAINT masters_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.masters DROP CONSTRAINT masters_pkey;
       public            postgres    false    209            �           2606    24725 !   masters_cities masterscities_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.masters_cities
    ADD CONSTRAINT masterscities_pkey PRIMARY KEY (id);
 K   ALTER TABLE ONLY public.masters_cities DROP CONSTRAINT masterscities_pkey;
       public            postgres    false    217            �           2606    16435    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    213            �           2606    24720    users useremail_uc 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT useremail_uc UNIQUE (email);
 <   ALTER TABLE ONLY public.users DROP CONSTRAINT useremail_uc;
       public            postgres    false    215            �           2606    16428    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            �           1259    24737    fki_cityid_fk    INDEX     K   CREATE INDEX fki_cityid_fk ON public.masters_cities USING btree (city_id);
 !   DROP INDEX public.fki_cityid_fk;
       public            postgres    false    217            �           1259    16490    fki_clock_sizes_id    INDEX     I   CREATE INDEX fki_clock_sizes_id ON public.orders USING btree (clock_id);
 &   DROP INDEX public.fki_clock_sizes_id;
       public            postgres    false    213            �           1259    16447    fki_master_id    INDEX     E   CREATE INDEX fki_master_id ON public.orders USING btree (master_id);
 !   DROP INDEX public.fki_master_id;
       public            postgres    false    213            �           1259    24731    fki_masterid_fk    INDEX     O   CREATE INDEX fki_masterid_fk ON public.masters_cities USING btree (master_id);
 #   DROP INDEX public.fki_masterid_fk;
       public            postgres    false    217            �           1259    16441    fki_user_id    INDEX     A   CREATE INDEX fki_user_id ON public.orders USING btree (user_id);
    DROP INDEX public.fki_user_id;
       public            postgres    false    213            �           2606    16462    orders city_id    FK CONSTRAINT     x   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT city_id FOREIGN KEY (city_id) REFERENCES public.cities(id) NOT VALID;
 8   ALTER TABLE ONLY public.orders DROP CONSTRAINT city_id;
       public          postgres    false    211    213    3202            �           2606    24732    masters_cities cityid_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.masters_cities
    ADD CONSTRAINT cityid_fk FOREIGN KEY (city_id) REFERENCES public.cities(id) NOT VALID;
 B   ALTER TABLE ONLY public.masters_cities DROP CONSTRAINT cityid_fk;
       public          postgres    false    217    3202    211            �           2606    16485    orders clock_id    FK CONSTRAINT     z   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT clock_id FOREIGN KEY (clock_id) REFERENCES public.clocks(id) NOT VALID;
 9   ALTER TABLE ONLY public.orders DROP CONSTRAINT clock_id;
       public          postgres    false    3215    216    213            �           2606    16442    orders master_id    FK CONSTRAINT     }   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT master_id FOREIGN KEY (master_id) REFERENCES public.masters(id) NOT VALID;
 :   ALTER TABLE ONLY public.orders DROP CONSTRAINT master_id;
       public          postgres    false    213    209    3200            �           2606    24726    masters_cities masterid_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.masters_cities
    ADD CONSTRAINT masterid_fk FOREIGN KEY (master_id) REFERENCES public.masters(id) NOT VALID;
 D   ALTER TABLE ONLY public.masters_cities DROP CONSTRAINT masterid_fk;
       public          postgres    false    209    3200    217            �           2606    16436    orders user_id    FK CONSTRAINT     w   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;
 8   ALTER TABLE ONLY public.orders DROP CONSTRAINT user_id;
       public          postgres    false    215    3213    213            +   ,   x�3���H�/�O�2�t��,(��24���H-*������� ��
D      0   7   x�34��MM�,��40�20 ".Cc���ĜNC��	gNbQz*��1T$F��� ���      )   \   x�3�tO�/JO�4�2���L�HL��4�2��OJ-*2M9sR+8���8RKR��,3N��� �Ґ�%�,��Ҙ3���,,��=... �zk      1   /   x�Ǳ  ��=Eb���s�)�$[cR��ծ�:�;$=���      -   F   x�3��4CC#N###]]#Cc+ �40�0���+4�PhTdB�B#,
M�))2%1z\\\ ]\"�      /   M   x�3�t+J�����L�vH�M���K���L���2��M,����RƜ!�y��%@]ʄ3�$�,��D�K��qqq _>#�     