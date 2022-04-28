using System;
using Serilog;
namespace GameEngine
{
    public class Game
    {        
        int gameTicks = 1;
        int round = 1;
        //Full List of Pokemon Available
        List<Pokemon> Pokedex = new List<Pokemon>();
        //Player's Pokedex, this list is pulled from the database in the future
        List<Pokemon> playerDex = new List<Pokemon>();
        //Current Enemy's Pokedex, this is pulled from the database in the future
        List<Pokemon> enemyDex = new List<Pokemon>();
        //HP List, which kinda doubles as player list? maybe make player hp a thing in user
        List<int> playerHP = new List<int>(){ 10, 10 };

        public void run()
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .WriteTo.File($"logs/{gameTicks}log.txt", rollingInterval: RollingInterval.Day)
                .CreateLogger();
            bool exitGame = false;
            populateDex();
            // Start of the Game,
            do
            {
                //This Loop runs until exitGame is true
                Log.Information("Test");
                startGame();
                //shuffle player list, match ups are paired
                round = 1;
                do 
                {
                    startRound(playerDex, enemyDex); //this is a 1v1 match til the hp = 0, will change when 8 players exist
                } while (playerHP[0] > 0 && playerHP[1] > 0);

                if (playerHP[0] > playerHP[1] && playerHP[0]  > 0) { Console.WriteLine("You Win!"); }
                if (playerHP[1] > playerHP[0] && playerHP[1] > 0) { Console.WriteLine("You Lose..."); }
                if (playerHP[0] < 1 && playerHP[1] < 1) { Console.WriteLine("You... tied?"); }
                //Exits the game
                Console.WriteLine("\nGames Played: " + gameTicks + "\nPress x to quit");
                gameTicks++;
                ConsoleKeyInfo input = Console.ReadKey();
                if (input.Key == ConsoleKey.X)
                {
                    Log.Debug("Game Has Ended");
                    Log.CloseAndFlush();
                    exitGame = true;
                }
            } while (!exitGame);
        }
        public void startGame()
        {
            //This Happens on Game Start, this is where everything is reset
            //Reset HP, In the future when there's more rivals/trainers, this is converted to an array/list. 
            playerHP = new List<int>(){ 10, 10 }; //fix this to fit 8 players
            // Clean out Dex every new Game, in the future this will be a method to clear out the database
            playerDex = new List<Pokemon>();
            enemyDex = new List<Pokemon>();
            // Generate a small pool for the player to start with, maybe make a unique one for game start
            addPokemon();
            addPokemon();
            addPokemon();
        }
        public void startRound(List<Pokemon> attacker, List<Pokemon> defender)
        {
            //a round is described as a single player vs player match
            //takes the player's current pokedex, shuffles them and pits each one against each other using the start fight method.
            //the reason why we're making an instance of the list is that in the future, when a pokemon is defeated, it will be removed from the list and the pokemon who win will have their hp be their remaining hp. the winner will be whoever has any remaining pokemon, and only the loser takes damage
            //
            // Wins, Losses, and Ties
            int w = 0;
            int l = 0;
            int t = 0;
            Console.WriteLine($"Round {round}\n");
            // Randomize the list
            List<Pokemon> aDex = attacker;
            List<Pokemon> dDex = defender;
            aDex.shuffle();
            dDex.shuffle();

            for (int x = 0; x < playerDex.Count; x++)
            {
                Pokemon aPokemon = aDex[x];
                Pokemon dPokemon = dDex[x];
                switch (startFight(aPokemon, dPokemon))
                {
                    case -1:
                        //Console.WriteLine("Fight Lost...");
                        playerHP[0]--;
                        l++;
                        break;
                    case 0:
                        //Console.WriteLine("Fight Tied?");
                        t++;
                        break;
                    case 1:
                        //Console.WriteLine("Fight Won!");
                        playerHP[1]--;
                        w++;
                        break;
                    default:
                        Console.WriteLine("Something went Wrong");
                        break;
                }
            }
            Console.WriteLine($"\nWins: {w} | Losses: {l} | Ties: {t}");
            Console.WriteLine($"php: {playerHP[0]} | ehp: {playerHP[1]}");
            round++;
            if (playerHP[0] > 0 && playerHP[1] > 0 && round % 2 == 0) { addPokemon(); }
            //can add conditions to when we give a person a pokemon?
        }
        /// <summary>
        /// Pokemon fight itself, logs damage until either pokemon runs out of hp
        /// </summary>
        /// <param name="attacker">Attacking Pokemon</param>
        /// <param name="defender">Defending Pokemon</param>
        /// <returns>Returns 1 if won, returns -1 if lost, returns 0 if tied</returns>
        public int startFight(Pokemon attacker, Pokemon defender)
        {
            int turn = 1;
            int result = 0;
            int aDamageBonus = damageBonus(attacker, defender);
            int dDamageBonus = damageBonus(defender, attacker);
            double aHP = Convert.ToDouble(attacker.hp);
            double dHP = Convert.ToDouble(defender.hp);
            //Damage Calculator
            Console.WriteLine($"\n{attacker.name} and {defender.name} are fighting!");
            Console.WriteLine($"Turn: {turn} | {attacker.name}: {aHP} | {defender.name}: {dHP}");
            while (aHP > 0 && dHP > 0)
            {
                //Console.WriteLine($"{attacker.name} attacks {defender.name}!");
                double aDamage = damageCalc(attacker.attack, aDamageBonus, defender.defense);
                Console.WriteLine($"{attacker.name} hits {defender.name} for {aDamage} damage!");
                dHP -= aDamage;

                //Console.WriteLine($"{defender.name} attacks {attacker.name}!");
                double dDamage = damageCalc(defender.attack, dDamageBonus, attacker.defense);
                Console.WriteLine($"{defender.name} hits {attacker.name} for {dDamage} damage!");
                aHP -= dDamage;

                Console.WriteLine($"Turn: {turn}: {attacker.name}: {aHP} | {defender.name}: {dHP}");
                turn++;
                if (turn > 10)
                {
                    Console.WriteLine($"{attacker.name} and {defender.name} got tired of fighting");
                    break;
                }
            }
            if (aHP <= 0)
            {
                Console.WriteLine($"{attacker.name} has fainted!");
                result--;
            }
            if (dHP <= 0)
            {
                Console.WriteLine($"{defender.name} has fainted!");
                result++;
            }
            return result;
        }
        /// <summary>
        /// Populates the Pokedex, hardcoded for now but in the future makes a call to the DB
        /// </summary>
        public void populateDex()
        {
            Pokedex.AddRange(new List<Pokemon>{
                new Pokemon("charmander", "fire"),
                new Pokemon("squirtle", "water"),
                new Pokemon("bulbasaur", "grass"),
                new Pokemon("pikachu", "electric"),
                new Pokemon("eevee", "normal"),
                new Pokemon("ghastly", "ghost"),
                new Pokemon("psyduck", "water"),
                new Pokemon("mawile", "steel"),
                new Pokemon("staryu", "water"),
                new Pokemon("abra", "psychic"),
                new Pokemon("murkrow", "dark"),
                new Pokemon("pidgey", "flying"),
                new Pokemon("diglet", "ground"),
                new Pokemon("onix", "rock"),
                new Pokemon("ekans", "poison"),
            });
        }

        /// <summary>
        /// Determines the damage bonus based on a given type match up chart
        /// 0 = Normal
        /// 1 = Super Effective 2x
        /// 2 = Super Effective 4x (Reserved for when dual types are involved)
        /// -1 = Not Very Effective 0.5x
        /// -2 = Not Very Effective 0.25x (Dual Types like above)
        /// -5 = Immune (Rare case)
        /// </summary>
        /// <param name="attacker"></param>
        /// <param name="defender"></param>
        /// <returns></returns>
        public int damageBonus(Pokemon attacker, Pokemon defender)
        {
            int bonus = 0;
            switch (attacker.type1)
            {
                case "normal":
                    if (defender.type1 == "rock") { bonus = -1; }
                    if (defender.type1 == "ghost") { bonus = -5; }
                    if (defender.type1 == "steel") { bonus = -1; }
                    break;
                case "fire":
                    if (defender.type1 == "fire") { bonus = -1; }
                    if (defender.type1 == "water") { bonus = -1; }
                    if (defender.type1 == "grass") { bonus = 1; }
                    if (defender.type1 == "ice") { bonus = 1; }
                    if (defender.type1 == "bug") { bonus = 1; }
                    if (defender.type1 == "rock") { bonus = -1; }
                    if (defender.type1 == "dragon") { bonus = -1; }
                    if (defender.type1 == "steel") { bonus = 1; }
                    break;
                case "water":
                    if (defender.type1 == "fire") { bonus = 1; }
                    if (defender.type1 == "water") { bonus = -1; }
                    if (defender.type1 == "grass") { bonus = -1; }
                    if (defender.type1 == "ground") { bonus = 1; }
                    if (defender.type1 == "rock") { bonus = 1; }
                    if (defender.type1 == "dragon") { bonus = -1; }
                    break;
                case "electric":
                    if (defender.type1 == "water") { bonus = 1; }
                    if (defender.type1 == "electric") { bonus = -1; }
                    if (defender.type1 == "grass") { bonus = -1; }
                    if (defender.type1 == "ground") { bonus = -5; }
                    if (defender.type1 == "flying") { bonus = 1; }
                    if (defender.type1 == "dragon") { bonus = -1; }
                    break;
                case "grass":
                    if (defender.type1 == "fire") { bonus = -1; }
                    if (defender.type1 == "water") { bonus = 1; }
                    if (defender.type1 == "grass") { bonus = -1; }
                    if (defender.type1 == "poison") { bonus = -1; }
                    if (defender.type1 == "ground") { bonus = 1; }
                    if (defender.type1 == "flying") { bonus = -1; }
                    if (defender.type1 == "bug") { bonus = -1; }
                    if (defender.type1 == "rock") { bonus = 1; }
                    if (defender.type1 == "dragon") { bonus = -1; }
                    if (defender.type1 == "steel") { bonus = -1; }
                    break;
                case "ice":
                    if (defender.type1 == "fire") { bonus = -1; }
                    if (defender.type1 == "water") { bonus = -1; }
                    if (defender.type1 == "grass") { bonus = 1; }
                    if (defender.type1 == "ice") { bonus = -1; }
                    if (defender.type1 == "ground") { bonus = 1; }
                    if (defender.type1 == "flying") { bonus = 1; }
                    if (defender.type1 == "dragon") { bonus = 1; }
                    if (defender.type1 == "normal") { bonus = -1; }
                    break;
                case "fighting":
                    if (defender.type1 == "normal") { bonus = 1; }
                    if (defender.type1 == "ice") { bonus = 1; }
                    if (defender.type1 == "poison") { bonus = -1; }
                    if (defender.type1 == "flying") { bonus = -1; }
                    if (defender.type1 == "psychic") { bonus = -1; }
                    if (defender.type1 == "bug") { bonus = -1; }
                    if (defender.type1 == "rock") { bonus = 1; }
                    if (defender.type1 == "ghost") { bonus = -5; }
                    if (defender.type1 == "dark") { bonus = 1; }
                    if (defender.type1 == "steel") { bonus = 1; }
                    if (defender.type1 == "fairy") { bonus = -1; }
                    break;
                case "poison":
                    if (defender.type1 == "grass") { bonus = 1; }
                    if (defender.type1 == "poison") { bonus = -1; }
                    if (defender.type1 == "ground") { bonus = -1; }
                    if (defender.type1 == "rock") { bonus = -1; }
                    if (defender.type1 == "ghost") { bonus = -1; }
                    if (defender.type1 == "steel") { bonus = -5; }
                    if (defender.type1 == "fairy") { bonus = 1; }
                    break;
                case "ground":
                    if (defender.type1 == "fire") { bonus = 1; }
                    if (defender.type1 == "electric") { bonus = 1; }
                    if (defender.type1 == "grass") { bonus = -1; }
                    if (defender.type1 == "poison") { bonus = 1; }
                    if (defender.type1 == "flying") { bonus = -5; }
                    if (defender.type1 == "bug") { bonus = -1; }
                    if (defender.type1 == "rock") { bonus = 1; }
                    if (defender.type1 == "steel") { bonus = 1; }
                    break;
                case "flying":
                    if (defender.type1 == "electric") { bonus = -1; }
                    if (defender.type1 == "grass") { bonus = 1; }
                    if (defender.type1 == "fighting") { bonus = 1; }
                    if (defender.type1 == "bug") { bonus = 1; }
                    if (defender.type1 == "rock") { bonus = -1; }
                    if (defender.type1 == "steel") { bonus = -1; }
                    break;
                case "psychic":
                    if (defender.type1 == "fighting") { bonus = 1; }
                    if (defender.type1 == "poison") { bonus = 1; }
                    if (defender.type1 == "psychic") { bonus = -1; }
                    if (defender.type1 == "dark") { bonus = -5; }
                    if (defender.type1 == "steel") { bonus = -1; }
                    break;
                case "bug":
                    if (defender.type1 == "fire") { bonus = -1; }
                    if (defender.type1 == "grass") { bonus = 1; }
                    if (defender.type1 == "fighting") { bonus = -1; }
                    if (defender.type1 == "poison") { bonus = -1; }
                    if (defender.type1 == "flying") { bonus = -1; }
                    if (defender.type1 == "psychic") { bonus = 1; }
                    if (defender.type1 == "ghost") { bonus = -1; }
                    if (defender.type1 == "dark") { bonus = 1; }
                    if (defender.type1 == "normal") { bonus = -1; }
                    if (defender.type1 == "steel") { bonus = -1; }
                    break;
                case "rock":
                    if (defender.type1 == "fire") { bonus = 1; }
                    if (defender.type1 == "ice") { bonus = 1; }
                    if (defender.type1 == "fighting") { bonus = -1; }
                    if (defender.type1 == "ground") { bonus = -1; }
                    if (defender.type1 == "flying") { bonus = 1; }
                    if (defender.type1 == "bug") { bonus = 1; }
                    if (defender.type1 == "steel") { bonus = -1; }
                    break;
                case "ghost":
                    if (defender.type1 == "normal") { bonus = -5; }
                    if (defender.type1 == "psychic") { bonus = 1; }
                    if (defender.type1 == "ghost") { bonus = 1; }
                    if (defender.type1 == "dark") { bonus = -1; }
                    break;
                case "dragon":
                    if (defender.type1 == "dragon") { bonus = 1; }
                    if (defender.type1 == "steel") { bonus = -1; }
                    if (defender.type1 == "fairy") { bonus = -5; }
                    break;
                case "dark":
                    if (defender.type1 == "fighting") { bonus = -1; }
                    if (defender.type1 == "psychic") { bonus = 1; }
                    if (defender.type1 == "ghost") { bonus = 1; }
                    if (defender.type1 == "dark") { bonus = -1; }
                    if (defender.type1 == "fairy") { bonus = -1; }
                    break;
                case "steel":
                    if (defender.type1 == "fire") { bonus = -1; }
                    if (defender.type1 == "water") { bonus = -1; }
                    if (defender.type1 == "electric") { bonus = -1; }
                    if (defender.type1 == "ice") { bonus = 1; }
                    if (defender.type1 == "rock") { bonus = 1; }
                    if (defender.type1 == "steel") { bonus = -1; }
                    if (defender.type1 == "fairy") { bonus = 1; }
                    break;
                case "fairy":
                    if (defender.type1 == "fire") { bonus = -1; }
                    if (defender.type1 == "fighting") { bonus = 1; }
                    if (defender.type1 == "poison") { bonus = -1; }
                    if (defender.type1 == "dragon") { bonus = 1; }
                    if (defender.type1 == "dark") { bonus = 1; }
                    if (defender.type1 == "steel") { bonus = -1; }
                    break;
                default:
                    break;
            }
            return bonus;
        }

        /// <summary>
        /// Damage Calculator
        /// </summary>
        /// <param name="attack">Attackers Attack Stat</param>
        /// <param name="bonus">Type Bonus calculated via damageBonus</param>
        /// <param name="defense">Defender's Defense Stat</param>
        /// <returns>Damage Calculated</returns>
        public double damageCalc(int attack, int bonus, int defense)
        {
            double damage = 0;
            switch (bonus)
            {
                case -2:
                    damage = attack * .25;
                    //Console.WriteLine("It's really not effective...");
                    break;
                case -1:
                    damage = attack * .5;
                    //Console.WriteLine("It's not very effective...");
                    break;
                case 0:
                    damage = attack * 1;
                    break;
                case 1:
                    damage = attack * 2;
                    //Console.WriteLine("It's Super Effective!");
                    break;
                case 2:
                    damage = attack * 4;
                    //Console.WriteLine("It's Extremely Effective!!!");
                    break;
                default:
                    damage = attack * 0;
                    //Console.WriteLine("It's Not Effective at All!?");
                    break;
            }
            if (damage > 0)
            {
                return damage;
            }
            return 0;
        }

        /// <summary>
        /// Given a random selection of 5 (doesn't have to be unique), select 1
        /// </summary>
        public void addPokemon()
        {
            // Random Generator
            var rdm = new Random();
            int i = 1;
            List<Pokemon> selector = new List<Pokemon>(){
                Pokedex[rdm.Next(Pokedex.Count)],
                Pokedex[rdm.Next(Pokedex.Count)],
                Pokedex[rdm.Next(Pokedex.Count)],
                Pokedex[rdm.Next(Pokedex.Count)],
                Pokedex[rdm.Next(Pokedex.Count)],
            }; ;
            Console.WriteLine("\n[#]: Select a Pokemon");
            foreach (Pokemon p in selector)
            {
                Console.WriteLine($"[{i}]: {p.name} | HP: {p.hp} | ATK: {p.attack} | DEF: {p.defense} | Type: {p.type1}"); //|{p.type2} | Special: {p.specialAttack}None
                i++;
            }
        Retry:
            string? input = Console.ReadLine();
            if (input == "1" || input == "2" || input == "3" || input == "4" || input == "5")
            {
                playerDex.Add(selector[Int32.Parse(input) - 1]);
                enemyDex.Add(Pokedex[rdm.Next(Pokedex.Count)]);
            }
            else
            {
                Console.WriteLine("Bad Input");
                goto Retry;
            }
        }


    }
    //Shuffler Taken from Google
    static class Shuffler
    {
        private static Random rng = new Random();
        public static void shuffle<T>(this IList<T> list)
        {
            int n = list.Count;
            while (n > 1)
            {
                n--;
                int k = rng.Next(n + 1);
                T value = list[k];
                list[k] = list[n];
                list[n] = value;
            }
        }
    }
}