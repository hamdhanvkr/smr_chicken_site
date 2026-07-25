router.get("/test/db", async (req,res)=>{
    try {
        const [result] = await pool.query(
            "SELECT CURRENT_TIME() AS current_time"
        );

        res.json({
            success:true,
            result
        });

    } catch(error){
        res.json({
            success:false,
            message:error.message
        });
    }
});