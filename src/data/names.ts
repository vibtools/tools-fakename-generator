import { NameSet } from '../types';

export interface NamePool {
  maleFirst: string[];
  femaleFirst: string[];
  last: string[];
}

export const NAMES_DATA: Record<NameSet, NamePool> = {
  american: {
    maleFirst: [
      'James', 'Robert', 'John', 'Michael', 'David', 'William', 'Richard', 'Joseph',
      'Thomas', 'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark',
      'Donald', 'Steven', 'Andrew', 'Paul', 'Joshua', 'Kenneth', 'Kevin', 'Brian',
      'Timothy', 'Ronald', 'Jason', 'Edward', 'Jeffrey', 'Ryan', 'Jacob', 'Gary',
      'Nicholas', 'Eric', 'Jonathan', 'Stephen', 'Larry', 'Justin', 'Scott', 'Brandon',
      'Benjamin', 'Samuel', 'Gregory', 'Alexander', 'Frank', 'Patrick', 'Raymond',
      'Jack', 'Dennis', 'Jerry', 'Tyler', 'Aaron', 'Jose', 'Henry', 'Douglas', 'Peter'
    ],
    femaleFirst: [
      'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica',
      'Sarah', 'Karen', 'Lisa', 'Nancy', 'Betty', 'Sandra', 'Margaret', 'Ashley',
      'Kimberly', 'Emily', 'Donna', 'Michelle', 'Carol', 'Amanda', 'Melissa', 'Deborah',
      'Stephanie', 'Rebecca', 'Sharon', 'Laura', 'Cynthia', 'Kathleen', 'Amy', 'Angela',
      'Shirley', 'Anna', 'Brenda', 'Pamela', 'Emma', 'Nicole', 'Helen', 'Samantha',
      'Katherine', 'Christine', 'Debra', 'Rachel', 'Carolyn', 'Janet', 'Maria', 'Heather',
      'Diane', 'Virginia', 'Julie', 'Joyce', 'Victoria', 'Olivia', 'Kelly', 'Christina'
    ],
    last: [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
      'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
      'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
      'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
      'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
      'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell',
      'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker'
    ]
  },

  british: {
    maleFirst: [
      'Oliver', 'George', 'Harry', 'Jack', 'Jacob', 'Noah', 'Charlie', 'Muhammad',
      'Thomas', 'Oscar', 'William', 'James', 'Alfie', 'Henry', 'Leo', 'Archie',
      'Ethan', 'Alexander', 'Freddie', 'Arthur', 'Edward', 'Samuel', 'Joshua',
      'Callum', 'Connor', 'Liam', 'Finlay', 'Rhys', 'Declan', 'Owen', 'Lewis'
    ],
    femaleFirst: [
      'Olivia', 'Amelia', 'Isla', 'Ava', 'Emily', 'Isabella', 'Mia', 'Poppy',
      'Ella', 'Lily', 'Sophia', 'Grace', 'Florence', 'Freya', 'Charlotte',
      'Daisy', 'Phoebe', 'Evie', 'Ruby', 'Alice', 'Chloe', 'Imogen', 'Harriet'
    ],
    last: [
      'Smith', 'Jones', 'Taylor', 'Brown', 'Williams', 'Wilson', 'Johnson', 'Davies',
      'Robinson', 'Wright', 'Thompson', 'Evans', 'Walker', 'White', 'Roberts', 'Green',
      'Hall', 'Wood', 'Jackson', 'Clarke', 'Patel', 'Edwards', 'Hughes', 'Watson',
      'Brooks', 'Bennett', 'Woodward', 'Fletcher', 'Harrison', 'Crawford'
    ]
  },

  canadian: {
    maleFirst: [
      'Liam', 'Noah', 'William', 'Lucas', 'Oliver', 'Benjamin', 'Theodore', 'Jack',
      'Logan', 'Alexander', 'Owen', 'Ethan', 'Henry', 'Felix', 'Leo', 'Gabriel',
      'Samuel', 'Charles', 'Maxime', 'Mathieu', 'Antoine', 'Etienne', 'Olivier'
    ],
    femaleFirst: [
      'Olivia', 'Emma', 'Charlotte', 'Amelia', 'Ava', 'Chloe', 'Sophia', 'Mia',
      'Zoe', 'Mila', 'Maya', 'Florence', 'Alice', 'Lea', 'Beatrice', 'Juliette',
      'Rosalie', 'Victoria', 'Audrey', 'Abigail', 'Hannah', 'Camille'
    ],
    last: [
      'Smith', 'Brown', 'Tremblay', 'Martin', 'Roy', 'Wilson', 'MacDonald', 'Gagnon',
      'Johnson', 'Taylor', 'Cote', 'Bouchard', 'Gauthier', 'Morin', 'Lavoie',
      'Fortin', 'Campbell', 'Anderson', 'Leblanc', 'Pelletier', 'Belanger', 'Desjardins'
    ]
  },

  australian: {
    maleFirst: [
      'Oliver', 'Noah', 'Jack', 'William', 'Leo', 'Lucas', 'Thomas', 'Charlie',
      'Henry', 'Hudson', 'Harrison', 'Lachlan', 'Cooper', 'Mason', 'Archer',
      'James', 'Alexander', 'Levi', 'Liam', 'Hunter', 'Logan', 'Ethan'
    ],
    femaleFirst: [
      'Charlotte', 'Amelia', 'Isla', 'Olivia', 'Mia', 'Ava', 'Grace', 'Willow',
      'Harper', 'Chloe', 'Ruby', 'Sophie', 'Ivy', 'Matilda', 'Ella', 'Evie',
      'Zoe', 'Stella', 'Sienna', 'Audrey', 'Georgia', 'Maya'
    ],
    last: [
      'Smith', 'Jones', 'Williams', 'Brown', 'Wilson', 'Taylor', 'Morton', 'White',
      'Martin', 'Anderson', 'Thompson', 'Nguyen', 'Thomas', 'Walker', 'Harris',
      'Lee', 'Ryan', 'Robinson', 'Kelly', 'King', 'Campbell', 'O\'Connor'
    ]
  },

  german: {
    maleFirst: [
      'Maximilian', 'Alexander', 'Paul', 'Elias', 'Leon', 'Lukas', 'Felix', 'Noah',
      'Jonas', 'Finn', 'Ben', 'Luca', 'David', 'Julian', 'Philipp', 'Niklas',
      'Tim', 'Jan', 'Florian', 'Tobias', 'Sebastian', 'Stefan', 'Markus'
    ],
    femaleFirst: [
      'Emma', 'Mia', 'Hannah', 'Sophia', 'Emilia', 'Lina', 'Marie', 'Mila',
      'Lea', 'Ella', 'Clara', 'Anna', 'Lena', 'Laura', 'Sarah', 'Julia',
      'Johanna', 'Charlotte', 'Lara', 'Nele', 'Katharina', 'Franziska'
    ],
    last: [
      'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner',
      'Becker', 'Schulz', 'Hoffmann', 'Schäfer', 'Koch', 'Bauer', 'Richter',
      'Klein', 'Wolf', 'Schröder', 'Neumann', 'Schwarz', 'Zimmermann', 'Braun',
      'Krüger', 'Hofmann', 'Hartmann', 'Lange', 'Schmitt', 'Werner', 'Krause'
    ]
  },

  french: {
    maleFirst: [
      'Gabriel', 'Raphaël', 'Léo', 'Louis', 'Lucas', 'Adam', 'Arthur', 'Hugo',
      'Jules', 'Maël', 'Liam', 'Noah', 'Paul', 'Ethan', 'Tiago', 'Sacha',
      'Gabin', 'Nathan', 'Mohamed', 'Tom', 'Clément', 'Alexandre', 'Antoine'
    ],
    femaleFirst: [
      'Jade', 'Louise', 'Ambre', 'Alba', 'Emma', 'Rose', 'Alice', 'Romy',
      'Anna', 'Lina', 'Léna', 'Mia', 'Lou', 'Juliette', 'Chloé', 'Agathe',
      'Léa', 'Inès', 'Manon', 'Camille', 'Zoé', 'Éléna', 'Victoire'
    ],
    last: [
      'Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit',
      'Durand', 'Leroy', 'Moreau', 'Simon', 'Laurent', 'Lefebvre', 'Michel',
      'Garcia', 'David', 'Bertrand', 'Roux', 'Vincent', 'Fournier', 'Morel',
      'Girard', 'Andre', 'Mercier', 'Dupont', 'Lambert', 'Bonnet', 'Francois'
    ]
  },

  spanish: {
    maleFirst: [
      'Hugo', 'Mateo', 'Martín', 'Lucas', 'Leo', 'Daniel', 'Alejandro', 'Manuel',
      'Pablo', 'Álvaro', 'Adrián', 'Enzo', 'Mario', 'Diego', 'David', 'Oliver',
      'Marcos', 'Thiago', 'Marco', 'Álex', 'Javier', 'Carlos', 'Gonzalo'
    ],
    femaleFirst: [
      'Lucía', 'Sofía', 'Martina', 'María', 'Julia', 'Paula', 'Valeria', 'Emma',
      'Daniela', 'Carla', 'Alba', 'Noa', 'Lola', 'Claudia', 'Carmen', 'Sara',
      'Vega', 'Alma', 'Elena', 'Olivia', 'Inés', 'Irene', 'Valentina'
    ],
    last: [
      'García', 'Rodríguez', 'González', 'Fernández', 'López', 'Martínez', 'Sánchez',
      'Pérez', 'Gómez', 'Martín', 'Jiménez', 'Ruiz', 'Hernández', 'Díaz', 'Moreno',
      'Álvarez', 'Romero', 'Alonso', 'Gutiérrez', 'Navarro', 'Torres', 'Domínguez',
      'Vázquez', 'Ramos', 'Gil', 'Ramírez', 'Serrano', 'Blanco', 'Molina', 'Morales'
    ]
  },

  italian: {
    maleFirst: [
      'Leonardo', 'Francesco', 'Alessandro', 'Lorenzo', 'Mattia', 'Andrea', 'Gabriele',
      'Riccardo', 'Tommaso', 'Edoardo', 'Matteo', 'Giuseppe', 'Nicolo', 'Antonio',
      'Federico', 'Diego', 'Davide', 'Christian', 'Giovanni', 'Pietro', 'Filippo'
    ],
    femaleFirst: [
      'Sofia', 'Aurora', 'Giulia', 'Ginevra', 'Beatrice', 'Alice', 'Vittoria', 'Emma',
      'Ludovica', 'Matilde', 'Giorgia', 'Camilla', 'Chiara', 'Anna', 'Bianca',
      'Greta', 'Gaia', 'Martina', 'Elena', 'Sara', 'Noemi', 'Alessia'
    ],
    last: [
      'Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo',
      'Ricci', 'Marino', 'Greco', 'Bruno', 'Gallo', 'Conti', 'De Luca',
      'Costa', 'Giordano', 'Mancini', 'Rizzo', 'Lombardi', 'Moretti', 'Barbieri'
    ]
  },

  brazilian: {
    maleFirst: [
      'Miguel', 'Arthur', 'Gael', 'Heitor', 'Theo', 'Davi', 'Gabriel', 'Bernardo',
      'Samuel', 'Lucas', 'Lorenzo', 'Matheus', 'Pedro', 'Rafael', 'Enzo', 'Nicolas',
      'Guilherme', 'Felipe', 'Gustavo', 'Caio', 'Vinicius', 'Eduardo'
    ],
    femaleFirst: [
      'Helena', 'Alice', 'Laura', 'Maria Alice', 'Valentina', 'Heloisa', 'Sophia',
      'Maria Clara', 'Manuela', 'Julia', 'Isabella', 'Luiza', 'Lorena', 'Livia',
      'Cecilia', 'Beatriz', 'Mariana', 'Lara', 'Leticia', 'Carolina'
    ],
    last: [
      'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves',
      'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho',
      'Almeida', 'Lopes', 'Soares', 'Fernandes', 'Vieira', 'Barbosa', 'Rocha'
    ]
  },

  bengali: {
    maleFirst: [
      'Arif', 'Tanvir', 'Shakib', 'Rahim', 'Karim', 'Sabbir', 'Hasan', 'Mahmud',
      'Imran', 'Fahim', 'Nayeem', 'Rakib', 'Sohan', 'Tariq', 'Zubair', 'Farhan',
      'Ashiq', 'Mehedi', 'Sajjad', 'Rifat', 'Shaon', 'Nasim', 'Saiful', 'Tamim'
    ],
    femaleFirst: [
      'Nusrat', 'Sadia', 'Fatima', 'Farhana', 'Tahmina', 'Ruma', 'Ayesha', 'Jannat',
      'Sumaiya', 'Sabrina', 'Nasrin', 'Sharmin', 'Mousumi', 'Tasnim', 'Sultana',
      'Shirin', 'Rumana', 'Tania', 'Shamima', 'Afroza', 'Nabila', 'Afia'
    ],
    last: [
      'Hossain', 'Ahmed', 'Rahman', 'Chowdhury', 'Islam', 'Khan', 'Ali', 'Uddin',
      'Haque', 'Sarker', 'Bhuiyan', 'Akter', 'Begum', 'Miah', 'Talukdar', 'Das',
      'Majumder', 'Shikdar', 'Bari', 'Siddique', 'Howlader', 'Kazi', 'Mondal'
    ]
  },

  indian: {
    maleFirst: [
      'Aarav', 'Vihaan', 'Aditya', 'Reyansh', 'Arjun', 'Sai', 'Krishna', 'Ishaan',
      'Shaurya', 'Atharv', 'Rohan', 'Kabir', 'Aryan', 'Ayush', 'Dhruv', 'Kartik',
      'Rishi', 'Pranav', 'Dev', 'Manish', 'Suresh', 'Rahul', 'Amit', 'Vikram'
    ],
    femaleFirst: [
      'Saanvi', 'Aanya', 'Aadhya', 'Aaradhya', 'Ananya', 'Pari', 'Diya', 'Myra',
      'Avani', 'Isha', 'Riya', 'Sneha', 'Pooja', 'Neha', 'Priya', 'Kavita',
      'Shreya', 'Anjali', 'Deepika', 'Divya', 'Meera', 'Sunita', 'Swati'
    ],
    last: [
      'Sharma', 'Verma', 'Patel', 'Singh', 'Kumar', 'Gupta', 'Reddy', 'Joshi',
      'Mehta', 'Nair', 'Chopra', 'Malhotra', 'Bhat', 'Rao', 'Iyer', 'Menon',
      'Deshmukh', 'Mishra', 'Yadav', 'Agarwal', 'Chatterjee', 'Banerjee'
    ]
  },

  japanese: {
    maleFirst: [
      'Haruto', 'Souta', 'Yuto', 'Riku', 'Haruki', 'Kaito', 'Asahi', 'Sora',
      'Reo', 'Yuuma', 'Ren', 'Hinata', 'Itsuki', 'Minato', 'Kenji', 'Hiroshi',
      'Kazuki', 'Takumi', 'Daisuke', 'Shinji', 'Takahiro', 'Naoki'
    ],
    femaleFirst: [
      'Yui', 'Rio', 'Hina', 'Mei', 'Koharu', 'Yuna', 'Akari', 'Sara',
      'Sakura', 'Aoi', 'Himari', 'Rin', 'Mio', 'Kanna', 'Ema', 'Nanami',
      'Ayumi', 'Misaki', 'Chiyo', 'Yoko', 'Keiko', 'Tomoko'
    ],
    last: [
      'Sato', 'Suzuki', 'Takahashi', 'Tanaka', 'Watanabe', 'Ito', 'Yamamoto',
      'Nakamura', 'Kobayashi', 'Kato', 'Yoshida', 'Yamada', 'Sasaki', 'Yamaguchi',
      'Saito', 'Matsumoto', 'Inoue', 'Kimura', 'Hayashi', 'Shimizu', 'Yamazaki'
    ]
  }
};
