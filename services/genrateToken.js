import jwt from "jsonwebtoken";

export const generateToken = async (user,res,message, statusCode = 200) =>{
	try {
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { 
		  expiresIn: '24h',
		});
		const expiresInMilliseconds = 24 * 60 * 60 * 1000; // Token expiration in milliseconds
	
		// Calculating the exact time when the token expires
		const expiryTime = new Date(Date.now() + expiresInMilliseconds);
	
		// Formating the expiry date and time separately
		const expiryDate = expiryTime.toLocaleDateString();
		const expiryTimeOfDay = expiryTime.toLocaleTimeString();

		let data = {
			...user,
			token,
			TokenExpiresIn : `${expiryDate} ${expiryTimeOfDay}`
		}

		const options = {
			httpOnly: true,
			secure: true
		}
	
		res.status(statusCode).json({
		  success: true,
		  message,
		  data 
		});
	  } catch (error) {
		res.status(500).json({
		  success: false,
		  message: 'Token generation failed',
		});
	  }
};