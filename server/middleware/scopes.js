const jwtAuthz = require('express-jwt-authz');

const teacherScopes =  jwtAuthz([
        'create:refreshrs',
        'read:refreshrs',
        'update:refreshrs',
        'delete:refreshrs',
        'create:questions',
        'read:questions',
        'update:questions',
        'delete:questions',
        'create:classes',
        'read:classes',
        'update:classes',
        'delete:classes',
        'create:students',
        'read:students',
        'update:students',
        'delete:students',
      ])

      module.exports = teacherScopes