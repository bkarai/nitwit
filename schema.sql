CREATE TABLE IF NOT EXISTS players (id INT NOT NULL AUTO_INCREMENT,
                                   access_key CHAR(36) NOT NULL,
                                   name VARCHAR(10) NOT NULL,
                                   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                   updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                   PRIMARY KEY (id));

CREATE UNIQUE INDEX id_unique ON players(id);
CREATE UNIQUE INDEX access_key_unique on players(access_key);

CREATE TABLE IF NOT EXISTS boards(id INT NOT NULL AUTO_INCREMENT,
                                 positions CHAR(90) NOT NULL,
                                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                 updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                 PRIMARY KEY (id));

CREATE UNIQUE INDEX id_unique ON boards(id);

CREATE TABLE IF NOT EXISTS matches (id INT NOT NULL AUTO_INCREMENT,
                                  player_1_id INT NOT NULL,
                                  player_2_id INT,
                                  board_id INT NOT NULL,
                                  is_player_1_turn BOOLEAN NOT NULL,
                                  access_key CHAR(36) NOT NULL,
                                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                  PRIMARY KEY (id),
                                  FOREIGN KEY (board_id) REFERENCES boards(id),
                                  FOREIGN KEY (player_1_id) REFERENCES players(id),
                                  FOREIGN KEY (player_2_id) REFERENCES players(id));

CREATE UNIQUE INDEX id_unique ON matches(id);
CREATE UNIQUE INDEX board_id_unique ON matches(board_id);
CREATE UNIQUE INDEX access_key_unique ON matches(access_key);
