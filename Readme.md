
## DynamoDB Table
### Entities
- Season
- Team
- Player
- Span
- Player History
- Sport
- Player Stats on Date

- League
- Fantasy Team
- Fantasy Team Player
- Player Fantasy Score
- Player Score for league

- User
- User Notification tokens
- Player Mapping
- Team Mapping


### Access Patterns
|Access Patten|Index|Parameters|Notes|
|:-----|:---:|:-----|:-----|
|Get league info|Main|leagueId||
|Get teams for season|Main|seasonId||
|Get players for season|Main|seasonId||
|Get spans for league|Main|leagueId||
|Get fantasy team lineup|Main|fantsyTeamId||
|Get list of fantasy teams in league|GSI2|leagueId||
|Get player scores for league by fantasy team|Main|fantasyTeamId||
|Get player scores for league by team|GSI2|leagueId,teamId||
|get player scores for league|Main|leagueId||
|Get fantasy teams that have a certain player|GSI2|leagueId,playerId||
|Get player stats for season by game date|Main|seasonId,playerId,gateDateId||
|Get player stats for season|GSI1|seasonId,playerId||
|Get all players stats for a season|Main|seasonId||
|Get all players stats for season by day|GSI2|seasonId,gameDateId||
|Get team state for season|Main|seasonId,teamId|Just look at team data|
|Get list of leagues grouped by season filtered by sport|???|sportId||
|Get user|Main|User ID||
|Get User by extId|GSI1|ext Id||
|Get fantasy teams for user|GSI1|User ID||
|update players score for league|Main|leagueId,playerId|will also need to update the player score for fantasy team|
|Update fantasy teams score|Main|fantasyTeamId||
ensure email is unique
ensure team name in league is unique
Get player id based on external id
Get team id based on external id



### Indexes
#### Main
|Entity|PK|SK|
|:-----|:-----:|:----:|
|SEASON|SEASON#{id}|SEASON#{id}|
|League|LEAGUE#{id}|LEAGUE#{id}|
|Team|SEASON#{id}|TEAM#{id}|
|Player|SEASON#{id}|PLAYER#{id}|
|Span|LEAGUE#{id}|SPAN#{id}|
|Player History|LEAGUE#{id}|#PHISTORY#{playerId}|
|Sport|SPORT#{id}|SPORT#{id}|
|Player Stats On Date|PLAYER#{id}|#DATE#{dateId}|
|Fantasy Team|FANTASYTEAM#{id}|FANTASYTEAM#{id}|
|Fantasy Team Player|FANTASYTEAM#{id}|PLAYER#{id}|
|Player Score|LEAGUE#{id}|PLAYER#{id}|
|User|USER#{id}|USER#{id}|
|Mapping|MAPPING|{type}#{extid}|
|Email|EMAIL#{email}|EMAIL#{email}|

#### GSI1
season
|Entity|GSI1PK|GSI1SK|
|:-----|:-----:|:----:|
|SEASON|SEASON#{id}|SEASON#{id}|
|League|||
|Team|||
|Player|SEASON#{id}|PLAYER#{id}|
|Span|||
|Player History|||
|Sport|||
|Player Stats On Date|SEASON#{id}|PLAYER#{id}|
|Fantasy Team|USER#{extId}|FANTASYTEAM#{id}|
|Fantasy Team Player|||
|Player Score|LEAGUE#{id}|PLAYER#{id}|
|User|USER#{extId}|USER#{id}|

#### GSI2
league
|Entity|GSI1PK|GSI1SK|
|:-----|:-----:|:----:|
|SEASON|||
|League|LEAGUE#{id}|LEAGUE#{id}|
|Team|||
|Player|||
|Span|||
|Player History|||
|Sport|||
|Player Stats On Date|SEASON#{id}|#DATE#{dateId}|
|Fantasy Team|LEAGUE#{id}|FANTASYTEAM#{id}|
|Fantasy Team Player|LEAGUE#{id}|PLAYER#{id}|
|Player Score|||
|User|||