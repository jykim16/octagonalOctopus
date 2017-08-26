DROP DATABASE IF EXISTS Avalon;

CREATE DATABASE Avalon;

USE Avalon;


/* FOLLOW THESE STEPS
brew install mysql
mysql.server start
mysql -u root < schema.sql

show databases;
use avalon;
show tables;

select * from users where gameKey='y0w4sp';

+----------+-------------------+----------------------+------+--------------------------------+---------------------+---------------------+---------+
| username | role              | socketid             | host | votes                          | createdAt           | updatedAt           | gameKey |
+----------+-------------------+----------------------+------+--------------------------------+---------------------+---------------------+---------+
| 5        | Merlin            | 58s1uXjDVAEi8ymvAAAP |    0 | [null, null, null, null, null] | 2017-08-24 23:37:05 | 2017-08-24 23:38:09 | y0w4sp  |
| 2        | Loyal Servant     | b1R7VUQFKSaw8WomAAAM |    0 | [null, null, null, null, null] | 2017-08-24 23:36:38 | 2017-08-24 23:38:09 | y0w4sp  |
| 6        | Loyal Servant     | dXH7N3QhrTU8uL1QAAAQ |    0 | [null, null, null, null, null] | 2017-08-24 23:37:16 | 2017-08-24 23:38:09 | y0w4sp  |
| 8        | Loyal Servant     | fJ-lnnFMOKTzcn4aAAAU |    0 | [null, null, null, null, null] | 2017-08-24 23:37:38 | 2017-08-24 23:38:09 | y0w4sp  |
| 7        | Percival          | gwd7nQQ3jEzBbuHJAAAV |    0 | [null, null, null, null, null] | 2017-08-24 23:37:24 | 2017-08-24 23:38:09 | y0w4sp  |
| 4        | Oberon            | IG8D5QhyMpyMzPLKAAAO |    0 | [null, null, null, null, null] | 2017-08-24 23:36:56 | 2017-08-24 23:38:09 | y0w4sp  |
| 3        | Mordred           | KH7guX1cItFzkZ0AAAAN |    0 | [null, null, null, null, null] | 2017-08-24 23:36:46 | 2017-08-24 23:38:09 | y0w4sp  |
| 9        | Loyal Servant     | psUWfcJbUnNPjE2DAAAT |    0 | [null, null, null, null, null] | 2017-08-24 23:37:48 | 2017-08-24 23:38:09 | y0w4sp  |
| 10       | Minion of Mordred | qCx2elmZdqKGtR2oAAAS |    0 | [null, null, null, null, null] | 2017-08-24 23:38:01 | 2017-08-24 23:38:09 | y0w4sp  |
| 1        | Morgana           | V34BUnLwnC3KbjGuAAAL |    1 | [null, null, null, null, null] | 2017-08-24 23:36:16 | 2017-08-24 23:38:09 | y0w4sp  |
+----------+-------------------+----------------------+------+--------------------------------+---------------------+---------------------+---------+
*/
