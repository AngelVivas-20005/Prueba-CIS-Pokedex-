# ***PokeDex - Buscador de Pokémon***



Esta aplicación es una herramienta interactiva diseñada para explorar el universo Pokémon de manera ágil y eficiente (Para efectos de la prueba solo las primeras dos generaciones). A través de una interfaz moderna y fluida, los usuarios pueden consultar información detallada, gestionar una lista de favoritos y navegar entre las distintas especies de Pokémon con un sistema de paginación optimizado (Con mas funciones por venir en el futuro).



## 🛠️ Tecnologías y Arquitectura



El proyecto fue construido utilizando React bajo el entorno de Vite para garantizar rendimiento y tiempos de carga mínimos. Para el diseño, usé Tailwind CSS, permitiendo una interfaz totalmente responsiva mediante un sistema de Grid y Flexbox que se adapta a cualquier dispositivo (además de los atributos de sm-md-lg-xl que permiten sectorizar las visualizaciones o tamaños según la resolución de la pantalla). La arquitectura es de tipo modular y escalable; las peticiones a la PokeAPI se centralizan en una capa de servicios independiente (PokeCall.js), mientras que los estados globales (como la lista de favoritos y el índice de navegación usado en la paginación) se gestionan mediante la Context API de React, evitando el paso de cierta información a componentes que no la necesiten y asegurando que la información sea accesible en toda la aplicación.



## ✨ Características Principales



Una de las funcionalidades destacadas es su Búsqueda Inteligente, la cual implementa expresiones regulares (Regex) para filtrar nombres e IDs en tiempo real sobre una base de datos local previamente cargada. El buscador es flexible, aceptando IDs simples o con ceros a la izquierda (ej. 1 o 001) gracias a una lógica de transformación de cadenas de la que me ayudé (padStart). Además, el sistema de paginación es dinámico: detecta el tamaño de la pantalla para mostrar controles de texto en escritorio o iconos de flechas en móviles, mejorando la usabilidad. Para optimizar la experiencia visual, se forzó un comportamiento de scroll vertical constante, evitando saltos bruscos en el diseño (o también llamado layout shift) cuando los resultados de búsqueda varían.



## 📥 Instalación y Ejecución



Estos siguientes pasos te ayudaran a instalar y ejecutar la aplicación de forma local:



1\. Abre el terminal en la carpeta que quieras clonar el repositorio: 



Bash



git clone https://github.com/AngelVivas-20005/Prueba-CIS-Pokedex-.git

cd Prueba-CIS-Pokedex-



2\. Instala las dependencias:



Bash



npm install



3\. Inicia el servidor de desarrollo:



Bash



npm run dev



4\. Abre tu navegador: Visita http://localhost:5173 (o el puerto indicado por Vite en tu terminal).

## 

## 🚀 Despliegue



La aplicación se encuentra alojada en Netlify. 



Repositorio: \[https://github.com/AngelVivas-20005/Prueba-CIS-Pokedex-]



Link de la pagina de la Pokedex: \[shiny-eclair-ed7517.netlify.app]



**Espero sea de su agrado, cualquier duda la recibo al correo con mucho gusto!!**



**Créditos: Angel Vivas**

