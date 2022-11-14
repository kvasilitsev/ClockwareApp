PGDMP         7            
    z            clockwise_db     14.0 (Ubuntu 14.0-1.pgdg20.04+1)     14.0 (Ubuntu 14.0-1.pgdg20.04+1) 5    >           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            @           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            A           1262    16384    clockwise_db    DATABASE     a   CREATE DATABASE clockwise_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
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
            public          postgres    false    217            �            1259    16403    orders    TABLE     i  CREATE TABLE public.orders (
    id integer NOT NULL,
    master_id integer NOT NULL,
    city_id integer NOT NULL,
    clock_id integer NOT NULL,
    booking_date_time timestamp without time zone NOT NULL,
    repair_duration interval NOT NULL,
    is_deleted boolean NOT NULL,
    email character varying NOT NULL,
    user_name character varying NOT NULL
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
            public          postgres    false    213            �            1259    24760    tokens    TABLE     ^   CREATE TABLE public.tokens (
    user_id integer NOT NULL,
    refresh_token text NOT NULL
);
    DROP TABLE public.tokens;
       public         heap    postgres    false            �            1259    16412    users    TABLE     �   CREATE TABLE public.users (
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
            public          postgres    false    215            1          0    16394    cities 
   TABLE DATA           *   COPY public.cities (id, name) FROM stdin;
    public          postgres    false    211   K:       6          0    16467    clocks 
   TABLE DATA           ;   COPY public.clocks (id, size, repair_duration) FROM stdin;
    public          postgres    false    216   �:       /          0    16385    masters 
   TABLE DATA           3   COPY public.masters (id, name, rating) FROM stdin;
    public          postgres    false    209   �:       7          0    24721    masters_cities 
   TABLE DATA           @   COPY public.masters_cities (id, master_id, city_id) FROM stdin;
    public          postgres    false    217   :;       3          0    16403    orders 
   TABLE DATA           �   COPY public.orders (id, master_id, city_id, clock_id, booking_date_time, repair_duration, is_deleted, email, user_name) FROM stdin;
    public          postgres    false    213   y;       ;          0    24760    tokens 
   TABLE DATA           8   COPY public.tokens (user_id, refresh_token) FROM stdin;
    public          postgres    false    221   <       5          0    16412    users 
   TABLE DATA           A   COPY public.users (id, name, email, admin, password) FROM stdin;
    public          postgres    false    215   �B       B           0    0    cities_UniqueID_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."cities_UniqueID_seq"', 25, true);
          public          postgres    false    212            C           0    0    clocks_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.clocks_id_seq', 14, true);
          public          postgres    false    219            D           0    0    master_UniqueID_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."master_UniqueID_seq"', 95, true);
          public          postgres    false    210            E           0    0    masters_cities_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.masters_cities_id_seq', 9, true);
          public          postgres    false    218            F           0    0    orders_UniqueID_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."orders_UniqueID_seq"', 78, true);
          public          postgres    false    214            G           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 54, true);
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
       public            postgres    false    217    217            �           2606    32971     orders master_id_booking_time_uk 
   CONSTRAINT     s   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT master_id_booking_time_uk UNIQUE (master_id, booking_date_time);
 J   ALTER TABLE ONLY public.orders DROP CONSTRAINT master_id_booking_time_uk;
       public            postgres    false    213    213            �           2606    24746    masters master_uk 
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
       public            postgres    false    213            �           1259    32969 	   fki_email    INDEX     =   CREATE INDEX fki_email ON public.orders USING btree (email);
    DROP INDEX public.fki_email;
       public            postgres    false    213            �           1259    16447    fki_master_id    INDEX     E   CREATE INDEX fki_master_id ON public.orders USING btree (master_id);
 !   DROP INDEX public.fki_master_id;
       public            postgres    false    213            �           1259    24731    fki_masterid_fk    INDEX     O   CREATE INDEX fki_masterid_fk ON public.masters_cities USING btree (master_id);
 #   DROP INDEX public.fki_masterid_fk;
       public            postgres    false    217            �           2606    16462    orders city_id    FK CONSTRAINT     x   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT city_id FOREIGN KEY (city_id) REFERENCES public.cities(id) NOT VALID;
 8   ALTER TABLE ONLY public.orders DROP CONSTRAINT city_id;
       public          postgres    false    211    3206    213            �           2606    24732    masters_cities cityid_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.masters_cities
    ADD CONSTRAINT cityid_fk FOREIGN KEY (city_id) REFERENCES public.cities(id) NOT VALID;
 B   ALTER TABLE ONLY public.masters_cities DROP CONSTRAINT cityid_fk;
       public          postgres    false    217    3206    211            �           2606    16485    orders clock_id    FK CONSTRAINT     z   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT clock_id FOREIGN KEY (clock_id) REFERENCES public.clocks(id) NOT VALID;
 9   ALTER TABLE ONLY public.orders DROP CONSTRAINT clock_id;
       public          postgres    false    3221    216    213            �           2606    16442    orders master_id    FK CONSTRAINT     }   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT master_id FOREIGN KEY (master_id) REFERENCES public.masters(id) NOT VALID;
 :   ALTER TABLE ONLY public.orders DROP CONSTRAINT master_id;
       public          postgres    false    209    3204    213            �           2606    24726    masters_cities masterid_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.masters_cities
    ADD CONSTRAINT masterid_fk FOREIGN KEY (master_id) REFERENCES public.masters(id) NOT VALID;
 D   ALTER TABLE ONLY public.masters_cities DROP CONSTRAINT masterid_fk;
       public          postgres    false    3204    217    209            �           2606    24765    tokens user_id_fk    FK CONSTRAINT     z   ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;
 ;   ALTER TABLE ONLY public.tokens DROP CONSTRAINT user_id_fk;
       public          postgres    false    3219    215    221            1   ,   x�3���H�/�O�2�t��,(��24���H-*������� ��
D      6   7   x�34��MM�,��40�20 ".Cc���ĜNC��	gNbQz*��1T$F��� ���      /   \   x�3�tO�/JO�4�2���L�HL��4�2��OJ-*2M9sR+8���8RKR��,3N��� �Ґ�%�,��Ҙ3���,,��=... �zk      7   /   x�Ǳ  ��=Eb���s�)�$[cR��ծ�:�;$=���      3   z   x���A
�0����)z��7�6)�z7ATB[����P��f�>&��
�PIXt�Au�(����T���9�ɝn��ZM�·��`h��e����f�*�~���c�?���1���2n      ;   �  x���k����_��L��^�rՖJ�$.n�EAE>��s�'�ۙ7�Ӑ,hmyֳV�_ۛSff^��c��-�������K{n7]D����?�@X��V)3�'�$B �|`W�*�B���=>�Z�1nZT��[��(;�u��t���Z���+.y��9v[>V^��L��B��)�S� aBf�~B�������׾���7*!b�|Э�� ��f�tq�׮u��p#���"�q,�� �)p^�S��A�)/�t�vq����q ��W덥�����:�=��'���7n̾b��7�R�3��_&��Yeϓ��s1������INcׇ�Y9|,�c�=7��5W	��Ht�#`����������.��#J,8G1�V���|�SJ��Q���+��Z�X�2Z� N��z��]�QJ6�]5��|�G��
9Rq�l���0��g�y�C�
�{�v�-���	�Pa@!Z��"�V-��r�E�OvRO,)2:am(V����%\i:lti�v}(���Qh7�C�y��)��xK�����r�������^��U�,�6�;�@/��q��n&+�2g6�Q7>0��Y���/���Ԋ�'��UA13cy�? /"a��O�J�>E�,�଱�F�n��锬~������v�'?��m�Ӈ������|l���h�z���s�c�^���K�΅6Z�;�&i���$���7B��#]�3}]=�� �i	A׀SAK)�DV9p�p��sΠ�i�#-��Ia���8�X�_{�Sh�*�"�hv㩶� 	�"����P�ޛ��$�8~A}U��|��">[	��*�>��b�)�+�M��B���Gh*D�v_׮�[\yW��M��B:n�	�ķ2p={�PhKR�6	�} &���/�����X�<�L_�hYY����Y.��>���� %s�����{�tR;|2� �mJS�t~�\,jN��w��Wh��>S�-�)5��y�U������kwO�E���'��k���uZ07��ŵ:��� �nMu= |$iI����i���a��-�^�2�_���	�ŕ#+.Q��^�Ĵy��ד|p�Bސ�*��q϶��<m�g�۳ٙ���%�y���]v�вS9B~_��������Y9��>c�H����X��Mb�4D�P�K-��h���DXan�]g�'��X~��)��֦�U� 쫯H�|<�K˭,U�n=��Џ�~{,t�6��	�4������}KS/��c�������5l�������h�`�\\�s�l� RJ6@�����:׶R���.�=�ʟ�ɐ��7xx1�P_�lJ���� ����ޝl�<�]|PI$�Z2Twzk�^�g�5?�3j��F��"�b�{�S����@����Q��Y��!+�8���6�s��}��x䉺w�Ω:�<����^T9<��ߕ��W�'v����˿����,�h	��Ł����M�G9�)�Y�[<voc��t��Y�+u�lQQUXE���q��_|�?o	��_��L������fX���2���mB�Yǵ�)��O��\�pM�����X���6�y3%@+ٺ�C�O��9���my�0�gʳ/~�x�LD��Jf2��D�����4%���p����}q0h����_@
���	Rt!S!�<�V=�8!_S	�.Q!#���dO\x�s�]�
N�w���_Aw��XѕS/�sd��j���__�Z{u?���l6�\
�D      5   
  x�m�ɒ�@���s�Yo��&�(1v�D(@��6z���Ɉ��U_TU��b\Kpͣr��A^�QS���hAW�z���
8�u�,�%�}2& ~�{�V&]�Wz/��ʣK���_�|��/Y�q�u�?0⣩4T�h�Si�� �l1Ȃ=u���*�Yw�ld�I��ВP� �}�O���5)":PM�jxgx��p_�	_'����DY���gQ��I��m�lA;�z��d��e$�KJ�	�*e�'����X�m_U��iK>��c��%% �4M���I��Dv4#��Ciy�
T{5\���:�\�G;�A�������4�I /�n�8I�h���d��j� �\��w�6H���6$nχ��b,<z"����)� !�W�8�� z���R�{�ɓp{3��N5XF���6����E�]�]�m�x�_6�"S3��"�?�y�M�0Z�ȇI�*��󚞈O��J��qiq嶩���R<���>-ж B���F�7R���n0-E4��\#qn�+mI��»O�j`a�J�.��E��벰�����T���h����u�<Ul&�[6F=��h�OF��+��,�Yg�#$�u��"WBVj^�v.��ήQQΜ���ɕ2%5Q�K��RY)��B�����5�����f��b�ޮ��.��=]̗O[U�+7IvL)�V�	ç���+P�������?T#��7w��|pf�"?4���˨��G����ڒ�Z��E�75�}�     