import { Router } from "express"

const router = Router()

router.post("/", (req, res) => {
    res.json({
        message: "Reminder route works!",
    })
})

export default router
