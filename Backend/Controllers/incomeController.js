import Income from '../Model/userIncome.js'

export const addIncome = async(req,res) => {
    const userId = req.user.id;
console.log(userId)
    try {
        const {source,amount ,date} = req.body
        console.log(req.body)
        if(!source || !amount || !date ){
            res.status(404).json({message:"Enter All Fields of Income Description"})
        }
        const newIncome = new Income ({
            id : userId,
            source,amount,date : new Date(date)
        }) 
        await newIncome.save();
res.status(200).json({
    message:"Income Added Successfully" , newIncome
})
    } catch (error) {
        console.log("error in add", error)
        res.status(500).json({message:"Server error"})
    }
}
export const getAllIncome = async(req,res) => {

}
export const getPdfOfIncome = async(req,res) => {

}
export const deleteIncome = async(req,res) => {

}