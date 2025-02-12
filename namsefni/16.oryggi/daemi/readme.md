# Öryggis dæmi

Þessi dæmi gera ráð fyrir því að:

* postgres keyri á `localhost`
* eigi gagnagrunn sem heitir `vef2-sql`
* gagnagrunnur hafi töfluna `texts` og `students` skilgreindar í `schema.sql`
  * `psql vef2-sql < schema.sql`
* notandinn `vef2-user` hafi les og skrif aðgang

Til að fá þetta allt til að virka er hægt að nota CLI tól (gert ráð fyrir að skipanir séu keyrðar í _þessari_ möppu):

```bash
createdb vef2-sql
psql vef2-sql < schema.sql
psql vef2-sql < user.sql
```

Eða nota pgAdmin4.
