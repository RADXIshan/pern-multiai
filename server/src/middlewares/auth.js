import { clerkClient } from "@clerk/express";

export const auth = async(req, res, next) => {
    try {
        const { userId, has } = req.auth();
        const hasPremiumPlan = await has({ plan: "premium" });

        req.plan = hasPremiumPlan ? 'premium' : 'free';

        if (!hasPremiumPlan) {
            const user = await clerkClient.users.getUser(userId);
            if (user.privateMetadata.free_usage) {
                req.free_usage = user.privateMetadata.free_usage;
            } else {
                // Initialize if it doesn't exist
                await clerkClient.users.updateUserMetadata(userId, {
                    privateMetadata: {
                        free_usage: 0
                    }
                });
                req.free_usage = 0;
            }
        }
        
        next();
    } catch (error) {
        console.log(error); // Log the full error for debugging
        res.status(500).json({ success: false, message: "Authentication middleware error." });
    }
};