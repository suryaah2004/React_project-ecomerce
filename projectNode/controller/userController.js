import Schemaa from '../model/schemaModel.js'
import bcrypt from 'bcrypt'

// user register

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existEmail = await Schemaa.findOne({ email });
    if (existEmail) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Schemaa.create({
      name,
      email,
      password: hashedPassword,
      isActive: true   
    });

    return res.status(201).json({
      message: "Registration completed",
      newUser,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



//login

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'required all fields' })
        }
        const Users = await Schemaa.findOne({ email })
        if (!Users) {
            return res.status(402).json({ message: 'account not found, you have to register' })
        }

        const UsersPassword = await bcrypt.compare(password, Users.password)
        if (!UsersPassword) {
            return res.status(409).json({ message: 'invalid password' })
        }

        if (!Users.isActive) {
            return res.status(403).json({
                success: false,
                message: "Your account is disabled. Contact admin.",
            });
        }

        req.session.User = {
            Users_id: Users._id,
            name: Users.name,
            role: Users.role
        }
        return res.status(200).json({ message: 'successfully logined', _id: Users._id, name: Users.name, email: Users.email, role: Users.role, address: Users.address })
    }
    catch (error) {
        console.log(error)
    }
}

// update user

export const update = async (req, res) => {
    console.log("update");

    try {
        const userId = req.params.id;
        const { name, email, address, age, gender } = req.body;

        const updateUser = await Schemaa.findByIdAndUpdate(
            userId,
            { name, email, age, gender, address },
            { new: true, runValidators: true }
        );

        if (!updateUser) {
            return res.status(404).json({ message: "User does not exist" });
        }
        req.session.user = {
            user_id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
        };

        req.session.save(() => {
            return res.json({
                message: "User updated successfully",
                user: updateUser
            });
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};

//logOut

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Logout failed");
        }

        res.clearCookie('connect.sid');

        res.send("Logged out successfully");
    });
}