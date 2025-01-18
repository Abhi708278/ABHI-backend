const addRetailers = (app,retailer)=>{
    app.post('/retailers/add', async(req,res)=>{

       try {
        const {mobileNum,gender} = req.body;
        // const password = generatePass(8);
        const password = "Pass__44";
        const newRetailer = new retailer({ mobileNum, gender, password });
       let savedRetailer=  await newRetailer.save();
       
        if(savedRetailer._id){
            savedRetailer.password = "null";
            res.status(200).json({sucess:true,data:savedRetailer})
        }else{
            res.status(400).json({sucess:false,data:"Please try again"})

        }
        
       } catch (error) {
        console.log(error);
        res.status(500).json({sucess:false,data:"Sever error"});

        
       }
        


    })


}

module.exports = addRetailers;