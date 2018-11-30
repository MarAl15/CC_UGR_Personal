# Desarrollo de la aplicación
## Creación del bot

- Se ha creado un clase IssueManager la cual es la encargada de gestionar los issues de los usuarios. Su código se encuentra en este [archivo](../IssueManager.js).

- El servico creado responderá a peticiones REST para enviar y consultar issues.
- Responde a una petición GET para la ruta `issue/id` donde el id es el usuario. Devuelve un JSON con la cantidad de issues y después todos los issues.
- Responde a una petición POST para la ruta `issue` con parámetros *id* (usuario) e *issue*(string del issue).
- Responde a una petición DELETE para la ruta `issue` con parámetros *id* (usuario) e *issue*(id del issue).
- El código del servicio se encuentra [aquí](../IssueService.js).
