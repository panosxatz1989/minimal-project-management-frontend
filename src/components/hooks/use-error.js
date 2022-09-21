const useError = function(code) {
    if (!code) return ''
    let message = ''
    switch (code) {
        case 'auth/wrong-password':
            message = 'Invalid credentials provided.'
            break
        case 'auth/too-many-requests':
            message = 'Too many login requests attempted. Try again later.'
            break
        case 'auth/email-already-in-use':
            message = 'Email already taken.'
            break
        case 'auth/weak-password':
            message = 'Password is weak.'
            break
        default:
            message = 'An error occured. Try again later.'
            break
    }

    return message
}

export default useError