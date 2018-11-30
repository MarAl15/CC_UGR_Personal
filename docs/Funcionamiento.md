# FUNCIONAMIENTO
## Funcionamiento del servicio

El servicio desarrollado consiste en un programa en nodejs que hace uso del nodo [Express](https://expressjs.com/es/) para que tenga la funcionalidad de un server y pueda devolver un JSON si accedemos a la ruta raíz de la aplicación mediante un explorador.

Su uso es muy simple, se le añaden al servidor las distintas peticiones HTTP junto con su ruta y cuando son activadas se ejecuta el código asociado. Por ejemplo:

```javascript
//Add a new issue for the id
app.post('/issue', function(req,res){

    iss.addIssue(req.body.id, req.body.issue);
    res.status(201); //Resource created
    res.send("added");

});
```
Esta función responde a la peticion POST a la ruta `/issue` y extrae los parámetros id e issue y los envía a la clase encargada.

## Funcionamiento de IssueManager

Esta clase es la encargada de gestionar los issues, de momento se guardan en un map con clave *usuario* y valor *array_issues* y tiene los métodos necesarios para añadir, consultar y eliminar issues. Un ejemplo de añadir issue:

```javascript
IssueManager.prototype.addIssue = function(id, issue ){
	//If the id is new
	if( this.issues.has(id))
		this.issues.get(id).push(issue);
	else
		this.issues.set(id,[issue]);

};
```
