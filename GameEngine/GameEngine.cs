namespace GameEngine
{
    public class Game
    {
        /// <summary>
        /// Kills Game
        /// </summary>
        bool exitGame = false;
        /// <summary>
        /// Keeps track of the number of times the game has looped, might be useful for error handling
        /// </summary>
        int gameTicks = 1;
        /// <summary>
        /// List of all possible pokemon
        /// </summary>
        /// <typeparam name="Pokemon">Pokemon</typeparam>
        /// <returns>A List of all possible rollable Pokemon</returns>
        List<Pokemon> Pokedex = new List<Pokemon>();

        /// <summary>
        /// List of pokemon in the player's possesion
        /// </summary>
        /// <typeparam name="Pokemon">Pokemon</typeparam>
        /// <returns>List of pokemon in the player's possesion</returns>
        List<Pokemon> playerDex = new List<Pokemon>();

        /// <summary>
        /// List of pokemon in the enemy's possesion
        /// </summary>
        /// <typeparam name="Pokemon">Pokemon</typeparam>
        /// <returns>List of pokemon in the enemy's possesion</returns>
        List<Pokemon> enemyDex = new List<Pokemon>();

        /// <summary>
        /// Runs the Game (in console rn)
        /// </summary>
        public void run()
        {
            var rdm = new Random();
            populateDex();
            // Start of the Game,
            do
            {
                // Player and Enemy HP
                /// <summary>
                /// Player HP
                /// </summary>
                int pHP = 5;
                /// <summary>
                /// Enemy HP
                /// </summary>
                int eHP = 5;

                // Clean out Dex every new Game
                playerDex = new List<Pokemon>();
                enemyDex = new List<Pokemon>();

                // Generate a small pool for the player to start with,
                addPokemon();
                addPokemon();
                addPokemon();
                int round = 1;
                do
                {
                    // Wins, Losses, and Ties
                    int w = 0;
                    int l = 0;
                    int t = 0;
                    Console.WriteLine($"Round {round}\n");
                    // Randomize the list
                    playerDex.shuffle();
                    enemyDex.shuffle();

                    for (int x = 0; x < playerDex.Count; x++)
                    {
                        Pokemon attacker = playerDex[x];
                        Pokemon defender = enemyDex[x];
                        switch (fight(attacker, defender))
                        {
                            case -1:
                                //Console.WriteLine("Fight Lost...");
                                pHP--;
                                l++;
                                break;
                            case 0:
                                //Console.WriteLine("Fight Tied?");
                                t++;
                                break;
                            case 1:
                                //Console.WriteLine("Fight Won!");
                                eHP--;
                                w++;
                                break;
                            default:
                                Console.WriteLine("Fight... went wrong?");
                                break;
                        }
                    }
                    Console.WriteLine($"\nWins: {w} | Losses: {l} | Ties: {t}");
                    Console.WriteLine($"php: {pHP} | ehp: {eHP}");
                    round++;
                    if (pHP > 0 && eHP > 0) { addPokemon(); }
                } while (pHP > 0 && eHP > 0);

                if (pHP > eHP && pHP > 0) { Console.WriteLine("You Win!"); }
                if (eHP > pHP && eHP > 0) { Console.WriteLine("You Lose..."); }
                if (pHP < 1 && eHP < 1) { Console.WriteLine("You... tied?"); }
                //Exits the game
                Console.WriteLine("\nGames Played: " + gameTicks + "\nPress x to quit");
                gameTicks++;
                ConsoleKeyInfo input = Console.ReadKey(); //dont judge me i wanted to see how this worked
                if (input.Key == ConsoleKey.X)
                {
                    exitGame = true;
                }
            } while (!exitGame);
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
        /// Pokemon fight itself, logs damage until either pokemon runs out of hp
        /// </summary>
        /// <param name="attacker">Attacking Pokemon</param>
        /// <param name="defender">Defending Pokemon</param>
        /// <returns>Returns 1 if won, returns -1 if lost, returns 0 if tied</returns>
        public int fight(Pokemon attacker, Pokemon defender)
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
                Console.WriteLine($"[{i}]: {p.name} | HP: {p.hp} | ATK: {p.attack} | DEF: {p.defense} | Type: {p.type1}|{p.type2} | Special: {p.specialAttack}None");
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