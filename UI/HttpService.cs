using System.Text.Json;
using System.Net.Http;

namespace UI;
public class HttpService
{
        private readonly string _apiBaseUrl = "https://localhost:7198/api/";
        private HttpClient client = new HttpClient();

        public HttpService()
        {
            client.BaseAddress = new Uri(_apiBaseUrl);
        }

        public string FindRandomPokemonById(int id)
        {
            string pokemonName = "";

            try
            {
                HttpResponseMessage response = client.Get($"GetRandomPokemonFromList");
                response.EnsureSuccessStatusCode();
                string responseString = response.Content.ReadAsStringAsync();

                pokemonName = JsonSerializer.Deserialize<string>(responseString);
            }
            catch(HttpRequestException ex)
            {
                Console.WriteLine(ex);
            }
            return pokemonName;
        }

        // create pokemon using db info

        // 
}

