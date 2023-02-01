
class ValidationError extends Error {
    constructor(message) {
        super(message)
        this.name = "ValidationError"
        this.status = 400
    }
}

class RegistrationConflictError extends Error {
    constructor(message) {
        super(message)
        this.name = "RegistrationConflictError"
    }
}

function ConflictError(status, message) {
    const err = new RegistrationConflictError(message)
    err.status = status
    return err
}

class LoginAuthError extends Error {
    constructor(message) {
        super(message)
        this.name = "LoginAuthError"
    }
}

function AuthError(status, message) {
    const err = new LoginAuthError(message)
    err.status = status
    return err
}

module.exports = {
    ConflictError,
    AuthError,
    ValidationError
};