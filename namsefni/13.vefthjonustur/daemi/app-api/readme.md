# Dæmi um forrit með vefþjónustuskilum

```bash
# dropdb app-api # ef gagnagrunnur var nú þegar til
createdb app-api
# afrita .env.example og setja rétt DATABASE_URL
node createdb.js
nodemon app.js
```

Skiptum forritinu okkar upp í vel skilgreindar skrár, hver með sitt hlutverk:

- `app.js` sér um vefþjóninn okkar, sækir API skil og hengir við express app
- `api.js` útbýr API skil ofan á lógík, tengir við router og exportar
- `items.js` exportar föllum sem vinna með gögn í gagnagrunni, lógíkin í forritinu okkar
- `db.js` sér um tengingar við gagnagrunn

Til að prófa:

```bash
> curl http://localhost:3000/
[{"id":1,"title":"færsla 1","text":"texti í færslu 1"}, {"id":2,"title":"færsla 2","text":"texti í færslu 2"},{"id":3,"title":"færsla 3","text":"texti í færslu 3"},{"id":4,"title":"færsla 4","text":"texti í færslu 4"}]

> curl -X PATCH -H "Content-Type: application/json" -d '{"title": "uppfærður titill"}' http://localhost:3000/1
{"id":1,"title":"uppfærður titill","text":"texti í færslu 1"}

> curl -X PATCH -H "Content-Type: application/json" -d '{"title": "uppfærður titill"}' http://localhost:3000/10
{"error":"Item not found"}

> curl -X PATCH -H "Content-Type: application/json" -d '{"titlex": "uppfærður titill"}' http://localhost:3000/1
[{"field":"","error":"Ógild gögn"}]
```
