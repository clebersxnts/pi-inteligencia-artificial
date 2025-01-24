db.auth('root', 'senha')

exemploimagem = db.getSiblingDB('exemploimagem')

exemplimagem.createCollection('base')

exemploimagem.createUser({
  user: 'root',
  pwd: 'senha',
  roles: [
    {
      role: 'root',
      db: 'exemploimagem',
    },
  ],
});

eventosgrupo1 = db.getSiblingDB('eventosgrupo1')

eventosgrupo1.createCollection('base')

eventosgrupo1.createUser({
  user: 'root',
  pwd: 'senha',
  roles: [
    {
      role: 'root',
      db: 'eventosgrupo1',
    },
  ],
});

eventosgrupo2 = db.getSiblingDB('eventosgrupo2')

eventosgrupo2.createCollection('base')

eventosgrupo2.createUser({
  user: 'root',
  pwd: 'senha',
  roles: [
    {
      role: 'root',
      db: 'eventosgrupo2',
    },
  ],
});

eventosgrupo3 = db.getSiblingDB('eventosgrupo3')

eventosgrupo3.createCollection('base')

eventosgrupo3.createUser({
  user: 'root',
  pwd: 'senha',
  roles: [
    {
      role: 'root',
      db: 'eventosgrupo3',
    },
  ],
});

eventosgrupo4 = db.getSiblingDB('eventosgrupo4')

eventosgrupo4.createCollection('base')

eventosgrupo4.createUser({
  user: 'root',
  pwd: 'senha',
  roles: [
    {
      role: 'root',
      db: 'eventosgrupo4',
    },
  ],
});

eventosgrupo5 = db.getSiblingDB('eventosgrupo5')

eventosgrupo5.createCollection('base')

eventosgrupo5.createUser({
  user: 'root',
  pwd: 'senha',
  roles: [
    {
      role: 'root',
      db: 'eventosgrupo5',
    },
  ],
});
