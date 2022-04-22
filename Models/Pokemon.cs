namespace Models;
public class Pokemon
{
    /// <summary>
    /// This is the Pokemon's ID
    /// </summary>
    /// <value>Pokemon's ID</value>
    public int id { get; set; } = 0;

    /// <summary>
    /// This is the name of the Pokemon
    /// </summary>
    /// <value>Pokemon's Name</value>
    public string name { get; set; } = "";

    /// <summary>
    /// This is how many Health Points a Pokemon has, determines how many hits it can take before it is defeated
    /// </summary>
    /// <value>Pokemon's HP</value>
    public int hp { get; set; } = 5;

    /// <summary>
    /// This is the Pokemon's Attack stat, this determines how much damage it does on a Basic Attack
    /// </summary>
    /// <value>Pokemon's Attack</value>
    public int attack { get; set; } = 1;

    /// <summary>
    /// This is the Pokemon's Special Attack Stat, this determines how much damage it does on it's Special Attack
    /// </summary>
    /// <value>Pokemon's Special Attack</value>
    public int special { get; set; } = 2;

    /// <summary>
    /// This is the Pokemon's Defense Stat, this determines how much damage is reduced when receiving damage.
    /// </summary>
    /// <value>Pokemon's Defense Stat</value>
    public int defense { get; set; } = 0;

    /// <summary>
    /// This is the Pokemon's Type, this determines if the attack does 2x or 0.5x damage to it's target. There is a Type Match-Up chart
    /// </summary>
    /// <value>Pokemon's Type</value>
    public string type1 { get; set; } = "none";
    public string type2 { get; set; } = "none";

    /// <summary>
    /// This is the Pokemon's Rarity, this determines how often it can show up to be used. The Values are 1, 2, 3, and 5. Generally Rarity 3 pokemon are fully evolved and 5 are legendaries.
    /// </summary>
    /// <value>Pokemon's Rarity</value>
    public int rarity { get; set; } = 1;

    /// <summary>
    /// This is the id of the Pokemon's Pre-evolution.
    /// </summary>
    /// <value>Child ID</value>
    public int childID { get; set; } = -1;

    /// <summary>
    /// This is the id of the Pokemon's Next Evolution
    /// </summary>
    /// <value>Parent ID</value>
    public int parentID { get; set; }= -1; 

    /// <summary>
    /// This change's the Pokemon's Strategy for attacking.
    /// </summary>
    /// <value>Combat AI</value>
    public string combatAI { get; set; } = "";

    /// <summary>
    /// This is the name of the Pokemon's Special Attack
    /// </summary>
    /// <value>Special Attack</value>
    public string specialAttack { get; set; } = "";

    public Pokemon(){

    }
    public Pokemon(string _name, string _type)
    {
        name = _name;
        type1 = _type;
    }
}
