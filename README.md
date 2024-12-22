# myESIEA - Projet final Virtualisation-Conteneurisation

## Membres de l'équipe
- CHEN Lorie (TD46)
- DOSSA Cynthia (TD44)
- LIM Réléna (TD44)
- PHAM Vanessa (TD45)

---

myESIEA est une application web permettant de gérer l'école (élèves, professeurs, matières, notes et classes). \
Cette application utilise :
- **React** pour le Front-end
- **Node.js (Express.js)** pour le Back-end
- **MongoDB** pour la base de données
- **Docker** pour conteneuriser l'application

---

## 1 - Prérequis pour exécuter le projet

Assurez-vous d'avoir [Docker Desktop](https://www.docker.com/products/docker-desktop/), [Node](https://nodejs.org/fr), [MongoDB](https://www.mongodb.com/try/download/community) et MongoDB Compass installés sur votre machine. \
En installant MongoDB, l'installateur vous demandera si vous voulez installer **MongoDB Compass**. Cliquez sur **Oui**. Cela prendra un peu de temps. \
Dans MongoDB Compass, ajoutez une **nouvelle connexion** et cliquez sur **Save & Connect** en laissant l'URI telle quelle.

![image](https://github.com/user-attachments/assets/f21d5e2a-ee7c-411c-9c69-b2d683f7b666)
![image](https://github.com/user-attachments/assets/29e92dc8-a6bb-4992-8bee-f2933739cf16)

## 2 - Exécution du projet

1. Clonez le projet :
```
git clone https://github.com/Poukiie/esiea-virtu-project.git
cd esiea-virtu-project
```

2. Construisez les images Docker :
```
docker-compose build
```

3. Lancez l’application :
```
docker-compose up
```

4. Ouvrez http://localhost:3000 sur votre navigateur

## 3 - Liste des endpoints de l'API
Vous pouvez consulter, créer, modifier et supprimer des éléments. \
Pour les notes et les classes, vous pouvez consulter toutes les notes d'un élève spécifique, ainsi que lister les élèves d'une classe spécifique.

- **Elèves**
  - Create (POST) : http://localhost:3001/students
  - Read All (GET) : http://localhost:3001/students
  - Read (GET) : http://localhost:3001/students/{student-id}
  - Update (PUT) : http://localhost:3001/students/{student-id}
  - Delete (DELETE) : http://localhost:3001/students/{student-id}
  
- **Professeurs**
  - Create (POST) : http://localhost:3001/teachers
  - Read All (GET) : http://localhost:3001/teachers
  - Read (GET) : http://localhost:3001/teachers/{teacher-id}
  - Update (PUT) : http://localhost:3001/teachers/{teacher-id}
  - Delete (DELETE) : http://localhost:3001/teachers/{teacher-id}
  
- **Matières**
  - Create (POST) : http://localhost:3001/subjects
  - Read All (GET) : http://localhost:3001/subjects
  - Read (GET) : http://localhost:3001/subjects/{subject-id}
  - Update (PUT) : http://localhost:3001/subjects/{subject-id}
  - Delete (DELETE) : http://localhost:3001/subjects/{subject-id}
  
- **Notes**
  - Create (POST) : http://localhost:3001/grades
  - Read grades from student (GET) : http://localhost:3001/grades/student/{student-id}
  - Read (GET) : http://localhost:3001/grades/{grade-id}
  - Update (PUT) : http://localhost:3001/grades/{grade-id}
  - Delete (DELETE) : http://localhost:3001/grades/{grade-id}
  
- **Classes**
  - Create (POST) : http://localhost:3001/classes
  - Read students from a class (GET) : http://localhost:3001/classes/{class-id}/students
  - Read (GET) : http://localhost:3001/classes/{classe-id}
  - Update (PUT) : http://localhost:3001/classes/{classe-id}
  - Delete (DELETE) : http://localhost:3001/classes/{classe-id}

## 4 - Fonctionnalités de l’interface utilisateur
En lançant l'application, vous tomberez sur la page d'accueil. Les onglets dans la navbar vous permettent d'accéder aux autres pages.

![image](https://github.com/user-attachments/assets/b0037548-fbaa-4cca-b2bf-30bda6fe8424)

### Ajout et liste des éléments

Sur la page permettant de gérer les élèves, vous pouvez voir la liste des élèves.
Ajoutez un élève ouvrira un modal d'ajout :

![image](https://github.com/user-attachments/assets/ae8736b4-9366-4135-9a3f-8f7805de7625)

> Remarque : créez d'abord une **matière** et une **classe** avant d'ajouter des élèves et des professeurs. Les formulaires d'ajout pour ces deux derniers **nécessitent de sélectionner la classe** (et la matière enseignée, pour le professeur). Il faut donc en avoir créé au préalable.

### Recherche

Sur chaque page, vous avez également la possibilité de rechercher des éléments.

![image](https://github.com/user-attachments/assets/4c2e5a3f-8620-4d03-b9fb-36d4694eb407)

### Modification et suppression

Les icônes crayon et poubelle sur la card de chaque élément vous permettent de modifier ses informations ou de le supprimer. Un formulaire avec les informations pré-remplies s'ouvre pour la modification.

![image](https://github.com/user-attachments/assets/20ed7552-03df-4183-ab5d-6d7badd22b75)

### Remarques supplémentaires

Pour les notes, aucune note ne s'affichera au préalable. Vous devez sélectionnez une classe d'abord. La liste des élèves appartenant à cette classe s'affichera dans le second select.

![image](https://github.com/user-attachments/assets/19e4e356-ae39-46dc-9c72-c709182fa5d0)
![image](https://github.com/user-attachments/assets/4b47693d-c1dc-4008-accf-1fe1ecc3b47a)

Pour les classes, vous pouvez cliquer sur les cards pour les déplier et afficher leurs détails.

![image](https://github.com/user-attachments/assets/bb7d428d-9eec-4752-96ca-49c345d46c65)
