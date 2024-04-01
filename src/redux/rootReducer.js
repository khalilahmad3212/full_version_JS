import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import blogReducer from './slices/blog';
import userReducer from './slices/user';
import productReducer from './slices/product';
import sliderReducer from './slices/slider';
import departmentReducer from './slices/department';
import myDepartmentReducer from './slices/my-department';
import calendarReducer from './slices/calendar';
import publicationsReducer from './slices/publications';
import kanbanReducer from './slices/kanban';
import organizationReducer from './slices/organization';
import programReducer from './slices/program';
import experienceReducer from './slices/experience';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout']
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  blog: blogReducer,
  user: userReducer,
  calendar: calendarReducer,
  publication: publicationsReducer,
  kanban: kanbanReducer,
  slider: sliderReducer,
  department: departmentReducer,
  myDepartment: myDepartmentReducer,
  organization: organizationReducer,
  program: programReducer,
  experience: experienceReducer,
  product: persistReducer(productPersistConfig, productReducer)
});

export { rootPersistConfig, rootReducer };
