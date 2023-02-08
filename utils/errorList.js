
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
        this.status = 409
    }
}

class LoginAuthError extends Error {
    constructor(message) {
        super(message)
        this.name = "LoginAuthError"
        this.status = 401
    }
}

function AuthError(status, message) {
    const err = new LoginAuthError(message)
    err.status = status
    return err
}

class VerificationError extends Error {
    constructor(message) {
        super(message)
        this.name = "VerificationError"
        this.status = 404
    }
}

module.exports = {
    ValidationError,
    RegistrationConflictError,
    LoginAuthError,
    AuthError,
    VerificationError
};