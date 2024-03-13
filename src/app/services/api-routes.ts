
export const ApiRoutes = {
  auth: {
    login: '/auth/login',
    activateEmployee: '/auth/activate-employee',
    allPermissions: '/permissions/all',
    allRoles: '/roles/all',
  },
  users: {
    users: '/users',
    findById: '/users/findById',
    findByEmail: '/users/findByEmail',
    findAll: '/users/findAll',
    delete: '/users/delete',
    updatePrivateClient: '/users/updatePrivateClient',
    updateEmployee: '/users/updateEmployee',
    updateCorporateClient: '/users/updateCorporateClient',
    deactivateEmployee: '/users/deactivateEmployee',
    changePasswordSubmit: '/users/changePasswordSubmit',
    activateEmployee: '/users/activateEmployee',
    changePassword: '/users/changePassword',
  }
}
