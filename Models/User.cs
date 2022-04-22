namespace Models
{
    public class User
    {
        /// <summary>
        /// This is the User's ID
        /// </summary>
        /// <value>User's ID</value>
        public int id { get; set; }

        /// <summary>
        /// This is the User's Username
        /// </summary>
        /// <value>User's Username</value>
        public string username { get; set; } = "Guest";

        /// <summary>
        /// This is the User's Password
        /// </summary>
        /// <value>User's Password</value>
        public string password { get; set; } = "";

        /// <summary>
        /// This is the number of matches the User has played
        /// </summary>
        /// <value>User's Matches</value>
        public int matches { get; set; } = 0;

        /// <summary>
        /// This is the number of games the user won
        /// </summary>
        /// <value>User's Wins</value>
        public int wins { get; set; } = 0;

        /// <summary>
        /// This is the number of games the user lost
        /// </summary>
        /// <value>User's Losses</value>
        public int losses { get; set; } = 0;
    }
}

