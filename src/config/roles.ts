const allRoles = {
  0: 'admin',
  1: 'mess',
  2: 'student',
};

// Define permissions/rights
const rights = {
  GET_STUDENTS: 'getStudents',
  MANAGE_USERS: 'manageUsers',
};

const roleRights = new Map([
  [0, [rights.GET_STUDENTS, rights.MANAGE_USERS]], // admin has all rights
  [1, [rights.GET_STUDENTS]],                      // user can view students
  [2, []],                                         // student has no special rights
]);

// Rest of your code remains same
const allsubscribe = {
  0: 'subscribe Not',
  1: '1 Month',
  2: '6 Month',
  3: '1 Year',
};

const allUserStatus = {
  0: 'inactive',
  1: 'active',
};

const allCategoryStatus = {
  0: 'inactive',
  1: 'active',
};

const subscribe = Object.keys(allsubscribe).map(Number);
const userStatus = Object.keys(allUserStatus).map(Number);
const roles = Object.keys(allRoles).map(Number);
const CategoryStatus = Object.keys(allCategoryStatus).map(Number);

export {
  roles,
  subscribe,
  userStatus,
  roleRights,
  rights,
  CategoryStatus
};
