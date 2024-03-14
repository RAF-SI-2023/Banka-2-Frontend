
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
    privateClient: '/users/public/private-client',
    corporateClient: '/users/public/corporate-client',
    passwordActivation: '/users/public',
    updatePrivateClient: '/users/updatePrivateClient',
    updateEmployee: '/users/updateEmployee',
    updateCorporateClient: '/users/updateCorporateClient',
    deactivateEmployee: '/users/deactivateEmployee',
    changePasswordSubmit: '/users/changePasswordSubmit',
    activateEmployee: '/users/activateEmployee',
    changePassword: '/users/changePassword',
  },
  accounts: {
    createAccountForeign: '/accounts/create-account/foreign',
    createAccountDomestic: '/accounts/create-account/domestic',
    codeConfirmation: '/accounts/code-confirmation',
    associateProfileInit: '/accounts/associate-profile-initialization',
  }
}
