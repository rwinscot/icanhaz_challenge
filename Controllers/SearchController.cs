﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using RestSharp;


namespace WebApplication.Controllers
{
  
    // URL = ./api/jokes/search
    [Route("api/jokes/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class SearchController : Controller
    {        

        [HttpGet]
        public JsonResult Get([FromQuery] string term = "cray cray")
        {
          
            // REQUIREMENT: Accept a search term and display up to 30 jokes that contain 
            //              the term. Emphasize the term (upper, bold, color, etc.). Group
            //              results by length: < 10 words (short), < 20 words (medium), 
            //              >= 20 words (long). 
        
            var client = new RestClient {BaseUrl = new Uri("https://icanhazdadjoke.com")};
            var request = new RestRequest {Resource = "/search"};
          
            // Querystring without 'term' present will return a blank array. If present, 
            // but blank, it will return a maximum of thirty items.  
            request.AddParameter("term", term);
            request.AddParameter("limit", "30");
          
            // Retrieve jokes.
            var json = client.Execute(request);
            var jokeSearch = JObject.Parse(json.Content);
          
            // Extract internal joke results to top-level array.
            IList<JToken> results = jokeSearch["results"].Children().ToList();
            IList<Joke> jokes = new List<Joke>();
            foreach (var result in results)
            {
                var obj = result.ToObject<Joke>();
            
                // Word count, is going to be approximate.
                var wordz = Regex.Matches(WebUtility.UrlDecode(obj.joke), @"[\S]+");
                obj.WordCount = wordz.Count;
            
                jokes.Add(obj);
            }
                    
            // PERFORMANCE: Might as well satisfy the grouping requirement here via a sort.
            // Ideally, a word-count is something that should be stated in the DB record for
            // accuracy and included as part of the query... ORDER BY.
            
            return Json(jokes.OrderBy(j => j.WordCount).ToList());
        }

    }
}