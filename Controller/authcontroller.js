const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/user');

const signup = async (req, res) => {
    try {
      const { username, password, role } = req.body;
      if (!username || !password || !role) {
        return res.status(400).json({ error: 'All fields are required.' });
      }
      console.log('received data', { username, password, role });
      const hashPassword = await bcrypt.hash(password, 10);
      console.log('Hashed Password: ', hashPassword);
      const newUser = new User({ username, password: hashPassword, role });
      await newUser.save();
      console.log('successful signup');
      res.status(201).json({ message: 'Successfully Registered' }); // Move it here
    } catch (error) {
      console.log('Signup error: ', error.message);
      res.status(500).json({ error: error.message });
    }
  };

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Both username and password are required.' });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_JWT, { expiresIn: '1h' });
    console.log('successfully signin');

    res.status(200).json({ message: 'Signin successful', token });
  } catch (error) {
    console.log('Signin error: ', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signup, signin };










// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const User = require('../Models/user')

// const signup = async (req, res) => {
//     try {
//         const { username, password, role } = req.body
//         console.log('received data', { username, password, role })

//         const hashPassword = await bcrypt.hash(password, 10)
//         console.log('Hashed Password: ', hashPassword)
//         const newUser = new User({ username, password: hashPassword, role })
//         await newUser.save()

//         res.status(201).json({ message: 'Successfully Registered' })
//     } catch (error) {
//         console.log('Signup error: ', error.message)
//         res.status(500).json({ error: error.message })
//     }
// }

// const signin = async (req, res) => {
//     try {
//         const { username, password } = req.body
//         console.log('Received data', { username, password })
//         console.log('Received Password: ', password)
//         const user = await User.findOne({ username })

//         if (!user) {
//             console.log('user not found')
//             return res.status(404).json({ message: 'User not found' })
//         }

//         console.log('stored hashed password: ', user.password)
//         const passwordValid = await bcrypt.compare(password, user.password)
//         console.log('Password valid: ', passwordValid)

//         if (!passwordValid) {
//             console.log('password not matched')
//             return res.status(401).json({ message: 'Password not matched' })
//         }

//         const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_JWT, { expiresIn: '1h' })
//         res.json({ token })
//     } catch (error) {
//         console.log('Signin error: ', error.message)
//         res.status(500).json({ error: error.message })
//     }
// }

// module.exports = { signup, signin }








// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const User = require('../Models/user')


// const signup = async(req,res)=>{
    
//     try {
//         const {username,password,role} = req.body
//         console.log('received data',{username,password,role});

//         //
//         // if(!username|| !password){
//         //     return res.status(400).json({message:'username and password required'})

//         // }
//         // const existingUser = await User.findOne({username})
//         // if(existingUser){
//         //     return res.status(409).json({message:'Username already exist'})

//         // }
//         // const user = new User({username,password})
//         // await user.save()

//         // const token = jwt.sign({_id: user._id},process.env.SECRET_JWT)
//         // res.status(200).json({token})
//         //

//         const hashPassword = await bcrypt.hash(password,10)
//         console.log('Hashed Password: ',hashPassword);
//         const newUser = new User({username,password:hashPassword,role})
//         await newUser.save()

//         res.status(201).json({message:'Successfully Registered'})
//     }catch (error){
//         console.log('Signup error: ',error.message);
//         res.status(500).json({error:error.message})
//     }
// }    
// //         res.status(201).json({message:'Successful'}) 
// //     } catch (error) {
// //         res.status(500).json({error:error.message})
        
// //     }

// // }

// const signin = async(req,res)=>{
//     try {

//         const {username,password} = req.body
//         console.log('Received data',{username,password})
//         console.log('Received Password: ',password);
//         const user = await User.findOne({username})

//         if (!user){
//             console.log('user not found');
//             return res.status(404).json({message:'User not found'})

//         }

//         console.log('stored hashed password: ',user.password);
//         const passwordValid = await bcrypt.compare(password,user.password)
//         console.log('Password valid: ',passwordValid);

//         if(!passwordValid){
//             console.log('password not matched');
//             return res.status(401).json({message:'Password not matched'})

//         }
        
//         const token = jwt.sign({userId:user._id,role:user.role},process.env.SECRET_JWT,{expiresIn:'1h'})
//         res.render('signin',{token})
//     } catch (error){
//         console.log('Signin error: ',error.message);
//         res.status(500).json({error:error.message})
//     }
// }



// //         res.json({token})

// //     } catch (error) {
// //         res.status(500).json({error:error.message})
        
// //     }

// // }

// module.exports = {signup,signin}