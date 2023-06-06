const crypto = require("crypto");

const User = require("../models/users");
const ErrorResponse = require("../utils/errorResponse");
// const { sendMail } = require("../utils/sendEmail");

exports.registerUser = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return next(
        new ErrorResponse("Include email, password and user name to continue"),
        400
      );
    }

    const user = new User({ userName, email, password });
    await user.save();

    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        new ErrorResponse("Include email and password to continue"),
        400
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Invalid credentials"), 404);
    }

    const passwordIsMatch = await user.matchPasswords(password);

    if (!passwordIsMatch) {
      return next(new ErrorResponse("Invalid credentials"), 400);
    }

    sendToken(user, 200, res);
  } catch (error) {
    // res.status(500).json({ success: false, error: error.message });
    next(error);
  }
};

// exports.forgotPassword = async (req, res, next) => {
//   const { email } = req.body;
//   if (!email) {
//     return next(new ErrorResponse("Enter your email to continue", 400));
//   }
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return next(new ErrorResponse("Email could not be sent", 404));

//     const resetToken = user.getResetPasswordToken();

//     await user.save();

//     const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

//     const message = `
//     <h1>You have requested a password reset</h1>
//     <p>Please go to this link to reset your password</p>
//     <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
//     `;
//     try {
//       const emailRes = await sendMail(
//         process.env.EMAIL,
//         "Password Reset",
//         message
//       );
//     } catch (error) {
//       user.resetPasswordToken = undefined;
//       user.resetPasswordExpire = undefined;

//       await user.save();

//       next(new ErrorResponse("Email could not be sent, try again", 500));
//     }
//   } catch (error) {
//     next(error);
//   }
// };

exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gte: Date.now() },
    });
    if (!user) {
      return next(new ErrorResponse("Invalid reset token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return res
      .status(201)
      .json({ success: true, data: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};

const sendToken = async (user, statusCode, res) => {
  const token = await user.generateSignedToken();
  res.status(statusCode).json({ success: true, token });
};
