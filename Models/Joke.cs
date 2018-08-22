using Newtonsoft.Json;


namespace WebApplication
{
    public class Joke
    {
        // https://icanhazdadjoke.com
        // application/json
        //
        // {
        // "id": "BQnyImOCIBd", 
        // "joke": "How do hens stay fit? They always egg-ercise!", 
        // "status": 200
        // }

        public string id { get; set; }
        public string joke { get; set; }
        public int WordCount { get; set; }


        // Not sure how we can use this... exclude for now.

        [JsonIgnore] public int status { get; set; }
    }
}