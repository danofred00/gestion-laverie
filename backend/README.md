# Backend
Ce dossier contient tout le backend de notre application. Il est code en `Java` et nous utilisont le framework `Spring Boot`.

### Sommaire:
1. [Pre-requis](#pre-requis)
2. [Lancement](#lancement)


## Pre-requis

Pour lancer ce projet, vous devez :
- Installer Mysql (min version 8.2) dans votre ordinateur
- Copier le fichier `.env.example` et coller le au nom de `.env` dans le dossier `src/main/resources`, ensuite vous devez le remplir comme suit

```bash
# Par default c'est root 
DATABASE_USERNAME=your_db_user

# Laisse vide s'il n y a pas de password
DATABASE_PASSWORD=your_password

# You should replace :
#   -> your_host by your host (Ex: localhost)
#   -> your_port by your mysql port (Ex: 3306)
#   -> db_name by the name of the database used by the project (Ex: gestion_laverie_db)
DATASOURCE_URL=jdbc:mysql://your_host:your_port/db_name
```
- Assurez vous aussi de n'avoir aucun service qui tourne sur votre port `8080`

> Note: Assurez vous d'avoir creer la base de donnees, et que votre utilisateur possede tous les droits d'access avant de lancer ce projet.

## Lancement
Pour installer toutes les dependances au projet et le lancer proprement, une fois que tous les pre-requis sont satisfait, alors vous devez lancer la commande suivante: 

```ps
    $ ./gradlew bootRun
```