#5.2.1.1 Every movies which title matches ’Star Wars(match query),
GET _search
{
    "query": {
        "match": {
            "fields.title": "Star Wars"
        }
    }
}
#5.2.1.2 Try with exact match (match_phrase),
GET _search
{
    "query": {
        "match_phrase": {
            "fields.title": "Star Wars"
        }
    }
}


#5.2.1.3 Star Wars movies and Directors equal to ’Georges Lucas’ (boolean query),
GET _search
{
  "query": {
    "bool": {
      "must": [
        {
          "match_phrase": {
            "fields.title": "Star Wars"
          }
        },
        {
          "match_phrase": {
            "fields.directors": "George Lucas"
          }
        }
      ]
    }
  }
}


#5.2.1.4 Movies were ’Harrison Ford’ played,
GET _search
{
  "query": {
    "match_phrase": {
      "fields.actors": "Harrison Ford"
    }
  }
}


#5.2.1.5 Movies were ’Harrison Ford’ played with a plot containing ’Jones’,
GET _search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "fields.actors": "Harrison Ford"
          }
        },
        {
          "match": {
            "fields.plot": "Jones"
          }
        }
      ]
    }
  }
}


#5.2.1.6 Movies were ’Harrison Ford’ played with a plot containing ’Jones’ but plots without containing
#’Nazis’
GET _search
{
  "query": {
    "bool": {
      "must": [
        {
          "match_phrase": {
            "fields.actors": "Harrison Ford"
          }
        },
        {
          "match_phrase": {
            "fields.plot": "Jones"
          }
        }
      ],
      "must_not": {
        "match": {
          "fields.plot": "Nazis"
        }
      }
    }
  }
}


#5.2.1.7 Movies of ’James Cameron’ which rank is better than 1000 (boolean + range query)
GET _search
{
  "query": {
    "bool": {
      "must": [
        {
          "match_phrase": {
            "fields.directors": "James Cameron"
          }
        },
        {
          "range": {
            "fields.rank": {
              "lt": 1000
            }
          }
        }
      ]
    }
  }
}


#5.2.1.8 Movies of ’James Cameron’ which rating must be higher than 5
GET _search
{
  "query": {
    "bool": {
      "must": [
        {
          "match_phrase": {
            "fields.directors": "James Cameron"
          }
        }
      ],
      "must_not": {
        "range": {
          "fields.rating": {
            "gt": 5
          }
        }
      }
    }
  }
}




#5.2.1.9 Movies of ’James Cameron’ which rating must be higher than 5 and which genre must not be
#’Action’ nor ’Drama’
GET _search
{
  "query": {
    "bool": {
      "must": [
        {
          "range": {
            "fields.rating": {
              "gte": 5
            }
          }
        },
        {
          "match_phrase": {
            "fields.directors": "James Cameron"
          }
        }
      ],
      "must_not": [
        {
          "match": {
            "fields.genres": "Action"
          }
        },
        {
          "match": {
            "fields.genres": "Drama"
          }
        }
      ]
    }
  }
}


#5.2.1.10 Movies of ’J.J. Abrams’ which was released between 2010 and 2015 (filtered query)
GET _search
{
  "query": {
    "bool": {
      "must": {
        "match": {
          "fields.directors": "J.J. Abrams"
        }
      },
      "filter": {
        "range": {
          "fields.release_date": {
            "from": "2010-01-01",
            "to": "2015-12-31"
          }
        }
      }
    }
  }
}

#5.2.2 Aggregate queries
#5.2.2.1 Give for each year the number of movies,
#size:0 pertmet de n'afficher que ce qu'on veut
GET /movies/_search
{
  "size":0,
  "aggs": {
    "nb_per_year": {
      "terms": {
        "field": "fields.year"
        , "size": 100
      }
    }
  }
}

#5.2.2.2 For each category, give the number of movies,
GET _search
{
  "size":0,
  "aggs": {
    "grouppedByType": {
      "terms": {
        "field": "fields.genres.keyword"
        , "size": 100
      }
    }
  }
}

#5.2.2.3 Give the terms occurrences extracted from each movie’s title,
PUT movies/movie/_mapping
{
  "properties": {
    "fields.title": {
      "type": "text",
      "fielddata": true
    }
  }
}
GET _search
{
  "size":0,
  "aggs": {
    "grouppedByTitleKeywords": {
      "terms": {
        "field": "fields.title"
      }
    }
  }
}


#5.2.2.4 Give the average rating of movies,
GET _search
{
  "size":0,
  "aggs": {
    "avg_rate": {
      "avg": {
        "field": "fields.rating"
      }
    }
  }
}

#5.2.2.5 Give the average rating of Georges Lucas’ movies,
GET _search
{
  "query": {
    "bool": {
      "must": {
        "match_phrase": {
          "fields.directors": "George Lucas"
        }
      }
    }
  },
  "size": 0,
  "aggs": {
    "avg_rate": {
      "avg": {
        "field": "fields.rating"
      }
    }
  }
}



#5.2.2.6 Give the average rating per genre,
GET _search
{
  "size": 0,
  "aggs": {
    "grouppedByType": {
      "terms": {
        "field": "fields.genres.keyword"
      },
      "aggs": {
        "avg_rate": {
          "avg": {
            "field": "fields.rating"
          }
        }
      }
    }
  }
}

#5.2.2.7 Give min, max and average rating for each genre,
GET _search
{
  "size": 0,
  "aggs": {
    "grouppedByType": {
      "terms": {
        "field": "fields.genres.keyword"
      },
      "aggs": {
        "avg_rate": {
          "avg": {
            "field": "fields.rating"
          }
        },
        "max_rate": {
          "max": {
            "field": "fields.rating"
          }
        },
        "min_rate": {
          "min": {
            "field": "fields.rating"
          }
        }
      }
    }
  }
}


#5.2.2.8 Give average movie’s rank and average movie’s rating for each director. Sort the result decreasingly,
GET _search
{
  "size": 0,
  "aggs": {
    "grouppedByDirector": {
      "terms": {
        "field": "fields.directors.keyword"
        ,"size": 100000
      },
      "aggs": {
        "avg_rate": {
          "avg": {
            "field": "fields.rating"
          }
        },
        "avg_rank": {
          "avg": {
            "field": "fields.rank"
          }
        },
        "sort_result": {
          "bucket_sort": {
            "sort": {
              "avg_rate": {
                "order": "desc"
              }
            }
          }
        }
      }
    }
  }
}
#ou bien 
GET _search
{
  "size": 0,
  "aggs": {
    "grouppedByDirector": {
      "terms": {
        "field": "fields.directors.keyword",
        "size": 10000,
        "order": {
          "avg_rate": "desc"
        }
        
      },
      "aggs": {
        "avg_rate": {
          "avg": {
            "field": "fields.rating"
          }
        },
        "avg_rank": {
          "avg": {
            "field": "fields.rank"
          }
        }
      }
    }
  }
}


#5.2.2.9 Count the number of movies for the given ranges: 0-1.9, 2-3.9, 4-5.9...),
GET _search
{
  "size": 0, 
  "aggs": {
    "group_range": {
      "range": {
        "field": "fields.rating",
        "ranges": [
          {
            "from": 0,
            "to": 1.9
          },
          {
            "from": 2,
            "to": 2.9
          },
          {
            "from": 3,
            "to": 3.9
          },
          {
            "from": 4,
            "to": 4.9
          },
          {
            "from": 5,
            "to": 5.9
          },
          {
            "from": 6,
            "to": 6.9
          },
          {
            "from": 7,
            "to": 7.9
          },
          {
            "from": 8,
            "to": 8.9
          },
          {
            "from": 9,
            "to": 9.9
          },
          {
            "from": 10,
            "to": 10.9
          }
        ]
      }
    }
  }
}


#5.2.2.10 Most significant terms in plots of Georges Lucas movies,
PUT movies/movie/_mapping
{
  "properties": {
    "fields.plot": {
      "type": "text",
      "fielddata": true
    }
  }
}
GET _search
{
  "query": {
    "match_phrase": {
      "fields.directors": "George Lucas"
    }
  },
  "size": 0,
  "aggs": {
    "terms_significatifs": {
      "significant_terms": {
        "field": "fields.plot"
      }
    }
  }
}


#5.2.2.11 Number of distinct directors in adventures movies,
PUT movies/movie/_mapping
{
  "properties": {
    "fields.directors": {
      "type": "text",
      "fielddata": true
    }
  }
}
GET _search
{
  "query": {
    "match_phrase": {
      "fields.genres": "Adventure"
    }
  },
  "size": 0,
  "aggs": {
    "nb_distinct": {
      "cardinality": {
        "field": "fields.directors.keyword"
      }
    }
  }
}