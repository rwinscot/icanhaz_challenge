﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;

using Newtonsoft.Json;
using RestSharp;


namespace WebApplication.Controllers
{
    
    // URL = ./api/jokes/random
    [Route("api/jokes/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class RandomController : Controller
    {

        [HttpGet]
        public JsonResult Get()
        {
            // REQUIREMENT: Display a random joke every 10 seconds; client will initiate 
            //              refresh.
            
            var client = new RestClient {BaseUrl = new Uri("https://icanhazdadjoke.com")};
            var request = new RestRequest {Resource = "/"};
            var json = client.Execute(request);
            
            // Churn single result into an array... so that we can consolidate presentation.
            var results = new List<Joke>();
            
            // TODO: Is this a joke? It had better be...
            var obj = JsonConvert.DeserializeObject<Joke>(json.Content);
            
            // Word count, is going to be approximate.
            var wordz = Regex.Matches(WebUtility.UrlDecode(obj.joke), @"[\S]+");
            obj.WordCount = wordz.Count;
            
            // Random and Search result as an array - so that clients can consume either with
            // similar approach.
            results.Add(obj);
            
            return Json(results);
        }        
        
    }
}