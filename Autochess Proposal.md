# P2 Proposal - Pokemon Auto Chess (name to be determined)
### An autochess style game themed after Pokemon.

## Concept: What is autochess? 
Autochess style games such as Hearthstone Battlegrounds, Dota Underlords and Team-Fight Tactics, are games that use an auto battler system usually with chess like elements such as a grid shaped battle field. These games are designed to take no user input during combat and have the user interaction be limited to selecting a unit and placing it on the field. Generally, the unit can be combined to become a stronger version of the unit and the strategy ends up being to get as many of a certain unit as possible to create the strongest variant of them possible.

The goal of the player is to assemble the strongest possible team before being sent off to a random 1 v 1 battle against either another player, or against non-player enemies to build up resources to add to or enhance their team. After a player vs player battle, there are rewards based on your performance, such as win streak, damage dealt or living allied units. At the end of each battle, the loser loses an amount of health points and When a player runs out of health points, they are eliminated from the match.

Generally there is a currency system involved for selecting units as well as a limit to the deployment count. There is also generally a rarity system to allow easier stacking of a weaker unit and causes a player to make a choice or gamble on investing in a higher cost, rarity, and stronger unit.

## Overview and Gameplay
To be written after accepted, general gameplay loop is
- choose cards
- play cards
- fight. each card randomly rps's against another. 
- W/L is converted to damage to player
- damage scales up due to number of fights happening
- winner is whoever has player hp

## Pokemon
- Uses https://pokeapi.co/
- Information we need to take:
    - Name**
    - Sprite/Image**
    - An Attack Name and Power
    - Evolution (This creates a new unit) **
### Ex:
- Charmander
    - Name : Charmander
    - Sprite: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png">
    - Attack: Ember 40 (basic fire pokemon attack)
    - Evolves into
        - Name: Charmeleon
        - Sprite: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png">
        - Attack: Flamethrower 90 (stronger fire pokemon attack)
        - Evolves into
            - Name: Charizard
            - Sprite: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png">
            - Attack: Flare Blitz/Blast Burn 120/150 (some of the strongest)

## Tables
- <b> Users Table </b>
- <b> Cards Table </b>
- Leaderboard Table
- Match (History) Table 
- Turn Information Table 
- Game State:
    - <b> Current Units on Field </b>


## MVP Goals
- Models:
    - Add 10 total Pokemon (Baby/Base Form only)
    - Enemy CPU
- User Interaction Functions: 
    - User should be able to sign up and sign in
        - Validation / Authentication
        - No duplicate usernames
    - User should be able to start up a game
- Game Functions: (PVE ONLY)
    - On Game Start:
        - Given a choice of 5, select 3
    - In a turn:
        - Beginning: (Select Phase)
            - User should be able to select a card for their deck and play it
        - Middle: (Combat Phase)
            - Each unit can attack
        - Turn ends once certain conditions are met:
            - All Friendly Units have finished their round of attacks
        - End of Turn: (Rewards)
            - Player recieves the following:
                - Damage/Score (based on how they perform)
                - A choice of 1 more Pokemon
    - Game ends when:
        - Player HP Reaches 0
        - Player Opponent HP Reaches 0
- Non-Game Functions: 
    - "Leaderboard" on Win/Loss Ratio 
        - Win Rate (Does not display until you hit a certain number of matches, low match count players can have a skewed WR and shouldn't be in the leaderboard)
        - Match Count
        - Win Count 
        - A bit hard to properly show a leaderboard for this style of game, which is why I wanted to implement an MMR like system in the future
        

## Tier 1 Stretch (Might not hit all of it but next goals after MVP)
- Models:
    - Add 30 total Pokemon (Including Evolutions)
        - Evolutions
        - Early stat implementation, Boost HP for higher rarity to artificially boost strength
        - Pokemon are removed from the fight when defeated, their hp is logged for the next fight
    - Rarity System
        - Basic, Just increase rarity on evolved units
    - Add PVE Fights
        - 5 Basic
        - 3 Bosses
        - 2 'Super Boss' (1 Training Dummy/Debug tool, 1 Actual Raid Boss)
- Game Functions: (PVE ONLY)
    - Tournament System rather than 1 v 1, Setting up for 8 Player PVP
    - In a turn:
        - Beginning: (Select Phase)
            - User should be able to choose to 'play' their card onto the field
                - This is set up for the hand in a next tier goal
            - User should be able to combine 3 of a card to 'evolve' it
        - Middle: (Combat Phase)
            - Units can use an ability (charge on hit)  
                - HP for all Pokemon is increased to compensate
                - Ability has a "Potency" and is immediately used on turn start 
                    - Every active turn charges their next cast by 1
                    - The reason why we have it use immediately on hit is because units are not going to have unique abilities at the moment or unique potencies.
        - Turn ends once certain conditions are met:
            - All Friendly Units are defeated
            - All Enemy Units are defeated  
                - These two goals means a slight change in the Game Engine
                - This is also a result of adding the evolution system
        - End of Turn: (Rewards)
            - Player recieves the following:
                - Nothing new here
- Non-Game Functions: 
    - User should be able to look at the current match's round and turn information/history
    - User should be able to look at their match history
        - User should be able to look at turn history for these too

## Tier 2 Stretch
- Models:
    - Unique Stats
    - Dual Typing
        - Charizard is Fire/Flying after all. 
    - Add More PVE units
        - 25+ Basic
        - 5+ Bosses
        - 3-5+ 'Super Boss'/Raid Boss (PVE with Friends)
- User Interaction Functions: 
    - User should be able to set up a game for a friend to join
    - User should be able to join a friends game via a code
        - For now, it is used to test the Raid Boss feature (Proof of Concept to know for sure that we can have multiplayer working)
- Game Functions: (set up functions to make it an actual live 8 player PVP Game)
    - Level Up System to change how many units can be deployed
    - Introduction to "The Hand" and PokeDollars
    - Currency System: PokeDollars
        - Used to "Purchase Pokemon" to add to your hand
    - In a turn:
        - Beginning: (Select Phase)
            - User should be able to select a card for their deck and store it in a hand
            - User should be able to reroll the cards available to select
            - User should be able to freeze/lock the cards available to select
        - Middle: (Combat Phase)
            - Automatically starts after a certain time has passed
                - Ability rework
                    - Ability Charging System, changes 
                - Type Chart Rework, types become a class. This will facilitate the "unit type bonus" stretch in the future
        - End of Turn: (Rewards)
            - Player recieves the following:
                - Rewards (based on units defeated, or boss defeated in PVE.)
                - Base Currency (PokeDollars?) per match (scales up on turn count)    


## Tier 3 Stretch    
- Models:
    - Add More Pokemon
    - Rarity System
        - Rarity Tiers for Base Pokemon
    - Trainer Classes 
        - Ex: Fire Units cost less to buy and less to evolve
        - Water units add a slow heal over time
    - Unit Bonuses 
        - More Fire Types add chance to burn and increase burn damage over time
        - Grass Units gain HP on hit
- User Interaction Functions:
    - "Chat System", send stickers mid game "Well Played!" 
- Game Functions:
    - Up to 8 Player PvP, with CPU's to Fill as needed
    - There is a time limit that forces a user to enter the next phase
    - In a turn:
        - Beginning: (Select Phase)
            - Nothing new here
        - Middle: (Combat Phase)
            - Multiple Ability System
            - Each unit has it's own combat AI archetype
        - End of Turn: (Rewards)
            - Nothing new here
- Non-Game Functions: 
    - Cosmetics added to name
    - MMR "System"        

## User Stories
- Models:
    - Add Units
    - Add PVE units
        - Basic enemies
        - Boss enemies
        - Super Boss/Raid/Dummy
- User Interaction Functions: 
    - User should be able to sign up and sign in
    - User should be able to start up a game
    - User should be able to set up a game for a friend to join
    - User should be able to join a friends game via a code
- Game Functions:
    - There is a time limit that forces a user to enter the next phase
    - In a turn:
        - Beginning: (Select Phase)
            - User should be able to select cards for their deck
            - User should be able to reroll the cards available to select
            - User should be able to freeze/lock the cards available to select
            - User should be able to 'play' their card onto the field
        - Middle: (Combat Phase)
            - Automatically starts after a certain time has passed
            - Each unit can attack
            - Each unit can use their ability
                - Ability Charging System
                - Multiple Ability System
            - Each unit has it's own combat AI archetype
        - Turn ends once certain conditions are met:
            - Timer runs out
            - All Friendly Units are defeated
            - All Enemy Units are defeated
            - User quits (probably)
        - End of Turn: (Rewards)
            - Player recieves the following:
                - Damage/Score (based on how they 'perform)
                - Rewards (based on units defeated, or boss defeated in PVE.)
                    - Maybe have bosses/PVE in between PVP rounds
                - Base Currency (PokeDollars?) per match (scales up on turn count)
    - Game ends when:
        - Player HP Reaches 0
        - Player Defeats all Opponents (PVE or PVP)
- Non-Game Functions: 
    - User should be able to look at the current match's turn information/history
    - User should be able to look at their match history
        - User should be able to look at turn history for these too
    - Leaderboard on Win/Loss Ratio
    - MMR "System"

## ERD

![image](https://user-images.githubusercontent.com/101997617/167427319-ed5e18c4-6240-4e6d-a2d7-690e37f5bb42.png)

![image](https://user-images.githubusercontent.com/101997617/167427282-b20f718c-864e-4870-bd7e-163091b303eb.png)


## Tech Stack
- C#
- HTML/CSS
- Java Script
- Angular
- ASP.NET
- (idk what db)
