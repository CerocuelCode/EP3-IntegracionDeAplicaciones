const User = require('../models/User')

exports.crearUsuario = async (req, res) => {
    try {
        
        const { nombres, apellidos, email, password } = req.body;

        
        if (!nombres || !apellidos || !email || !password) {
            return res.status(400).json({ message: 'Faltan campos requeridos: nombres, apellidos, email, password.' });
        }

        
        const usuarioExistente = await User.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'El correo ya está en uso.' });
        }

        
        const user = new User({
            nombres,
            apellidos,
            email,
            password: await new User().encryptPassword(password)  
        });

        await user.save();  

        
        res.json({
            message: 'Usuario creado exitosamente.',
            user: {
                id: user._id,
                nombres: user.nombres,
                apellidos: user.apellidos,
                email: user.email,
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en la creación del usuario.');
    }
};

exports.obtenerUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Se requieren ambos campos: email y password.' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'El usuario no existe.' });
        }

        const validPassword = await user.validatePassword(password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta.' });
        }

        res.json({
            message: 'Inicio de sesión exitoso.',
            user: {
                id: user._id,
                nombres: user.nombres,
                apellidos: user.apellidos,
                email: user.email
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al iniciar sesión.');
    }
};
