<img  align="left" width="150" style="float: left;" src="https://www.upm.es/sfs/Rectorado/Gabinete%20del%20Rector/Logos/UPM/CEI/LOGOTIPO%20leyenda%20color%20JPG%20p.png">
<img  align="right" width="150" style="float: right;" src="https://miriadax.net/miriadax-theme/images/custom/logo_miriadax_new.svg">

<br/><br/><br/>
# Módulo 8: Websockets, protocolo y aplicaciones - Entrega P2P: Creación de un chat con socket.io

Versión: 15 de Febrero

## Objetivos
 
 - Entender el funcionamiento de los WebSockets

 - Utilizar la librería socket.io

## Descripción de la práctica

Esta práctica consiste en completar una aplicación web de chat implementada utilizando socket.io. Se proporciona un cliente web completo que contiene la interfaz web del chat y que gestiona el envío de mensajes de los usuarios. Se proporciona también un servidor web que reenvía los mensajes de cada cliente para que todos los participantes del chat los reciban. Sin embargo, este servidor está incompleto ya que le faltan una serie de funcionalidades implementadas en el cliente. El alumno debe completar el código de servidor para soportar todas las funcionalidades que ofrece el cliente.

## Instalación

 - Descargar el repositorio
	```
	git clone https://github.com/sonsoleslp/MOOC_node_mod8-Servidor_socket.io_entrega
	```
 - Acceder al directorio del proyecto:
 	```
	cd MOOC_node_mod8-Servidor_socket.io_entrega
 	```
 - Instalar las dependencias
 	```
 	npm install
 	```
El fichero `index.js` contiene el codigo del servidor web. En la carpeta `public` están todos los ficheros asociados al cliente, siendo el más relevante el fichero `index.html`, ya que en él se implementa toda la lógica asociada al cliente de chat. Sólo es necesario que el alumno realice modificaciones en el fichero `index.js`.

## Mensajes 

Todos los mensajes que se envían o reciben en la aplicación de chat se listan en la siguiente tabla:


| Nombre del tipo de mensaje | ¿Quién lo envía?           | Contenido                                                                                                            | Cuándo se envía                                                                               | Resultado                                                                                                                                                  |
|----------------------------|----------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `connect`                    | Servidor (automáticamente) | Ninguno                                                                                                              | Automáticamente cuando el cliente se ha conectado correctamente al servidor                   | El cliente recibe este mensaje y anuncia en el chat "You have just joined the chat"                                                                        |
| `connection`                 | Cliente (automáticamente)  | Nombre de usuario                                                                                                    | Automáticamente cuando un cliente se conecta                                                  | El servidor recibe este mensaje y recoge el nombre del participante y avisa a los demás de que hay un participante nuevo mediante un mensaje "new_member"  |
| `chat_message_sent`          | Cliente                    | ```{ content: "mensaje escrito por el usuario" }```                                                                        | Cuando el usuario hace click en el botón "Send"                                               | El servidor recibe este mensaje y lo reenvía a todos los participantes mediante un mensaje "chat_message_received"                                         |
| `chat_message_received`      | Servidor                   | ```{ content: "mensaje escrito por el usuario",  user: "nombre del usuario emisor",  from: "identificador del emisor" }``` | Cuando el servidor recibe un mensaje del tipo "chat_message_sent"                             | El cliente recibe este mensaje y añade el contenido a la interfaz del chat junto al nombre de quién lo ha enviado                                          |
| `new_member`                 | Servidor                   | ```{ user: "nombre del usuario emisor", from: "identificador del emisor", counter: "nº de personas en el chat" }```                                              | Cuando el servidor recibe una nueva conexión mediante el mensaje "connection"                 | El cliente recibe este mensaje y anuncia en el chat el nombre del participante nuevo                                                                       |
| `member_exit`                | Servidor                   | ```{ user: "nombre del usuario emisor", from: "identificador del emisor", counter: "nº de personas en el chat" } ```                                             | Cuando el servidor detecta que un cliente se ha desconectado mediante el mensaje "disconnect" | El cliente recibe este mensaje y anuncia en el chat el nombre de participante que se ha dado de baja                                                       |
| `disconnect`                 | Cliente (automáticamente)  | Ninguno                                                                                                              | Automáticamente cuando un cliente se desconecta                                               | El servidor recibe este mensaje y recoge el nombre del participante y avisa a los demás de que hay un participante menos mediante un mensaje "member_exit" |
| `confetti_thrown`            | Cliente                    | Ninguno                                                                                                              | Cuando el usuario hace click en el icono de confetti junto al botón de "Send"                 | El servidor recibe este mensaje y lo reenvía a todos los participantes mediante un mensaje "confetti_received"                                             |
| `confetti_received`          | Servidor                   | ```{ user: "nombre del usuario emisor", from: "identificador del emisor" } ```                                             | Cuando el servidor recibe un mensaje del tipo "confetti_thrown"                               | El cliente recibe este mensaje y desencadena una animación de confetti en el chat para todos los participantes                                             |


## Tareas

Como se ha mencionado, el fichero `index.js` está incompleto ya que le falta implementar una serie de funcionalidades. El alumno debe completar dichas funcionalidades, las cuales se indican a continuación:

 * **Contador de participantes**: El cliente web recibe los mensajes `new_member` y `member_exit` cuando un participante se conecta/desconecta y muestra el nº de participantes actualizado en el chat. Ahora mismo siempre muestra 0 porque el servidor no le está informando de cuantos participantes hay. El alumno debe modificar el fichero `index.js` para incluir la información necesaria en los mensajes de  `new_member` y `member_exit`. El alumno debe crear una variable global en la que se almacene el nº de participantes en cada momento, incrementándo esta cuenta o decrementándola cada vez que un cliente se conecte/desconecte.

 * **Confetti**: En la interfaz web hay un botón con un icono de confetti que emite un mensaje del tipo `confetti_thrown`. Sin embargo, la animación de confetti no se desencadena hasta que el servidor web le envía al cliente el evento `confetti_received`. El alumno debe modificar el fichero `index.js` para que cada vez que el servidor reciba un mensaje del tipo `confetti_thrown`, éste envíe un mensaje `confetti_received` a todos los participantes, incluyendo en el contenido del mensaje las variables `user` y `from` tal y como se indica en la tabla anterior, similar a cómo se lleva a cabo en el mensaje `new_member`.


## Entrega de la práctica

El alumno debe subir un fichero comprimido ZIP incluyendo todos los ficheros de la práctica excepto el directorio `node_modules` (si existe).

## Evaluación de la práctica

La evaluación de la práctica se realizará mediante revisión por pares (P2P). Cada alumno tendrá que revisar la práctica de 3 de sus compañeros y otros 3 revisarán la suya. 

El objetivo de este curso es sacar el máximo provecho al trabajo que están dedicando, por lo que les recomendamos que utilicen la evaluación para ayudar a sus compañeros enviando comentarios sobre la corrección del código, su claridad, legibilidad, estructuración y documentación. 

Dado que es un curso para principiantes, ante la duda les pedimos que sean benevolentes con sus compañeros, porque muchos participantes están empezando y los primeros pasos siempre son difíciles.

**OJO! Una vez enviada la evaluación, está no se puede cambiar.** Piensen bien su evaluación antes de enviarla.

**RÚBRICA:** Se puntuará el ejercicio a corregir sumando el % indicado a la nota total si la parte indicada es correcta:

* **50%:** La funcionalidad de contar participantes funciona correctamente
* **50%:** La funcionalidad de lanzar confetti funciona correctamente


