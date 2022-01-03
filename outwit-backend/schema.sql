CREATE TABLE IF NOT EXISTS boards(id INT NOT NULL AUTO_INCREMENT,
                                 positions CHAR(90) NOT NULL,
                                 is_white_turn BOOLEAN NOT NULL,
                                 winner CHAR(5),
                                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                 updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                 PRIMARY KEY (id));

CREATE UNIQUE INDEX id_unique ON boards(id);

CREATE TABLE IF NOT EXISTS matches(id INT NOT NULL AUTO_INCREMENT,
                                  white_access_key CHAR(36) NOT NULL,
                                  black_access_key CHAR(36),
                                  board_id INT NOT NULL,
                                  access_key CHAR(36) NOT NULL,
                                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                  PRIMARY KEY (id),
                                  FOREIGN KEY (board_id) REFERENCES boards(id));

CREATE UNIQUE INDEX id_unique ON matches(id);
CREATE UNIQUE INDEX board_id_unique ON matches(board_id);
CREATE UNIQUE INDEX access_key_unique ON matches(access_key);
