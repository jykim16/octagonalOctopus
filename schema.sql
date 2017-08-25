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

How to bluid this dataStruct:

Example for Morgana:
{
	bad:{mordred:['3','10'], minionofmordred:['3','10'], morgana:['Yourself'], oberon:['?']}
	good:{merlin:['?'], LoyalServant:['?','?','?','?'], percival:['?']}
}


What we know:
	Yourself = morgana
	bad = mordred, minionofmordred, morgana, oberon
	good = merlin, LoyalServant, percival
	known by morgana = 3, 10



users:  [ user {
    dataValues:
     { username: '1',
       role: null,
       socketid: '0xQ50tVjCYAe-RyWAAAL',
       host: true,
       votes: '[null, null, null, null, null]',
       createdAt: 2017-08-25T01:54:27.000Z,
       updatedAt: 2017-08-25T01:54:27.000Z,
       gameKey: 'ye43oo' },
    _previousDataValues:
     { username: '1',
       role: null,
       socketid: '0xQ50tVjCYAe-RyWAAAL',
       host: true,
       votes: '[null, null, null, null, null]',
       createdAt: 2017-08-25T01:54:27.000Z,
       updatedAt: 2017-08-25T01:54:27.000Z,
       gameKey: 'ye43oo' },
    _changed: {},
    _modelOptions:
     { timestamps: true,
       validate: {},
       freezeTableName: false,
       underscored: false,
       underscoredAll: false,
       paranoid: false,
       rejectOnEmpty: false,
       whereCollection: [Object],
       schema: null,
       schemaDelimiter: '',
       defaultScope: {},
       scopes: [],
       hooks: {},
       indexes: [],
       name: [Object],
       omitNull: false,
       sequelize: [Object],
       uniqueKeys: {} },
    _options:
     { isNewRecord: false,
       _schema: null,
       _schemaDelimiter: '',
       raw: true,
       attributes: [Object] },
    __eagerlyLoadedAssociations: [],
    isNewRecord: false },
  user {
    dataValues:
     { username: '2',
       role: null,
       socketid: 'aKNOdPUk8zRHgUkbAAAP',
       host: false,
       votes: '[null, null, null, null, null]',
       createdAt: 2017-08-25T01:54:58.000Z,
       updatedAt: 2017-08-25T01:54:58.000Z,
       gameKey: 'ye43oo' },
    _previousDataValues:
     { username: '2',
       role: null,
       socketid: 'aKNOdPUk8zRHgUkbAAAP',
       host: false,
       votes: '[null, null, null, null, null]',
       createdAt: 2017-08-25T01:54:58.000Z,
       updatedAt: 2017-08-25T01:54:58.000Z,
       gameKey: 'ye43oo' },
    _changed: {},
    _modelOptions:
     { timestamps: true,
       validate: {},
       freezeTableName: false,
       underscored: false,
       underscoredAll: false,
       paranoid: false,
       rejectOnEmpty: false,
       whereCollection: [Object],
       schema: null,
       schemaDelimiter: '',
       defaultScope: {},
       scopes: [],
       hooks: {},
       indexes: [],
       name: [Object],
       omitNull: false,
       sequelize: [Object],
       uniqueKeys: {} },
    _options:
     { isNewRecord: false,
       _schema: null,
       _schemaDelimiter: '',
       raw: true,
       attributes: [Object] },
    __eagerlyLoadedAssociations: [],
    isNewRecord: false },
  user {
    dataValues:
     { username: '3',
       role: null,
       socketid: 'ggMmnSk-AHM6bMgHAAAO',
       host: false,
       votes: '[null, null, null, null, null]',
       createdAt: 2017-08-25T01:55:07.000Z,
       updatedAt: 2017-08-25T01:55:07.000Z,
       gameKey: 'ye43oo' },
    _previousDataValues:
     { username: '3',
       role: null,
       socketid: 'ggMmnSk-AHM6bMgHAAAO',
       host: false,
       votes: '[null, null, null, null, null]',
       createdAt: 2017-08-25T01:55:07.000Z,
       updatedAt: 2017-08-25T01:55:07.000Z,
       gameKey: 'ye43oo' },
    _changed: {},
    _modelOptions:
     { timestamps: true,
       validate: {},
       freezeTableName: false,
       underscored: false,
       underscoredAll: false,
       paranoid: false,
       rejectOnEmpty: false,
       whereCollection: [Object],
       schema: null,
       schemaDelimiter: '',
       defaultScope: {},
       scopes: [],
       hooks: {},
       indexes: [],
       name: [Object],
       omitNull: false,
       sequelize: [Object],
       uniqueKeys: {} },
    _options:
     { isNewRecord: false,
       _schema: null,
       _schemaDelimiter: '',
       raw: true,
       attributes: [Object] },
    __eagerlyLoadedAssociations: [],
    isNewRecord: false },
  user {
    dataValues:
     { username: '4',
       role: null,
       socketid: 'oZs4fGGn-7HfrnljAAAN',
       host: false,
       votes: '[null, null, null, null, null]',
       createdAt: 2017-08-25T01:55:14.000Z,
       updatedAt: 2017-08-25T01:55:14.000Z,
       gameKey: 'ye43oo' },
    _previousDataValues:
     { username: '4',
       role: null,
       socketid: 'oZs4fGGn-7HfrnljAAAN',
       host: false,
       votes: '[null, null, null, null, null]',
       createdAt: 2017-08-25T01:55:14.000Z,
       updatedAt: 2017-08-25T01:55:14.000Z,
       gameKey: 'ye43oo' },
    _changed: {},
    _modelOptions:
     { timestamps: true,
       validate: {},
       freezeTableName: false,
       underscored: false,
       underscoredAll: false,
       paranoid: false,
       rejectOnEmpty: false,
       whereCollection: [Object],
       schema: null,
       schemaDelimiter: '',
       defaultScope: {},
       scopes: [],
       hooks: {},
       indexes: [],
       name: [Object],
       omitNull: false,
       sequelize: [Object],
       uniqueKeys: {} },
    _options:
     { isNewRecord: false,
       _schema: null,
       _schemaDelimiter: '',
       raw: true,
       attributes: [Object] },
    __eagerlyLoadedAssociations: [],
    isNewRecord: false },
  user {
    dataValues:
     { username: '5',
       role: null,
       socketid: 'Y9Ol8kqZuS7VMKgkAAAM',
       host: false,
       votes: '[null, null, null, null, null]',
       createdAt: 2017-08-25T01:55:24.000Z,
       updatedAt: 2017-08-25T01:55:24.000Z,
       gameKey: 'ye43oo' },
    _previousDataValues:
     { username: '5',
       role: null,
       socketid: 'Y9Ol8kqZuS7VMKgkAAAM',
       host: false,
       votes: '[null, null, null, null, null]',
       createdAt: 2017-08-25T01:55:24.000Z,
       updatedAt: 2017-08-25T01:55:24.000Z,
       gameKey: 'ye43oo' },
    _changed: {},
    _modelOptions:
     { timestamps: true,
       validate: {},
       freezeTableName: false,
       underscored: false,
       underscoredAll: false,
       paranoid: false,
       rejectOnEmpty: false,
       whereCollection: [Object],
       schema: null,
       schemaDelimiter: '',
       defaultScope: {},
       scopes: [],
       hooks: {},
       indexes: [],
       name: [Object],
       omitNull: false,
       sequelize: [Object],
       uniqueKeys: {} },
    _options:
     { isNewRecord: false,
       _schema: null,
       _schemaDelimiter: '',
       raw: true,
       attributes: [Object] },
    __eagerlyLoadedAssociations: [],
    isNewRecord: false } ]


    
userRole:  { 'Minion of Mordred': [ '1', '0xQ50tVjCYAe-RyWAAAL' ],
  Mordred: [ '2', 'aKNOdPUk8zRHgUkbAAAP' ],
  'Loyal Servant': [ '5', 'Y9Ol8kqZuS7VMKgkAAAM' ],
  Merlin: [ '4', 'oZs4fGGn-7HfrnljAAAN' ] }




*/

