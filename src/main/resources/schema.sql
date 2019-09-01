CREATE TABLE TBL_USER
(
    pkid       INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_id    VARCHAR2(100)     NOT NULL,
    user_pw    VARCHAR2(4000)    NOT NULL,
    user_nm    VARCHAR2(100)     NOT NULL
);

CREATE TABLE TBL_HISTORY
(
    pkid          INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_pkid     INT                              NOT NULL,
    keyword_nm    VARCHAR2(4000)                NOT NULL,
    reg_date      TIMESTAMP                       NOT NULL
);

CREATE TABLE TBL_KEYWORD
(
    keyword_nm    VARCHAR2(4000)                NOT NULL,
    keyword_cnt   INT DEFAULT 0               NOT NULL
);