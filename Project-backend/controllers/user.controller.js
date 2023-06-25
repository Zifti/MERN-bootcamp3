const User = require("../models/user.model");
const { hashSync, compareSync } = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sendVerificationEmail, sendResetPasswordLink } = require('../service/email.service')


module.exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username, password: hashSync(password, 10) });
    await user.save()

    const verificationToken = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN_KEY, { expiresIn: '1d' });
    await sendVerificationEmail(email, verificationToken);

    return res.status(200).send({
      success: true,
      message: 'You have registered successfuly. Please check your email to verify your account',
    })
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};


module.exports.login = (req, res) => {
  const { email, username, password } = req.body;
  const user = User.findOne({username }).then(user => {
    if(!user){
      return res.status(401).send({
        success: false,
        message: 'User does not exist'
      })
    }
    if(!compareSync(password, user.password)){
      return res.status(401).send({
        success: false,
        message: 'Incorrect password'
      })
    }
      const payload = {
        username: user.username, 
        id: user._id   
      }
      console.log(user)
    const token = jwt.sign(payload, process.env.JWT_TOKEN_KEY, {expiresIn: "1d"})
    return res.status(200).send({
      username,
      id : user._id,
      success: true,
      message: 'Logged in',
      token : 'Bearer ' + token
    })
  })
};

module.exports.verifyUser = async (req, res) => {
  const token = req.params.token;

  try {
    const decoded = jwt.decode(token);
    console.log(decoded)
    const user = await User.findByIdAndUpdate(decoded.userId, { verified: true }).exec();
    console.log(user)

    if (!user) {
      return res.status(401).send({
        success: false,
        message: 'email not found '
    })}
    return res.status(200).send({
      success: true,
      message: 'Account has been verified succesfuly',
    })
  } catch (error) {
    // Handle any errors that occurred during verification
    console.log(error);
    res.status(500).send('Error verifying account.');
  }
};

module.exports.forgetPassword = async (req, res) => {
  try{

    const { email } = req.body
    const user = await User.findOne({email})

    if(!user){
      return res.status(401).send({
        success: false,
        message: 'email not found '
    })}

    const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN_KEY, { expiresIn: '1d' });
    await sendResetPasswordLink(email, token);

    return res.status(200).send({
      success: true,
      message: 'An email has been sent with instructions to reset password'
      })
  } catch(error){
    console.log(error)
    res.status(500).send('Something happened.');
  }
    
   
};

module.exports.resetPassword = async (req, res) =>{

  try {
   
    const { password } = req.body;
    const { token } = req.params
   
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    console.log(req.body)
  
    const user = await User.findById(decodedToken.userId);
  
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found'
      });
    }
  
    // Hash the new password
    const hashedPassword = await hashSync(password, 10);
  
    // Update the user's password
    user.password = hashedPassword;
    await user.save();
  
    return res.status(200).send({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Something happened.');
  }

}