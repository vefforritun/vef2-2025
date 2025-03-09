---
title: GraphQL
---

## GraphQL

### Vefforritun

### Ólafur Sverrir Kjartansson, [osk@hi.is](mailto:osk@hi.is)

---

## GraphQL—Graph Query Language

* [GraphQL er Query mál](https://graphql.org/) þróað hjá Facebook kringum 2012
* Núna þróað áfram af [GraphQL foundation](https://foundation.graphql.org/)
* Að vissu leiti svar við hversu erfitt það getur verið að sækja nákvæmlega þau gögn sem við þurfum með REST

***

> GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.

***

* Með REST þurfum við mörg request til að nálgast margar auðlindir (resources)
* Með GraphQL getum við sótt margar auðlindir í einu request

***

## Týpur

* GraphQL byggir á týpum og reitum (types & fields), ekki endapunktum
* Server skilgreinir nákvæmlega hvaða gögn eru í boði, hvert form þeirra er, og af hvaða týpu

***

* Client útbýr GraphQL fyrirspurn sem velur týpur og reiti undir þeim
* Sendum query (og breytur) á slóð GraphQL servers með `GET` eða `POST` (fer eftir uppsetningu)
* Fáum til baka gögn á JSON formi sem passa við fyrirspurn

***

```graphql
query HeroNameAndFriends {
  hero {
    name
    friends {
      name
    }
  }
}
```

Öll dæmi á graphql.org (og verkefni 6) nota GraphQL útgáfu af [SWAPI—Star Wars Api](https://swapi.dev/).

***

```json
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        { "name": "Luke Skywalker" },
        { "name": "Han Solo" },
        { "name": "Leia Organa" }
      ]
    }
  }
}
```

***

## Query

* Query getur sótt gögn sem skilgreind eru á rót (e. root) GraphQL servers
  * Þessi gögn eru í langflestum tilfellum annað hvort listar eða stök (sem við sækjum eftir ID)

***

## Fragments

* Ef við erum að sækja sömu gögnin oft í mismunandi samhengi, þá getum við útbúið _fragment_
* Fragment skilgreinir hvaða fields á type við viljum velja

***

```graphql
fragment char on Character {
  name
  appearsIn
  friends {
    name
  }
}

query heroAndFriends {
  hero {
    ...char
    friends {
      ...char
    }
  }
} 
```

***

```json
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ],
      "friends": [
        { "name": "..." }
      ]
    }
  }
}
```

***

## Arguments

* Query geta átt sér argument, bæði sem verður að senda inn (merkt með `!`) eða ekki
  * Annað hvort scalar type eða skilgreind type í schema (sjá að neðan)
* Sendum gildi á query arguments sem _variables_ með query, á JSON formi
* Reitir (e. fields) geta líka tekið við arguments

***

```graphql
query luke {
  human(id: "1000") {
    name
    height(unit: FOOT)
  }
}
```

```json

  "data": {
    "human": {
      "name": "Luke Skywalker",
      "height": 5.6430448
    }
  }
}
```

***

```graphql
query HeroNameAndFriends($episode: Episode) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

Variables:

```json
{
  "episode": "JEDI"
}
```

***

Result:

```json
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        { "name": "Luke Skywalker" },
        { "name": "Han Solo" },
        { "name": "Leia Organa" }
      ]
    }
  }
}
```

***

## Inline fragments

* Gögnum sem er skilað geta verið _interface_ eða _union type_, þ.a. mismunandi reitir eru í boði
* Getum notað _inline fragment_ til að velja reiti útfrá hverju er skilað

***

```graphql
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    ... on Droid {
      primaryFunction
    }
    ... on Human {
      height
    }
  }
}
```

Variables:

```json
{ "ep": "EMPIRE" }
```

***

Result:

```json
{
  "data": {
    "hero": {
      "name": "Luke Skywalker",
      "height": 1.72
    }
  }
}
```

***

## Meta fields

* Við getum skoðað með introspection hvað er í boði á GraphQL server
* Mest notað er e.t.v. `__typename` sem er í boði á öllum fields
  * Gefur okkur nafn á type sem er skilað

***

```graphql
{
  search(text: "an") {
    __typename
    ... on Human {
      name
    }
    ... on Droid {
      name
    }
    ... on Starship {
      name
    }
  }
}
```

***

Result:

```json
{
  "data": {
    "search": [
      { "__typename": "Human",
        "name": "Han Solo" },
      { "__typename": "Human",
        "name": "Leia Organa" },
      { "__typename": "Starship",
        "name": "TIE Advanced x1" }
    ]
  }
}
```

***

## Mutations

* Ef við viljum ekki bara sækja gögn heldur líka breyta þeim, þá notum við _mutation_
* Búum til `mutation`, ekki `query` og tilgreinum argument
* Sendum inn gögn sem JSON og fáum til baka það sem við veljum
* [Nánar í skjölun](https://graphql.org/learn/queries/#mutations)

---

## Schema og týpur

* GraphQL skilgreinir í schema hvaða týpur og reitir eru í boði
* Getum búið til okkar eigin týpur sem vísa í aðrar týpur, enda alltaf á _scalar týpum_ fyrir gögn

***

## Scalar týpur

* `Int`, signed 32 bita
* `Float`, signed double-precision
* `String`, UTF-8
* `Boolean`, `true` eða `false`
* `ID`, eins og string, en ekki ætlað að vera human-readable

***

## Okkar eigin GraphQL þjónn

* Ef við ætlum að útfæra okkar eigin GraphQL þjón þurfum við að [hugsa gögnin okkar sem graf](https://graphql.org/learn/thinking-in-graphs/)
* Node.js pakkar sem er mælt með eru [`express-graphql`](https://github.com/graphql/express-graphql) eða [`apollo-server`](https://github.com/apollographql/apollo-server)

***

## GraphiQL

* GraphiQL er GraphQL IDE þar sem við getum skoðað allt schema, týpur og fields
* Mjög oft sett upp meðfram GraphQL þjóni
* [Sett upp fyrir SWAPI GraphQL](https://graphql.org/swapi-graphql/)

---

## Pagination

* Þegar við erum að vinna með lista af gögnum [skilgreinir GraphQL best practices fyrir pagination](https://graphql.org/learn/pagination/)
* Notar _cursor-based_ pagination, fáum vísun í stak og biðjum um stök fyrir eða eftir því
* Skilgreinir `pageInfo` týpu sem segir til um stöðu á pagination
