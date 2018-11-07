import {InMemoryDbService} from 'angular-in-memory-web-api';
import {User} from '../value-types/User';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const user: User[] = [
      {username: 'admin', email: 'admin@sample.com', password: '123abc', discordId: 'admin#0001', id: 0},
      {username: 'user', email: 'user@sample.com', password: 'abc123', discordId: 'user#0001', id: 1}
    ];
    return {user};
  }
}
