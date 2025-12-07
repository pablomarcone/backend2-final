import passport from 'passport';

export const currentAuth = passport.authenticate('current', {
    session: false,
    failureRedirect: '/api/sessions/current_error'
});


export const roleAuth = (roles = []) => {
    return (req, res, next) => {

        if (!Array.isArray(roles)) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json({ error: `Error en la configuración de roles` })
        }
        roles = roles.map(r => r.toLowerCase())

        if (!req.user || !req.user.role) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(401).json({ error: `Token no válido o inexistente` })
        }

        if (!roles.includes(req.user.role.toLowerCase())) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(403).json({ error: `Privilegios insuficientes` })
        }

        return next()
    }
}