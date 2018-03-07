import { User } from './user';
import { Action } from './client-enums';

export interface Message {
    from?: User;
    content?: any;
    action?: Action;
}
