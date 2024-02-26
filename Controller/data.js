// const {objectId}= require('mongoose').Types
const Data = require('../Models/data')

const create = async(req,res)=>{
    try {
        const {title,content} = req.body;
        //
        // if(!title || !content){
        //     return res.status(400).json({message:'Title and content are required'})
        // }
        const newData = new Data({title,content,userId:req.user._id})
        await newData.save()
        res.status(201).json({message:'Successfully Created'})//newData
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }

} 


const read = async(req,res)=>{
    try {
        const id = req.params
        const data = await Data.findById(id)

        if(!data){
            return res.status(404).json({message:'Data not found'})
        }
        res.json({data})
    } catch (error) {
        return res.status(500).json({error:error.message})
        
    }
}

const update = async(req,res)=>{
    try {
        const id = req.params
        const {title,content} = req.body

        const updatedData = await Data.findByIdAndUpdate(id,{title,content},{new:true})

        if(!updatedData){
            return res.status(404).json({message:'Data Not Updated'})
        }
        res.json({message:"Data Updated",data:updatedData})



    } catch (error) {
        return res.status(500).json({error:error.message})
    }

}

const deleteDocument = async(req,res)=>{
    try {
        const id = req.params
        const dataDeleted = await Data.findByIdAndDelete(id)

        if(!dataDeleted){
            return res.status(404).json({message:'Data Not Found'})
        }
        res.json({message:'Data Deleted'})
        
    } catch (error) {
        return res.status(500).json({error:error.message})
        
    }
}

module.exports = {create,read,update,deleteDocument};















//in this folder we perform CRUD operations on our ApPI's