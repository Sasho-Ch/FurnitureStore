const router = require("express").Router();
const userService = require("../services/userService");

router.post("/register", async (req, res) => {
  try {
    const userData = req.body;

    const result = await userService.register(userData);
    res.cookie("auth_token", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3 * 60 * 60 * 1000,
      sameSite: "Lax",
    });

    res.json(result);
  } catch (error) {
    console.error("Error in /register route:", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = req.body;
    const result = await userService.login(userData);
    res.cookie("auth_token", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3 * 60 * 60 * 1000,
      sameSite: "Lax",
    });
    res.json(result);
  } catch (error) {
    console.error("Error in /login route:", error.message);
    res.status(401).json({ message: "Invalid credentials." });
  }
});

router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in /logout route:", error.message);
    res.status(500).json({ message: "Logout failed." });
  }
});



router.get("/profile", async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user session found" });
    }

    const userId = req.user._id;
    const userProfile = await userService.getProfile(userId);
    res.json(userProfile);
  } catch (error) {
    console.error("Error in /profile route:", error.message);
    res.status(500).json({ message: "Error fetching user profile" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const userProfile = await userService.getOneUser(userId);
    res.json(userProfile);
  } catch (error) {
    console.error("Error in /profile route:", error.message);
    res.status(500).json({ message: "Error fetching user profile" });
  }
});

router.put("/profile", async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user session found" });
    }

    const userId = req.user._id;
    const updatedData = req.body;

    const updatedProfile = await userService.editProfile(userId, updatedData);

    res.json(updatedProfile);
  } catch (error) {
    console.error("Error in /profile route:", error.message);
    res.status(500).json({ message: "Error updating user profile" });
  }
});

module.exports = router;
