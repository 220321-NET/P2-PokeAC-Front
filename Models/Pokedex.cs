namespace Models
{
    public class Pokedex
    {
        public int id { get; set; } = 0;
        public int userId { get; set; } = 0;
        public int pokeID { get; set; } = 0;

        public Pokedex(int user, int pokemon){
            this.userId = user;
            this.pokeID = pokemon;
        }
        public Pokedex(){}
        //List<Pokemon> pokeDex { get; set; }
    }
}